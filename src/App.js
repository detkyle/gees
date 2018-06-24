/*global playerInfo, GetPlanetName, GetItemName */

import React, { Component } from "react";
import styled from "styled-components";
import { exportToGS } from "./external/googleSheets";

function getItemType(name) {
  var exportItems = {
    "Armor debris": "01_Debris",
    "Hull debris": "01_Debris",
    "Module debris": "01_Debris",
    "Weapon debris": "01_Debris",
    "Metal ore": "03_Ore",
    "RE ore": "03_Ore",
    "Silicon ore": "03_Ore",
    Stardust: "03_Ore",
    Ice: "03_Ore",
    "He-3": "04_T1",
    Hydrogen: "04_T1",
    Metal: "04_T1",
    Oxygen: "04_T1",
    Silicon: "04_T1",
    "RE element": "04_T1",
    Chip: "05_T2",
    Crystal: "05_T2",
    Fuel: "05_T2",
    "Ti alloy": "05_T2",
    "Nuclear fuel": "T3",
    Nanomaterial: "T3",
    "Photonic crystal": "T3",
    "Quantum chip": "T3",
    "Complex 1": "02_Rock",
    "Complex 2": "02_Rock",
    "Complex 3": "02_Rock",
    "Complex 4": "02_Rock",
    "Complex 5": "02_Rock",
    "Ice rock": "02_Rock",
    "Metal rock": "02_Rock",
    "Mix-ice": "02_Rock",
    "Mix-metal": "02_Rock",
    "Mix-RE": "02_Rock",
    "Mix-silicon": "02_Rock",
    "Mix-stardust": "02_Rock",
    "P-ice": "02_Rock",
    "P-metal": "02_Rock",
    "P-RE": "02_Rock",
    "P-silicon": "02_Rock",
    "P-stardust": "02_Rock",
    "RE rock": "02_Rock",
    "R-ice": "02_Rock",
    "R-metal": "02_Rock",
    "R-RE": "02_Rock",
    "R-silicon": "02_Rock",
    "R-stardust": "02_Rock",
    "Silicon rock": "02_Rock",
    "Star rock": "02_Rock"
  };

  return exportItems[name] || "00_Hull/Module";
}

function App() {
  function depotAssets() {
    var assets = [];
    var warehouses = playerInfo.playerArmy.warehouse.getByPid;
    warehouses.forEach((depot, index) => {
      depot.forEach(item => {
        assets.push([
          GetPlanetName(index),
          getItemType(GetItemName(item[0], item[1])),
          GetItemName(item[0], item[1]),
          item[2]
        ]);
      });
    });
    return assets;
  }

  function exportLegionAssets() {
    const sheet = {
      name: "LegionAssets",
      headers: ["Planet", "Type", "Item", "Amount"],
      rows: depotAssets()
    };

    exportToGS([sheet]);
  }

  const Wrapper = styled.div`
    position: absolute;
    left: 25%;
  `;

  const Button = styled.button`
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 4px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 8px;
    margin: 1px 1px;
    cursor: pointer;
    border-radius: 8px;
  `;
  return (
    <Wrapper>
      <Button onClick={exportLegionAssets}>LA</Button>
    </Wrapper>
  );
}

export default App;
