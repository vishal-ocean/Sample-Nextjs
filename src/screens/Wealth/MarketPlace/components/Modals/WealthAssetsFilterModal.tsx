import CustomModal from "@/components/CustomModal";
import { IconRoundedCheck } from "@/components/icons/IconRoundedCheck";
import { WEALTH_ASSETS_FILTER_MODAL } from "@/constants";
import { UilTimes } from "@/icons";
import { useTabItems } from "@/screens/Wealth/MarketPlace/components/useTabItems";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";

const WealthAssetsFilterModal = ({
  filterOption,
  setFilterOption,
}: {
  filterOption: string;
  setFilterOption: (option: string) => void;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? WEALTH_ASSETS_FILTER_MODAL : "");
  };
  const { tabItems } = useTabItems();
  return (
    <CustomModal
      open={modalOpen === WEALTH_ASSETS_FILTER_MODAL}
      onOpenChange={handleOpenChange}
      className="w-full p-5 translate-y-0 sm:-translate-y-1/2 bottom-0 sm:bottom-auto"
      withoutClose
    >
      <div className="flex justify-between items-center">
        <p className="sm:text-24 font-500 leading-5 text-16 sm:leading-10 text-blue-300 dark:text-white">
          Wealth Assets
        </p>
        <div
          className="flex bg-secondary cursor-pointer disabled:text-gray-300 dark:bg-white dark:bg-opacity-15 text-black rounded-full !p-0 h-7 w-7 sm:w-10 sm:h-10 items-center"
          onClick={() => setHandleModal("")}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>

      <div className="flex flex-col mt-3">
        {tabItems.map((item, index) => (
          <>
            <div
              className={cn(
                "cursor-pointer flex justify-between items-center",
                "cursor-not-allowed"
              )}
              key={`tab-${index}`}
              onClick={() => {
                if (item.tab === "real-estate") {
                  setFilterOption(item.tab);
                  setHandleModal("");
                }
              }}
            >
              <div className="flex gap-3 items-center">
                <span className="h-7 w-7 flex justify-center items-center bg-secondary dark:bg-white/10 dark:text-white rounded-full text-blue-300">
                  {item.icon}
                </span>
                <span className="text-14 font-500 text-blue-300 leading-4 dark:text-white">
                  {item?.tabName}
                </span>{" "}
              </div>
              {filterOption === item?.tab && (
                <IconRoundedCheck className="text-primary h-4 w-4" />
              )}
            </div>
            {index !== tabItems.length - 1 && (
              <hr className="my-3 border-gray-300/10 dark:border-white/15" />
            )}
          </>
        ))}
      </div>
    </CustomModal>
  );
};

export default WealthAssetsFilterModal;
