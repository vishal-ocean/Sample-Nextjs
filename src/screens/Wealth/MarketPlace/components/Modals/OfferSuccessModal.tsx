"use client";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { OFFER_SUCCESS_MODAL } from "@/constants";
import { UilCheck } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import { useEffect, useState } from "react";

const OfferSuccessModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 5000);
  }, []);
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? OFFER_SUCCESS_MODAL : "");
  };
  const handleButtonClick = () => {
    setHandleModal("");
  };
  return (
    <CustomModal
      open={modalOpen === OFFER_SUCCESS_MODAL}
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
          <div className="flex gap-x-2 items-center">
            <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
              <Image
                src="/images/svg/icon-BTC.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <span className="text-12 text-blue-300 font-500 leading-4">
                P79
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                Polkadot’s Hotel Renovation
              </span>
            </div>
          </div>
        </div>
      </div>
      {showSuccess ? (
        <div className="text-center mx-auto mt-8 flex flex-col">
          <span className="text-16 font-500 text-success-200 mb-6">
            All is done
          </span>
          <span className="text-24 font-500 text-blue-300 leading-[120%]">
            You now have 5 P79 tokens
          </span>
          <span className="w-[269px] text-center self-center text-16 text-blue-300/60 font-500 mt-2 leading-[120%]">
            You can see investments on{" "}
            <strong className="text-blue-300">My Investments</strong> tab in
            project page
          </span>
          <div className="flex gap-x-1 mb-1 sm:mb-7 justify-center">
            <Button
              variant="secondary"
              className=" font-700 text-blue-300 mt-11 w-fit px-6 py-4 leading-5"
              onClick={handleButtonClick}
            >
              Awesome
            </Button>
            <Button
              variant="outline"
              className="font-700 text-blue-300 mt-11 w-fit px-6 py-4 leading-5"
              onClick={handleButtonClick}
            >
              See Project
            </Button>
          </div>
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
          <div className="pb-4 sm:pb-12">
            <h3 className="text-24 font-500 text-blue-300">
              Purchasing tokens...
            </h3>
            <p className="text-blue-300/60 font-500 text-16">
              It might take a while
            </p>
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default OfferSuccessModal;
