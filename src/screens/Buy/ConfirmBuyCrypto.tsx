// import { UilExclamationTriangle,UilRedo } from "@/icons";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import {
  BUY_MODAL,
  BUY_SWAP_SUCCESS_MODAL,
  CONFIRM_BUY_CRYPTO_MODAL,
} from "@/constants";
import { UilQuestion } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";

const ConfirmBuyCrypto = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CONFIRM_BUY_CRYPTO_MODAL : "");
    setHandleModalState(false);
  };
  return (
    <>
      <CustomModal
        open={modalOpen == CONFIRM_BUY_CRYPTO_MODAL}
        onOpenChange={handleOpenChange}
        className="max-w-[520px]"
      >
        <div className="flex justify-between">
          <div className="flex gap-x-2 items-center">
            <Button
              variant="secondary"
              size="sm"
              className="leading-4 font-700 text-14 text-blue-300"
              onClick={() => setHandleModal(BUY_MODAL)}
            >
              Go Back
            </Button>
            <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
              <Image
                src="/images/svg/icon-BTC.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="sm:px-7">
          <div className="flex flex-col mt-4 sm:mt-6 gap-y-2 items-center">
            <p className=" text-12 font-500 text-gray-300 leading-4">Receive</p>
            <div className="flex gap-x-2">
              <h1 className="text-40 font-500 leading-10 text-blue-300 tracking-[-0.8px]">
                0.849950
              </h1>
              <span className="text-40 font-500 leading-10 text-gray-300 tracking-[-0.8px]">
                BTC
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-12">
            <span className="text-12 text-gray-300 font-500 leading-4">
              Pay With
            </span>
            <div className="flex gap-x-1">
              <span className="text-12 font-500 text-gray-300 leading-4">
                USD
              </span>
              <span className="text-12 font-500 text-blue-300 leading-4">
                25,000
              </span>
            </div>
          </div>
          <hr className="my-3 border-1 border-secondary" />
          <div className="flex justify-between">
            <span className="text-12 text-gray-300 font-500 leading-4">
              Exchange Rate
            </span>

            <span className="text-12 font-500 text-blue-300 leading-4">
              1 BTC = 29399.40 USD
            </span>
          </div>
          <hr className="my-3 border-1 border-secondary" />
          <div className="flex justify-between">
            <span className="text-12 text-gray-300 font-500 leading-4">
              Fee
            </span>

            <span className="text-12 font-500 text-blue-300 leading-4">
              €0.00
            </span>
          </div>
          <hr className="my-3 border-1 border-secondary" />
          <div className="flex justify-between">
            <span className="text-12 text-gray-300 font-500 leading-4">
              Operation Time
            </span>

            <span className="text-12 font-500 text-blue-300 leading-4">
              Instantly
            </span>
          </div>
          <hr className="my-3 border-1 border-secondary" />
          <div className="flex justify-between">
            <div className="flex gap-x-1">
              <span className="text-12 text-gray-300 font-500 leading-4">
                Cashback included (0.50%)
              </span>

              <span className="flex justify-center items-center bg-secondary h-4 w-4 rounded-full">
                <UilQuestion className="h-4 w-4 fill-white" />
              </span>
            </div>
            <span className="text-12 font-500 text-primary leading-4">
              BTC 0.00001897
            </span>
          </div>

          <div className="flex justify-center">
            <Button
              className="leading-5 font-700 mt-6 sm:mt-11 w-max mb-1 sm:mb-7"
              onClick={() => setHandleModal(BUY_SWAP_SUCCESS_MODAL)}
            >
              Confirm Exchange
            </Button>
          </div>
          {/* --------This is Error Message Code--------- */}

          {/* <div className="flex gap-x-2">
            <Button
              variant="secondary"
              className="leading-5 font-700 flex gap-x-2"
            >
              <UilRedo className="text-blue-300 w-4 h-4" /> Try Again
            </Button>
            <div className="flex gap-x-2 items-center">
              <p className="bg-danger-100 w-10 h-10 flex justify-center items-center rounded-3xl">
                <UilExclamationTriangle className="text-white font-700" />
              </p>
              <span className="font-500 text-12 text-pink-100">
                Something went wrong
              </span>
            </div>
          </div> */}
        </div>
      </CustomModal>
    </>
  );
};

export default ConfirmBuyCrypto;
