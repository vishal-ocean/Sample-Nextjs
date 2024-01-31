import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { UNSTAKE_WARNING_MODAL } from "@/constants";
import { useActivateUnStakeMutation } from "@/services/useStake";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useStakingStore, useStakingStoreAction } from "@/store/stakingStore";
import Image from "next/image";

const UnstakeWarningModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { selectedStake } = useStakingStore();
  const { setSelectedStake } = useStakingStoreAction;
  const activateUnStakeMutation = useActivateUnStakeMutation();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? UNSTAKE_WARNING_MODAL : "");
  };

  const handleUnstake = () => {
    activateUnStakeMutation?.mutate({
      userUnstakeId: selectedStake?.userUnstakeId,
    });
  };
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 !rounded-[24px] max-w-[560px]"
      open={modalOpen === UNSTAKE_WARNING_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
    >
      <div className="h-10 w-10 rounded-full flex justify-center items-center bg-orange-50">
        <Image
          src="/images/svg/icon-warning-alert.svg"
          height={16}
          width={16}
          alt="alert-icon"
          className=""
        />
      </div>
      <div className="mt-5 mb-7 flex justify-center items-center flex-col gap-y-3">
        <span className="text-24 font-500 text-blue-300 leading-8 dark:text-white">
          Staking period hasn’t finished
        </span>
        <span className="sm:w-[356px] text-16 text-gray-300 font-500 leading-5 text-center dark:text-white/30">
          If you withdraw now you will be subjected to higher fee for
          withdrawing earlier than staking period
        </span>
        <div className="flex gap-x-2 mt-7">
          <Button
            variant={"secondary"}
            className="py-4 px-6 text-16 font-700 leading-5 dark:bg-white/15 dark:text-white"
            onClick={() => {
              setHandleModal("");
              setSelectedStake({});
            }}
          >
            Cancel
          </Button>
          <Button
            className="py-4 px-6 text-16 font-700 leading-5"
            onClick={handleUnstake}
            isLoading={activateUnStakeMutation.isLoading}
          >
            Unstake anyways
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default UnstakeWarningModal;
