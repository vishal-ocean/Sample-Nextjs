"use client";
import CustomModal from "@/components/CustomModal";
import ProcessingLoader from "@/components/Loaders/ProcessingLoader";
import { Button } from "@/components/UI/Button";
import { IconDots } from "@/components/icons/IconDots";
import { ACTIVATE_CARD_SUCCESS_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { UilCheck, UilCreditCard } from "@/icons";
import { useGetCardsMutation } from "@/services/useStrigaCards";
import { useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const ActivateCardSuccessModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [isLoading, setIsLoading] = useState(true);
  const { strigaUserData, userCardDetails } = useUserDataStore();
  const getAllCards = useGetCardsMutation();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ACTIVATE_CARD_SUCCESS_MODAL : "");
  };
  const handleButtonClick = () => {
    setHandleModal("");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  });
  const { activateCardDetails } = useCardStore();
  useEffect(() => {
    getAllCards.mutate({
      userId: strigaUserData.strigaId,
      offset: 0,
      limit: 100,
    });
  }, []);
  return (
    <CustomModal
      open={modalOpen === ACTIVATE_CARD_SUCCESS_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      {!isLoading ? (
        <>
          <div className="flex gap-x-2 items-center">
            <span className="rounded-3xl p-3 flex justify-center items-center bg-success-200">
              <UilCheck className="text-white h-4 w-4" />
            </span>

            <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
              <UilCreditCard className="h-4 w-4 text-blue-300 dark:text-white" />
            </span>
            <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              Activate Card
            </span>
          </div>
          <div className="text-center mx-auto mt-4 flex flex-col items-center ">
            <div className="relative w-[268px] h-[160px]">
              <Image
                width={268}
                height={160}
                src="/images/physical-card-bg.png"
                alt="image"
              />
              <span className="absolute top-5 left-5 text-16 leading-5 font-500 text-white">
                Physical
              </span>
              <Image
                src={
                  AssetImages[
                    userCardDetails.find((obj: any) => obj.type === "PHYSICAL")
                      ?.linkedAccountCurrency
                  ]
                }
                height={100}
                width={200}
                alt="visa"
                className="w-10 h-10 absolute top-0 right-0"
              />
              <div className="absolute flex flex-row items-center bottom-4 left-5 gap-[2px]">
                <IconDots className="h-6 w-6 fill-white" />
                <span className="text-16 leading-5 font-500 ml-[6px] text-white">
                  {activateCardDetails?.inputValue}
                </span>
              </div>
              <Image
                src={"/images/svg/visa.svg"}
                height={15}
                width={40}
                alt=""
                className="absolute bottom-5 right-5"
              />
            </div>
            <span className="text-16 font-500 text-success-200 mb-2 leading-5 mt-5">
              Your Card is Activated{" "}
            </span>
            <span className="text-16 font-500 leading-5 text-gray-300 w-[270px] px-2 dark:text-white/30">
              One card to spend or withdraw money with the real exchange rate
            </span>
            <Button
              variant="secondary"
              className="mb-1 sm:mb-3 font-700 text-blue-300 mt-8 w-fit px-4 py-2 self-center leading-4 text-14 dark:bg-white dark:bg-opacity-15 dark:text-white"
              onClick={handleButtonClick}
            >
              OK
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-x-2 items-center">
            <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
              <UilCreditCard className="h-4 w-4 text-blue-300 dark:text-white" />
            </span>
            <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              Activate Card
            </span>
          </div>
          <div className="mx-auto text-center">
            <div className="mt-4 mb-8">
              <h3 className="text-24 leading-7 font-500 text-blue-300 dark:text-white">
                Activating your Card
              </h3>
              <p className="text-gray-300 dark:text-white/30  leading-5 font-500 text-16 mt-2">
                It will take just a moment
              </p>
            </div>
            <div className="mb-11 py-1">
              <ProcessingLoader />
            </div>
          </div>
        </>
      )}
    </CustomModal>
  );
};

export default ActivateCardSuccessModal;
