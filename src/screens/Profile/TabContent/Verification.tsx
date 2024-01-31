import { IconRoundedCheck } from "@/components/icons/IconRoundedCheck";
import { CHANGE_PASSWORD } from "@/constants";
import { UilCheck, UilUserPlus } from "@/icons";
import { useProfileStaticData } from "../useProfileStaticData";

const Limit = [
  {
    type: "Saving Wallet",
    cryptocurrencyTopUp: "Unlimited",
    cryptocurrencyWithdraw: "€500,000.00/Day",
    bankTransferTopUp: "€2,000,000.00/Transfer",
    bankTransferWithdraw: "€100,000.00/Day",
  },
  {
    type: "Credit Line Wallet",
    cryptocurrencyTopUp: "Unlimited",
    cryptocurrencyWithdraw: "€2,000,000.00",
    bankTransferTopUp: "-",
    bankTransferWithdraw: "-",
  },
];
type VerificationProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};

export const Verification = ({
  modalOpen,
  setHandleModal,
}: VerificationProps) => {
  const { FEATURES_CARD, Information } = useProfileStaticData();

  return (
    <div className="mt-10 grid gap-y-10">
      <div>
        <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
          Personal Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3">
          <div className="p-5 bg-white dark:bg-white/10 rounded-[16px]">
            <div className="flex justify-between items-center">
              <UilUserPlus className="h-4 w-4 text-blue-300 dark:text-white" />
              <IconRoundedCheck className="h-4 w-4 text-success-200 " />
            </div>
            <p className="mt-10 text-blue-300 dark:text-white text-16 font-500 leading-5">
              Your identity is verified
            </p>
            <p className="mt-0.5 text-gray-300 dark:text-white/15 text-12 font-500 leading-4">
              KYC submitted successfully
            </p>
          </div>
          {Information.map((item, index) => (
            <div
              className="p-5 bg-white rounded-[16px] dark:bg-white/10"
              key={index}
            >
              <div className="flex justify-between items-center">
                {item.icon}
                {item.status === "complete" ? (
                  item.completedIcon
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => setHandleModal(CHANGE_PASSWORD)}
                  >
                    {item.editIcon}
                  </span>
                )}
              </div>
              <p className="mt-10 text-blue-300 dark:text-white text-16 font-500 leading-5">
                {item.content}
              </p>
              <p className="mt-0.5 text-gray-300 dark:text-white/15 text-12 font-500 leading-4">
                {item.subContent}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
          Features
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 my-3">
          {FEATURES_CARD.map((item, index) => (
            <div
              className="p-5 bg-white dark:bg-white/10 grid grid-cols-[1fr_auto] gap-1 justify-between rounded-[16px] items-center"
              key={index}
            >
              <div className="flex gap-x-6 items-center">
                <div className="h-10 w-10 rounded-full flex justify-center items-center bg-primary/10">
                  {item.icon}
                </div>
                <span>
                  <p className="text-blue-300 dark:text-white text-16 font-500 leading-5">
                    {item.title}
                  </p>
                  <p className="text-gray-300 dark:text-white/30 text-12 font-500 leading-4">
                    {item.description}
                  </p>
                </span>
              </div>
              <div className="h-4 w-4 bg-success-200 flex justify-center items-center rounded-full">
                <UilCheck className="h-3 w-3 text-white" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
          * Please kindly check the product availability in your region.
        </p>
      </div>
    </div>
  );
};
