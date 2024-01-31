import { IconStar } from '@/components/icons/IconStar';
import { STAKING_REWARDS_MODAL } from '@/constants';
import { useHandleModalAction } from '@/store/handleModal';
import { cn } from '@/utils';
import Image from 'next/image';

export const RewardsListing = ({ emptyState }: { emptyState: boolean }) => {
  const { setHandleModal } = useHandleModalAction;

  return (
    <div
      className={cn(
        'p-5 rounded-[20px] bg-white h-max lg:col-span-3 col-span-full  dark:bg-white/10 row-start-7 lg:row-start-5 lg:col-start-10 sm:mt-0 mt-1 lg:ml-3',
        emptyState &&
          'lg:mt-9 lg:row-span-3 row-span-1  lg:row-start-5  row-start-7 mt-0'
      )}
    >
      <div className="flex justify-between">
        <span className="flex gap-2 items-center">
          <IconStar className="h-6 w-6 text-blue-300 dark:text-white" />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            ETH Staking Rewards
          </p>
        </span>
        <Image src={'/images/svg/icon-ETH.svg'} height={24} width={24} alt="" />
      </div>
      {!emptyState && (
        <p className="text-24 font-500 leading-7 text-blue-300 mt-4 dark:text-white">
          €15,550.00
        </p>
      )}
      {!emptyState ? (
        <>
          <div className="mt-10 flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-16 leading-5 font-700 text-success-200">
                  + €50
                </p>
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 whitespace-nowrap">
                  0.00000046 ETH
                </p>
              </div>
              <div>
                <p className="text-12 font-500 leading-4 text-gray-300 w-4/5 ml-auto text-end dark:text-white/30 ">
                  Aug 25 2023 1:30 PM
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-16 leading-5 font-700 text-success-200">
                  + €200
                </p>
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 whitespace-nowrap">
                  0.00000046 ETH
                </p>
              </div>
              <div>
                <p className="text-12 font-500 leading-4 text-gray-300 w-4/5 ml-auto text-end dark:text-white/30 ">
                  Aug 25 2023 1:30 PM
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-16 leading-5 font-700 text-success-200">
                  + €15,550
                </p>
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 whitespace-nowrap">
                  0.00000046 ETH
                </p>
              </div>
              <div>
                <p className="text-12 font-500 leading-4 text-gray-300 w-4/5 ml-auto text-end dark:text-white/30 ">
                  Aug 25 2023 1:30 PM
                </p>
              </div>
            </div>
          </div>
          <div
            className="py-4 px-6 w-full text-center text-16 font-700 leading-5 bg-secondary text-blue-300 rounded-full mt-6 cursor-pointer dark:text-white dark:bg-white/15"
            onClick={() => setHandleModal(STAKING_REWARDS_MODAL)}
          >
            All Rewards
          </div>
        </>
      ) : (
        <div className="mt-10 mb-5 flex flex-col items-center">
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-gray-600 dark:border-gray-800">
              <IconStar className="w-4 h-4 mx-auto text-gray-300 dark:text-gray-800" />
            </div>
          </div>
          <p className="text-16 font-500 leading-5 text-gray-300 text-center mt-4 w-9/12 dark:text-white/30">
            You will see your Ethereum stake rewards here
          </p>
        </div>
      )}
    </div>
  );
};
