import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { IconFee } from "@/components/icons/IconFee";
import { LIMIT_FEE_MODAL } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleRightB, UilCheck } from "@/icons";
import { useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Link from "next/link";
const data = [
  {
    transactionMonth: 54000.0,
    transactionDay: 9000.0,
    transaction: 9000.0,
    withdrawalMonth: 9000.0,
    withdrawalDay: 1800.0,
    withdrawal: 540.0,
    currentTotalTransaction: 63.0,
  },
];

const LimitFeeModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { cardDetails } = useCardStore();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? LIMIT_FEE_MODAL : "");
  };
  return (
    <CustomModal
      open={modalOpen === LIMIT_FEE_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 pr-3 sm:pr-5 max-h-[600px]"
    >
      <div className="flex gap-x-2 items-center">
        <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
          <IconFee className="h-4 w-4 text-white" />
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          Limits & Fees
        </span>
      </div>
      {data.map((value, index) => (
        <div className="pr-2 sm:px-7 mb-5 mt-6" key={`card-${index}`}>
          <div>
            <p className="text-12 font-500 leading-4 text-blue-300 mb-3 dark:text-white">
              Total Transaction Limit
            </p>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Per Month
              </p>
              <span className="text-12 font-500 leading-4 flex">
                <p className="text-blue-300 dark:text-white">
                  €{readableNumber(cardDetails?.limits?.monthlyPurchase || 0)}{" "}
                  or equivalent
                </p>
              </span>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-12 font-500 leading-4 text-blue-300 mb-3 dark:text-white">
              Transaction Limit (Cards)
            </p>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Per Day
              </p>
              <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                €
                {readableNumber(cardDetails?.limits?.dailyOverallPurchase || 0)}
                *
              </p>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Per Month
              </p>
              <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                €
                {readableNumber(
                  cardDetails?.limits?.monthlyOverallPurchase || 0
                )}
                *
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-12 font-500 leading-4 text-blue-300 mb-3 dark:text-white">
              ATM Withdrawal Limits
            </p>
            <div className="flex justify-between">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Per Month
              </p>
              <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                €{readableNumber(cardDetails?.limits?.monthlyWithdrawal || 0)}**
              </p>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Per Day
              </p>
              <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                €{readableNumber(cardDetails?.limits?.dailyWithdrawal || 0)}**
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-12 font-500 leading-4 text-blue-300 mb-3 dark:text-white">
              Fees
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="bg-gray-100 rounded-[24px] p-3 pb-4 flex flex-col justify-between h-[120px] dark:bg-white/5">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 ">
                      Free ATM Withdrawals
                    </p>
                    <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                      Up to 3 per month, €1.99 after
                    </p>
                  </div>
                  <Link
                    href={""}
                    className="w-8 h-8 flex justify-center items-center bg-secondary rounded-full dark:bg-white/15"
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </Link>
                </div>
                <progress value="" max="100" className="h-1 w-full"></progress>
              </div>
              <div className="bg-gray-100 rounded-[24px] p-3 pb-4 flex flex-col justify-between h-[120px] dark:bg-white/5">
                <div className="flex justify-between">
                  <p className="text-12 font-500 leading-4 text-blue-300 w-10/12 dark:text-white">
                    Free Foreign Currency Exchange Up to €5,000.00 per month,
                    0.5% after
                  </p>
                  <Link
                    href={""}
                    className="w-8 h-8 flex justify-center items-center bg-secondary rounded-full dark:bg-white/15"
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </Link>
                </div>
                <div className="text-12 font-500 leading-4 flex">
                  <p className="text-gray-300 dark:text-white/30">
                    €{readableNumber(0.0)}
                  </p>
                  &nbsp;/&nbsp;
                  <p className="text-bluse-300">€{readableNumber(5000.0)}</p>
                </div>
                <progress value="" max="100" className="h-1 w-full"></progress>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Monthly Fee
              </p>
              <div className="flex gap-2">
                <span className="h-4 w-4 bg-primary flex justify-center items-center rounded-full">
                  <UilCheck className="text-white h-3 w-3" />
                </span>
                <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                  No Charge
                </p>
              </div>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Annual Fee
              </p>
              <div className="flex gap-2">
                <span className="h-4 w-4 bg-primary flex justify-center items-center rounded-full">
                  <UilCheck className="text-white h-3 w-3" />
                </span>
                <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                  No Charge
                </p>
              </div>
            </div>
            <hr className="border-secondary my-3 dark:border-white/15" />
            <div className="flex justify-between">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Delivery Fee
              </p>
              <div className="flex gap-2">
                <span className="h-4 w-4 bg-primary flex justify-center items-center rounded-full">
                  <UilCheck className="text-white h-3 w-3" />
                </span>
                <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                  No Charge
                </p>
              </div>
            </div>
          </div>
          <Button
            className="bg-primary px-6 py-4 text-white text-16 font-700 leading-5 mt-10 flex mx-auto"
            onClick={() => setHandleModal("")}
          >
            Upgrade Tier
          </Button>
        </div>
      ))}
    </CustomModal>
  );
};

export default LimitFeeModal;
