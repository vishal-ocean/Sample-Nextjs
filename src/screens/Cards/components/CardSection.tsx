"use client";
import { Portal } from "@/components/Portal";
import { Button } from "@/components/UI/Button";
import {
  ACTIVATE_CARD_MODAL,
  ACTIVATE_CARD_SUCCESS_MODAL,
  CARD_ACTION_MODAL,
  CARD_CONFIRM_WITHDRAW_MODAL,
  CARD_DEPOSIT_MODAL,
  CARD_SUCCESS_WITHDRAW_MODAL,
  CARD_WITHDRAW_MODAL,
  DELIVERY_DETAILS_MODAL,
  STRIGA_UI_COMPONENT_OTP_MODAL,
  SUCCESSFULLY_TERMINATE_CARD_MODAL,
  TERMINATE_CARD_CONFIRMATION_CODE_MODAL,
  TERMINATE_CARD_MODAL,
  VERIFY_CONSENT,
  VERIFY_TRANSACTION,
} from "@/constants";
import { expectedDeliveryDate } from "@/helper/expectedDeliveryDate";
import { readableNumber } from "@/helper/readableNumber";
import { UilInfoCircle, UilTruck } from "@/icons";
import { useGetCardsMutation } from "@/services/useStrigaCards";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect } from "react";
import { useCardSection } from "./useCardSection";

const CardActionModal = dynamic(() =>
  import("./modals/CardActionModal").then((mod) => mod.CardActionModal)
);
const TerminateCardModal = dynamic(() =>
  import("./modals/terminateCard/TerminateCardModal").then(
    (mod) => mod.TerminateCardModal
  )
);
const TerminateCardSuccessModal = dynamic(
  () => import("./modals/terminateCard/TerminateCardSuccessModal")
);

const CardConfirmWithdrawModal = dynamic(
  () => import("./modals/CardConfirmWithdrawModal")
);
const CardDepositModal = dynamic(() => import("./modals/CardDepositModal"));
const CardSuccessWithdrawModal = dynamic(
  () => import("./modals/CardSuccessWithdrawModal")
);
const CardWithdrawModal = dynamic(() => import("./modals/CardWithdrawModal"));
const StrigaUIComponentOtpVerification = dynamic(
  () => import("./modals/StrigaUIComponentOtpVerification")
);
const ActivateCard = dynamic(
  () => import("./modals/activateCard/ActivateCard")
);
const ActivateCardSuccessModal = dynamic(
  () => import("./modals/activateCard/ActivateCardSuccessModal")
);
const ConfirmationCodeModal = dynamic(
  () => import("./modals/terminateCard/ConfirmationCodeModal")
);
const CardActionButtons = dynamic(() => import("./CardActionButtons"));
const CardSliderSection = dynamic(() => import("./CardSliderSection"));
const PhysicalCardStaticData = dynamic(
  () => import("./PhysicalCardStaticData")
);
const UnFreezeCard = dynamic(() => import("./UnFreezeCard"));

