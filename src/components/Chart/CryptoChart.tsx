import { readableNumber } from '@/helper/readableNumber';
import { useCryptoStore } from '@/store/useCryptoStore';
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
      name: string;
      uv: 0;
      pv: 0;
      amt: 0;
    };
  }>;
}
const CustomTooltip = ({ active, payload, label, isTokenChart }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-300 rounded-[10px] py-2 px-3">
        <p className="text-[11px] font-500 leading-4 text-gray-300">
          {/* 2022-05-06 6:30:00 UTC */}
          {moment(payload[0].payload.timestamp)?.format(
            'YYYY-MM-DD h:mm:ss A UTC'
          )}
        </p>
        <p className="text-[11px] font-500 text-white leading-4">{`€${readableNumber(
          isTokenChart
            ? Number(payload[0].payload?.price?.toFixed(2))
            : Number(payload[0].payload?.balanceFiat?.toFixed(2))
        )}`}</p>
      </div>
    );
  }

  return null;
};

const CryptoChart = ({ chartData, interval, isTokenChart }: any) => {
  const { totalAssetsData } = useCryptoStore();
  const { theme } = useTheme();

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
      uv: totalAssetsData?.balances?.[0]?.balanceFiat,
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
          {/* <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#000AFF" stopOpacity={0.309} />
            <stop offset="95%" stopColor="#000AFF" stopOpacity={0} />
          </linearGradient> */}
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
          {/* <linearGradient
            id="colorUv3"
            x1="589.474"
            y1="-53.8593"
            x2="-121.576"
            y2="95.5136"
            className=""
          >
            <stop
              offset="0.705668"
              stopColor="#4249FA"
              stopOpacity={0.509715}
            />
          </linearGradient> */}
        </defs>
        <CartesianGrid
          fillOpacity={0.2}
          vertical={false}
          horizontal
          stroke={`${theme === 'light' ? '#E3E6E9' : '#FFFFFF26'}`}
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
          tickLine={false}
          interval={Math.ceil(chartData?.length / interval)}
        />
        <YAxis
          tickFormatter={(value) => `€${readableNumber(value.toFixed(0))}`}
          tick={{
            fill: `${theme === 'light' ? '#8A94A1' : '#FFFFFF4D'}`,
            fontSize: '12px'
          }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip isTokenChart={isTokenChart} />} />

        <Area
          type="monotone"
          dataKey={isTokenChart ? 'price' : 'balanceFiat'}
          stroke="url(#colorUv1)"
          fill="url(#colorUv)"
          strokeWidth={2}
        />
        {/* <Area
          type="monotone"
          dataKey={isTokenChart ? "price" : "balanceFiat"}
          stroke="url(#colorUv3)"
          fill="url(#colorUv2)"
          strokeWidth={2}
          className="hidden dark:block"
        /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CryptoChart;
