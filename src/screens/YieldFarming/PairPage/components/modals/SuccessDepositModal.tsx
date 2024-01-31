import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import { YIELD_CRYPTO_DEPOSIT_SUCCESS_MODAL } from '@/constants';
import { UilCheck } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SuccessDepositModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 2000);
  }, []);
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? YIELD_CRYPTO_DEPOSIT_SUCCESS_MODAL : '');
    setHandleModalState(false);
  };
  const handleButtonClick = () => {
    setHandleModal('');
    setHandleModalState(false);
  };
  return (
    <CustomModal
      open={modalOpen === YIELD_CRYPTO_DEPOSIT_SUCCESS_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[656px] p-5"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          {showSuccess && (
            <div className="w-10 h-10 bg-success-200 flex justify-center items-center rounded-full">
              <UilCheck className="text-white w-4 h-4" />
            </div>
          )}
          <span className="h-10 w-10 bg-primary text-white flex justify-center items-center rounded-full">
            <IconTimeCoinDeposit className=" h-4 w-4" />
          </span>
          <span>
            <p className="text-blue-300 text-12 font-500 leading-4 dark:text-white">
              Deposit Crypto
            </p>
          </span>
        </div>
      </div>
      {showSuccess ? (
        <div className="text-center mx-auto mt-6 sm:mt-8 flex flex-col">
          <span className="text-16 font-500 text-success-200 mb-6">
            All is done
          </span>
          <span className="text-24 font-500 text-blue-300 leading-[120%] dark:text-white">
            You deposited 10,000 USDT
          </span>
          <span className="text-center self-center text-16 text-blue-300/60 font-500 mt-2 leading-[120%] dark:text-white/60">
            You can see your crypto transactions <br /> in &nbsp;
            <Link
              href="/transactions"
              className="text-primary underline underline-offset-4"
            >
              Transactions History
            </Link>
          </span>
          <Button
            variant="secondary"
            className="mb-1 sm:mb-6 font-700 text-blue-300 mt-11 w-fit px-6 py-4 self-center leading-4 dark:text-white dark:bg-white/15"
            onClick={handleButtonClick}
          >
            OK
          </Button>
        </div>
      ) : (
        <div className="mx-auto text-center">
          <Image
            className=""
            src={'/images/svg/depositing-funds.svg'}
            width={293}
            height={218}
            alt="depositing-funds"
          />
          <div className="pb-12">
            <h3 className="text-24 font-500 text-blue-300 dark:text-white">
              Processing
            </h3>
            <p className="text-blue-300/60 font-500 text-16 dark:text-white/60">
              It might take a while
            </p>
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default SuccessDepositModal;
