"use client";
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
    btc: 70,
    eth: 60,
    xrp: 50,
    usdt: 40,
    other: 30,
  },
  {
    date: "2021-08-21 00:15:00",
    btc: 100,
    eth: 90,
    xrp: 80,
    usdt: 70,
    other: 60,
  },
  {
    date: "2021-08-22 00:30:45",
    btc: 72,
    eth: 62,
    xrp: 52,
    usdt: 42,
    other: 32,
  },
  {
    date: "2021-08-23 00:40:20",
    btc: 70,
    eth: 60,
    xrp: 50,
    usdt: 40,
    other: 30,
  },
  {
    date: "2021-08-24 00:55:10",
    btc: 80,
    eth: 70,
    xrp: 60,
    usdt: 50,
    other: 40,
  },
  {
    date: "2021-08-25 01:10:30",
    btc: 75,
    eth: 65,
    xrp: 55,
    usdt: 45,
    other: 35,
  },
  {
    date: "2021-08-26 01:25:50",
    btc: 70,
    eth: 60,
    xrp: 50,
    usdt: 40,
    other: 30,
  },
  {
    date: "2021-09-27 01:40:15",
    btc: 75,
    eth: 65,
    xrp: 55,
    usdt: 45,
    other: 35,
  },
  {
    date: "2021-08-20 00:20:16",
    btc: 70,
    eth: 60,
    xrp: 50,
    usdt: 40,
    other: 30,
  },
  {
    date: "2021-08-21 00:15:00",
    btc: 100,
    eth: 90,
    xrp: 80,
    usdt: 70,
    other: 60,
  },
  {
    date: "2021-08-22 00:30:45",
    btc: 72,
    eth: 62,
    xrp: 52,
    usdt: 42,
    other: 32,
  },
  {
    date: "2021-08-23 00:40:20",
    btc: 70,
    eth: 60,
    xrp: 50,
    usdt: 40,
    other: 30,
  },
  {
    date: "2021-08-24 00:55:10",
    btc: 80,
    eth: 70,
    xrp: 60,
    usdt: 50,
    other: 40,
  },
  {
    date: "2021-08-25 01:10:30",
    btc: 75,
    eth: 65,
    xrp: 55,
    usdt: 45,
    other: 35,
  },
  {
    date: "2021-08-26 01:25:50",
    btc: 70,
    eth: 60,
    xrp: 50,
    usdt: 40,
    other: 30,
  },
  {
    date: "2021-09-27 01:40:15",
    btc: 75,
    eth: 65,
    xrp: 55,
    usdt: 45,
    other: 35,
  },
];

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
      className="text-12"
    >
      {formattedDate}
    </text>
  );
};

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
        <p className="text-[11px] font-500 text-white leading-4">
          ETH: {payload[0].payload.eth}
        </p>
        <p className="text-[11px] font-500 text-white leading-4">
          XRP : {payload[0].payload.xrp}
        </p>
        <p className="text-[11px] font-500 text-white leading-4">
          USDT : {payload[0].payload.usdt}
        </p>

        <p className="text-[11px] font-500 text-white leading-4">
          Other : {payload[0].payload.other}
        </p>
      </div>
    );
  }

  return null;
};

export const StackedAreaChart = () => {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%" className={"!h-[400px]"}>
      <AreaChart
        width={500}
        height={350}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="color-btc" x1="0" y1="0" x2="0" y2="0.6">
            <stop offset="5%" stopColor="#F7931A" stopOpacity={0.165} />
            <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color-eth" x1="0" y1="0" x2="0" y2="0.6">
            <stop offset="5%" stopColor="#1A48FF" stopOpacity={0.165} />
            <stop offset="95%" stopColor="#1A48FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color-xrp" x1="0" y1="0" x2="0" y2="0.6">
            <stop offset="5%" stopColor="#9B47CF" stopOpacity={0.165} />
            <stop offset="95%" stopColor="#9B47CF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color-usdt" x1="0" y1="0" x2="0" y2="0.6">
            <stop offset="5%" stopColor="#04CFC4" stopOpacity={0.165} />
            <stop offset="95%" stopColor="#04CFC4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color-other" x1="0" y1="0" x2="0" y2="0.6">
            <stop offset="5%" stopColor="#8A94A1" stopOpacity={0.165} />
            <stop offset="95%" stopColor="#8A94A1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={<CustomXAxisTick />}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          tick={{
            fill: `${theme === "light" ? "#8A94A1" : "#FFFFFF4D"}`,
            fontSize: "12px",
          }}
          tickLine={false}
          tickMargin={10}
        />

        <CartesianGrid
          opacity={1}
          fillOpacity={1}
          strokeOpacity={0.4}
          vertical={false}
          horizontal
          strokeWidth={0.4}
          color="#8A94A1"
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="natural"
          dataKey="btc"
          stroke="#F7931A"
          fillOpacity={1}
          strokeOpacity={0.5}
          fill="url(#color-btc)"
          strokeWidth={2}
        />
        <Area
          type="natural"
          dataKey="eth"
          stroke="#1A48FF"
          fillOpacity={1}
          strokeOpacity={0.5}
          strokeWidth={2}
          fill="url(#color-eth)"
        />
        <Area
          type="natural"
          dataKey="xrp"
          stroke="#9B47CF"
          fillOpacity={1}
          strokeOpacity={0.5}
          strokeWidth={2}
          fill="url(#color-xrp)"
        />
        <Area
          type="natural"
          dataKey="usdt"
          stroke="#04CFC4"
          fillOpacity={1}
          strokeOpacity={0.5}
          strokeWidth={2}
          fill="url(#color-usdt)"
        />
        <Area
          type="natural"
          dataKey="other"
          stroke="#8A94A1"
          fillOpacity={1}
          strokeOpacity={0.5}
          strokeWidth={2}
          fill="url(#color-other)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
