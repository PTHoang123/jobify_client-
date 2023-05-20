import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
function AreaCharts({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area dataKey='count' fill="#2cb1bc" barSize={75}/>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaCharts;
