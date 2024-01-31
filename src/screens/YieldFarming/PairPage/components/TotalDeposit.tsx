'use client';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import IconTimeCoinWithdraw from '@/components/icons/IconTimeCoinWithdraw';
import {
  YIELD_CRYPTO_DEPOSIT_MODAL,
  YIELD_CRYPTO_WITHDRAW_MODAL
} from '@/constants';
import { UilBoltAlt } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import dynamic from 'next/dynamic';
const CryptoWithdrawModal = dynamic(
  () => import('./modals/CryptoWithdrawModal')
);
const CryptoDepositModal = dynamic(() => import('./modals/CryptoDepositModal'));

const TotalDeposit = () => {
  const { setHandleModal } = useHandleModalAction;
  const { modalOpen } = useHandleModalStore();

  return (
    <>
      <div className="bg-white relative rounded-[24px] lg:h-[280px] sm:h-[136px] w-full md:w-auto h-[240px] dark:bg-white/10">
        <div className="pt-5 px-3 pb-2 lg:p-5 flex h-full lg:flex-col sm:flex-row flex-col  justify-between">
          <div className="ms-3 sm:flex sm:justify-between sm:flex-col ">
            <div className="flex gap-x-2">
              <UilBoltAlt className="w-4 h-4 flex" />
              <span className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
                Your Total Deposit
              </span>
            </div>
            <div className="block">
              <p className="text-40 font-500 md:leading-10 mt-4  text-blue-300 dark:text-white tracking-tighter break-all">
                €12,498,278.92
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:-mt-1">
            <div
              className="rounded-[24px] bg-gray-200 dark:bg-white/5 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer min-w-auto min-h-auto min-w-[156px] lg:min-w-full "
              onClick={() => {
                setHandleModal(YIELD_CRYPTO_DEPOSIT_MODAL);
              }}
            >
              <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                <IconTimeCoinDeposit className=" h-4 w-4 text-white" />
              </span>
              <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                Deposit
              </p>
            </div>
            <div
              className="rounded-[24px] bg-gray-200 dark:bg-white/5 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
              onClick={() => {
                setHandleModal(YIELD_CRYPTO_WITHDRAW_MODAL);
              }}
            >
              <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                <IconTimeCoinWithdraw className=" h-4 w-4 text-white" />
              </span>
              <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                Withdraw
              </p>
            </div>
          </div>
        </div>
      </div>
      {modalOpen === YIELD_CRYPTO_DEPOSIT_MODAL && <CryptoDepositModal />}
      {modalOpen === YIELD_CRYPTO_WITHDRAW_MODAL && <CryptoWithdrawModal />}
    </>
  );
};

export default TotalDeposit;
