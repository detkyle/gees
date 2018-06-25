/*global playerInfo, GetPlanetName, GetItemName */

import React, { Component } from "react";
import { exportToGS } from "../external/googleSheets";
import GetItemType from "../common/getItemType";
import ExportButton from "../common/exportButton";

function ExportLegionAssets() {
  function depotAssets() {
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
      rows: depotAssets()
    };

    exportToGS([sheet]);
  }

  return <ExportButton onClick={exportLegionAssets}>LA</ExportButton>;
}

export default ExportLegionAssets;
