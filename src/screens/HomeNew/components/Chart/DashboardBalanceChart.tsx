import { readableNumber } from "@/helper/readableNumber";
import { useTheme } from "next-themes";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
const data = [
  { name: "feb 22", uv: 400, pv: 2400, amt: 2400 },
  { name: "March 23", uv: 200, pv: 800, amt: 1200 },
  { name: "April 23", uv: 500, pv: 1200, amt: 2000 },
  { name: "May 23", uv: 300, pv: 1600, amt: 2400 },
  { name: "June 23", uv: 600, pv: 2000, amt: 2800 },
  { name: "July 23", uv: 400, pv: 2400, amt: 3200 },
  { name: "Aug 23", uv: 800, pv: 2800, amt: 3600 },
  { name: "Sept 23", uv: 700, pv: 3200, amt: 4000 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
  isTokenChart,
  colorCode,
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[10px] py-2 px-3"
        style={{ background: colorCode }}
      >
        {" "}
        <p className="text-12 font-500 text-white leading-4">{`€${readableNumber(
          isTokenChart
            ? Number(payload[0].payload?.price?.toFixed(2))
            : Number(payload[0].payload?.balanceFiat?.toFixed(2))
        )}`}</p>
        <p className="text-12 font-500 leading-4 text-white/30">
          {/* 2022-05-06 6:30:00 UTC */}
          {payload[0].payload?.name}
          {/* {moment(payload[0].payload.timestamp)?.format(
            "YYYY-MM-DD h:mm:ss A UTC"
          )} */}
        </p>
      </div>
    );
  }

  return null;
};
const DashboardBalanceChart = ({ colorCode }: { colorCode: string }) => {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colorCode} stopOpacity={0.25} />
            <stop offset="95%" stopColor={colorCode} stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="colorStroke"
            x1="589.474"
            y1="-53.8593"
            x2="-121.576"
            y2="95.5136"
          >
            <stop
              offset="0.705668"
              stopColor={colorCode}
              stopOpacity={0.509715}
            />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip colorCode={colorCode} />} />

        <Area
          type="monotone"
          dataKey="uv"
          stroke="url(#colorStroke)"
          fill="url(#colorFill)"
          strokeWidth="2"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardBalanceChart;
