/*global playerInfo, GetPlanetName */

import React, { Component } from "react";
import Button from "../common/button";
import { populatePlanetData } from "../common/populatePlanetData";
import _ from "lodash";

const initialState = {
  label: "0",
  title: "No idle planets found\nClick to check again",
  color: "green"
};

class FindIdlePlanets extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.getIdlePlanets = this.getIdlePlanets.bind(this);
    this.updateButtonLabel = this.updateButtonLabel.bind(this);
    this.startIdlePlanetDetection = this.startIdlePlanetDetection.bind(this);
    this.delayUntilLoggedIn = this.delayUntilLoggedIn.bind(this);
  }

  componentDidMount() {
    this.delayUntilLoggedIn(() => this.startIdlePlanetDetection());
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
      .filter(service => service.type !== "army_build")
      .map(service => service.planet);

    const idlePlanets = _.difference(allPlanets, planetsWithRunningTasks);
    return idlePlanets.map(planetId => GetPlanetName(planetId));
  }

  updateButtonLabel() {
    const idlePlanets = this.getIdlePlanets();

    if (idlePlanets.length > 0) {
      this.setState({
        label: idlePlanets.length,
        color: "red",
        title: `Idle Planets: \n${idlePlanets.join("\n")}`
      });
    } else {
      this.setState(initialState);
    }
  }

  startIdlePlanetDetection() {
    this.setState({ color: "yellow" });
    populatePlanetData(this.updateButtonLabel);
  }

  render() {
    return (
      <Button
        color={this.state.color}
        onClick={this.startIdlePlanetDetection}
        title={this.state.title}
      >
        {this.state.label}
      </Button>
    );
  }
}

export default FindIdlePlanets;
