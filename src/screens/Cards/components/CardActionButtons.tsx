import {
  strigaCreateConsent,
  strigaRequestConsent,
} from "@/backend/helper/strigaConsents";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/UI/Dropdown";
import { IconPin } from "@/components/icons/IconPin";
import IconTopUp from "@/components/icons/IconTopUp";
import IconTransfer from "@/components/icons/IconTransfer";
import {
  CARD_ACTION_MODAL,
  CARD_DETAIL_MODAL,
  CARD_SETTINGS_MODAL,
  FREEZE_CARD_MODAL,
  RECEIVE_CURRENCY_MODAL,
  REVEAL_PIN_MODAL,
  SEND_CURRENCY_MODAL,
  STRIGA_UI_COMPONENT_OTP_MODAL,
  TERMINATE_CARD_MODAL,
  VERIFY_CONSENT,
} from "@/constants";
import { SUPPORTED_ASSETS_DETAILS } from "@/constants/StrigaNetworkAssetsList";
import {
  UilCreditCard,
  UilEllipsisH,
  UilSetting,
  UilSnowflake,
  UilTrashAlt,
} from "@/icons";
import { useCardStore } from "@/store/cardDetails";
import { useHandleModalAction } from "@/store/handleModal";
import { useCryptoStoreActions } from "@/store/useCryptoStore";
import { useTransactionAction } from "@/store/useTransactionStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

