import CustomModal from '@/components/CustomModal';
import { RowImageStack } from '@/components/RowImageStack';
import { Button } from '@/components/UI/Button';
import {
  YIELD_CONFIRM_DEPOSIT_MODAL,
  YIELD_CRYPTO_DEPOSIT_MODAL,
  YIELD_CRYPTO_DEPOSIT_SUCCESS_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import Image from 'next/image';

const ConfirmDepositModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? YIELD_CONFIRM_DEPOSIT_MODAL : '');
  };

  return (
    <CustomModal
      open={modalOpen == YIELD_CONFIRM_DEPOSIT_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px]"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <Button
            variant="secondary"
            className="py-3 px-4 text-14 font-700 leading-4 dark:bg-white/15 dark:text-white"
            onClick={() => {
              setHandleModal(YIELD_CRYPTO_DEPOSIT_MODAL);
            }}
          >
            Go Back
          </Button>

          <Image
            width={40}
            height={40}
            src={AssetImages['USDT']}
            alt="image"
            className="h-10 w-10 bg-secondary rounded-full dark:bg-white/10"
          />
        </div>
      </div>
      <div className="sm:px-7 mt-6">
        <p className="text-12  text-gray-300 font-500 leading-4 text-center dark:text-white/30">
          Deposit
        </p>
        <p className="text-40 text-blue-300 tracking-[0.8px] font-500 text-center leading-10 mt-2 dark:text-white">
          10,000
          <span className="ml-2 text-gray-300 dark:text-white/30">USDT</span>
        </p>
        <div className="mt-10">
          <div className="flex justify-between">
            <p className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
              Yield Pairing
            </p>
            <span className="flex gap-x-2">
              <RowImageStack ImageData={['BTC', 'USDT', 'USDT', 'USDT']} />
              <p className="text-12 leading-4 font-500 text-blue-300 dark:text-white">
                BTC / USDT / USDCe / DAI
              </p>
            </span>
          </div>
          <hr className="my-3 border-secondary dark:border-white/15" />
          <div className="flex justify-between">
            <p className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
              Network
            </p>
            <span className="flex gap-x-2">
              <Image
                width={16}
                height={16}
                src={AssetImages['MATIC']}
                alt="image"
              />
              <p className="text-12 leading-4 font-500 text-blue-300 dark:text-white">
                Polygon
              </p>
            </span>
          </div>
          <hr className="my-3 border-secondary dark:border-white/15" />
          <div className="flex justify-between">
            <p className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
              Destination
            </p>
            <p className="text-12 leading-4 font-500 text-blue-300 dark:text-white">
              0x149b3c0114d2cba59d8827b0a17670724aa9e49a
            </p>
          </div>
          <hr className="my-3 border-secondary dark:border-white/15" />
          <div className="flex justify-between">
            <p className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
              Fee
            </p>
            <p className="text-12 leading-4 font-500 text-blue-300 dark:text-white">
              €0.00
            </p>
          </div>
          <hr className="my-3 border-secondary dark:border-white/15" />
          <div className="flex justify-between">
            <p className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
              Network Fee
            </p>
            <p className="text-12 leading-4 font-500 text-blue-300 dark:text-white">
              €0.00
            </p>
          </div>
          <Button
            className={cn(
              'bg-primary mb-1 mt-5 w-max sm:mb-7 leading-5 text-white font-700 flex justify-center mx-auto'
            )}
            type="submit"
            onClick={() => setHandleModal(YIELD_CRYPTO_DEPOSIT_SUCCESS_MODAL)}
          >
            Confirm Deposit
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmDepositModal;
