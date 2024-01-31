import { FREEZE_CARD_MODAL } from "@/constants";
import { UilSnowflake } from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
import { useTransactionAction } from "@/store/useTransactionStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";

const UnFreezeCard = ({
  setChallengeId,
  setShowModal,
  currentCard,
}: {
  setChallengeId: any;
  setShowModal: any;
  currentCard: string;
}) => {
  const { strigaUserData } = useUserDataStore();
  const { setHandleModal } = useHandleModalAction;
  const { setOtpVerificationType } = useTransactionAction;

  // useEffect(() => {
  //   strigaCreateConsent();
  // }, []);
  // const strigaUIComponentInit = async () => {
  //   if (typeof window !== undefined) {
  //     const response = await strigaRequestConsent(strigaUserData?.strigaId);
  //     if (response?.challengeId && response?.dateExpires) {
  //       setChallengeId(response?.challengeId);
  //       setHandleModal(STRIGA_UI_COMPONENT_OTP_MODAL);
  //     }
  //   }
  // };
  return (
    <div
      className={cn(
        "flex flex-col items-center",
        currentCard === "PHYSICAL" ? "" : "mb-8 sm:mb-0"
      )}
    >
      <p className="text-24 font-500 leading-7 text-white">Card is frozen</p>
      <p className="text-16 font-500 leading-5 text-white/30 mt-1">
        You can unfreeze it back anytime
      </p>
      <div
        className="py-5 px-3 flex flex-col gap-3 items-center w-[110px] cursor-pointer"
        onClick={() => {
          setHandleModal(FREEZE_CARD_MODAL);
        }}
      >
        <span
          className={cn(
            "h-10 w-10 flex justify-center items-center rounded-full",
            currentCard === "PHYSICAL"
              ? "text-white bg-white/30"
              : "text-blue-150 bg-blue-150/20"
          )}
        >
          <UilSnowflake className="h-4 w-4" />
        </span>
        <p className="text-white text-14 font-700 leading-4">Unfreeze</p>
      </div>
    </div>
  );
};

export default UnFreezeCard;
