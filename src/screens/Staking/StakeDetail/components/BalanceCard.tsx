import { IconBolt } from '@/components/icons/IconBolt';
import IconEthereum from '@/components/icons/IconEthereum';
import { IconSlice } from '@/components/icons/IconSlice';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import IconTimeCoinWithdraw from '@/components/icons/IconTimeCoinWithdraw';
import { UilChart, UilClock, UilMoonEclipse, UilSun } from '@/icons';
import { cn } from '@/utils';

export const BalanceCard = ({ emptyState }: { emptyState: boolean }) => {
  return (
    <>
      <div className="col-span-full lg:col-span-3 row-start-1 row-span-1 lg:col-start-10 bg-white rounded-[20px] md:px-5 lg:px-2 px-2 pt-5  pb-2 h-max dark:bg-white/10 lg:ml-3">
        <span className="flex gap-2 px-3">
          <IconEthereum
            className="h-4 w-4 text-blue-300 dark:text-white"
            strokeWidth={1.2}
          />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Your Total Staked Balance
          </p>
        </span>
        <p
          className={cn(
            'px-3 text-40 lg:text-28 xl:text-40 leading-10 font-500 text-blue-300 tracking-[-0.8px] mt-4 dark:text-white',
            emptyState ? 'mb-10' : 'mb-9'
          )}
        >
          {emptyState ? '€0.00' : '€12,498,278.92'}
        </p>

        {!emptyState && (
          <div className="px-3 sm:mb-2.5 mb-10">
            <div className="flex justify-between">
              <span className="flex gap-2">
                <UilSun className="h-4 w-4 text-blue-300 dark:text-white" />
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  Daily Rewards
                </p>
              </span>
              <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                €274.57
              </p>
            </div>
            <hr className="my-3 border-secondary dark:border-white/15" />
            <div className="flex justify-between">
              <span className="flex gap-2">
                <UilMoonEclipse className="h-4 w-4 text-blue-300 dark:text-white" />
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  Daily Rewards
                </p>
              </span>
              <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                €274.57
              </p>
            </div>
            <hr className="my-3 border-secondary dark:border-white/15" />
            <div className="flex justify-between">
              <span className="flex gap-2">
                <UilClock className="h-4 w-4 text-blue-300 dark:text-white" />
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  Daily Rewards
                </p>
              </span>
              <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                €274.57
              </p>
            </div>
          </div>
        )}

        <div className=" grid grid-cols-2 gap-2">
          <div className="py-5 px-3 rounded-[24px] bg-gray-100 flex flex-col items-center dark:bg-white/5">
            <span className="flex justify-center items-center h-10 w-10 bg-primary rounded-full">
              <IconTimeCoinDeposit
                className="text-white h-4 w-4"
                strokeWidth={1.2}
              />
            </span>
            <p className="mt-3 text-14 font-700 leading-4 text-blue-300 dark:text-white">
              Stake
            </p>
          </div>
          <div className="py-5 px-3 rounded-[24px] bg-gray-100 flex flex-col items-center dark:bg-white/5">
            <span className="flex justify-center items-center h-10 w-10 bg-primary rounded-full">
              <IconTimeCoinWithdraw
                className="text-white h-4 w-4"
                strokeWidth={1.2}
              />
            </span>
            <p className="mt-3 text-14 font-700 leading-4 text-blue-300 dark:text-white">
              Withdraw
            </p>
          </div>
        </div>
      </div>
      {!emptyState && (
        <div className="flex lg:flex-col gap-2 overflow-auto remove-scrollbar col-span-full lg:col-span-3 row-span-1 row-start-2 lg:col-start-10 lg:ml-3">
          <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 lg:w-full dark:bg-white/10 ">
            <span className="flex gap-2">
              <IconSlice className="h-4 w-4 text-blue-300 dark:text-white" />
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Staking Market Cap
              </p>
            </span>
            <p className="text-24 font-500 leading-7 text-blue-300 mt-8 dark:text-white">
              €49.52B
            </p>
          </div>
          <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 lg:w-full dark:bg-white/10">
            <span className="flex gap-2">
              <UilChart className="h-4 w-4 text-blue-300 dark:text-white" />
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Staking Ratio
              </p>
            </span>
            <p className="text-24 font-500 leading-7 text-blue-300 mt-8 dark:text-white">
              56
            </p>
          </div>
          <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 lg:w-full dark:bg-white/10">
            <span className="flex gap-2">
              <IconBolt className="h-4 w-4 text-blue-300 dark:text-white" />
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                APY
              </p>
            </span>
            <p className="text-24 font-500 leading-7 text-blue-300 mt-8 dark:text-white">
              3.8%
            </p>
          </div>
        </div>
      )}
    </>
  );
};
