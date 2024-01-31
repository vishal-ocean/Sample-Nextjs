import { UilTimes } from '@/icons';

import CustomModal from '@/components/CustomModal';
import { IconRoundedCheck } from '@/components/icons/IconRoundedCheck';
import { YIELD_CHART_FILTER_MODAL } from '@/constants';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';

interface ChartDropDownModalProps {
  chartFilter: string;
  setChartFilter: React.Dispatch<React.SetStateAction<string>>;
}
export const YieldChartFilter: React.FC<ChartDropDownModalProps> = ({
  chartFilter,
  setChartFilter
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? YIELD_CHART_FILTER_MODAL : '');
  };
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 rounded-b-none"
      open={modalOpen === YIELD_CHART_FILTER_MODAL}
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
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="flex flex-col mt-2 divide-y divide-gray-300/10 dark:divide-white/15">
        {['Token', 'Chain', 'Platform'].map((item, index) => (
          <div
            className="flex justify-between cursor-pointer items-center py-4 first:pt-0 last:pb-0"
            onClick={() => {
              setChartFilter(item);
              setHandleModal('');
            }}
            key={`filterItem-${index}`}
          >
            <span className="text-16 text-blue-300 font-500 leading-4 dark:text-white">
              {item}
            </span>
            {chartFilter === item && (
              <IconRoundedCheck className="text-primary h-4 w-4" />
            )}
          </div>
        ))}
      </div>
    </CustomModal>
  );
};
