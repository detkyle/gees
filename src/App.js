/*global playerInfo, GetPlanetName, GetItemName */

import React, { Component } from "react";
import styled from "styled-components";
import ExportLegionAssets from "./exports/exportLegionAssets";

function App() {
  const Wrapper = styled.div`
    position: absolute;
    left: 25%;
  `;

  return (
    <Wrapper>
      <ExportLegionAssets />
    </Wrapper>
  );
}

export default App;
