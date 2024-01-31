import CustomModal from "@/components/CustomModal";
import { IconCardLimit } from "@/components/icons/IconCardLimit";
import { IconContactless } from "@/components/icons/IconContactless";
import { CARD_SETTINGS_MODAL, CARD_TRANSACTION_LIMIT } from "@/constants";
import { UilAngleLeft, UilGlobe, UilSetting, UilTimes } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";

export const CardTransactionLimitModal = ({
  currentCard,
}: {
  currentCard: string;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { userCardDetails } = useUserDataStore();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CARD_TRANSACTION_LIMIT : "");
  };
  const currentCardDetail = userCardDetails.find(
    (val: any) => val.type === currentCard
  );

  return (
    <CustomModal
      open={modalOpen === CARD_TRANSACTION_LIMIT}
      onOpenChange={handleOpenChange}
      withoutClose
      className="w-full p-5 max-w-[520px] sm:min-w-[520px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <span
            className={cn(
              "rounded-3xl h-10 w-10 flex justify-center items-center bg-secondary dark:bg-white/15 cursor-pointer"
            )}
            onClick={() => setHandleModal(CARD_SETTINGS_MODAL)}
          >
            <UilAngleLeft className="h-4 w-4 text-blue-300 dark:text-white" />
          </span>
          <span
            className={cn(
              "rounded-3xl h-10 w-10 flex justify-center items-center bg-secondary dark:bg-white/15"
            )}
          >
            <UilSetting className="h-4 w-4 text-blue-300 dark:text-white" />
          </span>
          <div>
            <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              Settings
            </p>
            <p className="text-12 text-gray-300 dark:text-white/30 font-500 leading-4 ">
              {currentCard === "PHYSICAL" ? "Physical" : "Virtual"}{" "}
              {currentCardDetail?.maskedCardNumber.substr(-7)}
            </p>
          </div>
        </div>
        <div
          className="flex bg-secondary cursor-pointer dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 h-10 w-10 items-center"
          onClick={() => setHandleModal("")}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="sm:p-3">
        <p className="text-24 text-blue-300 font-500 leading-7 dark:text-white">
          Transaction Limits
        </p>
        <div className="p-5 bg-gray-100 dark:bg-white/5 rounded-xl mt-5">
          <div className="flex gap-2 items-center">
            <IconCardLimit className="h-4 w-4 sm:w-6 sm:h-6 text-blue-300 dark:text-white" />
            <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white">
              ATM Withdrawals Limits
            </p>
          </div>
          <div className="mt-4 divide-y divide-secondary dark:divide-white/15">
            <div className="flex items-center justify-between pb-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Daily
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €{currentCardDetail?.limits?.dailyWithdrawal.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Weekly
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €{currentCardDetail?.limits?.weeklyWithdrawal.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Monthly
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €{currentCardDetail?.limits?.monthlyWithdrawal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-gray-100 dark:bg-white/5 rounded-xl my-2">
          <div className="flex gap-2 items-center">
            <UilGlobe className="h-4 w-4 sm:w-6 sm:h-6 text-blue-300 dark:text-white" />
            <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white">
              Online Purchases Limits
            </p>
          </div>
          <div className="mt-4 divide-y divide-secondary dark:divide-white/15">
            <div className="flex items-center justify-between pb-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Daily
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €
                {currentCardDetail?.limits?.dailyInternetPurchase.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Weekly
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €
                {currentCardDetail?.limits?.weeklyInternetPurchase.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Monthly
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €
                {currentCardDetail?.limits?.monthlyInternetPurchase.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-gray-100 dark:bg-white/5 rounded-xl">
          <div className="flex gap-2 items-center">
            <IconContactless className="h-4 w-4 sm:w-6 sm:h-6 text-blue-300 dark:text-white" />
            <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white">
              Contactless Purchases Limits
            </p>
          </div>
          <div className="mt-4 divide-y divide-secondary dark:divide-white/15">
            <div className="flex items-center justify-between pb-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Daily
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €
                {currentCardDetail?.limits?.dailyContactlessPurchase.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Weekly
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €
                {currentCardDetail?.limits?.weeklyContactlessPurchase.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
                Monthly
              </p>
              <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                €
                {currentCardDetail?.limits?.monthlyContactlessPurchase.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
