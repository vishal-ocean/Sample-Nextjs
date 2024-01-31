import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

const data = [
  { name: "Group A", value: 21 },
  { name: "Group B", value: 19 },
  { name: "Group C", value: 15 },
  { name: "Group D", value: 16 },
  { name: "Group E", value: 4 },
  { name: "Group F", value: 14 },
  { name: "Group G", value: 2 },
  { name: "Group H", value: 4 },
  { name: "Group I", value: 5 },
];
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#5DAF46",
  "#987FED",
  "#ABCD58",
  "#654BF4",
  "#654655",
];

interface ActiveShapeProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload?: any;
  percent?: number;
  value?: number;
  name?: string;
}
const renderActiveShape = (props: ActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius,
    outerRadius = 0,
    startAngle,
    endAngle,
    fill,
    payload,
    percent = 0,
    value,
    name,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 40) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * -12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{` ${name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * -12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

interface SharpChartProps {
  innerRadius?: number;
  outerRadius?: number;
}
export const ShapeChart = ({ innerRadius, outerRadius }: SharpChartProps) => {
  {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius || 60}
            outerRadius={outerRadius || 100}
            dataKey="value"
            label={renderActiveShape}
            labelLine={false}
            className="text-14"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
};
