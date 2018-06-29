/*global playerInfo, GetPlanetName, GetItemName */

import React, { Component } from "react";
import ExportButton from "../common/exportButton";
import { populatePlanetData } from "../common/populatePlanetData";
import _ from "lodash";

const initialState = {
  label: "I",
  title: "No idle planets found"
};

class FindIdlePlanets extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.getIdlePlanets = this.getIdlePlanets.bind(this);
    this.updateButtonLabel = this.updateButtonLabel.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.delayUntilLoggedIn = this.delayUntilLoggedIn.bind(this);
  }

  componentDidMount() {
    this.delayUntilLoggedIn(() => populatePlanetData(this.updateButtonLabel));
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

  getIdlePlanets() {
    const legion = playerInfo.playerArmy;
    const allPlanets = legion.armyInfo.planets.map(planet => planet[0]);
    const planetsWithRunningTasks = legion.services.getById
      .filter(service => service.type != "army_build")
      .map(service => service.planet);

    const idlePlanets = _.difference(allPlanets, planetsWithRunningTasks);
    return idlePlanets.map(planetId => GetPlanetName(planetId));
  }

  updateButtonLabel() {
    const idlePlanets = this.getIdlePlanets();

    if (idlePlanets.length > 0) {
      this.setState({
        label: idlePlanets.length,
        title: `Idle Planets: \n${idlePlanets.join("\n")}`
      });
    } else {
      this.setState(initialState);
    }
  }

  onExportClick() {
    populatePlanetData(this.updateButtonLabel);
  }

  render() {
    return (
      <ExportButton onClick={this.onExportClick} title={this.state.title}>
        {this.state.label}
      </ExportButton>
    );
  }
}

export default FindIdlePlanets;
