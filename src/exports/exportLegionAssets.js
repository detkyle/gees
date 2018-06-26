/*global playerInfo, GetPlanetName, GetItemName, GetUnionArmyInfo, GetUnionPlanetInfo */

import React from "react";
import { exportToGS } from "../external/googleSheets";
import GetItemType from "../common/getItemType";
import ExportButton from "../common/exportButton";
import _ from "lodash";

function ExportLegionAssets() {
  function getDepotAssets() {
    var assets = [];
    var warehouses = playerInfo.playerArmy.warehouse.getByPid;
    warehouses.forEach((depot, index) => {
      depot.forEach(item => {
        assets.push([
          GetPlanetName(index),
          GetItemType(GetItemName(item[0], item[1])),
          GetItemName(item[0], item[1]),
          item[2]
        ]);
      });
    });
    return assets;
  }

  function exportLegionAssets() {
    const sheet = {
      name: "LegionAssets_Raw",
      headers: ["Planet", "Type", "Item", "Amount"],
      rows: getDepotAssets()
    };

    exportToGS([sheet]);
  }

  function fetchPlanetData(planetsToProcess, doneFetching) {
    if (planetsToProcess.length === 0) {
      doneFetching();
      return;
    }

    const planetId = planetsToProcess.pop()[0];
    setTimeout(() => {
      console.log(`Fetching: ${planetId}`);
      GetUnionPlanetInfo(
        {},
        fetchPlanetData(planetsToProcess, doneFetching),
        planetId
      );
    }, _.random(1000, 2000));
  }

  function armyInfoFetchComplete() {
    let planetsToProcess = playerInfo.playerArmy.armyInfo.planets.slice(0);
    fetchPlanetData(planetsToProcess, exportLegionAssets);
  }

  function initiateExport() {
    GetUnionArmyInfo({}, armyInfoFetchComplete);
  }

  return <ExportButton onClick={initiateExport}>A</ExportButton>;
}

export default ExportLegionAssets;
