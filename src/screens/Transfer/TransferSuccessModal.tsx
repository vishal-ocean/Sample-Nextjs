"use client";
import CustomModal from "@/components/CustomModal";
import ProcessingLoader from "@/components/Loaders/ProcessingLoader";
import { Button } from "@/components/UI/Button";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import { TRANSFER_SWAP_SUCCESS_MODAL } from "@/constants";
import { UilCheck } from "@/icons";
import { WithdrawData } from "@/services/useCrypto";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore } from "@/store/useCryptoStore";
import { UseMutationResult } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

type TransferSuccessModalProps = {
  withDrawMutation: UseMutationResult<any, unknown, WithdrawData, unknown>;
};
const TransferSuccessModal = ({
  withDrawMutation,
}: TransferSuccessModalProps) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [isLoading, setIsLoading] = useState(true);
  const { chainNetworkList, transferDetails } = useCryptoStore();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? TRANSFER_SWAP_SUCCESS_MODAL : "");
  };
  const handleButtonClick = () => {
    setHandleModal("");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  });

  return (
    <CustomModal
      open={modalOpen === TRANSFER_SWAP_SUCCESS_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[656px] p-5"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          {!isLoading && (
            <div className="w-10 h-10 bg-success-200 flex justify-center items-center rounded-full">
              <UilCheck className="text-white w-4 h-4" />
            </div>
          )}
          <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
            <IconTimeCoinWithdraw
              strokeWidth={1.2}
              className="h-4 w-4 text-white"
            />
          </span>
          <p className="text-12 text-blue-300 dark:text-white font-500 leading-4">
            Send Crypto
          </p>
        </div>
      </div>
      {!isLoading ? (
        <div className="text-center mx-auto mt-8 flex flex-col">
          <span className="text-16 font-500 text-success-200 mb-6 leading-5 ">
            Successfully transferred!
          </span>
          <span className="text-24 font-500 text-blue-300 dark:text-white leading-[120%]">
            You Sent {transferDetails.amountToSend}{" "}
            {
              chainNetworkList
                .flatMap((y: any) => y.assets)
                .find((x) => x.name === transferDetails.selectedAsset)
                ?.shortName
            }
          </span>
          <span className="w-[269px] text-center self-center text-16 text-blue-300/60 dark:text-white/60 font-500 mt-2 leading-[120%]">
            You can see the transaction in&nbsp;
            <Link href="/transactions" onClick={() => setHandleModal("")}>
              <strong className="text-blue-300 dark:text-white">
                Transactions History
              </strong>
            </Link>
          </span>
          <Button
            variant="secondary"
            className="mb-1 sm:mb-7 font-700 text-blue-300 mt-11 w-fit px-6 py-4 self-center leading-5 dark:bg-white dark:bg-opacity-15 dark:text-white"
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

export default TransferSuccessModal;
