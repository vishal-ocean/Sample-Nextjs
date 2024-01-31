import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import {
  CONFIRM_SELL_CRYPTO_MODAL,
  SELL_MODAL,
  SELL_SWAP_SUCCESS_MODAL,
} from "@/constants";
import { UilQuestion } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";

const ConfirmSellCrypto = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CONFIRM_SELL_CRYPTO_MODAL : "");
    setHandleModalState(false);
  };
  return (
    <>
      <CustomModal
        open={modalOpen == CONFIRM_SELL_CRYPTO_MODAL}
        onOpenChange={handleOpenChange}
        className="max-w-[520px]"
      >
        <div className="flex gap-x-2">
          <Button
            variant="secondary"
            size="sm"
            className="leading-4 !py-2 font-700 text-14 text-blue-300"
            onClick={() => setHandleModal(SELL_MODAL)}
          >
            Go Back
          </Button>
          <Image
            width={40}
            height={40}
            alt="icon"
            src="/images/svg/icon-USDT.svg"
            className="h-10 w-10"
          />
        </div>
        <div className="sm:px-7">
          <p className="text-12 mt-6 text-gray-300 font-500 leading-4 text-center">
            Receive
          </p>
          <p className="text-40 text-blue-300 tracking-[0.8px] font-500 text-center leading-10 mt-2">
            5,859<span className="ml-2 text-gray-300">USDT</span>
          </p>
          <div className="flex justify-between mt-11">
            <p className="text-12 leading-4 font-500 text-gray-300">Pay With</p>
            <div className="flex gap-x-2">
              <Image
                width={16}
                height={16}
                alt="icon"
                src="/images/svg/icon-BTC.svg"
              />
              <span className="text-12 font-500 text-gray-300 leading-4">
                BTC <strong className="text-blue-300">0.042</strong>
              </span>
            </div>
          </div>
          <hr className="my-3 bg-secondary" />
          <div className="flex justify-between">
            <p className="text-12 leading-4 font-500 text-gray-300">
              Exchange Rate
            </p>

            <p className="text-12 leading-4 font-500 text-blue-300">
              1 BTC = 29399.40 USDT
            </p>
          </div>
          <hr className="my-3 bg-secondary" />
          <div className="flex justify-between">
            <p className="text-12 leading-4 font-500 text-gray-300">Fee</p>

            <p className="text-12 leading-4 font-500 text-blue-300">€0.00</p>
          </div>
          <hr className="my-3 bg-secondary" />
          <div className="flex justify-between">
            <p className="text-12 leading-4 font-500 text-gray-300">
              Operation Time
            </p>

            <p className="text-12 leading-4 font-500 text-blue-300">
              Instantly
            </p>
          </div>
          <hr className="my-3 bg-secondary" />
          <div className="flex justify-between">
            <span className="text-12 leading-4 font-500 text-gray-300 flex gap-x-1">
              Cashback included (0.50%)
              <span className="flex justify-center items-center bg-secondary h-4 w-4 rounded-full">
                <UilQuestion className="h-4 w-4 fill-white" />
              </span>
            </span>

            <p className="text-12 leading-4 font-500 text-primary">
              USDT 0.00001897
            </p>
          </div>

          <Button
            className="leading-5 font-700 mt-6 sm:mt-10 mx-auto w-max mb-1 sm:mb-7 flex justify-center"
            onClick={() => setHandleModal(SELL_SWAP_SUCCESS_MODAL)}
          >
            Confirm Exchange
          </Button>
        </div>
      </CustomModal>
    </>
  );
};

export default ConfirmSellCrypto;
