"use client";
import { Button } from "@/components/UI/Button";
import { UilCheck } from "@/icons";
import { useEffect } from "react";

import CustomModal from "@/components/CustomModal";
import ProcessingLoader from "@/components/Loaders/ProcessingLoader";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { IconSwap } from "@/components/icons/IconSwap";
import { SWAP_CRYPTO_MODAL, SWAP_SUCCESS_MODAL } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore, useCryptoStoreActions } from "@/store/useCryptoStore";
import Link from "next/link";
import { toast } from "react-toastify";

const SwapSuccessModal = ({ swapMutation }: any) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { setGoBack } = useCryptoStoreActions;

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SWAP_SUCCESS_MODAL : "");
  };
  const handleButtonClick = () => {
    setHandleModal("");
  };
  const { chainNetworkList, swapPreviewData } = useCryptoStore();
  useEffect(() => {
    if (!swapMutation?.isLoading && !swapMutation?.data?.id) {
      setHandleModal(SWAP_CRYPTO_MODAL);
      toast.error(
        <CustomToastMessage
          message="Something went wrong."
          subText="Please Try again."
        />,
        {
          toastId: "error",
        }
      );
      setGoBack(true);
    }
  }, [swapMutation]);
  return (
    <CustomModal
      open={modalOpen === SWAP_SUCCESS_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[656px] p-5"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          {!swapMutation.isLoading && (
            <div className="w-10 h-10 bg-success-200 flex justify-center items-center rounded-full">
              <UilCheck className="text-white w-4 h-4" />
            </div>
          )}
          <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
            <IconSwap className="h-4 w-4 text-white" />
          </span>
          <span className="text-12 text-blue-300 dark:text-white font-500 leading-4">
            Swap Crypto
          </span>
        </div>
      </div>
      {!swapMutation.isLoading ? (
        <div className="text-center mx-auto mt-6 sm:mt-8 flex flex-col">
          <span className="text-16 font-500 text-success-200 mb-6">
            Successfully transferred!
          </span>
          <span className="text-24 font-500 text-blue-300 leading-[120%] dark:text-white">
            You received {Number(swapPreviewData?.exchangeAmount?.toFixed(6))}{" "}
            {
              chainNetworkList
                .flatMap((y: any) => y.assets)
                .find((x) => x.name === swapPreviewData.toToken)?.shortName
            }
          </span>
          <span className="w-[269px] text-center self-center text-16 text-blue-300/60 font-500 mt-2 dark:text-white/60 leading-[120%]">
            You can see the transaction in&nbsp;
            <Link href="/transactions" onClick={() => setHandleModal("")}>
              <strong className="text-blue-300 dark:text-white">
                Transactions History
              </strong>
            </Link>
          </span>
          <Button
            variant="secondary"
            className="mb-1 sm:mb-6 font-700 text-blue-300 mt-11 w-fit px-6 py-4 self-center leading-4 dark:bg-white dark:bg-opacity-15 dark:text-white"
            onClick={handleButtonClick}
          >
            Awesome
          </Button>
        </div>
      ) : (
        <div className="mx-auto text-center">
          <div className="my-10">
            <h3 className="text-24 font-500 text-blue-300 dark:text-white">
              Processing
            </h3>
            <p className="text-blue-300/60 dark:text-white/60 font-500 text-16">
              It might take a while
            </p>
          </div>
          <div className="mb-10">
            <ProcessingLoader />
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default SwapSuccessModal;
