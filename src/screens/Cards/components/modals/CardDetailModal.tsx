import CustomModal from "@/components/CustomModal";
import { CARD_DETAIL_MODAL } from "@/constants";
import { UilCopy, UilCreditCard } from "@/icons";
import { useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import moment from "moment";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CardDetailModal = ({ selectedCard }: { selectedCard: string }) => {
  const { modalOpen } = useHandleModalStore();
  const { theme } = useTheme();
  const { setHandleModal } = useHandleModalAction;
  const { userCardDetails } = useUserDataStore();
  const { cardAuthToken, cardDetails } = useCardStore();
  const [loadingState, setLoadingState] = useState({
    cardNumber: false,
    cvv: false,
  });
  const style = {
    cursor: "pointer",
    "margin-right": "4px",
    "font-size": "14px",
    color: theme === "dark" ? "#FFF" : "#000",
    "font-weight": 500,
    "@font-face": {
      "font-family": "Space Mono",
      "font-style": "normal",
      src: 'url(https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap) format("woff2")',
      "unicode-range": "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
    },
    "font-family": '"Space Mono", monospace',
  };
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CARD_DETAIL_MODAL : "");
  };

  const dataLoad = async () => {
    setLoadingState({
      cardNumber: true,
      cvv: true,
    });
    await window.StrigaUXPlugin.render(
      "cardNumber",
      {
        id: "cardNumber",
        cardId: userCardDetails?.find(
          (item: any) => item?.type === selectedCard
        ).id,
        authToken: cardAuthToken,
        enableCardNumberCopy: true,
        copyButtonSvgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentcolor" style="color:${
          theme === "dark" ? "#FFF" : "#000"
        };cursor:pointer"><path d="M21,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,14.05,2H10A3,3,0,0,0,7,5V6H6A3,3,0,0,0,3,9V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V18h1a3,3,0,0,0,3-3V9S21,9,21,8.94ZM15,5.41,17.59,8H16a1,1,0,0,1-1-1ZM15,19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V9A1,1,0,0,1,6,8H7v7a3,3,0,0,0,3,3h5Zm4-4a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h3V7a3,3,0,0,0,3,3h3Z"></path></svg>`,
        style: style,
      },
      (data: any) => {
        if (data?.success) {
          setLoadingState({
            ...loadingState,
            cardNumber: false,
          });
        }
        if (data?.isCardNumberCopied) {
          toast.success("Copied to clipboard", {
            toastId: "9872",
          });
        }
      }
    );
    await window.StrigaUXPlugin.render(
      "cvv",
      {
        id: "cvv",
        cardId: userCardDetails?.find(
          (item: any) => item?.type === selectedCard
        ).id,
        authToken: cardAuthToken,
        style: style,
      },
      (data: any) => {
        if (data?.success) {
          setLoadingState({
            ...loadingState,
            cvv: false,
          });
        }
      }
    );
  };

  useEffect(() => {
    if (cardAuthToken) {
      dataLoad();
    }
  }, [cardAuthToken]);

  return (
    <CustomModal
      open={modalOpen === CARD_DETAIL_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      <div className="flex gap-x-2 items-center">
        <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
          <UilCreditCard className="h-4 w-4 text-white" />
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          Card Details
        </span>
      </div>
      <div className="px-0 sm:px-7 sm:mb-7 mt-5">
        <div
          className={`flex gap-x-6 justify-between text-blue-300 text-14 font-500 leading-4 dark:text-white`}
        >
          <p className="text-gray-300 text-12 font-500 leading-4 whitespace-nowrap dark:text-white/30">
            Card Number
          </p>
          <span
            className=" text-12 font-500 leading-4 text-blue-300 cursor-pointer flex gap-x-2 justify-end w-max dark:text-white"
            onClick={() => {
              navigator.clipboard.writeText("9872 7582 8465 7285");
              toast.success("Copied to clipboard", {
                toastId: "9872",
              });
            }}
          >
            {loadingState.cardNumber ? (
              <div className="animate-pulse w-[180px]">
                <div className="h-4 w-full" />
              </div>
            ) : (
              ""
            )}
            <p
              className={cn(
                "text-right",
                !loadingState?.cardNumber && "min-w-[181px] h-4"
              )}
              id="cardNumber"
            />
          </span>
        </div>
        <hr className="border-gray-300/10 my-4 dark:border-white/15" />
        <div
          className={`flex gap-x-6 justify-between text-blue-300 text-14 font-500 leading-4 dark:text-white`}
        >
          <p className="text-gray-300 text-12 font-500 leading-4 whitespace-nowrap dark:text-white/30">
            Expiry Date
          </p>
          <div
            className="grid grid-cols-[1fr_auto] text-14 leading-4 text-blue-300 cursor-pointer gap-x-1 justify-end w-12 dark:text-white"
            onClick={() => {
              navigator.clipboard.writeText(
                moment(cardDetails?.expiryData).format("MM/YY")
              );
              toast.success("Copied to clipboard", {
                toastId: "12/24",
              });
            }}
          >
            <p className="text-right w-[63%] sm:w-full">
              {moment(cardDetails?.expiryData).format("MM/YY")}
            </p>
            <UilCopy className="h-4 w-4" />
          </div>
        </div>
        <hr className="border-gray-300/10 my-4 dark:border-white/15" />
        <div
          className={`flex gap-x-6 justify-between text-blue-300 text-14 font-500 leading-4 dark:text-white`}
        >
          <p className="text-gray-300 text-12 font-500 leading-4 whitespace-nowrap dark:text-white/30">
            CVV Code
          </p>
          <span className=" text-12 font-500 leading-4 text-blue-300 cursor-pointer flex gap-x-2 justify-end w-6 dark:text-white">
            {loadingState.cvv ? (
              <div className="animate-pulse w-6 sm:w-full">
                <div className="h-4 w-full" />
              </div>
            ) : (
              ""
            )}
            <p
              className={cn(
                "text-right break-words",
                !loadingState?.cvv && "w-6 sm:w-full"
              )}
              id="cvv"
            />
            {/* <UilCopy className="h-4 w-4" /> */}
          </span>
        </div>
      </div>
    </CustomModal>
  );
};
