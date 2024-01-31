import CustomModal from "@/components/CustomModal";
import { REVEAL_PIN_MODAL } from "@/constants";
import { UilDialpadAlt } from "@/icons";
import { useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export const RevealPinModal = ({ selectedCard }: { selectedCard: string }) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [isReveal, setIsReveal] = useState(false);
  const { userCardDetails } = useUserDataStore();
  const { cardAuthToken } = useCardStore();
  const { theme } = useTheme();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? REVEAL_PIN_MODAL : "");
  };
  const dataLoad = async () => {
    setIsReveal(true);
    await window.StrigaUXPlugin.render(
      "pin",
      {
        id: "pin",
        cardId: userCardDetails?.find(
          (item: any) => item?.type === selectedCard
        ).id,
        authToken: cardAuthToken,
        style: {
          cursor: "pointer",
          "font-size": "24px",
          color: theme === "dark" ? "white" : "inherit",
          "font-weight": 600,
          display: "flex",
          "justify-content": "center",
        },
      },
      (data: any) => {
        if (data?.success) {
          setIsReveal(false);
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
      open={modalOpen === REVEAL_PIN_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      <div className="flex gap-x-2 items-center">
        <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
          <UilDialpadAlt className="h-4 w-4 text-white" />
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          Reveal PIN
        </span>
      </div>
      <div className="px-0 sm:px-7 mb-5 sm:mb-12 mt-6">
        <p className="text-16 font-500 leading-5 text-gray-300 text-center dark:text-white/30">
          PIN
        </p>
        <p className={cn("mt-2 text-center", isReveal && "h-0")} id="pin" />
        {isReveal && (
          <div className="animate-pulse flex justify-center">
            <div className="h-6 w-[80px]" />
          </div>
        )}
        <p className="text-12 font-500 leading-4 text-gray-300 mt-2 text-center dark:text-white/30">
          Don’t share or show this PIN to anyone
        </p>
      </div>
    </CustomModal>
  );
};
