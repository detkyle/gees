import React from "react";
import styled from "styled-components";
import ExportLegionAssets from "./actions/exportLegionAssets";
import ExportLegionMissions from "./actions/exportLegionMissions";
import FindIdlePlanets from "./actions/findIdlePlanets";

function App() {
  const Wrapper = styled.div`
    position: absolute;
    left: 25%;
  `;

  return (
    <Wrapper>
      <ExportLegionAssets />
      <ExportLegionMissions />
      <FindIdlePlanets />
    </Wrapper>
  );
}

export default App;
