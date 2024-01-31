import { readableNumber } from '@/helper/readableNumber';
import { useUser } from '@auth0/nextjs-auth0/client';
import moment from 'moment';
import { useTheme } from 'next-themes';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{
    payload: {
      timestamp: string;
      amount: number;
    };
  }>;
}
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-300 rounded-[10px] py-2 px-3">
        <p className="text-[11px] font-500 leading-4 text-gray-300">
          {/* 2022-05-06 6:30:00 UTC */}
          {moment(payload[0].payload?.timestamp)?.format(
            'YYYY-MM-DD h:mm:ss A UTC'
          )}{' '}
        </p>
        <p className="text-[11px] font-500 text-white leading-4">{`€${readableNumber(
          Number(payload[0].payload?.amount) / 100 || 0
        )}`}</p>
      </div>
    );
  }

  return null;
};
const NeoBankingChart = ({ chartData, interval }: any) => {
  const { theme } = useTheme();

  const { user } = useUser();
  const data = [
    { name: 'Feb 23', uv: 0, pv: 0, amt: 0 },
    { name: 'March 23', uv: 0, pv: 0, amt: 0 }, // Example value
    { name: 'April 23', uv: 0, pv: 0, amt: 0 }, // Example value
    { name: 'May 23', uv: 0, pv: 0, amt: 0 }, // Example value
    { name: 'June 23', uv: 0, pv: 0, amt: 0 }, // Example value
    { name: 'July 23', uv: 0, pv: 0, amt: 0 }, // Example value
    { name: 'Aug 23', uv: 0, pv: 0, amt: 0 }, // Example value
    { name: 'Sept 23', uv: 0, pv: 0, amt: 0 }, // Example value
    {
      name: 'Oct 23',
      uv: 0,
      pv: 0,
      amt: 0
    } // Example value
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme === 'light' ? '#1A48FF' : '#000AFF'}
              stopOpacity={theme === 'light' ? 0.209 : 0.339}
            />
            <stop
              offset="95%"
              stopColor={theme === 'light' ? '#1A48FF' : '#000AFF'}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id="colorUv1"
            x1="589.474"
            y1="-53.8593"
            x2="-121.576"
            y2="95.5136"
          >
            <stop
              offset="0.705668"
              stopColor={theme === 'light' ? '#1A48FF' : '#4249FA'}
              stopOpacity={0.509715}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          fillOpacity={0.2}
          vertical={false}
          horizontal
          stroke={`${theme === 'light' ? '#E3E6E9' : '#FFFFFF26'}`}
          strokeWidth={0.25}
        />
        <XAxis
          dataKey="timestamp"
          axisLine={false}
          tickFormatter={(value) =>
            interval === 30
              ? moment(value).format('Do MMM')
              : moment(value).format('MMM YY')
          }
          tick={{
            fill: `${theme === 'light' ? '#8A94A1' : '#FFFFFF4D'}`,
            fontSize: '12px'
          }}
          interval={Math.ceil(chartData?.length / interval)}
        />
        <YAxis
          tickFormatter={(value) => `€${readableNumber(value / 100)}`}
          tick={{
            fill: `${theme === 'light' ? '#8A94A1' : '#FFFFFF4D'}`,
            fontSize: '12px'
          }}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="url(#colorUv1)"
          fill="url(#colorUv)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NeoBankingChart;
