import CustomModal from '@/components/CustomModal';
import { YIELD_ASSETS_MODAL } from '@/constants';
import { UilTimes } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';

export const YieldAssetsModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? YIELD_ASSETS_MODAL : '');
  };
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 rounded-b-none"
      open={modalOpen === YIELD_ASSETS_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
    >
      <div className="flex justify-between items-center">
        <span className="text-16 text-blue-300 font-500 leading-5 dark:text-white">
          Balance Chart
        </span>
        <div
          className="flex bg-secondary disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center cursor-pointer dark:bg-white/15 dark:text-white"
          onClick={() => setHandleModal('')}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 " />
        </div>
      </div>
    </CustomModal>
  );
};
