// import LineCharts from "@/components/LineChart";
import ImageStack from "@/components/ImageStack";
import { FullTableSkeleton } from "@/components/Loaders/TableSkeleton";
import { Portal } from "@/components/Portal";
import { Button } from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/Dropdown";
import { ASSETS_LISTING_ACTION_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { getModifiedAssetsData } from "@/helper/getModifiedAssetsData";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleDown, UilEllipsisH } from "@/icons";
import NoTransactionData from "@/screens/Transactions/components/NoTransactionData";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore, useCryptoStoreActions } from "@/store/useCryptoStore";
import { cn } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AssetsActionsModal from "./AssetsActionsModal";
import { useAssets } from "./useAssets";

type AssetsListingData = {
  assetsOnOtherChains: any;
  balance: number;
  balanceFiat: number;
  chartData: any;
  dynamic: number;
  id: number;
  marketPrice: number;
  name: string;
  shortName: string;
};

function getScreenWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0; // Default value for SSR
}
interface AssetsListingProps {
  data: AssetsListingData[];
  isLoading: boolean;
  isRefetching: boolean;
  filterOption: any;
}
const AssetsListing = ({
  data,
  isLoading,
  isRefetching,
  filterOption,
}: AssetsListingProps) => {
  const { TRADE_DROPDOWN_ITEMS } = useAssets();
  const HEADERS = ["Asset", "Chain", "Balance", "Market Price", ""];
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const { setAssetDetailsData } = useCryptoStoreActions;
  const [tableData, setTableData] = useState<AssetsListingData[]>(data);
  const { chainNetworkList } = useCryptoStore();
  const [openChainList, setOpenChainList] = useState<any>([]);
  const { modalOpen } = useHandleModalStore();
  const router = useRouter();
  const screenWidth = getScreenWidth();

  useEffect(() => {
    if (isOpenDropdown) {
      document.body.classList.add("!m-0");
      document.body.classList.add("!overflow-y-auto");
    }
  }, [isOpenDropdown]);
  useEffect(() => {
    if (data) {
      const modifiedData = getModifiedAssetsData(data);
      setTableData(modifiedData);
    }
  }, [data]);
  const getImages = (item: any) => {
    const otherChainImages = item?.assetsOnOtherChains?.map(
      (x: any) =>
        AssetImages[
          chainNetworkList?.filter((y) => y?.id === x?.chainId)?.[0]?.shortName
        ]
    );
    return [...otherChainImages];
  };

  useEffect(() => {
    setOpenChainList([]);

    if (Array.isArray(tableData) && tableData.length > 0) {
      const filteredChainData = tableData.filter(
        (val) => val?.assetsOnOtherChains?.length > 0
      );

      if (filterOption.chainId !== "All" && filteredChainData.length > 0) {
        const chainList = filteredChainData.map((val) => val.id);
        setOpenChainList(chainList);
      }
    }
  }, [tableData, filterOption.chainId]);

  return (
    <>
      {isLoading || isRefetching ? (
        <div className="mt-10">
          <FullTableSkeleton />
        </div>
      ) : (
        <>
          <div className="w-full sm:p-6 p-0 mt-2 ">
            <div className="grid grid-cols-[2fr_2.5fr_2fr_4.5fr]">
              {HEADERS.map((item, index) => (
                <div
                  className={cn(
                    "px-[10px] text-12 font-500 text-gray-300 dark:text-white/30 leading-4 md:block hidden w-full",
                    index === 0 && "min-w-[172px]"
                  )}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="w-full">
              {tableData?.length > 0 ? (
                tableData?.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="py-5 mx-[10px] md:hover:mx-0 md:hover:px-[10px] md:hover:rounded-xl grid grid-cols-12 md:grid-cols-[2fr_2.5fr_2fr_3fr_1.5fr] border-b border-b-secondary dark:border-b-white/10 md:hover:bg-gray-100 cursor-pointer dark:hover:bg-white dark:hover:bg-opacity-5 gap-y-4 sm:gap-y-5">
                        <div
                          className="grid grid-cols-[auto_1fr] gap-x-3 xl:w-auto sm:max-w-[190px]"
                          onClick={() => {
                            if (item?.assetsOnOtherChains?.length > 0) {
                              if (openChainList.includes(item?.id)) {
                                setOpenChainList(
                                  openChainList.filter(
                                    (x: number) => x !== item?.id
                                  )
                                );
                              } else {
                                setOpenChainList([...openChainList, item?.id]);
                              }
                            } else {
                              router.push(`/crypto/token-details/${item?.id}`);
                            }
                            // setHandleModal(ASSETS_LISTING_ACTION_MODAL);
                            // setAssetDetailsData(
                            //   data?.filter((x) => x.id === item.id)?.[0]
                            //   );
                          }}
                        >
                          <div className="rounded-3xl h-10 w-10 relative">
                            <Image
                              width={40}
                              height={40}
                              src={AssetImages[item?.shortName]}
                              alt="image"
                            />
                          </div>
                          <div className="flex flex-col leading-5 ">
                            <span className="font-500 text-blue-300 dark:text-white">
                              {item?.shortName}
                            </span>
                            <span className="font-500 text-gray-300 w-20 md:w-[120px] sm:w-[120px] truncate  dark:text-white/30">
                              {item?.shortName === "USDT"
                                ? "Tether USD"
                                : item?.shortName === "LTC"
                                ? "Litecoin"
                                : item?.name}
                            </span>
                          </div>
                        </div>

                        <div
                          className="grid col-span-7 md:grid-cols-1 gap-x-2 items-center md:col-span-1 "
                          onClick={() => {
                            if (item?.assetsOnOtherChains?.length > 0) {
                              if (openChainList.includes(item?.id)) {
                                setOpenChainList(
                                  openChainList.filter(
                                    (x: number) => x !== item?.id
                                  )
                                );
                              } else {
                                setOpenChainList([...openChainList, item?.id]);
                              }
                            } else {
                              router.push(`/crypto/token-details/${item?.id}`);
                            }
                            // setHandleModal(ASSETS_LISTING_ACTION_MODAL);
                            // setAssetDetailsData(
                            //   data?.filter((x) => x.id === item.id)?.[0]
                            //   );
                          }}
                        >
                          <p className="md:hidden block text-12 leading-4 text-gray-300  mb-1">
                            chain
                          </p>
                          <div className="grid grid-cols-[auto_1fr] sm:gap-x-2 items-center gap-x-1 md:grid-cols-[auto] lg:grid-cols-[auto_1fr]">
                            {item?.assetsOnOtherChains?.length > 0 ? (
                              <ImageStack
                                Images={getImages(item)}
                                displayLimit={
                                  item?.assetsOnOtherChains?.length + 1
                                }
                                height={16}
                                width={16}
                                stackContainerClass="-space-x-2"
                                imageContainerClass=""
                                imageClass=""
                              />
                            ) : (
                              <div className="rounded-3xl h-4 w-4 relative">
                                <Image
                                  width={16}
                                  height={16}
                                  src={
                                    AssetImages[
                                      chainNetworkList?.filter(
                                        (x) => x?.id === item?.chainId
                                      )?.[0]?.shortName
                                    ]
                                  }
                                  alt="image"
                                />
                              </div>
                            )}
                            <span className="text-blue-300 dark:text-white font-500 sm:leading-5 sm:text-16 text-12 leading-4 block md:hidden lg:block">
                              {item?.assetsOnOtherChains?.length > 0
                                ? `${item?.assetsOnOtherChains?.length} Chains`
                                : `${
                                    chainNetworkList?.filter(
                                      (x) => x?.id === item?.chainId
                                    )?.[0]?.name
                                  }`}
                            </span>
                          </div>
                        </div>
                        <div
                          className="row-start-1 col-start-6 md:col-span-1 md:col-start-3 col-span-6 px-[10px]"
                          onClick={() => {
                            if (item?.assetsOnOtherChains?.length > 0) {
                              if (openChainList.includes(item?.id)) {
                                setOpenChainList(
                                  openChainList.filter(
                                    (x: number) => x !== item?.id
                                  )
                                );
                              } else {
                                setOpenChainList([...openChainList, item?.id]);
                              }
                            } else {
                              router.push(`/crypto/token-details/${item?.id}`);
                            }
                            // setHandleModal(ASSETS_LISTING_ACTION_MODAL);
                            // setAssetDetailsData(
                            //   data?.filter((x) => x.id === item.id)?.[0]
                            //   );
                          }}
                        >
                          <p
                            className={cn(
                              "font-500 leading-5 text-16 sm:text-start text-end",
                              Number(item?.balanceFiat?.toFixed(2) || 0) > 0
                                ? "text-blue-300 dark:text-white"
                                : "text-gray-300 dark:text-white/30"
                            )}
                          >
                            €
                            {readableNumber(
                              Number(item?.balanceFiat?.toFixed(2) || 0)
                            )}
                          </p>
                          <p className="text-gray-300 font-500 whitespace-nowrap leading-5 text-16 dark:text-white/30  sm:text-start text-end">
                            {`${Number(item.balance.toFixed(6))} ${
                              item?.shortName
                            }`}
                          </p>
                        </div>
                        <div
                          className="flex md:flex-col flex-col md:col-start-4 col-start-9 items-end md:col-span-1 col-span-4 md:items-baseline px-[10px]"
                          onClick={() => {
                            if (item?.assetsOnOtherChains?.length > 0) {
                              if (openChainList.includes(item?.id)) {
                                setOpenChainList(
                                  openChainList.filter(
                                    (x: number) => x !== item?.id
                                  )
                                );
                              } else {
                                setOpenChainList([...openChainList, item?.id]);
                              }
                            } else {
                              router.push(`/crypto/token-details/${item?.id}`);
                            }
                            // setHandleModal(ASSETS_LISTING_ACTION_MODAL);
                            // setAssetDetailsData(
                            //   data?.filter((x) => x.id === item.id)?.[0]
                            //   );
                          }}
                        >
                          <p className="text-gray-300 md:hidden block text-12 leading-4 whitespace-nowrap mb-1">
                            Market Price
                          </p>
                          <div className="flex md:flex-col flex-row gap-x-1">
                            <p className="text-blue-300 font-500 dark:text-white text-12 sm:text-16 whitespace-nowrap order-2 sm:order-1">
                              €
                              {readableNumber(
                                Number(item.marketPrice?.toFixed(2) || 0)
                              )}
                            </p>

                            <p
                              className={cn(
                                "font-500 text-12 sm:text-16 whitespace-nowrap order-1 sm:order-2",
                                item?.dynamic > 0
                                  ? "text-success-200"
                                  : item?.dynamic < 0
                                  ? "text-danger-100"
                                  : "text-blue-300 dark:text-white/30"
                              )}
                            >
                              {item?.dynamic > 0 ? "+" : ""}{" "}
                              {Number(item?.dynamic).toFixed(2)} %
                            </p>
                          </div>
                        </div>
                        <div className="flex sm:justify-end items-center row-start-1 col-start-12 md:col-start-5 justify-center">
                          {item?.assetsOnOtherChains?.length > 0 ? (
                            <Button
                              variant="secondary"
                              className={cn(
                                "h-10 text-blue-300 flex items-center gap-x-2 sm:px-4 px-0 py-0 rounded-full dark:bg-transparent sm:dark:bg-white/10  sm:bg-secondary bg-transparent",
                                openChainList.includes(item?.id) &&
                                  " sm:dark:bg-white sm:bg-blue-300 bg-transparent dark:bg-transparent"
                              )}
                              onClick={() => {
                                if (openChainList.includes(item?.id)) {
                                  setOpenChainList(
                                    openChainList.filter(
                                      (x: number) => x !== item?.id
                                    )
                                  );
                                } else {
                                  setOpenChainList([
                                    ...openChainList,
                                    item?.id,
                                  ]);
                                }
                                // setHandleModal(ASSETS_LISTING_ACTION_MODAL);
                                // setAssetDetailsData(
                                //   data?.filter((x) => x.id === item.id)?.[0]
                                //   );
                              }}
                            >
                              <span
                                className={cn(
                                  "text-14 font-700 leading-4 text-blue-300 dark:text-white sm:block hidden",
                                  openChainList.includes(item?.id) &&
                                    "text-white dark:text-blue-300"
                                )}
                              >
                                Chains
                              </span>
                              <UilAngleDown
                                className={cn(
                                  "h-4 w-4 text-blue-300 dark:text-white",
                                  openChainList.includes(item?.id) &&
                                    "rotate-180  sm:text-white text-blue-300 sm:dark:text-blue-300 dark:text-white"
                                )}
                              />
                            </Button>
                          ) : (
                            <>
                              <div
                                className="sm:hidden block "
                                onClick={() => {
                                  setAssetDetailsData(item);
                                  setHandleModal(ASSETS_LISTING_ACTION_MODAL);
                                }}
                              >
                                <UilEllipsisH className="h-4 w-4" />
                              </div>

                              <DropdownMenu onOpenChange={setIsOpenDropdown}>
                                <DropdownMenuTrigger className="sm:flex hidden text-blue-300 text-14 font-700 p-0 h-10 w-10 bg-transparent sm:bg-secondary dark:bg-white/15 items-center flex rounded-3xl hover:text-white hover:bg-blue-300  dark:text-white dark:hover:bg-white dark:hover:text-blue-300 data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4 justify-center">
                                  <UilEllipsisH className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-secondary/50 dark:bg-gray-250/10 backdrop-blur-[16px] p-5 rounded-[16px] w-[150px] divide-y divide-gray-300/10 dark:divide-white/30">
                                  {TRADE_DROPDOWN_ITEMS?.map(
                                    (dropdownItem, index) => {
                                      return (
                                        <DropdownMenuItem
                                          key={`tradeItems-${index}`}
                                          className={cn(
                                            "flex gap-x-4 items-center p-0 cursor-pointer py-2 first:pt-0 last:pb-0"
                                          )}
                                          onClick={() => {
                                            setAssetDetailsData(item);
                                            setHandleModal(dropdownItem?.modal);
                                          }}
                                          disabled={dropdownItem?.isDisabled}
                                        >
                                          <div className="h-7 w-7 flex justify-center items-center text-blue-300 dark:text-white bg-white dark:bg-white/10 rounded-3xl">
                                            {dropdownItem?.icon}
                                          </div>
                                          <span className="text-blue-300 dark:text-white font-500 text-14 leading-4">
                                            {dropdownItem?.name}
                                          </span>
                                        </DropdownMenuItem>
                                      );
                                    }
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </>
                          )}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "md:pl-[52px] mb-1 md:mb-0 pl-0 md:pr-[52px] pr-0 bg-gray-100 dark:bg-white/30 sm:dark:bg-transparent sm:bg-white md:rounded-b-none rounded-b-xl ",
                          openChainList?.includes(item?.id) &&
                            item?.assetsOnOtherChains?.length > 0 &&
                            "sm:py-0 py-[10px]"
                        )}
                      >
                        {openChainList?.includes(item?.id) &&
                          item?.assetsOnOtherChains?.map((asset: any) => {
                            return (
                              <div
                                className={cn(
                                  "py-[6px] mx-[10px] hover:mx-0 hover:px-[10px]  hover:rounded-xl sm:py-4 grid sm:grid-cols-[5fr_2fr_5fr] grid-cols-[5fr_4fr_3fr]  sm:border-b sm:border-b-secondary dark:border-b-white/10 md:hover:bg-gray-100 cursor-pointer dark:hover:bg-white dark:hover:bg-opacity-5 relative",
                                  chainNetworkList?.find(
                                    (val) => val?.name === filterOption?.chainId
                                  ) &&
                                    chainNetworkList?.find(
                                      (val) =>
                                        val?.name === filterOption?.chainId
                                    )?.id !== asset.chainId &&
                                    "hidden"
                                )}
                                key={`asset-${asset?.id}`}
                                onClick={() => {
                                  // if (screenWidth > 640) {
                                  //   router.push(
                                  //     `/crypto/token-details/${asset?.id}`
                                  //   );
                                  // }
                                }}
                              >
                                <div
                                  className="grid grid-cols-[auto_1fr] gap-x-3 xl:w-auto sm:max-w-[190px] z-10"
                                  onClick={() => {
                                    router.push(
                                      `/crypto/token-details/${asset?.id}`
                                    );
                                  }}
                                >
                                  <div className="rounded-3xl sm:h-10 sm:w-10 h-4 w-4 relative">
                                    <Image
                                      width={40}
                                      height={40}
                                      src={AssetImages[asset?.shortName]}
                                      alt="image"
                                      className="sm:block hidden"
                                    />
                                    <Image
                                      className={cn(
                                        "absolute top-0 sm:right-0",
                                        chainNetworkList?.find(
                                          (val) => val.id === asset.chainId
                                        ).shortName === asset?.shortName &&
                                          "block sm:hidden"
                                      )}
                                      width={16}
                                      height={16}
                                      src={
                                        AssetImages[
                                          chainNetworkList?.find(
                                            (val) => val.id === asset.chainId
                                          ).shortName
                                        ]
                                      }
                                      alt="image"
                                    />
                                  </div>
                                  <div className="flex flex-col leading-5">
                                    <span className="font-500 text-blue-300 dark:text-white">
                                      {asset?.shortName}
                                    </span>
                                    <span className="font-500 text-gray-300 w-20 md:w-[120px] sm:w-[120px]  truncate xl:w-auto dark:text-white/30">
                                      {asset?.name}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="flex flex-col items-end sm:items-baseline z-10"
                                  onClick={() => {
                                    router.push(
                                      `/crypto/token-details/${asset?.id}`
                                    );
                                  }}
                                >
                                  <p
                                    className={cn(
                                      "font-500 leading-5 text-16",
                                      Number(
                                        asset?.balanceFiat?.toFixed(2) || 0
                                      ) > 0
                                        ? "text-blue-300 dark:text-white"
                                        : "text-gray-300 dark:text-white/30"
                                    )}
                                  >
                                    €
                                    {readableNumber(
                                      Number(
                                        asset?.balanceFiat?.toFixed(2) || 0
                                      )
                                    )}
                                  </p>
                                  <p className="text-gray-300 font-500 whitespace-nowrap leading-5 text-16 dark:text-white/30">
                                    {`${Number(asset?.balance?.toFixed(6))} ${
                                      asset?.shortName
                                    }`}
                                  </p>
                                </div>
                                <div className="flex justify-end items-center z-20">
                                  <div
                                    className="sm:hidden flex z-50 h-10 w-10 justify-center items-center"
                                    onClick={() => {
                                      setAssetDetailsData(item);
                                      setHandleModal(
                                        ASSETS_LISTING_ACTION_MODAL
                                      );
                                    }}
                                  >
                                    <UilEllipsisH className="h-4 w-4" />
                                  </div>

                                  <DropdownMenu
                                    onOpenChange={setIsOpenDropdown}
                                  >
                                    <DropdownMenuTrigger
                                      className="text-blue-300 text-14 font-700 p-0 h-10 w-10 sm:flex hidden dark:hover:text-blue-300 dark:hover:bg-white
                                  bg-transparent sm:bg-secondary dark:bg-white/15 items-center flex rounded-3xl hover:text-white hover:bg-blue-300  dark:text-white  data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4 justify-center z-20"
                                    >
                                      <UilEllipsisH className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-secondary/50 dark:bg-gray-250/10 backdrop-blur-[16px] p-5 rounded-[16px] w-[150px] divide-y divide-gray-300/10 dark:divide-white/30">
                                      {TRADE_DROPDOWN_ITEMS?.map(
                                        (dropdownItem, index) => {
                                          return (
                                            <DropdownMenuItem
                                              key={`tradeItems-${index}`}
                                              className={cn(
                                                "flex gap-x-4 items-center p-0 cursor-pointer py-2 first:pt-0 last:pb-0"
                                              )}
                                              onClick={() => {
                                                setAssetDetailsData(asset);
                                                setHandleModal(
                                                  dropdownItem?.modal
                                                );
                                              }}
                                              disabled={
                                                dropdownItem?.isDisabled
                                              }
                                            >
                                              <div className="h-7 w-7 flex justify-center items-center text-blue-300 dark:text-white bg-white dark:bg-white/10 rounded-3xl">
                                                {dropdownItem?.icon}
                                              </div>
                                              <span className="text-blue-300 dark:text-white font-500 text-14 leading-4">
                                                {dropdownItem?.name}
                                              </span>
                                            </DropdownMenuItem>
                                          );
                                        }
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (
                <NoTransactionData />
              )}
            </div>
          </div>
          <Portal>
            {modalOpen === ASSETS_LISTING_ACTION_MODAL && (
              <AssetsActionsModal />
            )}
          </Portal>
        </>
      )}
    </>
  );
};

export default AssetsListing;
