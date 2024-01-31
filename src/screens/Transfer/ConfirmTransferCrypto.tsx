// import { UilExclamationTriangle,UilRedo } from "@/icons";
import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import {
  CONFIRM_TRANSFER_CRYPTO_MODAL,
  TRANSFER_CRYPTO_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { WithdrawData } from '@/services/useCrypto';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useCryptoStore, useCryptoStoreActions } from '@/store/useCryptoStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { UseMutationResult } from '@tanstack/react-query';
import Image from 'next/image';

type ConfirmTransferCryptoProps = {
  withDrawMutation: UseMutationResult<any, unknown, WithdrawData, unknown>;
};
const ConfirmTransferCrypto = ({
  withDrawMutation
}: ConfirmTransferCryptoProps) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CONFIRM_TRANSFER_CRYPTO_MODAL : '');
  };
  const { chainNetworkList, transferDetails } = useCryptoStore();
  const { transactionEstimate } = useTransactionStore();
  const { setTransferDetails } = useCryptoStoreActions;
  return (
    <>
      <CustomModal
        open={modalOpen == CONFIRM_TRANSFER_CRYPTO_MODAL}
        onOpenChange={handleOpenChange}
        className="max-w-[520px]"
      >
        <div className="flex justify-between">
          <div className="flex gap-x-2 items-center">
            <Button
              variant="secondary"
              className="py-3 px-4 text-14 font-700 leading-4 dark:bg-white dark:bg-opacity-15 dark:text-white"
              onClick={() => {
                setHandleModal(TRANSFER_CRYPTO_MODAL);

                setTimeout(() => {
                  setTransferDetails({});
                }, 2000);
              }}
            >
              Go Back
            </Button>

            <Image
              width={40}
              height={40}
              src={
                AssetImages[
                  chainNetworkList
                    .flatMap((y: any) => y.assets)
                    .find((x) => x.name === transferDetails.selectedAsset)
                    ?.shortName
                ] || ''
              }
              alt="image"
              className="h-10 w-10 bg-secondary rounded-full"
            />
          </div>
        </div>
        <div className="sm:px-7 mt-6">
          <p className="text-12  text-gray-300 font-500 leading-4 text-center">
            Withdraw
          </p>
          <p className="text-40 text-blue-300 dark:text-white tracking-[0.8px] font-500 text-center leading-10 mt-2">
            {Number(transferDetails.amountToSend.toFixed(6))}
            <span className="ml-2 text-gray-300">
              {
                chainNetworkList
                  .flatMap((y: any) => y.assets)
                  .find((x) => x.name === transferDetails.selectedAsset)
                  ?.shortName
              }
            </span>
          </p>
          <div className="mt-10">
            <div className="flex justify-between">
              <p className="text-12 leading-4 font-500 text-gray-300">
                Network
              </p>
              <span className="flex gap-x-2">
                <Image
                  width={16}
                  height={16}
                  src={
                    AssetImages[
                      chainNetworkList.find(
                        (x) => x.name === transferDetails.selectedNetwork
                      ).shortName
                    ] || ''
                  }
                  alt="image"
                />
                <p className="text-12 leading-4 font-500 text-blue-300 dark:text-white">
                  {
                    chainNetworkList.find(
                      (x) => x.name === transferDetails.selectedNetwork
                    )?.name
                  }
                </p>
              </span>
            </div>
            <hr className="my-3 border-secondary dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 leading-4 font-500 text-gray-300">
                Destination
              </p>

              <p className="text-12 leading-4 font-500 text-blue-300 dark:text-white">
                {transferDetails.destinationAddress}
              </p>
            </div>
            <hr className="my-3 border-secondary dark:border-white/15" />
            {/* <div className="flex justify-between">
              <p className="text-12 leading-4 font-500 text-gray-300">Fee</p>

              <p className="text-12 leading-4 font-500 text-blue-300">€0.00</p>
            </div>
            <hr className="my-3 border-secondary dark:border-white/15" /> */}
            <div className="flex justify-between">
              <p className="text-12 leading-4 font-500 text-gray-300">
                Network Fee
              </p>

              <p className="text-12 leading-4 font-500 text-blue-300 dark:text-white">
                {transactionEstimate?.high?.networkFee}{' '}
                {
                  chainNetworkList
                    .flatMap((y: any) => y.assets)
                    .find((x) => x.name === transferDetails.selectedAsset)
                    ?.shortName
                }
              </p>
            </div>
          </div>

          <Button
            className="leading-5 font-700 mt-6 sm:mt-10 mx-auto w-max mb-1 sm:mb-5 flex justify-center"
            onClick={() => {
              withDrawMutation.mutate({
                destinationAddress: transferDetails.destinationAddress,
                amountToSend: transferDetails.amountToSend,
                assetId: transferDetails.assetsId
              });
            }}
            disabled={withDrawMutation.isLoading}
          >
            {withDrawMutation.isLoading ? 'Loading...' : 'Confirm and Withdraw'}
          </Button>

          {/* --------This is Error Message Code--------- */}

          {/* <div className="flex gap-x-2">
            <Button
              variant="secondary"
              className="leading-5 font-700 flex gap-x-2"
            >
              <UilRedo className="text-blue-300 w-4 h-4" /> Try Again
            </Button>
            <div className="flex gap-x-2 items-center">
              <p className="bg-danger-100 w-10 h-10 flex justify-center items-center rounded-3xl">
                <UilExclamationTriangle className="text-white font-700" />
              </p>
              <span className="font-500 text-12 text-pink-100">
                Something went wrong
              </span>
            </div>
          </div> */}
        </div>
      </CustomModal>
    </>
  );
};

export default ConfirmTransferCrypto;
