import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { IconSwap } from "@/components/icons/IconSwap";
import {
  EXCHANGE_CURRENCY_MODAL,
  PREVIEW_EXCHANGE_CURRENCY_MODAL,
  SUCCESSFULLY_EXCHANGE_CURRENCY_MODAL,
} from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";

const PreviewExchangeModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? PREVIEW_EXCHANGE_CURRENCY_MODAL : "");
  };
  return (
    <CustomModal
      open={modalOpen === PREVIEW_EXCHANGE_CURRENCY_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 bottom-0 md:bottom-auto translate-y-0 sm:-translate-y-1/2"
    >
      <div className="flex gap-x-2 items-center">
        <Button
          variant="secondary"
          size="sm"
          className="leading-4 font-700 text-14 text-blue-300 py-2.5"
          onClick={() => setHandleModal(EXCHANGE_CURRENCY_MODAL)}
        >
          Go Back
        </Button>
        <div className="flex gap-x-2 items-center">
          <span className="h-10 w-10 bg-primary text-white flex justify-center items-center rounded-full">
            <IconSwap className="h-4 w-4" />
          </span>
          <span>
            <p className="text-blue-300 text-12 font-500 leading-4">Exchange</p>
          </span>
        </div>
      </div>
      <div className="mt-6 sm:px-7 mb-5 sm:mb-7">
        <p className="text-12 font-500 leading-4 text-gray-300 text-center">
          Receive
        </p>
        <span className="text-40 font-500 leading-10 tracking-[-0.8px] text-center flex justify-center gap-2 mt-2">
          <p className="text-blue-300">12,000</p>
          <p className="text-gray-300">USD</p>
        </span>

        <div className="mt-10 ">
          <div className="flex justify-between">
            <p className="text-gray-300 text-12 font-500 leading-4">Pay With</p>
            <span className="text-12 font-500 leading-4 flex gap-1">
              <p className="text-gray-300">EUR </p>
              <p className="text-blue-300">10,000</p>
            </span>
          </div>
          <hr className="my-3 border-secondary" />
          <div className="flex justify-between">
            <p className="text-gray-300 text-12 font-500 leading-4">
              Exchange Rate
            </p>
            <p className="text-12 font-500 leading-4 flex gap-x-1 text-blue-300">
              1 USD = 12 EUR
            </p>
          </div>
          <hr className="my-3 border-secondary" />
          <div className="flex justify-between">
            <p className="text-gray-300 text-12 font-500 leading-4">Fee</p>
            <p className="text-12 font-500 leading-4 flex gap-x-1 text-blue-300">
              €0.00
            </p>
          </div>
          <hr className="my-3 border-secondary" />
        </div>
        <p className="text-gray-300 text-12 font-500 leading-4 text-center">
          This operation can have a maximum slippage of 0.5%
        </p>

        <Button
          className="text-16 !font-700 leading-5 px-6 py-4 mt-10 flex mx-auto"
          onClick={() => setHandleModal(SUCCESSFULLY_EXCHANGE_CURRENCY_MODAL)}
        >
          Confirm Exchange
        </Button>
      </div>
    </CustomModal>
  );
};

export default PreviewExchangeModal;
