"use client";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { BUY_SWAP_SUCCESS_MODAL } from "@/constants";
import { UilCheck, UilPlus } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import { useEffect, useState } from "react";

const BuySuccessModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 5000);
  }, []);
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? BUY_SWAP_SUCCESS_MODAL : "");
    setHandleModalState(false);
  };
  const handleButtonClick = () => {
    setHandleModal("");
    setHandleModalState(false);
  };
  return (
    <CustomModal
      open={modalOpen === BUY_SWAP_SUCCESS_MODAL}
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
          <span className="bg-success-200 rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilPlus className="h-4 w-4 text-white" />
          </span>
          <span className="text-12 text-blue-300 font-500 leading-4">
            Buy Crypto
          </span>
        </div>
      </div>
      {showSuccess ? (
        <div className="text-center mx-auto mt-8 flex flex-col">
          <span className="text-16 font-500 text-success-200 mb-6">
            All is done
          </span>
          <span className="text-24 font-500 text-blue-300 leading-[120%]">
            You received 0.849950 BTC
          </span>
          <span className="w-[269px] text-center self-center text-16 text-blue-300/60 font-500 mt-2 leading-[120%]">
            You can see your crypto transactions in
            <strong className="text-blue-300">Transactions History</strong>
          </span>
          <Button
            variant="secondary"
            className="mb-1 sm:mb-7 font-700 text-blue-300 mt-11 w-fit px-6 py-4 self-center leading-5"
            onClick={handleButtonClick}
          >
            Awesome
          </Button>
        </div>
      ) : (
        <div className="mx-auto text-center">
          <Image
            className=""
            src={"/images/svg/depositing-funds.svg"}
            width={293}
            height={218}
            alt="depositing-funds"
          />
          <div className="pb-12">
            <h3 className="text-24 font-500 text-blue-300">Processing</h3>
            <p className="text-blue-300/60 font-500 text-16">
              It might take a while
            </p>
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default BuySuccessModal;
