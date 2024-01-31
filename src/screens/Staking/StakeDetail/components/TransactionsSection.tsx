import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import IconTimeCoinWithdraw from '@/components/icons/IconTimeCoinWithdraw';
import IconTransaction from '@/components/icons/IconTransaction';
import { STAKING_TRANSACTIONS_MODAL } from '@/constants';
import { UilPlus } from '@/icons';
import { useHandleModalAction } from '@/store/handleModal';
import { cn } from '@/utils';

export const TransactionsSection = ({
  emptyState
}: {
  emptyState: boolean;
}) => {
  const { setHandleModal } = useHandleModalAction;

  return (
    <>
      <div
        className={cn(
          'lg:col-span-3 col-span-full bg-white rounded-[24px] py-6 px-5 h-max dark:bg-white/10 lg:row-start-3  row-start-5 lg:col-start-10 row-span-2 lg:ml-3 sm:mt-3 mt-1',
          emptyState
            ? 'lg:row-span-3 lg:row-start-3 row-start-6 row-span-1'
            : ' row-span-2'
        )}
      >
        <span className="flex items-center gap-2">
          <IconTransaction
            className="h-6 w-6 text-blue-300 dark:text-white"
            strokeWidth={0.2}
          />
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Transactions
          </p>
        </span>
        {!emptyState ? (
          <>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <span className="flex justify-center items-center h-10 w-10 bg-secondary rounded-full dark:bg-white/15">
                    <IconTimeCoinDeposit
                      className="text-blue-300 h-4 w-4 dark:text-white"
                      strokeWidth={1.2}
                    />
                  </span>
                  <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                    Stake
                  </p>
                </div>
                <div>
                  <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white text-end">
                    €27,461.21
                  </p>
                  <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 text-end">
                    0.97 BTC
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <span className="flex justify-center items-center h-10 w-10 bg-secondary rounded-full dark:bg-white/15">
                    <IconTimeCoinDeposit
                      className="text-blue-300 h-4 w-4 dark:text-white"
                      strokeWidth={1.2}
                    />
                  </span>
                  <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                    Stake
                  </p>
                </div>
                <div>
                  <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white text-end">
                    €27,461.21
                  </p>
                  <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 text-end">
                    0.97 BTC
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <span className="flex justify-center items-center h-10 w-10 bg-secondary rounded-full dark:bg-white/15">
                    <IconTimeCoinWithdraw
                      className="text-blue-300 h-4 w-4 dark:text-white"
                      strokeWidth={1.2}
                    />
                  </span>
                  <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                    Withdraw
                  </p>
                </div>
                <div>
                  <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white text-end">
                    €27,461.21
                  </p>
                  <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 text-end">
                    0.97 BTC
                  </p>
                </div>
              </div>
            </div>
            <div
              className="py-4 px-6 w-full text-center text-16 font-700 leading-5 bg-secondary dark:bg-white/15 text-blue-300 rounded-full mt-6 cursor-pointer dark:text-white"
              onClick={() => setHandleModal(STAKING_TRANSACTIONS_MODAL)}
            >
              All Transactions
            </div>
          </>
        ) : (
          <div className="mt-10 mb-3 flex flex-col items-center">
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
              <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
              <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-gray-600 dark:border-gray-800">
                <UilPlus className="w-4 h-4 mx-auto text-gray-300 dark:text-gray-800" />
              </div>
            </div>
            <p className="text-16 font-500 leading-5 text-gray-300 text-center mt-4 dark:text-white/30">
              You haven’t <br /> staked Ethereum yet
            </p>
          </div>
        )}
      </div>
    </>
  );
};
