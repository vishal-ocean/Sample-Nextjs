import { FC } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface LineChartsProps {
  color: string;
  chartData: any;
}
const LineCharts: FC<LineChartsProps> = ({ color, chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={chartData}>
        <Line dataKey="pv" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LineCharts;
