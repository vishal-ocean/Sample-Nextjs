import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import { ASSETS_LISTING_ACTION_MODAL } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilTimes } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useCryptoStore } from '@/store/useCryptoStore';
import { cn } from '@/utils';
import Image from 'next/image';
import { useAssets } from './useAssets';

const AssetsActionsModal = ({ data }: any) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const { TRADE_DROPDOWN_ITEMS } = useAssets();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ASSETS_LISTING_ACTION_MODAL : '');
  };
  const { assetDetails } = useCryptoStore();

  return (
    <CustomModal
      className="p-6 w-full rounded-t-[32px] bottom-0 rounded-b-none max-w-[920px]"
      open={modalOpen === ASSETS_LISTING_ACTION_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3">
          <Image
            width={40}
            height={40}
            src={AssetImages[assetDetails?.shortName]}
            alt="image"
          />
          <div className="flex flex-col">
            <span className="text-blue-300 dark:text-white text-16 font-500 leading-5">
              {assetDetails?.shortName}
            </span>
            <span className="text-gray-300 dark:text-white/30 text-16 font-500 leading-5">
              {assetDetails?.name}
            </span>
          </div>
        </div>
        <div
          className="flex bg-secondary dark:bg-white/15 dark:text-white/30 disabled:text-gray-300 text-blue-300 rounded-full !p-0 w-7 h-7 items-center cursor-pointer"
          onClick={() => setHandleModal('')}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="mt-2 flex flex-col divide-y divide-gray-300/10">
        {TRADE_DROPDOWN_ITEMS.map((item, index) => (
          <div
            className={cn(
              'flex items-center py-4 gap-3 cursor-pointer last:pb-0 first:pt-0',
              item.isDisabled && 'opacity-50 pointer-events-none'
            )}
            key={`assetItem-${index}`}
            onClick={() => {
              setHandleModal(item.modal);
              setHandleModalState(item.modalState);
            }}
          >
            <Button
              variant="secondary"
              className="!p-0 h-7 w-7 flex justify-center items-center dark:bg-white/15"
            >
              {item.icon}
            </Button>
            <span className="text-14 text-blue-300 font-500 leading-4 dark:text-white">
              {item.name}
            </span>
          </div>
        ))}
        {/* <div className="flex justify-between">
          <span className="text-16 text-blue-300 font-500 leading-5">
            Transfer
          </span>
          <Button
            variant="secondary"
            className="!p-0 h-10 w-10 flex justify-center items-center"
            onClick={() => setHandleModal(TRANSFER_CRYPTO_MODAL)}
          >
            <IconTimeCoinDeposit strokeWidth={1.2} />
          </Button>
        </div> */}
      </div>
    </CustomModal>
  );
};

export default AssetsActionsModal;