export const CardSection = ({
  currentCard,
  setCurrentCard,
  isCardFreeze,
}: {
  currentCard: string;
  setCurrentCard: (payload: string) => void;
  isCardFreeze: any;
}) => {
  const {
    setHandleModal,
    userCardDetails,
    userWalletDetails,
    strigaUserData,
    getAccountDetails,
    whitelistDestinationAddressList,
    getAssetAddress,
    assetAddress,
    modalOpen,
    OnchainWithdrawalMutation,
    withdrawOtpVerificationMutation,
    otpVerificationType,
    confirmConsent,
    whitelistAddressList,
    cardDetails,
    isAddressWhitelisted,
    setIsAddressWhitelisted,
    setChallengeId,
    showModal,
    setShowModal,
    handleVerifyOtp,
    handleStrigaUIVerifyOtp,
    handleTerminateCard,
    withdrawModal,
    terminateCard,
  } = useCardSection();
  const getAllCards = useGetCardsMutation();

  useEffect(() => {
    getAssetAddress.mutate(2);
    whitelistDestinationAddressList.mutate({
      userId: strigaUserData?.strigaId,
    });
  }, [strigaUserData?.strigaId]);

  useEffect(() => {
    if (whitelistAddressList?.addresses) {
      setIsAddressWhitelisted(
        whitelistAddressList?.addresses.some(
          (item: any) => item.address === assetAddress
        )
      );
    }
  }, [whitelistAddressList, assetAddress]);

  const currentCardDetails = userCardDetails.find(
    (obj: any) => obj.type === currentCard?.toUpperCase()
  );

  useEffect(() => {
    if (terminateCard?.isSuccess === true) {
      getAllCards.mutate({
        userId: strigaUserData.strigaId,
        offset: 0,
        limit: 100,
      });
    }
  }, [terminateCard?.isSuccess]);

  return (
    <>
      <div className="bg-black absolute top-0 h-40 w-full sm:hidden -z-10" />
      <div className="rounded-b-xl sm:rounded-[24px] bg-black sm:p-6 sm:pb-8 relative overflow-hidden dark:border dark:border-white/15">
        <hr className="border-t border-white/15 sm:border-none mx-6" />
        <div className="relative z-10">
          {/* Card slider */}
          <CardSliderSection
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            isCardFreeze={isCardFreeze}
          />
          {/* Card slider */}

          {/* physical card Action */}
          {currentCard === "PHYSICAL" && (
            <div
              className={`flex flex-col items-center mt-7 sm:mt-5 transition-all duration-1000 ease-in-out delay-300 pb-8 sm:pb-0`}
            >
              {!isCardFreeze.PHYSICAL &&
                (!currentCardDetails ? (
                  <PhysicalCardStaticData />
                ) : ["CREATED", "DISPATCHED"].includes(
                    currentCardDetails.status
                  ) ? (
                  <div className="w-full max-w-[402px] rounded-[12px] p-3 grid grid-cols-12 gap-x-3 bg-white/10">
                    <UilTruck className="h-4 w-4 text-white" />
                    <div className="flex flex-col gap-y-1  col-span-11">
                      <div className="flex justify-between">
                        <span className="text-16 text-white font-500 leading-4">
                          Your card is on its way
                        </span>
                        <div className="flex gap-x-1 items-center">
                          <UilInfoCircle className="h-3 w-3 text-white" />
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              setHandleModal(DELIVERY_DETAILS_MODAL)
                            }
                            className="p-0 text-12 font-500 leading-4 text-white underline"
                          >
                            More Details
                          </Button>
                        </div>
                      </div>
                      <span className="text-12 text-white/30 font-500 leading-4">
                        Expected to arrive by{" "}
                        <span className="text-white">
                          {expectedDeliveryDate(
                            cardDetails?.createdAt,
                            cardDetails?.address?.dispatchMethod
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-24 font-500 leading-7 text-white">
                      {currentCardDetails?.linkedAccountCurrency === "EUR"
                        ? `€${readableNumber(
                            Number(
                              userWalletDetails?.accounts?.[
                                currentCardDetails?.linkedAccountCurrency
                              ]?.availableBalance?.amount
                            ) / 100 || 0
                          )}`
                        : `${readableNumber(
                            Number(
                              userWalletDetails?.accounts?.[
                                currentCardDetails?.linkedAccountCurrency
                              ]?.availableBalance?.amount
                            ) / 100 || 0
                          )} ${currentCardDetails?.linkedAccountCurrency}`}
                    </p>

                    <CardActionButtons
                      currentCard={currentCard}
                      getAccountDetails={getAccountDetails}
                      withdrawModal={withdrawModal}
                      setChallengeId={setChallengeId}
                      className="mt-6"
                      setShowModal={setShowModal}
                    />
                  </>
                ))}
              {isCardFreeze.PHYSICAL && (
                <UnFreezeCard
                  currentCard={currentCard}
                  setChallengeId={setChallengeId}
                  setShowModal={setShowModal}
                />
              )}
            </div>
          )}

          {/* physical card Action */}

          {/* virtual card Action */}
          {currentCard === "VIRTUAL" && (
            <div
              className={`flex-col items-center mt-7 sm:mt-5 pb-8 sm:pb-0 transition-all duration-1000 ease-in-out delay-300 ${
                currentCard === "VIRTUAL" ? "flex" : "hidden"
              } ${isCardFreeze.VIRTUAL ? "!pb-0" : ""}`}
            >
              {!isCardFreeze.VIRTUAL &&
                (!userCardDetails.find(
                  (obj: any) => obj.type === currentCard?.toUpperCase()
                ) ? (
                  <PhysicalCardStaticData />
                ) : (
                  <>
                    <p className="text-24 font-500 leading-7 text-white">
                      {currentCardDetails?.linkedAccountCurrency === "EUR"
                        ? `€${readableNumber(
                            Number(
                              userWalletDetails?.accounts?.[
                                currentCardDetails?.linkedAccountCurrency
                              ]?.availableBalance?.amount
                            ) / 100 || 0
                          )}`
                        : `${readableNumber(
                            Number(
                              userWalletDetails?.accounts?.[
                                currentCardDetails?.linkedAccountCurrency
                              ]?.availableBalance?.amount
                            ) / 100 || 0
                          )} ${currentCardDetails?.linkedAccountCurrency}`}
                    </p>
                    {/* <p className="text-16 font-500 leading-5 text-white/30 mt-1">
                      €0.00
                    </p> */}
                    <CardActionButtons
                      currentCard={currentCard}
                      getAccountDetails={getAccountDetails}
                      withdrawModal={withdrawModal}
                      setChallengeId={setChallengeId}
                      setShowModal={setShowModal}
                      className="mt-6"
                    />
                  </>
                ))}
            </div>
          )}
          {currentCard === "VIRTUAL" && isCardFreeze.VIRTUAL && (
            <UnFreezeCard
              currentCard={currentCard}
              setChallengeId={setChallengeId}
              setShowModal={setShowModal}
            />
          )}
          {/* virtual card Action */}
        </div>
        {/* background */}
        <div className="w-full h-full absolute sm:flex justify-center z-0 top-[380px] hidden">
          <div
            className={`h-[610px] w-[610px] blur-[200px] transition-all duration-1000 ease-in-out delay-300 ${
              currentCard === "PHYSICAL" ? "bg-primary" : "bg-blue-150"
            }`}
          />
        </div>
        {/* <BlurBg
          className={cn(
            "w-full absolute z-0 bottom-0 sm:hidden",
            currentCard === "PHYSICAL" ? "text-primary" : "text-blue-150"
          )}
        /> */}
        <Image
          src={
            currentCard === "PHYSICAL"
              ? "/images/svg/ellipse-physical.svg"
              : "/images/svg/ellipse-virtual.svg"
          }
          height={1000}
          width={1000}
          alt="eliopse"
          className={cn(
            "w-full h-full absolute z-0 bottom-0 sm:hidden",
            currentCard === "PHYSICAL" ? "text-primary" : "text-blue-150"
          )}
        />
        {/* background */}
      </div>

      <Portal>
        {modalOpen === CARD_DEPOSIT_MODAL && (
          <CardDepositModal
            isLoading={getAccountDetails.isLoading}
            assetAddress={
              getAccountDetails?.data?.data?.blockchainDepositAddress
            }
          />
        )}
        {modalOpen === CARD_WITHDRAW_MODAL && (
          <CardWithdrawModal
            assetAddress={assetAddress}
            isAddressWhitelisted={isAddressWhitelisted}
            setIsAddressWhitelisted={setIsAddressWhitelisted}
          />
        )}
        {modalOpen === CARD_CONFIRM_WITHDRAW_MODAL && (
          <CardConfirmWithdrawModal
            withDrawMutation={OnchainWithdrawalMutation}
          />
        )}
        {modalOpen === CARD_SUCCESS_WITHDRAW_MODAL && (
          <CardSuccessWithdrawModal
            withDrawMutation={withdrawOtpVerificationMutation}
          />
        )}
        {otpVerificationType === VERIFY_TRANSACTION &&
          modalOpen === STRIGA_UI_COMPONENT_OTP_MODAL && (
            <StrigaUIComponentOtpVerification
              handleVerifyOtp={handleVerifyOtp}
              confirmationMutation={withdrawOtpVerificationMutation}
              showModal={CARD_SUCCESS_WITHDRAW_MODAL}
            />
          )}
        {otpVerificationType === VERIFY_CONSENT &&
          modalOpen === STRIGA_UI_COMPONENT_OTP_MODAL && (
            <StrigaUIComponentOtpVerification
              handleVerifyOtp={handleStrigaUIVerifyOtp}
              confirmationMutation={confirmConsent}
              showModal={showModal}
            />
          )}
        {modalOpen === ACTIVATE_CARD_MODAL && <ActivateCard />}
        {modalOpen === ACTIVATE_CARD_SUCCESS_MODAL && (
          <ActivateCardSuccessModal />
        )}
        {modalOpen === TERMINATE_CARD_MODAL && (
          <TerminateCardModal
            currentCard={currentCard}
            setChallengeId={setChallengeId}
          />
        )}
        {modalOpen === TERMINATE_CARD_CONFIRMATION_CODE_MODAL && (
          <ConfirmationCodeModal
            currentCard={currentCard}
            handleVerifyOtp={handleStrigaUIVerifyOtp}
            confirmationMutation={confirmConsent}
            handleTerminateCard={handleTerminateCard}
            terminateCardMutation={terminateCard}
          />
        )}
        {modalOpen === SUCCESSFULLY_TERMINATE_CARD_MODAL && (
          <TerminateCardSuccessModal
            currentCard={currentCard}
            confirmationMutation={confirmConsent}
          />
        )}
        {modalOpen === CARD_ACTION_MODAL && (
          <CardActionModal
            currentCard={currentCard}
            setChallengeId={setChallengeId}
            setShowModal={setShowModal}
          />
        )}
      </Portal>
    </>
  );
};
