import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { IconSwap } from "@/components/icons/IconSwap";
import { SUCCESSFULLY_EXCHANGE_CURRENCY_MODAL } from "@/constants";
import { UilCheck } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SuccessfullyExchangeCurrencyModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 5000);
  }, []);
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SUCCESSFULLY_EXCHANGE_CURRENCY_MODAL : "");
  };
  const handleButtonClick = () => {
    setHandleModal("");
  };
  return (
    <CustomModal
      open={modalOpen === SUCCESSFULLY_EXCHANGE_CURRENCY_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          {showSuccess && (
            <div className="w-10 h-10 bg-success-200 flex justify-center items-center rounded-full">
              <UilCheck className="text-white w-4 h-4" />
            </div>
          )}
          <span className="h-10 w-10 bg-primary text-white flex justify-center items-center rounded-full">
            <IconSwap className="h-4 w-4" />
          </span>
          <span>
            <p className="text-blue-300 text-12 font-500 leading-4">Exchange</p>
          </span>
        </div>
      </div>
      {showSuccess ? (
        <div className="text-center mx-auto mt-6 sm:mt-8 flex flex-col">
          <span className="text-16 font-500 text-success-200 mb-6">
            All is done
          </span>
          <span className="text-24 font-500 text-blue-300 leading-[120%]">
            You receieved $12,000.00
          </span>
          <span className="text-center self-center text-16 text-blue-300/60 font-500 mt-2 leading-[120%]">
            You can see your transactions in <br />
            <Link
              href="/transactions"
              className="text-primary underline underline-offset-4"
            >
              Transactions History
            </Link>
          </span>
          <Button
            variant="secondary"
            className="mb-1 sm:mb-6 font-700 text-blue-300 mt-11 w-fit px-6 py-4 self-center leading-4"
            onClick={handleButtonClick}
          >
            Awesome
          </Button>
        </div>
      ) : (
        <div className="mx-auto text-center">
          <Image
            className=""
            src={"/images/svg/depositing-funds.svg"}
            width={293}
            height={218}
            alt="depositing-funds"
          />
          <div className="pb-12">
            <h3 className="text-24 font-500 text-blue-300">Processing</h3>
            <p className="text-blue-300/60 font-500 text-16">
              It might take a while
            </p>
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default SuccessfullyExchangeCurrencyModal;
