import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "today", nonCompounded: 0, Compounded: 0 },
  { date: "1 year", nonCompounded: 1378, Compounded: 1522 },
];

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{
    payload: {
      date: string;
      nonCompounded: any;
      Compounded: any;
    };
  }>;
}

const renderCustomLegend = () => {
  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 bg-primary rounded-full" />
        <span className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
          Non-compounded Series
        </span>
      </div>{" "}
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 bg-success-200 rounded-full" />
        <span className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
          Compounded Series
        </span>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-300 rounded-[10px] py-2 px-3">
        <p className="text-[11px] font-500 leading-4 text-gray-300 dark:text-white/30">
          {/* 2022-05-06 6:30:00 UTC */}
          {payload[0].payload.date}
        </p>
        <p className="text-[11px] font-500 text-white leading-4">
          {payload[0].payload.Compounded}
        </p>
        <p className="text-[11px] font-500 text-white leading-4">
          {payload[0].payload.nonCompounded}
        </p>
      </div>
    );
  }

  return null;
};

export const StakeCompoundedChart = () => {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <defs>
          <linearGradient
            id="color-success"
            x1="0.4"
            y1="0.4"
            x2="0.7"
            y2="0.8"
          >
            <stop offset="5%" stopColor={"#00C113"} stopOpacity={0.25} />
            <stop offset="95%" stopColor={"#00C113"} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color-blue" x1="0.4" y1="0.4" x2="0.7" y2="0.8">
            <stop offset="5%" stopColor={"#1A48FF"} stopOpacity={0.2} />
            <stop offset="95%" stopColor={"#1A48FF"} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          // tick={false}
          padding={{
            right: 52,
            left: 12,
          }}
          height={20}
          tickLine={false}
          tick={{
            fill: `${theme === "light" ? "#8A94A1" : "#FFFFFF4D"}`,
            fontSize: "12px",
          }}
          stroke="#E3E6E9"
          interval={0}
          targetX={540}
        />
        <YAxis
          tick={false}
          padding={{
            top: 0,
            bottom: 12,
          }}
          width={1}
          stroke="#E3E6E9"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend align="left" verticalAlign="top" content={renderCustomLegend} />
        <Area
          type="linear"
          dataKey="Compounded"
          stroke="#00C113"
          dot={false}
          activeDot={true}
          fill="url(#color-success)"
          strokeWidth={2}
        />
        <Area
          type="linear"
          dataKey="nonCompounded"
          stroke="#1A48FF"
          dot={false}
          activeDot={true}
          fill="url(#color-blue)"
          strokeWidth={2}
          strokeOpacity={0.5}
        />
      </AreaChart>
    </ResponsiveContainer>
    // <ResponsiveContainer>
    //   <AreaChart
    //     width={500}
    //     height={400}
    //     data={data}
    //     margin={{
    //       top: 0,
    //       right: 0,
    //       bottom: 0,
    //       left: 0,
    //     }}
    //   >
    //     <defs>
    //       <linearGradient
    //         id="color-success"
    //         x1="0.4"
    //         y1="0.4"
    //         x2="0.7"
    //         y2="0.8"
    //       >
    //         <stop offset="5%" stopColor={"#00C113"} stopOpacity={0.25} />
    //         <stop offset="95%" stopColor={"#00C113"} stopOpacity={0} />
    //       </linearGradient>
    //       <linearGradient id="color-blue" x1="0.4" y1="0.4" x2="0.7" y2="0.8">
    //         <stop offset="5%" stopColor={"#1A48FF"} stopOpacity={0.2} />
    //         <stop offset="95%" stopColor={"#1A48FF"} stopOpacity={0} />
    //       </linearGradient>
    //     </defs>
    //     <XAxis dataKey="date" type="number" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Area
    //       type="linear"
    //       dataKey="nonCompounded"
    //       stroke="#8884d8"
    //       fill="url(#color-blue)"
    //       dot={false}
    //     />
    //     <Area
    //       type="linear"
    //       dataKey="nCompounded"
    //       stroke="#82ca9d"
    //       fill="url(#color-success)"
    //       dot={false}
    //     />
    //   </AreaChart>
    // </ResponsiveContainer>
  );
};
