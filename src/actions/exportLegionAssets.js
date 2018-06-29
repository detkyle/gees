/*global playerInfo, GetPlanetName, GetItemName */

import React, { Component } from "react";
import { exportToGS } from "../external/googleSheets";
import GetItemType from "../common/getItemType";
import Button from "../common/button";
import { populatePlanetData } from "../common/populatePlanetData";

class ExportLegionAssets extends Component {
  constructor() {
    super();
    this.state = {
      color: "green"
    };
    this.getDepotAssets = this.getDepotAssets.bind(this);
    this.exportLegionAssets = this.exportLegionAssets.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
  }

  getDepotAssets() {
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

  exportLegionAssets() {
    const sheet = {
      name: "LegionAssets_Raw",
      headers: ["Planet", "Type", "Item", "Amount"],
      rows: this.getDepotAssets()
    };

    exportToGS([sheet], () => this.setState({ color: "green" }));
  }

  onExportClick() {
    this.setState({ color: "yellow" });
    populatePlanetData(this.exportLegionAssets);
  }

  render() {
    return (
      <Button
        color={this.state.color}
        title="Export Legion Assets"
        onClick={this.onExportClick}
      >
        A
      </Button>
    );
  }
}

export default ExportLegionAssets;
