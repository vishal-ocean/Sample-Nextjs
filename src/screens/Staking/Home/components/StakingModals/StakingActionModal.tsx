import CustomModal from '@/components/CustomModal';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import IconTimeCoinWithdraw from '@/components/icons/IconTimeCoinWithdraw';
import {
  STAKING_ACTION_MODAL,
  STAKING_MODAL,
  UNSTAKE_MODAL
} from '@/constants';
import { UilTimes } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';

const StakingActionModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? STAKING_ACTION_MODAL : '');
  };
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 !rounded-[24px] max-w-[520px]"
      open={modalOpen === STAKING_ACTION_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
    >
      <div className="flex items-center justify-between">
        <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
          Assets
        </p>
        <div
          className="h-7 w-7 flex items-center justify-center rounded-full bg-secondary text-blue-300 dark:text-white dark:bg-white/15"
          onClick={() => setHandleModal('')}
        >
          <UilTimes className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3">
        <div
          className="flex items-center gap-3"
          onClick={() => setHandleModal(UNSTAKE_MODAL)}
        >
          <span className="h-7 w-7 flex items-center justify-center rounded-full bg-secondary text-blue-300 dark:text-white dark:bg-white/15">
            <IconTimeCoinWithdraw className="h-4 w-4" />
          </span>
          <p className="text-14 font-500 leading-4 text-blue-300 dark:text-white">
            Withdraw
          </p>
        </div>
        <hr className="border-gray-300 border-opacity-10 my-4" />
        <div
          className="flex items-center gap-3"
          onClick={() => setHandleModal(STAKING_MODAL)}
        >
          <span className="h-7 w-7 flex items-center justify-center rounded-full bg-secondary text-blue-300 dark:text-white dark:bg-white/15">
            <IconTimeCoinDeposit className="h-4 w-4" />
          </span>
          <p className="text-14 font-500 leading-4 text-blue-300 dark:text-white">
            Stake
          </p>
        </div>
      </div>
    </CustomModal>
  );
};

export default StakingActionModal;
