import { ASSET_FILTER_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { UilCheck, UilTimes } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore } from "@/store/useCryptoStore";
import Image from "next/image";
import CustomModal from "./CustomModal";
interface AssetFilterModalProps {
  filterOption: {
    chainId: "All" | string | null;
    search: string;
    ShowZeroBalance: boolean;
  };
  setFilterOption: React.Dispatch<
    React.SetStateAction<{
      chainId: "All" | string | null;
      search: string;
      ShowZeroBalance: boolean;
    }>
  >;
  isDashboardFilter?: boolean;
}
const AssetFilterModal = ({
  filterOption,
  setFilterOption,
  isDashboardFilter = false,
}: AssetFilterModalProps) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ASSET_FILTER_MODAL : "");
  };
  const { chainNetworkList } = useCryptoStore();

  const chainNetworkListData = isDashboardFilter
    ? chainNetworkList
    : Array.isArray(chainNetworkList)
    ? chainNetworkList?.filter(
        (val: any) =>
          val.name !== "Ethereum" &&
          val.name !== "Polygon" &&
          val.name !== "Bitcoin"
      )
    : [];

  return (
    <CustomModal
      className="w-full rounded-t-[32px] bottom-0 rounded-b-none max-w-[920px]"
      open={modalOpen === ASSET_FILTER_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
    >
      <div className="flex justify-between items-center">
        <span className="text-blue-300 dark:text-white font-500 text-16 leading-5">
          Chains
        </span>
        <div
          className="flex bg-secondary dark:bg-white/15 disabled:text-gray-300 text-blue-300 rounded-full !p-0 w-7 h-7 items-center cursor-pointer"
          onClick={() => setHandleModal("")}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>

      <div className="flex flex-col divide-y divide-gray-300/10">
        {/* <div
          className="w-full flex justify-between items-center py-0 cursor-pointer mt-2 pb-4"
          onClick={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              chainId: "All",
            }));
            setHandleModal("");
          }}
        >
          <div className="flex gap-x-4 items-center">
            <div className="rounded-full h-7 w-7 bg-secondary dark:bg-white/10 flex justify-center items-center">
              <UilCircleLayer className="h-4 w-4" />
            </div>
            <span className="font-500 text-blue-300 dark:text-white">All</span>
          </div>
          {filterOption.chainId === "All" && (
            <span className="bg-primary rounded-full h-4 w-4 flex justify-center items-center">
              <UilCheck className="text-white h-3 w-3" />
            </span>
          )}
        </div> */}
        {chainNetworkListData?.map((item: any, index: number) => (
          <div
            className="w-full flex justify-between items-center cursor-pointer py-4 last:pb-0"
            onClick={() => {
              setFilterOption((prev: any) => ({
                ...prev,
                chainId: item.name,
              }));
              setHandleModal("");
            }}
            key={`chainDropdown-${index}`}
          >
            <div className="flex gap-x-4 items-center">
              <div className="rounded-3xl h-7 w-7 relative bg-secondary dark:bg-white/10 flex justify-center items-center">
                <Image
                  width={16}
                  height={16}
                  src={AssetImages[item?.shortName || "ETH"]}
                  alt="image"
                />
              </div>
              <div className="flex flex-col leading-5">
                <span className="font-500 text-blue-300 dark:text-white text-14 leading-4">
                  {item.shortName}
                </span>
                <span className="font-500 text-gray-300 dark:text-white/30 text-12 leading-4">
                  {item.name}
                </span>
              </div>
            </div>
            {filterOption?.chainId === item.name && (
              <span className="bg-primary rounded-full h-4 w-4 flex justify-center items-center">
                <UilCheck className="text-white h-3 w-3" />
              </span>
            )}
          </div>
        ))}
      </div>
    </CustomModal>
  );
};

export default AssetFilterModal;
