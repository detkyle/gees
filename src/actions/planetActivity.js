/*global playerInfo, GetPlanetName, gameTime, GetLanguage, getTable */

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
    setTimeout(() => {
      this.startPlanetActivityDetection();
    }, 5000);
  }

  getPlanets() {
    const legion = playerInfo.playerArmy;
    const allPlanets = legion.armyInfo.planets.reduce((result, item) => {
      result[item[0]] = { name: GetPlanetName(item[0]) };
      return result;
    }, {});

    const tasks = legion.services.getById.filter(
      service => service && service.type !== "army_build"
    );

    console.log(
      `GameTime: ${gameTime}`,
      tasks.map(p => {
        return { name: GetPlanetName(p.planet), ...p };
      })
    );

    tasks.forEach(task => {
      const secondsTillEnd = task.endTime - gameTime;
      const ending = moment().add(secondsTillEnd, "seconds");

      allPlanets[task.planet].ending = ending;
      allPlanets[task.planet].day = ending.format("ddd");
      allPlanets[task.planet].time = ending.format("HH:mm");
      allPlanets[task.planet].taskInPast = secondsTillEnd <= 0;
      allPlanets[task.planet].task = getTaskName(task);
      allPlanets[task.planet].amount = task.amount.toLocaleString();
    });

    return allPlanets;

    function getTaskName(task) {
      const table = getTable(task.objectType);
      const nameId = table.getById[task.objectId][1];

      return GetLanguage(nameId);
    }
  }

  groupAndSort(planets) {
    let idle = [];
    let busy = [];
    for (var id in planets) {
      const planet = planets[id];
      const noTask = typeof planet.ending === "undefined";

      if (noTask || planet.taskInPast) {
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

      days[day].forEach(({ time, name, task, amount }) => {
        result += `    ${time}   ${name}${" ".repeat(
          (10 - name.length) * 2
        )} ${task} x ${amount}\n`;
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
