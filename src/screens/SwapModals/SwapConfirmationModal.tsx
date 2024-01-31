import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import {
  SWAP_CONFIRMATION_MODAL,
  SWAP_CRYPTO_MODAL,
  SWAP_SUCCESS_MODAL,
} from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore, useCryptoStoreActions } from "@/store/useCryptoStore";
import Image from "next/image";

const SwapConfirmationModal = ({ swapMutation }: any) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { setGoBack } = useCryptoStoreActions;
  const { chainNetworkList, swapPreviewData } = useCryptoStore();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SWAP_CONFIRMATION_MODAL : "");
  };
  const handleConfirmSwap = () => {
    setHandleModal(SWAP_SUCCESS_MODAL);
    swapMutation.mutate({
      FromAssetId: chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.name === swapPreviewData?.fromToken)?.id,
      ToAssetId: chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.name === swapPreviewData?.toToken)?.id,
      Amount: swapPreviewData?.swapAmount,
      Slippage: 1,
    });
  };

  return (
    <CustomModal
      open={modalOpen === SWAP_CONFIRMATION_MODAL}
      onOpenChange={handleOpenChange}
      className="p-5 max-w-[520px]"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <Button
            variant="secondary"
            size="sm"
            className="leading-4 font-700 text-14 text-blue-300 dark:bg-white dark:bg-opacity-15 dark:text-white"
            onClick={() => {
              setHandleModal(SWAP_CRYPTO_MODAL);
              setGoBack(true);
            }}
          >
            Go Back
          </Button>
          {/* <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center"> */}
          <Image
            src={
              AssetImages[
                chainNetworkList
                  .flatMap((y: any) => y.assets)
                  .find((x) => x.name === swapPreviewData.toToken)?.shortName
              ] || ""
            }
            width={40}
            height={40}
            alt=""
          />
          {/* </div> */}
        </div>
      </div>
      <div className="sm:px-7">
        <div className="flex flex-col mt-[14px] sm:mt-6 gap-y-2 items-center">
          <p className=" text-12 font-500 text-gray-300 leading-4">Receive</p>
          <div className="flex gap-x-2">
            <h1 className="text-40 font-500 leading-10 text-blue-300 dark:text-white tracking-[-0.8px]">
              {Number(swapPreviewData?.exchangeAmount?.toFixed(6))}
            </h1>
            <span className="text-40 font-500 leading-10 text-gray-300 tracking-[-0.8px]">
              {
                chainNetworkList
                  .flatMap((y: any) => y.assets)
                  .find((x) => x.name === swapPreviewData.toToken)?.shortName
              }
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <span className="text-12 text-gray-300 font-500 leading-4">
            Pay With
          </span>
          <div className="flex gap-x-1">
            <Image
              src={
                AssetImages[
                  chainNetworkList
                    .flatMap((y: any) => y.assets)
                    .find((x) => x.name === swapPreviewData.fromToken)
                    ?.shortName
                ] || ""
              }
              width={16}
              height={16}
              alt=""
            />
            <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
              {swapPreviewData?.swapAmount}
            </span>
            <span className="text-12 font-500 text-gray-300 leading-4">
              {
                chainNetworkList
                  .flatMap((y: any) => y.assets)
                  .find((x) => x.name === swapPreviewData.fromToken)?.shortName
              }
            </span>
          </div>
        </div>
        <hr className="my-3 border-1 border-secondary dark:border-white/15" />
        <div className="flex justify-between">
          <span className="text-12 text-gray-300 font-500 leading-4">
            Exchange Rate
          </span>

          <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
            {swapPreviewData?.swapAmount}{" "}
            {
              chainNetworkList
                .flatMap((y: any) => y.assets)
                .find((x) => x.name === swapPreviewData.fromToken)?.shortName
            }{" "}
            = {swapPreviewData?.exchangeAmount}{" "}
            {
              chainNetworkList
                .flatMap((y: any) => y.assets)
                .find((x) => x.name === swapPreviewData.toToken)?.shortName
            }
          </span>
        </div>
        <hr className="my-3 border-1 border-secondary dark:border-white/15" />
        <div className="flex justify-between">
          <span className="text-12 text-gray-300 font-500 leading-4">
            Network Fee
          </span>

          <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
            €{swapPreviewData?.totalFeeFiat}
          </span>
        </div>
        <hr className="my-3 border-1 border-secondary dark:border-white/15" />
        {/* <div className="flex justify-between">
          <span className="text-12 text-gray-300 font-500 leading-4">
            Operation Time
          </span>

          <span className="text-12 font-500 text-blue-300 leading-4">
            Instantly
          </span>
        </div>
        <hr className="my-3 border-1 border-secondary dark:border-white/15" />
        <div className="flex justify-between">
          <div className="flex gap-x-1">
            <span className="text-12 text-gray-300 font-500 leading-4">
              Cashback included (0.50%)
            </span>
            <span className="flex justify-center items-center bg-secondary h-4 w-4 rounded-full">
              <UilQuestion className="h-4 w-4 fill-white" />
            </span>
          </div>
          <span className="text-12 font-500 text-success-200 leading-4">
            BTC 0.00001897
          </span>
        </div> */}

        <div className="flex justify-center">
          <Button
            className="leading-5 font-700 mt-6 sm:mt-10 w-max mb-1 sm:mb-6 self-center"
            onClick={handleConfirmSwap}
          >
            Confirm Exchange
          </Button>
        </div>

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
  );
};

export default SwapConfirmationModal;
