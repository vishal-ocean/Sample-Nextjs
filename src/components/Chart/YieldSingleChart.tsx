import { readableNumber } from "@/helper/readableNumber";
import moment from "moment";
import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    date: "2021-08-20 00:20:16",
    btc: 27500,
  },
  {
    date: "2021-08-21 00:15:00",
    btc: 27400,
  },
  {
    date: "2021-08-22 00:30:45",
    btc: 27565,
  },
  {
    date: "2021-08-23 00:40:20",
    btc: 27565,
  },
  {
    date: "2021-08-24 00:55:10",
    btc: 26489,
  },
  {
    date: "2021-08-25 01:10:30",
    btc: 25654,
  },
  {
    date: "2021-08-26 01:25:50",
    btc: 25625,
  },
  {
    date: "2021-09-27 01:40:15",
    btc: 26552,
  },
  {
    date: "2021-08-20 00:20:16",
    btc: 26658,
  },
  {
    date: "2021-08-21 00:15:00",
    btc: 25456,
  },
  {
    date: "2021-08-22 00:30:45",
    btc: 27456,
  },
  {
    date: "2021-08-23 00:40:20",
    btc: 26554,
  },
  {
    date: "2021-08-24 00:55:10",
    btc: 25475,
  },
  {
    date: "2021-08-25 01:10:30",
    btc: 26896,
  },
  {
    date: "2021-08-26 01:25:50",
    btc: 25515,
  },
  {
    date: "2021-09-27 01:40:15",
    btc: 25999,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-300 rounded-[10px] py-2 px-3">
        <p className="text-[11px] font-500 leading-4 text-gray-300">
          {/* 2022-05-06 6:30:00 UTC */}
          {moment(payload[0].payload.timestamp)?.format(
            "YYYY-MM-DD h:mm:ss A UTC"
          )}
        </p>
        <p className="text-[11px] font-500 text-white leading-4">
          BTC: {payload[0].payload.btc}
        </p>
      </div>
    );
  }
};
const CustomXAxisTick = (props: any) => {
  const { theme } = useTheme();

  const { x, y, payload } = props;
  const date = moment(payload.value, "YYYY-MM-DD HH:mm:ss");
  const formattedDate = date.isValid() ? date.format("MMM D") : "";

  return (
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      fill={theme === "light" ? "#8A94A1" : "#FFFFFF4D"}
      className="text-10"
    >
      {formattedDate}
    </text>
  );
};
export const YieldSingleChart = ({ tokenColor }: { tokenColor: string }) => {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%" className={"!h-[382px]"}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="color-btc" x1="0" y1="0" x2="0" y2="0.8">
            <stop offset="5%" stopColor={tokenColor} stopOpacity={0.18} />
            <stop offset="95%" stopColor={tokenColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          opacity={1}
          fillOpacity={1}
          strokeOpacity={0.6}
          vertical={false}
          horizontal
          strokeWidth={0.4}
          color={theme === "light" ? "#8A94A1" : "#FFFFFF4D"}
        />
        <XAxis
          dataKey="date"
          tick={<CustomXAxisTick />}
          axisLine={false}
          tickLine={false}
          interval={Math.ceil(data?.length / 12)}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: `${theme === "light" ? "#8A94A1" : "#FFFFFF4D"}`,
            fontSize: "10px",
          }}
          domain={["auto", "dataMax + 200"]}
          tickFormatter={(value) => `€${readableNumber(value)}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="natural"
          dataKey="btc"
          stroke={tokenColor}
          fillOpacity={1}
          strokeOpacity={0.5}
          fill="url(#color-btc)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
