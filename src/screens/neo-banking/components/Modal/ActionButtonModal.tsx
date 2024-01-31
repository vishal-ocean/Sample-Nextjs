import CustomModal from "@/components/CustomModal";
import { ACTION_BUTTON_MODAL } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCurrency } from "../useCurrency";
type DataProps = {
  currency: string;
};

export const ActionButtonModal = ({ currency }: DataProps) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ACTION_BUTTON_MODAL : "");
  };
  const { Action, CurrencyData } = useCurrency();
  return (
    <CustomModal
      open={modalOpen === ACTION_BUTTON_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[640px] p-5 bottom-0 md:bottom-auto translate-y-0 sm:-translate-y-1/2"
    >
      {CurrencyData.map(
        (value, index) =>
          value.currency === currency && (
            <div key={index} className="flex gap-x-3 items-center mb-2">
              <span className="h-10 w-10 bg-blue-300 dark:bg-white dark:text-blue-300 text-white flex justify-center items-center rounded-full">
                {value.currencyIcon}
              </span>
              <span>
                <p className="text-blue-300 dark:text-white text-16 font-500 leading-5 capitalize ">
                  {value.currencyName}
                </p>
                <p className="text-gray-300 dark:text-white/30 text-16 font-500 leading-5 uppercase">
                  {value.currency}
                </p>
              </span>
            </div>
          )
      )}
      <div>
        {Action.map((item, actionIndex) => (
          <>
            <div
              className={`flex gap-x-3 text-blue-300 dark:text-white text-14 font-500 leading-4 cursor-pointer items-center pointer-events-none opacity-50`}
              key={`action-${actionIndex}`}
              onClick={() => setHandleModal(item.modalOpen)}
            >
              <span className="rounded-full bg-secondary dark:bg-white/15 text-blue-300 dark:text-white p-1.6 h-7 w-7 flex justify-center items-center">
                {item.icon}
              </span>
              {item.name}
            </div>
            {actionIndex !== Action.length - 1 && (
              <hr className="border-gray-300/10 dark:border-white/15 my-4" />
            )}
          </>
        ))}
      </div>
    </CustomModal>
  );
};
