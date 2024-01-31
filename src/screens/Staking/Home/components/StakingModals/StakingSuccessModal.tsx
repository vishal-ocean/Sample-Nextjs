import CustomModal from "@/components/CustomModal";
import ProcessingLoader from "@/components/Loaders/ProcessingLoader";
import { Button } from "@/components/UI/Button";
import IconTimeCoinDeposit from "@/components/icons/IconTimeCoinDeposit";
import { STAKING_SUCCESS_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { UilCheck } from "@/icons";
import { useStakeListMutation } from "@/services/useStake";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useStakingStore } from "@/store/stakingStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const title: Record<string, string> = {
  ETH: "Ethereum",
  USDT: "Tether",
};

const StakingSuccessModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { selectedStake } = useStakingStore();
  const getStakeListMutation = useStakeListMutation();
  const [loading, setLoading] = useState(true);
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? STAKING_SUCCESS_MODAL : "");
  };

  useEffect(() => {
    getStakeListMutation.mutate();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const handleButtonClick = () => {
    setHandleModal("");
  };
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 !rounded-[24px] max-w-[520px]"
      open={modalOpen === STAKING_SUCCESS_MODAL}
      onOpenChange={handleOpenChange}
    >
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 items-center">
        {loading ? (
          <Image
            src={AssetImages[selectedStake?.assetName || "ETH"]}
            height={40}
            width={40}
            alt="ETH"
          />
        ) : (
          <div className="w-10 h-10 bg-success-200 flex justify-center items-center rounded-full">
            <UilCheck className="text-white w-4 h-4" />
          </div>
        )}
        <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center">
          <IconTimeCoinDeposit
            className="w-4 h-4 text-white"
            strokeWidth={1.2}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
            Stake {title[selectedStake?.assetName]}
          </span>
          <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            {selectedStake?.assetName}
          </span>
        </div>
      </div>
      {loading ? (
        <div className="mx-auto text-center">
          <div className="my-10">
            <h3 className="text-24 font-500 text-blue-300 dark:text-white">
              Processing
            </h3>
            <p className="text-blue-300/60 font-500 text-16 dark:text-white/60">
              It might take a while
            </p>
          </div>
          <div className="mb-10">
            <ProcessingLoader />
          </div>
        </div>
      ) : (
        <div className="text-center mx-auto mt-6 sm:mt-8 flex flex-col">
          <span className="text-16 font-500 text-success-200 mb-6">
            All is done
          </span>
          <span className="text-24 font-500 text-blue-300 leading-[120%] dark:text-white">
            You staked {Number(selectedStake?.amount.toFixed(8))}{" "}
            {selectedStake?.assetName}
          </span>
          <span className="w-[269px] text-center self-center text-16 text-blue-300/60 font-500 mt-2 leading-[120%] dark:text-white/60">
            You can see your stakes in <br />
            <Link href="/staking" onClick={() => setHandleModal("")}>
              <span className="text-primary underline">Staking Dashboard</span>
            </Link>
          </span>
          <Button
            variant="secondary"
            className="mb-7 font-700 text-blue-300 mt-11 w-fit px-6 py-4 self-center leading-4
            dark:text-white dark:bg-white/15"
            onClick={handleButtonClick}
          >
            OK
          </Button>
        </div>
      )}
    </CustomModal>
  );
};

export default StakingSuccessModal;
