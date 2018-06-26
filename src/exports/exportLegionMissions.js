/*global playerInfo, GetPlanetName, GetItemName */

import React, { Component } from "react";
import { exportToGS } from "../external/googleSheets";
import ExportButton from "../common/exportButton";

function ExportLegionMissions() {
  function getLegionMissions() {
    return playerInfo.playerArmy.armyMission.map(m => [
      GetPlanetName(m.planet),
      m.type === 1 ? "Exchange" : "Bounty",
      GetItemName(m.item.split("_")[0], m.item.split("_")[1]),
      m.price.low,
      m.amount.low,
      m.tamount.low,
      m.unitAmount.low,
      m.amount.low * m.unitAmount.low,
      m.amount.low * m.tamount.low
    ]);
  }

  function exportLegionMission() {
    const sheet = {
      name: "LegionMissions_Raw",
      headers: [
        "System",
        "Type",
        "Name",
        "LP Per Mission",
        "Missions Remaining",
        "Total Missions",
        "Items Per Mission",
        "Total Items Left",
        "Total Items Created"
      ],
      rows: getLegionMissions()
    };
    exportToGS([sheet]);
  }

  return <ExportButton onClick={exportLegionMission}>M</ExportButton>;
}

export default ExportLegionMissions;
