"use client";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { OFFER_CREATED_MODAL } from "@/constants";
import { UilCheck, UilExchange, UilPlus } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import { useEffect, useState } from "react";

const OfferCreated = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 5000);
  }, []);
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? OFFER_CREATED_MODAL : "");
  };
  const handleButtonClick = () => {
    setHandleModal("");
  };
  return (
    <CustomModal
      open={modalOpen === OFFER_CREATED_MODAL}
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
          <span className="bg-secondary rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilPlus className="h-4 w-4 text-blue-300" />
          </span>
          <span className="text-12 text-blue-300 font-500 leading-4">
            Create Offer
          </span>
        </div>
      </div>
      {showSuccess ? (
        <div className="text-center mx-auto mt-8 flex flex-col">
          <span className="text-16 font-500 text-success-200 mb-5">
            Offer is created
          </span>
          <span className="text-24 font-500 text-blue-300 leading-7 flex gap-x-3 items-center justify-center">
            <p>22,487 USDT</p> <UilExchange className="h-6 w-6 text-primary" />
            <p>2 P79</p>
          </span>
          <span className="w-[255px] text-center self-center text-16 text-blue-300/60 font-500 mt-3 leading-5">
            You can track the offer on &nbsp;
            <strong className="text-blue-300 whitespace-nowrap">
              My Offers
            </strong>
            &nbsp; tab in Secondary Market
          </span>
          <Button
            variant="secondary"
            className="mb-1 mt-8 sm:mb-7 px-4 py-3 text-14 font-700 text-blue-300 w-fit self-center leading-4"
            onClick={handleButtonClick}
          >
            See My Offers
          </Button>
        </div>
      ) : (
        <div className="mx-auto text-center mt-8">
          <Image
            className=""
            src={"/images/svg/depositing-funds.svg"}
            width={293}
            height={218}
            alt="depositing-funds"
          />
          <div className="pb-7">
            <h3 className="text-24 font-500 text-blue-300 leading-[120%]">
              Creating Offer...
            </h3>
            <p className="text-gray-300 font-500 text-16 leading-5">
              It might take a while
            </p>
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default OfferCreated;
