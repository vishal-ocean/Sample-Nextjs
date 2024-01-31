import { IconMagicWand } from '@/components/icons/IconMagicWand';

export const RewardsCalculatorSection = ({ emptyState }: any) => {
  return (
    <div className="p-5 sm:p-8 sm:pb-9 pb-6 col-span-full lg:col-span-5 bg-white rounded-[20px] dark:bg-white/10 row-span-4 sm:mt-3 mt-1">
      <span className="flex gap-3 items-center">
        <IconMagicWand className="h-6 w-6 text-blue-300 dark:text-white" />
        <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white">
          Rewards Calculator
        </p>
      </span>
      <p className="text-12 font-500 leading-4 text-gray-300 sm:mt-10 mt-5 dark:text-white/30">
        Enter Staking Amount
      </p>
      <div className="sm:block flex items-baseline">
        <div className="flex flex-col w-full">
          {' '}
          <p className="sm:mt-5 mt-2 sm:text-40 text-24 leading-7 font-500 sm:leading-10 tracking-[-0.8px]">
            €5,000
          </p>
          <hr className="my-2 sm:my-5 border-secondary dark:border-white/15" />
        </div>
        <p className="sm:text-16 text-12 font-500 sm:leading-5 leading-4 text-gray-300 whitespace-nowrap">
          2.79417 ETH
        </p>
      </div>
      <div className="grid sm:grid-cols-3 sm:gap-2 mt-5 sm:mt-10">
        <div className="flex sm:flex-col gap-5 sm:p-5 sm:bg-gray-100 rounded-xl dark:bg-white/5 justify-between ">
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Weekly Earning
          </p>
          <p className="text-16 font-700 leading-5 text-success-200">€3.44</p>
        </div>
        <hr className="my-3 border-secondary dark:border-white/15 sm:hidden" />

        <div className="flex sm:flex-col gap-5 sm:p-5 sm:bg-gray-100 rounded-xl dark:bg-white/5 justify-between">
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Monthly Earnings
          </p>
          <p className="text-16 font-700 leading-5 text-success-200">€14.75</p>
        </div>
        <hr className="my-3 border-secondary dark:border-white/15 sm:hidden" />

        <div className="flex sm:flex-col gap-5 sm:p-5 sm:bg-gray-100 rounded-xl dark:bg-white/5 justify-between">
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Yearly Earnings
          </p>
          <p className="text-16 font-700 leading-5 text-success-200">€179.49</p>
        </div>
      </div>
    </div>
  );
};
