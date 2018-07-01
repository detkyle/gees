/*global playerInfo, GetPlanetName, gameTime */

import React, { Component } from "react";
import Button from "../common/button";
import { populatePlanetData } from "../common/populatePlanetData";
import _ from "lodash";
import moment from "moment";

class FindIdlePlanets extends Component {
  constructor() {
    super();
    this.state = {
      label: "0",
      title: "",
      color: "green"
    };

    this.updateButtonLabel = this.updateButtonLabel.bind(this);
    this.startIdlePlanetDetection = this.startIdlePlanetDetection.bind(this);
  }

  componentDidMount() {
    this.startIdlePlanetDetection();
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

  getPrintout(groups) {
    let result = "";

    for (var day in groups) {
      result += `  ${day}\n`;

      groups[day].forEach(task => {
        result += `    ${task.time} ${task.name}\n`;
      });
    }

    return result;
  }

  updateButtonLabel() {
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
