import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { CANCEL_OFFER_MODAL, OFFER_ACCEPTANCE_MODAL } from "@/constants";
import { UilExchange, UilExclamationTriangle } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { toast } from "react-toastify";

const NETWORK_LIST = [
  {
    value: "BTC",
    label: "BTC",
    img: "/images/svg/icon-BTC.svg",
  },
  {
    value: "ETH",
    label: "ETH",
    img: "/images/svg/icon-ETH.svg",
  },
  {
    value: "Doge",
    label: "Doge",
    img: "/images/svg/icon-Doge.svg",
  },
  {
    value: "BNB",
    label: "BNB",
    img: "/images/svg/icon-BNB.svg",
  },
];

const CancelOffer = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CANCEL_OFFER_MODAL : "");
  };

  const handleCancel = () => {
    setHandleModal("");
    toast.success(
      <CustomToastMessage
        message="You cancelled the offer"
        subText=" 22,487 USDT To 2 P79"
      />
    );
  };

  return (
    <CustomModal
      open={modalOpen === CANCEL_OFFER_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[468px] p-5 bottom-0 md:bottom-auto translate-y-0 sm:-translate-y-1/2"
    >
      <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 sm:justify-between">
        <div className="flex gap-x-2 items-center">
          <span className="bg-danger-100 rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilExclamationTriangle className="h-4 w-4 text-white" />
          </span>
          <span className="text-12 text-blue-300 font-500 leading-4">
            Cancel offer
          </span>
        </div>
      </div>
      <div className="sm:px-7 mt-4 relative">
        <p className="text-24 font-500 leading-7 text-blue-300 text-center">
          Cancel the offer?
        </p>
        <span className="text-16 font-500 left-5 text-gray-300 flex gap-x-3 items-center justify-center mt-3">
          22,487 USDT <UilExchange className="h-4 w-4 " /> 2 P79
        </span>
        <div className="flex justify-center gap-x-2 mt-6 mb-1 sm:mb-7">
          <Button
            className="bg-primary w-max leading-5 text-white font-700"
            onClick={() => handleCancel()}
          >
            Yes, cancel
          </Button>
          <Button
            className={`bg-secondary w-max leading-5 text-blue-300 font-700
          `}
            onClick={() => setHandleModal(OFFER_ACCEPTANCE_MODAL)}
          >
            Don’t cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default CancelOffer;
