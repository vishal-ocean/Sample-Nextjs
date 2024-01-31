import CustomModal from "@/components/CustomModal";
import { Portal } from "@/components/Portal";
import { TRANSACTION_DETAIL_MODAL } from "@/constants";
import { UilLocationArrow } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useTransactionStore } from "@/store/useTransactionStore";
import moment from "moment";

const TransactionDetailModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { transactionById } = useTransactionStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? TRANSACTION_DETAIL_MODAL : "");
  };

  return (
    <Portal>
      <CustomModal
        open={modalOpen === TRANSACTION_DETAIL_MODAL}
        onOpenChange={handleOpenChange}
        className="max-w-[520px] p-5"
      >
        <div className="flex gap-x-2 items-center">
          <div className="flex h-10 w-10 justify-center items-center rounded-full bg-primary/10 dark:bg-primary">
            <UilLocationArrow className="w-4 h-4 text-blue-300 dark:text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              {transactionById?.merchantName}
            </span>
            <span className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
              {transactionById?.merchantId}
            </span>
          </div>
        </div>

        <div className="px-0 sm:px-7 mb-5 sm:mb-7 mt-6">
          <div>
            <p className="text-12 text-gray-300 font-500 leading-4 text-center dark:text-white/30">
              Amount
            </p>
            <p className="text-40 text-blue-300 font-500 leading-10 tracking-[-0.8px] text-center mt-2  dark:text-white">
              –{" "}
              {transactionById?.merchantTransactionCurrency === "EUR"
                ? "€"
                : ""}{" "}
              {transactionById?.accountTransactionAmount}
            </p>
          </div>
          <div className="mt-10 sm:mt-12">
            <div className="flex justify-between">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Date
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                {moment(transactionById?.createdAt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                text
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                text
              </p>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                text
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                text
              </p>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                text
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                text
              </p>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                text
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                text
              </p>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                text
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                text
              </p>
            </div>
          </div>
        </div>
      </CustomModal>
    </Portal>
  );
};

export default TransactionDetailModal;
