import CustomModal from "@/components/CustomModal";
import Alert from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import { PercentageButton } from "@/components/UI/PercentageButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { Input } from "@/components/UI/form/Input";
import { default as IconTimeCoinWithdraw } from "@/components/icons/IconTimeCoinWithdraw";
import { UNSTAKE_MODAL, UNSTAKE_WARNING_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { UilAngleUp, UilCheckCircle } from "@/icons";
import {
  useActivateUnStakeMutation,
  usePreUnStakeMutation,
  useStakeDataListMutation,
} from "@/services/useStake";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useStakingStore, useStakingStoreAction } from "@/store/stakingStore";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { default as Image } from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const title: Record<string, string> = {
  ETH: "Ethereum",
  USDT: "Tether",
};

const validationSchema = Yup.object({
  amount: Yup.number()
    .typeError("Amount is required.")
    .required("Amount is required."),
});
const UnstakeModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { selectedStake, stakeDataList } = useStakingStore();
  const getStakedDataListMutation = useStakeDataListMutation();
  const preUnStakeMutation = usePreUnStakeMutation();
  const activateUnStakeMutation = useActivateUnStakeMutation();
  const { setSelectedStake } = useStakingStoreAction;

  const [selectedStakedData, setSelectedStakedData] = useState<any>();
  const [openStakedDataListDropdown, setOpenStakedDataListDropdown] =
    useState(false);

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? UNSTAKE_MODAL : "");
  };
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleAmountChange = async (percentage: number) => {
    setValue(
      "amount",
      (Number(selectedStakedData?.staked || 0) * percentage) / 100
    );
  };

  const onSubmit = (data: any) => {
    if (Number(data?.amount) > Number(selectedStakedData?.staked)) {
      toast.error("Insufficient funds for unstake");
      return;
    }
    setSelectedStake({
      ...selectedStake,
      ...data,
      ...selectedStakedData,
      userUnstakeId: preUnStakeMutation?.data?.userUnstakeId,
    });

    // check if unstake before locking period
    if (moment().isBefore(moment(selectedStakedData?.lockedTill))) {
      setHandleModal(UNSTAKE_WARNING_MODAL);
    } else {
      activateUnStakeMutation?.mutate({
        userUnstakeId: preUnStakeMutation?.data?.userUnstakeId,
      });
    }
  };

  useEffect(() => {
    if (Number(watch("amount")) > 0) {
      preUnStakeMutation?.mutate({
        userStakeId: selectedStakedData?.userStakeId,
        amount: Number(watch("amount")),
        currency: "EUR",
      });
    }
  }, [watch("amount")]);

  useEffect(() => {
    if (selectedStake?.stakeId) {
      getStakedDataListMutation.mutate({
        stakeId: selectedStake?.stakeId,
      });
    }
  }, [selectedStake?.stakeId]);
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 !rounded-[24px] max-w-[520px]"
      open={modalOpen === UNSTAKE_MODAL}
      onOpenChange={handleOpenChange}
    >
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 items-center">
        <Image
          src={AssetImages[selectedStake?.assetName || "ETH"]}
          height={40}
          width={40}
          alt="ETH"
        />
        <div className="w-10 h-10 rounded-full bg-secondary flex justify-center items-center dark:bg-white/10">
          <IconTimeCoinWithdraw
            className="w-4 h-4 text-blue-300 dark:text-white"
            strokeWidth={1.2}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
            Unstake {title[selectedStake?.assetName]}
          </span>
          <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            {selectedStake?.assetName}
          </span>
        </div>
      </div>
      <Alert
        type="warning"
        title="Staking period hasn’t finished"
        subTitle="If you withdraw now you will be subjected to higher fee for withdrawing earlier than staking period"
      />
      <form className="mt-3 sm:mx-7 mx-0" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-3">
          <div className="flex gap-x-1">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Staked list
            </span>
          </div>
          <div className="flex flex-col">
            <div
              className="p-4 rounded-[16px] bg-gray-100 w-full flex justify-between cursor-pointer dark:bg-white/5"
              onClick={() =>
                setOpenStakedDataListDropdown(!openStakedDataListDropdown)
              }
            >
              <span className="text-blue-300 font-700 leading-5 dark:text-white">
                {selectedStakedData
                  ? `${selectedStakedData?.assetName} - ${selectedStakedData?.userStakeId}`
                  : "Select Stake"}
              </span>
              <div
                className={cn(
                  "h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-blue-300 rotate-180 dark:text-white dark:bg-white/10",
                  openStakedDataListDropdown &&
                    "bg-blue-300 text-white rotate-0 dark:bg-white dark:text-blue-300"
                )}
              >
                <UilAngleUp className="h-6 w-6" />
              </div>
            </div>
            <Popover
              open={openStakedDataListDropdown}
              // onOpenChange={(e) => setOpenSwapMethodDropdown(e)}
            >
              <PopoverTrigger />
              <PopoverContent
                className={cn(
                  "sm:bg-secondary/50 bg-secondary sm:backdrop-blur-[16px] p-4 rounded-[16px] sm:w-[424px] w-[360px] mt-0 flex flex-col dark:bg-gray-250/10 dark:border-none"
                )}
                align={"center"}
              >
                {stakeDataList?.map((item: any, index: number) => (
                  <div
                    className="cursor-pointer text-14 font-700 leading-4 text-blue-300 flex justify-between dark:text-white py-3"
                    onClick={() => {
                      setOpenStakedDataListDropdown(false);
                      setSelectedStakedData(item);
                      reset();
                    }}
                    key={index}
                  >
                    <div className="flex flex-col">
                      <span>
                        {item?.assetName} - {item?.userStakeId}
                      </span>
                      <span>
                        {item?.staked} {item?.assetName}
                      </span>
                    </div>
                    {selectedStakedData?.userStakeId === item.userStakeId && (
                      <UilCheckCircle className="text-primary h-4 w-4" />
                    )}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 mt-5">
          <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
            Amount to Unstake
          </span>
          <div className="relative">
            <span className="absolute top-[17px] left-4 text-16 font-700 text-gray-300 leading-5 z-10 dark:text-white/30">
              {selectedStake?.assetName}
            </span>
            <Input
              className="py-4 pl-[56px] rounded-[16px] text-16 font-700 bg-gray-100 text-blue-300 border-none leading-5 dark:text-white dark:bg-white/5"
              register={register("amount")}
              errorMessage={errors?.amount?.message}
              errorIconClass="!top-[18px]"
            />
          </div>
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Available {selectedStakedData?.staked || 0}{" "}
              {selectedStakedData?.assetName}
            </span>
            <span className="flex gap-x-2">
              <PercentageButton
                percentage={25}
                onClick={() => handleAmountChange(25)}
              />
              <PercentageButton
                percentage={50}
                onClick={() => handleAmountChange(50)}
              />
              <PercentageButton
                percentage={100}
                onClick={() => handleAmountChange(100)}
              />
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-y-3">
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Unstaking
            </span>
            <div className="flex gap-x-2">
              <Image
                src={AssetImages[selectedStake?.assetName]}
                height={16}
                width={16}
                alt="ETH"
              />
              <span className="text-12 font-500 text-blue-300 leading-4 dark:text-white">
                {title[selectedStake?.assetName]}
              </span>
            </div>
          </div>
          <hr className="border-secondary border" />
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Fee
            </span>
            {preUnStakeMutation?.isLoading ? (
              <div className="animate-pulse">
                <div className="h-3 w-6" />
              </div>
            ) : (
              <span className="text-12 font-500 text-blue-300 leading-4 dark:text-white">
                €{preUnStakeMutation?.data?.feeFiat || 0}
              </span>
            )}
          </div>
          <hr className="border-secondary border" />
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Staking Period
            </span>
            <span className="text-12 font-500 text-blue-300 leading-4 dark:text-white">
              {selectedStakedData?.duration || 0} days
            </span>
          </div>
        </div>
        <div className="mb-7 sm:mt-10 mt-[92px] flex justify-center">
          <Button
            type="submit"
            className="rounded-full py-4 px-6 font-700 leading-5"
            disabled={!selectedStakedData || preUnStakeMutation?.isLoading}
            // onClick={() => setHandleModal(UNSTAKE_WARNING_MODAL)}
          >
            Unstake {title[selectedStake?.assetName]}
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default UnstakeModal;
