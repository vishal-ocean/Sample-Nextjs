import { IconSlice } from '@/components/icons/IconSlice';
import { UilBoltAlt, UilChart } from '@/icons';

const EmptyStateSection = () => {
  return (
    <div className="grid lg:col-span-3 col-span-full gap-2 row-span-1 grid-flow-col lg:grid-flow-row lg:overflow-visible overflow-scroll   remove-scrollbar lg:ml-3">
      <div className="bg-white p-5 rounded-[20px] flex flex-col  gap-8  justify-between dark:bg-white/5 min-w-[240px] w-full">
        <span className="flex gap-2">
          <IconSlice className="h-4 w-4 text-blue-300 dark:text-white" />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Staking Market Cap
          </p>
        </span>
        <p className="text-24 font-500 leading-7 text-blue-300 dark:text-white">
          €49.52B
        </p>
      </div>
      <div className="bg-white p-5 rounded-[20px] flex flex-col gap-8 justify-between dark:bg-white/5 min-w-[240px] w-full">
        <span className="flex gap-2">
          <UilChart className="h-4 w-4 text-blue-300 dark:text-white" />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Staking Ratio
          </p>
        </span>
        <p className="text-24 font-500 leading-7 text-blue-300 dark:text-white">
          22.68%
        </p>
      </div>
      {/* <div className="bg-gray-100 p-5 rounded-[20px] flex flex-col justify-between dark:bg-white/5">
        <span className="flex gap-2">
          <IconStar
            className="h-4 w-4 text-blue-300 dark:text-white"
            strokeWidth={0.8}
          />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Total Rewards Paid
          </p>
        </span>
        <p className="text-24 font-500 leading-7 text-blue-300 dark:text-white">
          €784.42M
        </p>
      </div> */}
      <div className="bg-white p-5 rounded-[20px] flex flex-col  gap-8  justify-between dark:bg-white/5 min-w-[240px] w-full">
        <span className="flex gap-2">
          <UilBoltAlt className="h-4 w-4 text-blue-300 dark:text-white" />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            APY
          </p>
        </span>
        <p className="text-24 font-500 leading-7 text-blue-300 dark:text-white">
          3.8%
        </p>
      </div>
    </div>
  );
};

export default EmptyStateSection;
