"use client";
import CustomModal from "@/components/CustomModal";
import ProcessingLoader from "@/components/Loaders/ProcessingLoader";
import { Button } from "@/components/UI/Button";
import { IconDots } from "@/components/icons/IconDots";
import { CHANGE_CURRENCY_SUCCESS_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { UilCheck, UilSetting } from "@/icons";
import {
  useGetCardsMutation,
  useUpdateCardCurrencyMutation,
} from "@/services/useStrigaCards";
import { useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ChangeCurrencySuccessModal = ({
  currentCard,
  confirmationMutation,
}: {
  currentCard: string;
  confirmationMutation: any;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [isLoading, setIsLoading] = useState(true);
  const { cardActionDetails } = useCardStore();
  const { strigaUserData } = useUserDataStore();
  const getAllCards = useGetCardsMutation();
  const { userCardDetails, userWalletDetails } = useUserDataStore();

  const onUpdateCardCurrencySuccess = () => {
    getAllCards.mutate({
      userId: strigaUserData.strigaId,
      offset: 0,
      limit: 100,
    });
  };

  const updateCardCurrency = useUpdateCardCurrencyMutation(
    onUpdateCardCurrencySuccess
  );
  const isEffectExecuted = useRef(false);

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CHANGE_CURRENCY_SUCCESS_MODAL : "");
  };
  const handleButtonClick = () => {
    setHandleModal("");
  };

  const currentCardDetail = userCardDetails.find(
    (val: any) => val.type === currentCard
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  });

  useEffect(() => {
    if (confirmationMutation?.isSuccess && !isEffectExecuted.current) {
      isEffectExecuted.current = true;

      updateCardCurrency.mutate({
        cardId: currentCardDetail?.id,
        accountId:
          userWalletDetails?.accounts[cardActionDetails.selectedCurrency]
            .accountId,
      });
    }
  }, [confirmationMutation?.data]);

  return (
    <CustomModal
      open={modalOpen === CHANGE_CURRENCY_SUCCESS_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      <div className="flex gap-x-2 items-center">
        {!isLoading && (
          <span className="rounded-3xl p-3 flex justify-center items-center bg-success-200 text-white">
            <UilCheck className="h-4 w-4" />
          </span>
        )}

        <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
          <UilSetting className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <div className="flex flex-col">
          <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
            Settings{" "}
          </span>
          <span className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
            {currentCard === "PHYSICAL" ? "Physical" : "Virtual"}{" "}
            {currentCardDetail?.maskedCardNumber.substr(-7)}
          </span>
        </div>
      </div>
      {!isLoading ? (
        <>
          <div className="text-center mx-auto flex flex-col items-center">
            <div className="relative mt-3 h-[160px] w-[268px]">
              <Image
                width={1000}
                height={1000}
                src={`/images/${
                  currentCard === "PHYSICAL" ? "physical" : "virtual"
                }-card-bg.png`}
                alt="image"
                className="w-full h-full"
              />
              <span className="absolute top-5 left-5 text-16 leading-5 font-500 text-white">
                {currentCard === "PHYSICAL" ? "Physical" : "Virtual"}
              </span>
              <Image
                height={40}
                width={40}
                src={AssetImages[cardActionDetails.selectedCurrency]}
                alt="token-image"
                className="top-0 right-0 absolute"
              />
              <div className="absolute flex flex-row items-center bottom-4 left-5 gap-[2px]">
                <IconDots className="h-6 w-6 fill-white" />
                <span className="text-16 leading-5 font-500 ml-[6px] text-white">
                  {currentCardDetail?.maskedCardNumber.substr(-4)}{" "}
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
            <span className="text-16 font-700 text-success-200 mb-2 leading-5 mt-5">
              {`${
                currentCard === "PHYSICAL" ? "Physical" : "Virtual"
              } Card currency is changed`}{" "}
            </span>
            <span className="text-16 font-500 leading-5 text-gray-300 w-[270px] dark:text-white/30">
              You can change currency anytime in Cards Settings
            </span>
            <Button
              variant="secondary"
              className="mb-1 sm:mb-3 font-700 text-blue-300 mt-8 w-fit  py-[9.5px] px-4 self-center leading-4 text-14 dark:bg-white dark:bg-opacity-15 dark:text-white"
              onClick={handleButtonClick}
            >
              OK
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto text-center">
            <div className="mt-4 mb-8">
              <h3 className="text-24 leading-7 font-500 text-blue-300 dark:text-white">
                Changing currency{" "}
              </h3>
              <p className="text-gray-300 dark:text-white/30  leading-5 font-500 text-16 mt-2">
                It will take just a moment{" "}
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

export default ChangeCurrencySuccessModal;
