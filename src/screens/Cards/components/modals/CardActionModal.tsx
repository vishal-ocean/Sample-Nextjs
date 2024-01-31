import {
  strigaCreateConsent,
  strigaRequestConsent,
} from "@/backend/helper/strigaConsents";
import CustomModal from "@/components/CustomModal";
import { IconDots } from "@/components/icons/IconDots";
import { IconPin } from "@/components/icons/IconPin";
import {
  CARD_ACTION_MODAL,
  CARD_DETAIL_MODAL,
  CARD_SETTINGS_MODAL,
  FREEZE_CARD_MODAL,
  REVEAL_PIN_MODAL,
  STRIGA_UI_COMPONENT_OTP_MODAL,
  TERMINATE_CARD_MODAL,
  VERIFY_CONSENT,
} from "@/constants";
import {
  UilBoltAlt,
  UilCreditCard,
  UilSetting,
  UilSnowflake,
  UilTimes,
  UilTrashAlt,
} from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useTransactionAction } from "@/store/useTransactionStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { useEffect } from "react";

export const CardActionModal = ({
  currentCard,
  setChallengeId,
  setShowModal,
}: any) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { strigaUserData, userCardDetails } = useUserDataStore();
  const { setOtpVerificationType } = useTransactionAction;

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CARD_ACTION_MODAL : "");
  };
  useEffect(() => {
    strigaCreateConsent();
  }, []);
  const strigaUIComponentInit = async () => {
    if (typeof window !== undefined) {
      const response = await strigaRequestConsent(strigaUserData?.strigaId);
      if (response?.challengeId && response?.dateExpires) {
        setChallengeId(response?.challengeId);
        setHandleModal(STRIGA_UI_COMPONENT_OTP_MODAL);
      }
    }
  };
  return (
    <CustomModal
      open={modalOpen === CARD_ACTION_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
      className="w-full p-5"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <span
            className={cn(
              "rounded-3xl h-10 w-10 flex justify-center items-center",
              currentCard === "physical" ? "bg-primary" : "bg-blue-150"
            )}
          >
            {currentCard === "physical" ? (
              <UilCreditCard className="h-4 w-4 text-white" />
            ) : (
              <UilBoltAlt className="h-4 w-4 text-white" />
            )}
          </span>
          <div>
            <p className="text-16 text-blue-300 font-500 leading-5 dark:text-white flex gap-1 items-center">
              <IconDots className="fill-blue-300 w-4 h-4 dark:fill-white" />
              {userCardDetails
                .find((obj: any) => obj.type === currentCard)
                ?.maskedCardNumber?.slice(-4)}
            </p>
            <p className="text-16 text-gray-300 font-500 leading-5 capitalize">
              {currentCard === "PHYSICAL" ? "Physical" : "Virtual"}
            </p>
          </div>
        </div>
        <div
          className="flex bg-secondary cursor-pointer dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center"
          onClick={() => setHandleModal("")}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="mt-2 divide-y divide-gray-300/10">
        <div
          className="flex gap-3 items-center pb-4 cursor-pointer"
          onClick={() => {
            strigaUIComponentInit();
            setOtpVerificationType(VERIFY_CONSENT);
            setShowModal(CARD_DETAIL_MODAL);
          }}
        >
          <div className="flex bg-secondary dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center">
            <UilCreditCard className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
          </div>
          <p className="text-14 font-500 leading-4 text-blue-300 dark:text-white">
            Card Details
          </p>
        </div>
        <div
          className="flex gap-3 items-center py-4 cursor-pointer"
          onClick={() => setHandleModal(CARD_SETTINGS_MODAL)}
        >
          <div className="flex bg-secondary dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center">
            <UilSetting className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
          </div>
          <p className="text-14 font-500 leading-4 text-blue-300 dark:text-white">
            Settings & Limits
          </p>
        </div>
        {currentCard === "PHYSICAL" && (
          <div
            className="flex gap-3 items-center py-4 cursor-pointer"
            onClick={() => {
              strigaUIComponentInit();
              setOtpVerificationType(VERIFY_CONSENT);
              setShowModal(REVEAL_PIN_MODAL);
            }}
          >
            <div className="flex bg-secondary dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center">
              <IconPin className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
            </div>
            <p className="text-14 font-500 leading-4 text-blue-300 dark:text-white">
              Show PIN
            </p>
          </div>
        )}
        <div
          className="flex gap-3 items-center py-4 cursor-pointer"
          onClick={() => {
            strigaUIComponentInit();
            setOtpVerificationType(VERIFY_CONSENT);
            setShowModal(FREEZE_CARD_MODAL);
          }}
        >
          <div className="flex bg-secondary dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center">
            <UilSnowflake className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
          </div>
          <p className="text-14 font-500 leading-4 text-blue-300 dark:text-white">
            Freeze
          </p>
        </div>
        <div
          className="flex gap-3 items-center pt-4 cursor-pointer"
          onClick={() => setHandleModal(TERMINATE_CARD_MODAL)}
        >
          <div className="flex bg-danger-100/20 dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center">
            <UilTrashAlt className="w-4 h-4 mx-auto text-danger-100" />
          </div>
          <p className="text-14 font-500 leading-4 text-danger-100 ">
            Terminate
          </p>
        </div>
      </div>
    </CustomModal>
  );
};
