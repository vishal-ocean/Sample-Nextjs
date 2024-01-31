import IconBorrow from "@/components/icons/IconBorrow";
import { IconSwap } from "@/components/icons/IconSwap";
import IconTopUp from "@/components/icons/IconTopUp";
import IconTransfer from "@/components/icons/IconTransfer";
import {
  EXCHANGE_CURRENCY_MODAL,
  RECEIVE_CURRENCY_MODAL,
  SEND_CURRENCY_MODAL,
} from "@/constants";
import { UilCalendarAlt, UilInvoice } from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
const ActionCards = () => {
  const { setHandleModal } = useHandleModalAction;
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
      <div
        className="rounded-[24px] bg-gray-100 dark:bg-opacity-5 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none"
        onClick={() => setHandleModal(EXCHANGE_CURRENCY_MODAL)}
      >
        <span className="h-10 w-10 bg-secondary dark:bg-white/15 rounded-full flex justify-center items-center">
          <IconSwap className=" h-4 w-4 text-gray-300" />
        </span>
        <p className="text-14 font-700 leading-4 text-gray-300">Exchange</p>
      </div>
      <div
        className="rounded-[24px] bg-white dark:bg-opacity-10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
        onClick={() => setHandleModal(SEND_CURRENCY_MODAL)}
      >
        <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center">
          <IconTransfer strokeWidth={2} className=" h-4 w-4 text-white" />
        </span>
        <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
          Send
        </p>
      </div>
      <div
        className="rounded-[24px] bg-white dark:bg-opacity-10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
        onClick={() => setHandleModal(RECEIVE_CURRENCY_MODAL)}
      >
        <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center">
          <IconTopUp strokeWidth={2} className=" h-4 w-4 text-white" />
        </span>
        <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
          Receive
        </p>
      </div>
      <div className="rounded-[24px] bg-gray-100 dark:bg-opacity-5 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none">
        <span className="h-10 w-10 bg-secondary dark:bg-white/15 rounded-full flex justify-center items-center">
          <UilCalendarAlt className=" h-4 w-4 text-gray-300" />
        </span>
        <p className="text-14 font-700 leading-4 text-gray-300">Schedule</p>
      </div>
      <div className="rounded-[24px] bg-gray-100  dark:bg-opacity-5 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none">
        <span className="h-10 w-10 bg-secondary dark:bg-white/15 rounded-full flex justify-center items-center">
          <UilInvoice className=" h-4 w-4 text-gray-300" />
        </span>
        <p className="text-14 font-700 leading-4 text-gray-300">Bills</p>
      </div>
      <div className="rounded-[24px] bg-gray-100 dark:bg-opacity-5 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none">
        <span className="h-10 w-10 bg-secondary dark:bg-white/15 rounded-full flex justify-center items-center">
          <IconBorrow className=" h-4 w-4 text-gray-300" />
        </span>
        <p className="text-14 font-700 leading-4 text-gray-300">Borrow</p>
      </div>
    </div>
  );
};

export default ActionCards;
