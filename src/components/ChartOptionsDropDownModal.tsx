import { UilCheckCircle } from '@/icons';

import { CHART_OPTIONS_DROPDOWN } from '@/constants';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import CustomModal from './CustomModal';

const FILTER_ITEMS = [
  {
    name: 'APY',
    value: 'APY'
  },
  {
    name: 'TVL',
    value: 'TVL'
  },
  {
    name: 'Price',
    value: 'Price'
  }
];

interface ChartOptionsDropDownModalProps {
  options: string;
  setOptions: React.Dispatch<React.SetStateAction<string>>;
}
const ChartOptionsDropDownModal: React.FC<ChartOptionsDropDownModalProps> = ({
  options,
  setOptions
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CHART_OPTIONS_DROPDOWN : '');
  };
  return (
    <CustomModal
      className="p-6 w-full rounded-t-[32px] bottom-0 rounded-b-none"
      open={modalOpen === CHART_OPTIONS_DROPDOWN}
      onOpenChange={handleOpenChange}
    >
      <span className="text-24 text-blue-300 font-500 leading-7 dark:text-white">
        Options Chart
      </span>
      <div className="flex flex-col gap-y-5 mt-6">
        {FILTER_ITEMS.map((item, index) => (
          <div
            className="flex justify-between cursor-pointer items-center "
            onClick={() => {
              setOptions(item.value);
              setHandleModal('');
            }}
            key={`filterItem-${index}`}
          >
            <span className="text-16 text-blue-300 leading-4 dark:text-white">
              {item.name}
            </span>
            {options === item.value && (
              <UilCheckCircle className="w-4 h-4 text-primary" />
            )}
          </div>
        ))}
      </div>
    </CustomModal>
  );
};

export default ChartOptionsDropDownModal;
