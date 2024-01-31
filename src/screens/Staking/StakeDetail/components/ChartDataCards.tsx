import { IconSlice } from '@/components/icons/IconSlice';
import { UilChart, UilFire } from '@/icons';

const ChartDataCards = () => {
  return (
    <div className="flex gap-2 overflow-auto remove-scrollbar mt-2">
      <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 dark:bg-white/10">
        <span className="flex gap-2">
          <IconSlice className="h-4 w-4 text-blue-300 dark:text-white" />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Market Cap
          </p>
        </span>
        <p className="text-24 font-500 leading-7 text-blue-300 mt-10 dark:text-white">
          €217.35B
        </p>
      </div>
      <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 dark:bg-white/10">
        <span className="flex gap-2">
          <UilChart className="h-4 w-4 text-blue-300 dark:text-white" />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Daily Volume
          </p>
        </span>
        <p className="text-24 font-500 leading-7 text-blue-300 mt-10 dark:text-white">
          €20.49B
        </p>
      </div>
      <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 dark:bg-white/10">
        <span className="flex gap-2">
          <UilFire className="h-4 w-4 text-blue-300 dark:text-white" />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Inflation Rate
          </p>
        </span>
        <p className="text-24 font-500 leading-7 text-blue-300 mt-10 dark:text-white">
          0.47%
        </p>
      </div>
    </div>
  );
};

export default ChartDataCards;
