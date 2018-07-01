/*global playerInfo, GetPlanetName, gameTime */

import React, { Component } from "react";
import Button from "../common/button";
import { populatePlanetData } from "../common/populatePlanetData";
import _ from "lodash";
import moment from "moment";

class PlanetActivity extends Component {
  constructor() {
    super();
    this.state = {
      label: "0",
      title: "",
      color: "green"
    };

    this.updateButton = this.updateButton.bind(this);
    this.startPlanetActivityDetection = this.startPlanetActivityDetection.bind(
      this
    );
  }

  componentDidMount() {
    this.startPlanetActivityDetection();
  }

  getPlanets() {
    const legion = playerInfo.playerArmy;
    const allPlanets = legion.armyInfo.planets.reduce((result, item) => {
      result[item[0]] = { name: GetPlanetName(item[0]) };
      return result;
    }, {});

    const planetsWithRunningTasks = legion.services.getById.filter(
      service => service && service.type !== "army_build"
    );

    planetsWithRunningTasks.forEach(task => {
      const secondsTillEnd = task.endTime - gameTime;
      const ending = moment().add(secondsTillEnd, "seconds");

      allPlanets[task.planet].ending = ending;
      allPlanets[task.planet].day = ending.format("ddd");
      allPlanets[task.planet].time = ending.format("HH:mm");
    });

    return allPlanets;
  }

  groupAndSort(planets) {
    let idle = [];
    let busy = [];
    for (var id in planets) {
      let planet = planets[id];
      if (typeof planet.ending === "undefined") {
        idle.push(planet.name);
      } else {
        busy.push(planet);
      }
    }

    busy = _.sortBy(busy, ["ending"]);
    busy = _.groupBy(busy, "day");

    return {
      idle,
      busy
    };
  }

  getPrintout(days) {
    let result = "";

    for (var day in days) {
      result += `  ${day}\n`;

      days[day].forEach(planet => {
        result += `    ${planet.time} ${planet.name}\n`;
      });
    }

    return result;
  }

  updateButton() {
    const planets = this.getPlanets();
    const { idle, busy } = this.groupAndSort(planets);
    let color = "green";
    let title = "";

    if (idle.length > 0) {
      color = "red";
      title = `Idle Planets\n  ${idle.join("\n  ")}\n\n`;
    }

    title += `Busy Planets until\n${this.getPrintout(busy)}`;

    this.setState({
      label: idle.length,
      color,
      title
    });
  }

  startPlanetActivityDetection() {
    this.setState({ color: "yellow" });
    populatePlanetData(this.updateButton);
  }

  render() {
    return (
      <Button
        color={this.state.color}
        onClick={this.startPlanetActivityDetection}
        title={this.state.title}
      >
        {this.state.label}
      </Button>
    );
  }
}

export default PlanetActivity;
