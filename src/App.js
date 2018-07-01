import React, { Component } from "react";
import styled from "styled-components";
import ExportLegionAssets from "./actions/exportLegionAssets";
import ExportLegionMissions from "./actions/exportLegionMissions";
import PlanetActivity from "./actions/planetActivity";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };

    this.delayUntilLoggedIn = this.delayUntilLoggedIn.bind(this);
    this.setLoaded = this.setLoaded.bind(this);
  }

  componentDidMount() {
    this.delayUntilLoggedIn(() => this.setLoaded());
  }

  setLoaded() {
    this.setState({ loaded: true });
  }

  delayUntilLoggedIn(action) {
    if (typeof playerInfo === "undefined") {
      setTimeout(() => {
        this.delayUntilLoggedIn(action);
      }, 1000);
    } else {
      console.log("player has logged in, firing off action");
      action();
    }
  }

  render() {
    const Wrapper = styled.div`
      position: absolute;
      left: 25%;
    `;

    if (this.state.loaded === false) {
      return null;
    }

    return (
      <Wrapper>
        <ExportLegionAssets />
        <ExportLegionMissions />
        <PlanetActivity />
      </Wrapper>
    );
  }
}

export default App;
