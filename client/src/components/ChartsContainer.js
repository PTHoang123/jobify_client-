import React from "react";
import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useAppContext } from "../context/appContext";
import AreaCharts from "./AreaCharts";
import BarCharts from "./BarCharts";

function ChartsContainer() {
  const [barChat, setBarChat] = useState(true);
  const { monthlyApplication: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button type="button" onClick={() => setBarChat(!barChat)}>
        {barChat ? 'AreaChart': 'BarCharts'}
      </button>
      {barChat ? <BarCharts data={data}/> : <AreaCharts data={data} />}
    </Wrapper>
  );
}

export default ChartsContainer;
