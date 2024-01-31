import { UilTimes } from "@/icons";

import { CHART_FILTER_DROPDOWN } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import CustomModal from "./CustomModal";
import { IconRoundedCheck } from "./icons/IconRoundedCheck";

const FILTER_ITEMS = [
  {
    name: "1 Month",
    value: "1M",
  },
  {
    name: "6 Months",
    value: "6M",
  },
  {
    name: "1 Year",
    value: "1Y",
  },
  {
    name: "All Time",
    value: "All",
  },
];

interface ChartDropDownModalProps {
  range: string;
  setRange: React.Dispatch<React.SetStateAction<string>>;
}
const ChartDropDownModal: React.FC<ChartDropDownModalProps> = ({
  range,
  setRange,
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CHART_FILTER_DROPDOWN : "");
  };
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 rounded-b-none"
      open={modalOpen === CHART_FILTER_DROPDOWN}
      onOpenChange={handleOpenChange}
      withoutClose
    >
      <div className="flex justify-between items-center">
        <span className="text-16 text-blue-300 dark:text-white font-500 leading-5">
          Balance Chart
        </span>
        <div
          className="flex bg-secondary dark:bg-white/15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center cursor-pointer"
          onClick={() => setHandleModal("")}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="flex flex-col mt-2 divide-y divide-gray-300/10 dark:divide-white/15">
        {FILTER_ITEMS.map((item, index) => (
          <div
            className="flex justify-between cursor-pointer items-center py-4 first:pt-0 last:pb-0"
            onClick={() => {
              setRange(item.value);
              setHandleModal("");
            }}
            key={`filterItem-${index}`}
          >
            <span className="text-16 text-blue-300 dark:text-white font-500  leading-4">
              {item.name}
            </span>
            {range === item.value && (
              <IconRoundedCheck className="text-primary h-4 w-4" />
            )}
          </div>
        ))}
      </div>
    </CustomModal>
  );
};

export default ChartDropDownModal;
