import React from "react";
import styled from "styled-components";
import ExportLegionAssets from "./exports/exportLegionAssets";
import ExportLegionMissions from "./exports/exportLegionMissions";

function App() {
  const Wrapper = styled.div`
    position: absolute;
    left: 25%;
  `;

  return (
    <Wrapper>
      <ExportLegionAssets />
      <ExportLegionMissions />
    </Wrapper>
  );
}

export default App;