const CardActionData = [
  {
    name: "Settings & Limits",
    icon: <UilSetting className="h-4 w-4" />,
    modal: CARD_SETTINGS_MODAL,
  },
  {
    name: "Show PIN",
    icon: <IconPin className="w-4 h-4" />,
    modal: REVEAL_PIN_MODAL,
  },
  {
    name: "Freeze",
    icon: <UilSnowflake className="h-4 w-4" />,
    modal: FREEZE_CARD_MODAL,
  },
  {
    name: "Terminate",
    icon: <UilTrashAlt className="h-4 w-4" />,
    modal: TERMINATE_CARD_MODAL,
  },
];
const CardActionButtons = ({
  currentCard,
  getAccountDetails,
  withdrawModal,
  className,
  setChallengeId,
  setShowModal,
}: any) => {
  const [openActionDropdown, setOpenActionDropdown] = useState(false);
  const { setHandleModal } = useHandleModalAction;
  const { userCardDetails, userWalletDetails, strigaUserData } =
    useUserDataStore();
  const { setAssetDetailsData } = useCryptoStoreActions;
  const { setOtpVerificationType } = useTransactionAction;
  const { cardDetails } = useCardStore();
  const strigaUIComponentInit = async () => {
    if (typeof window !== undefined) {
      const response = await strigaRequestConsent(strigaUserData?.strigaId);
      if (response?.challengeId && response?.dateExpires) {
        setChallengeId(response?.challengeId);
        setHandleModal(STRIGA_UI_COMPONENT_OTP_MODAL);
      }
    }
  };

  useEffect(() => {
    strigaCreateConsent();
  }, []);
  return (
    <div className={cn("flex gap-2", className)}>
      <div
        className={cn(
          "py-5 px-3 flex flex-col gap-3 items-center w-[110px] cursor-pointer",
          userCardDetails.find((obj: any) => obj.type === currentCard)
            ?.linkedAccountCurrency !== "EUR" &&
            "cursor-not-allowed pointer-events-none"
        )}
        onClick={() => {
          if (
            userCardDetails.find((obj: any) => obj.type === currentCard)
              ?.linkedAccountCurrency === "EUR"
          ) {
            setHandleModal(RECEIVE_CURRENCY_MODAL);
          } else {
            strigaUserData?.strigaId &&
              cardDetails.linkedAccountId &&
              getAccountDetails.mutate({
                userId: strigaUserData?.strigaId,
                accountId: cardDetails.linkedAccountId,
              });
            // setHandleModal(CARD_DEPOSIT_MODAL);
            setAssetDetailsData({
              id: SUPPORTED_ASSETS_DETAILS[cardDetails?.linkedAccountCurrency]
                ?.assetId,
              name: SUPPORTED_ASSETS_DETAILS[cardDetails?.linkedAccountCurrency]
                ?.assetName,
              shortName: cardDetails?.linkedAccountCurrency,
            });
          }
        }}
      >
        <span
          className={cn(
            "h-10 w-10 flex justify-center items-center text-white rounded-full",
            currentCard === "PHYSICAL" ? "bg-primary" : "bg-blue-150"
          )}
        >
          <IconTopUp className="h-4 w-4" strokeWidth={2} />
        </span>
        <p className="text-white text-14 font-700 leading-4">Deposit</p>
      </div>
      <div
        className={cn(
          "py-5 px-3 flex flex-col gap-3 items-center w-[110px] cursor-pointer",
          userCardDetails.find((obj: any) => obj.type === currentCard)
            ?.linkedAccountCurrency !== "EUR" &&
            "cursor-not-allowed pointer-events-none"
        )}
        onClick={() => {
          {
            if (
              userCardDetails.find((obj: any) => obj.type === currentCard)
                ?.linkedAccountCurrency === "EUR"
            ) {
              setHandleModal(SEND_CURRENCY_MODAL);
            } else {
              withdrawModal();
            }
          }
        }}
      >
        <span
          className={cn(
            "h-10 w-10 flex justify-center items-center text-white rounded-full",
            currentCard === "PHYSICAL" ? "bg-primary" : "bg-blue-150"
          )}
        >
          <IconTransfer className="h-4 w-4" strokeWidth={2} />
        </span>
        <p className="text-white text-14 font-700 leading-4">Withdraw</p>
      </div>
      <div
        className="py-5 px-3 hidden sm:flex flex-col gap-3 items-center w-[110px] cursor-pointer"
        onClick={() => {
          strigaUIComponentInit();
          setOtpVerificationType(VERIFY_CONSENT);
          setShowModal(CARD_DETAIL_MODAL);
        }}
      >
        <span
          className={cn(
            "h-10 w-10 flex justify-center items-center  rounded-full",
            currentCard === "PHYSICAL"
              ? "bg-white/15 text-white"
              : "bg-blue-150/20 text-blue-150"
          )}
        >
          <UilCreditCard className="h-4 w-4" />
        </span>
        <p className="text-white text-14 font-700 leading-4">Card Details</p>
      </div>

      <DropdownMenu
        open={openActionDropdown}
        onOpenChange={setOpenActionDropdown}
      >
        <DropdownMenuTrigger className="hidden sm:block">
          <div className="py-5 px-3 hidden sm:flex flex-col gap-3 items-center w-[110px] cursor-pointer">
            <span
              className={cn(
                "h-10 w-10 flex justify-center items-center  rounded-full",
                currentCard === "PHYSICAL"
                  ? "bg-white/15 text-white"
                  : "text-blue-150 bg-blue-150/20"
              )}
            >
              <UilEllipsisH className="h-4 w-4" />
            </span>
            <p className="text-white text-14 font-700 leading-4">More</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="shadow-none p-0 bg-gray-250/10 backdrop-blur-lg rounded-xl"
          side="top"
        >
          <div className="p-4 flex flex-col divide-y divide-white/5">
            {CardActionData?.filter((x) =>
              currentCard === "VIRTUAL" ? x.name !== "Show PIN" : x
            ).map((item, index) => (
              <div
                className="flex gap-3 items-center cursor-pointer py-2 first:pt-0 last:pb-0"
                key={`action-${index}`}
                onClick={() => {
                  item.name === "Terminate" || item.name === "Settings & Limits"
                    ? setHandleModal(item.modal)
                    : strigaUIComponentInit();
                  setOtpVerificationType(VERIFY_CONSENT);
                  setShowModal(item.modal);
                  setOpenActionDropdown(false);
                }}
              >
                <span
                  className={cn(
                    "h-7 w-7 flex justify-center items-center  rounded-full",
                    item.name === "Terminate"
                      ? "text-danger-100 bg-danger-100/20"
                      : "text-white bg-white/10"
                  )}
                >
                  {item.icon}
                </span>
                <p
                  className={cn(
                    "text-14 font-500 leading-4",
                    item.name === "Terminate" ? "text-danger-100" : "text-white"
                  )}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div
        className="py-5 px-3 sm:hidden flex flex-col gap-3 items-center w-[110px] cursor-pointer"
        onClick={() => setHandleModal(CARD_ACTION_MODAL)}
      >
        <span
          className={cn(
            "h-10 w-10 flex justify-center items-center  rounded-full",
            currentCard === "PHYSICAL"
              ? "bg-white/15 text-white"
              : "text-blue-150 bg-blue-150/20"
          )}
        >
          <UilEllipsisH className="h-4 w-4" />
        </span>
        <p className="text-white text-14 font-700 leading-4">More</p>
      </div>
    </div>
  );
};

export default CardActionButtons;
