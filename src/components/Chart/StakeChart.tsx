import { readableNumber } from "@/helper/readableNumber";
import { cn } from "@/utils";
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
    price: 27500,
  },
  {
    date: "2021-08-21 00:15:00",
    price: 27400,
  },
  {
    date: "2021-08-22 00:30:45",
    price: 27565,
  },
  {
    date: "2021-08-23 00:40:20",
    price: 27565,
  },
  {
    date: "2021-08-24 00:55:10",
    price: 26489,
  },
  {
    date: "2021-08-25 01:10:30",
    price: 25654,
  },
  {
    date: "2021-08-26 01:25:50",
    price: 25625,
  },
  {
    date: "2021-09-27 01:40:15",
    price: 26552,
  },
  {
    date: "2021-08-20 00:20:16",
    price: 26658,
  },
  {
    date: "2021-08-21 00:15:00",
    price: 25456,
  },
  {
    date: "2021-08-22 00:30:45",
    price: 27456,
  },
  {
    date: "2021-08-23 00:40:20",
    price: 26554,
  },
  {
    date: "2021-08-24 00:55:10",
    price: 25475,
  },
  {
    date: "2021-08-25 01:10:30",
    price: 26896,
  },
  {
    date: "2021-08-26 01:25:50",
    price: 25515,
  },
  {
    date: "2021-09-27 01:40:15",
    price: 25999,
  },
];

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{
    payload: {
      date: string;
      price: any;
    };
  }>;
}
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-300 rounded-[10px] py-2 px-3">
        <p className="text-[11px] font-500 leading-4 text-gray-300">
          {/* 2022-05-06 6:30:00 UTC */}
          {payload[0].payload.date}
        </p>
        <p className="text-[11px] font-500 text-white leading-4">{`€${readableNumber(
          payload[0].payload.price
        )}`}</p>
      </div>
    );
  }

  return null;
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
export const StakeChart = ({ emptyState }: { emptyState: boolean }) => {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className={cn(emptyState ? "!h-[388px]" : "!h-[396px]")}
    >
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
          <linearGradient id="color-price" x1="0" y1="0" x2="0" y2="0.8">
            <stop
              offset="5%"
              stopColor={theme === "light" ? "#1A48FF" : "#000AFF"}
              stopOpacity={theme === "light" ? 0.209 : 0.339}
              // stopOpacity={0.18}
            />
            <stop
              offset="95%"
              stopColor={theme === "light" ? "#1A48FF" : "#000AFF"}
              stopOpacity={0}
            />
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
          interval={Math.ceil(data?.length / 20)}
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
          dataKey="price"
          stroke={theme === "light" ? "#1A48FF" : "#000AFF"}
          fillOpacity={1}
          strokeOpacity={0.5}
          fill="url(#color-price)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
