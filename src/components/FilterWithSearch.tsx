import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/UI/Dropdown';
import { Switch } from '@/components/UI/Switch';
import { ASSET_FILTER_MODAL } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilAngleDown, UilCheckCircle, UilSearch } from '@/icons';
import { useChainAssetsList } from '@/services/useCrypto';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AssetFilterModal from './AssetFilterModal';
import { Portal } from './Portal';

type FilterWithSearchProps = {
  isTransactionTab?: boolean;
  chainDropdown?: boolean;
  filterOption?: any;
  setFilterOption?: any;
};

const FilterWithSearch = ({
  isTransactionTab,
  chainDropdown,
  filterOption,
  setFilterOption
}: FilterWithSearchProps) => {
  const { modalOpen } = useHandleModalStore();
  const [openChainDropdown, setOpenChainDropdown] = useState(false);
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const { data: chainNetworkList, isLoading } = useChainAssetsList();

  useEffect(() => {
    if (openChainDropdown) {
      document.body.classList.add('!m-0');
      document.body.classList.add('!overflow-y-auto');
    }
  }, [openChainDropdown]);

  const chainNetworkListData = Array.isArray(chainNetworkList)
    ? chainNetworkList?.filter(
        (val: any) =>
          val.name !== 'Ethereum' &&
          val.name !== 'Polygon' &&
          val.name !== 'Bitcoin'
      )
    : [];

  const filterDataOption = [
    { name: 'Ethereum', shortName: 'ETH' },
    { name: 'Polygon', shortName: 'POLYGON' },
    { name: 'Bitcoin', shortName: 'BTC' }
  ];

  return (
    <>
      <div className="flex-row gap-1 sm:flex hidden">
        <div
          className={cn(
            'py-2 px-4 bg-secondary rounded-3xl cursor-pointer dark:bg-white/15 ',
            filterOption.chainId === 'All' && 'bg-blue-300 dark:bg-white'
          )}
          onClick={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              chainId: 'All'
            }));
            localStorage.setItem('selectedChainId', 'All');
          }}
        >
          <span
            className={cn(
              'text-14 leading-4 text-blue-300 font-700 dark:text-white',
              filterOption.chainId === 'All' && 'text-white  dark:text-blue-300'
            )}
          >
            All
          </span>
        </div>

        {filterDataOption?.map((val: any) => (
          <>
            {' '}
            <div
              className={cn(
                'py-2 px-4 bg-secondary rounded-3xl flex flex-row gap-2 items-center cursor-pointer dark:bg-white/15',
                filterOption.chainId === val.name && 'bg-blue-300 dark:bg-white'
              )}
              onClick={() => {
                setFilterOption((prev: any) => ({
                  ...prev,
                  chainId: val.name
                }));
                localStorage.setItem('selectedChainId', val.name);
              }}
            >
              <Image
                width={16}
                height={16}
                src={AssetImages[val.shortName]}
                alt="image"
              />
              <span
                className={cn(
                  'text-14 leading-4 text-blue-300 font-700 dark:text-white  whitespace-nowrap',
                  filterOption.chainId === val.name &&
                    'text-white  dark:text-blue-300'
                )}
              >
                {val.name}
              </span>
            </div>
          </>
        ))}
        {chainNetworkListData?.length > 0 && (
          <>
            <div className="sm:block hidden w-max">
              <DropdownMenu onOpenChange={setOpenChainDropdown}>
                <DropdownMenuTrigger
                  className={cn(
                    'bg-secondary dark:bg-white/[0.15] text-blue-300 dark:text-white text-14 font-700 py-0 h-10 px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 dark:data-[state=open]:text-blue-300 dark:data-[state=open]:bg-white leading-4  max-w-[90px] whitespace-nowrap',
                    chainNetworkListData?.find(
                      (x: any) => x.name === filterOption.chainId
                    ) &&
                      'bg-blue-300 text-white  dark:text-blue-300  dark:bg-white'
                  )}
                >
                  <div className="flex items-center gap-x-2 rounded-full">
                    {chainNetworkListData?.find(
                      (x: any) => x.name === filterOption.chainId
                    ) ? (
                      <>
                        {chainNetworkListData?.find(
                          (x: any) => x.name === filterOption.chainId
                        )?.shortName && (
                          <Image
                            width={16}
                            height={16}
                            src={
                              AssetImages[
                                chainNetworkListData?.find(
                                  (x: any) => x.name === filterOption.chainId
                                )?.shortName
                              ]
                            }
                            alt="image"
                          />
                        )}
                        <span className="font-700 leading-5 text-16  dropdown-title">
                          {
                            chainNetworkListData?.find(
                              (x: any) => x.name === filterOption.chainId
                            )?.shortName
                          }
                        </span>
                      </>
                    ) : (
                      'More'
                    )}
                    <UilAngleDown className="chevron-down h-6 w-6 transition-all dropdown-title" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary/50 dark:border-none dark:bg-white/10 backdrop-blur-[16px] p-4 flex flex-col rounded-[12px] w-fit mt-1 gap-y-3">
                  {chainNetworkListData?.map((item: any, index: number) => (
                    <DropdownMenuItem
                      className="w-full flex justify-between items-center py-0 cursor-pointer"
                      onClick={() => {
                        setFilterOption((prev: any) => ({
                          ...prev,
                          chainId: item.name
                        }));
                        localStorage.setItem('selectedChainId', item?.name);
                      }}
                      key={`chainDropdown-${index}`}
                    >
                      <div className="flex gap-x-4 items-center">
                        <div className="rounded-3xl h-7 w-7 bg-white dark:bg-white/25 flex justify-center items-center">
                          <Image
                            width={16}
                            height={16}
                            src={AssetImages[item?.shortName || 'ETH']}
                            alt="image"
                          />
                        </div>
                        <span className="font-500 text-14 text-blue-300 dark:text-white leading-4">
                          {item.name}
                        </span>
                      </div>
                      {filterOption?.chainId === item.name && (
                        <UilCheckCircle className="text-primary h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* <div className="sm:hidden block">
              <Button
                variant="secondary"
                className="px-3 py-0 h-10 dark:bg-white/15 dark:text-white rounded-full font-700 text-14 block"
                onClick={() => setHandleModal(ASSET_FILTER_MODAL)}
              >
                <div className="flex items-center gap-x-2 rounded-full justify-between">
                  {filterOption.chainId === 'All' ? (
                    'All Chain'
                  ) : (
                    <>
                      {chainNetworkListData?.find(
                        (x: any) => x.name === filterOption.chainId
                      )?.shortName && (
                        <Image
                          width={24}
                          height={24}
                          src={
                            AssetImages[
                              chainNetworkListData?.find(
                                (x: any) => x.name === filterOption.chainId
                              )?.shortName
                            ]
                          }
                          alt="image"
                        />
                      )}
                      <span className="font-700 leading-5 text-16  dropdown-title w-16 truncate">
                        {
                          chainNetworkListData?.find(
                            (x: any) => x.name === filterOption.chainId
                          )?.shortName
                        }
                      </span>
                    </>
                  )}
                  <UilAngleDown className="chevron-down h-6 w-6 transition-all dropdown-title" />
                </div>
              </Button>
            </div> */}
          </>
        )}
      </div>
      <div
        className={cn(
          'grid sm:grid-cols-[auto_122px] md:grid-cols-[auto_auto_auto] gap-x-1 sm:gap-x-3 top-0 right-0 items-center gap-y-3 md:justify-end w-full',
          isTransactionTab && 'flex-row-reverse gap-x-2'
        )}
      >
        <div className="flex gap-x-1 justify-between order-last md:order-first col-span-full md:col-span-1">
          <span className="text-blue-300 dark:text-white py-2 sm:px-3 px-1 leading-4 text-14 font-700 flex items-center h-8 mt-[1px] whitespace-nowrap">
            Show assets with 0 balance
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <Switch
              className="data-[state=checked]:bg-blue-300"
              checked={filterOption?.ShowZeroBalance}
              onCheckedChange={(e) => {
                setFilterOption({
                  ...filterOption,
                  ShowZeroBalance: e
                });
                localStorage.setItem(
                  'isAssetWithZeroBalance',
                  JSON.stringify(e)
                );
              }}
            />
          </label>
        </div>
        {/* {chainNetworkListData?.length > 0 && (
          <>
            {/* <div className="sm:block hidden w-max">
              <DropdownMenu onOpenChange={setOpenChainDropdown}>
                <DropdownMenuTrigger className="bg-secondary dark:bg-white/[0.15] text-blue-300 dark:text-white text-14 font-700 py-0 h-10 px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 dark:data-[state=open]:text-blue-300 dark:data-[state=open]:bg-white leading-4 w-full max-w-[90px]">
                  <div className="flex items-center gap-x-2 rounded-full">
                    {filterOption.chainId === 'All' ? (
                      'All Chain'
                    ) : (
                      <>
                        {chainNetworkListData?.find(
                          (x: any) => x.name === filterOption.chainId
                        )?.shortName && (
                          <Image
                            width={16}
                            height={16}
                            src={
                              AssetImages[
                                chainNetworkList?.find(
                                  (x: any) => x.name === filterOption.chainId
                                )?.shortName
                              ]
                            }
                            alt="image"
                          />
                        )}
                        <span className="font-700 leading-5 text-16  dropdown-title">
                          {
                            chainNetworkList?.find(
                              (x: any) => x.name === filterOption.chainId
                            )?.shortName
                          }
                        </span>
                      </>
                    )}
                    <UilAngleDown className="chevron-down h-6 w-6 transition-all dropdown-title" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary/50 dark:border-none dark:bg-white/10 backdrop-blur-[16px] p-4 flex flex-col rounded-[12px] w-fit mt-1 gap-y-3">
                  <DropdownMenuLabel className="text-gray-300 dark:text-white text-12 font-500 leading-5 py-0">
                    Chains
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className="w-full flex justify-between items-center py-0 cursor-pointer"
                    onClick={() => {
                      setFilterOption((prev: any) => ({
                        ...prev,
                        chainId: 'All'
                      }));
                      localStorage.setItem('selectedChainId', 'All');
                    }}
                  >
                    <div className="flex gap-x-4 items-center">
                      <div className="rounded-3xl h-7 w-7 bg-white dark:bg-white/[0.15] flex justify-center items-center">
                        <UilCircleLayer className="h-4 w-4 text-blue-300 dark:text-white" />
                      </div>
                      <span className="font-500 text-14 text-blue-300 dark:text-white leading-4">
                        All Chains
                      </span>
                    </div>
                    {filterOption?.chainId === 'All' && (
                      <UilCheckCircle className="text-primary h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                  {chainNetworkList?.map((item: any, index: number) => (
                    <DropdownMenuItem
                      className="w-full flex justify-between items-center py-0 cursor-pointer"
                      onClick={() => {
                        setFilterOption((prev: any) => ({
                          ...prev,
                          chainId: item.name
                        }));
                        localStorage.setItem('selectedChainId', item?.name);
                      }}
                      key={`chainDropdown-${index}`}
                    >
                      <div className="flex gap-x-4 items-center">
                        <div className="rounded-3xl h-7 w-7 bg-white dark:bg-white/25 flex justify-center items-center">
                          <Image
                            width={16}
                            height={16}
                            src={AssetImages[item?.shortName || 'ETH']}
                            alt="image"
                          />
                        </div>
                        <span className="font-500 text-14 text-blue-300 dark:text-white leading-4">
                          {item.name}
                        </span>
                      </div>
                      {filterOption?.chainId === item.name && (
                        <UilCheckCircle className="text-primary h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
        {/* <div className="sm:hidden block">
              <Button
                variant="secondary"
                className="px-3 py-0 h-10 dark:bg-white/15 dark:text-white rounded-full font-700 text-14 block"
                onClick={() => setHandleModal(ASSET_FILTER_MODAL)}
              >
                <div className="flex items-center gap-x-2 rounded-full justify-between">
                  {filterOption.chainId === 'All' ? (
                    'All Chain'
                  ) : (
                    <>
                      {chainNetworkList?.find(
                        (x: any) => x.name === filterOption.chainId
                      )?.shortName && (
                        <Image
                          width={24}
                          height={24}
                          src={
                            AssetImages[
                              chainNetworkList?.find(
                                (x: any) => x.name === filterOption.chainId
                              )?.shortName
                            ]
                          }
                          alt="image"
                        />
                      )}
                      <span className="font-700 leading-5 text-16  dropdown-title w-16 truncate">
                        {
                          chainNetworkList?.find(
                            (x: any) => x.name === filterOption.chainId
                          )?.shortName
                        }
                      </span>
                    </>
                  )}
                  <UilAngleDown className="chevron-down h-6 w-6 transition-all dropdown-title" />
                </div>
              </Button>
            </div> */}
        {/* </>
        )}  */}

        <div className="relative w-full  md:max-w-[200px] !bg-white dark:!bg-black rounded-[28px] flex items-center h-10 order-first md:order-last">
          <div className="flex justify-center absolute lg:top-[12px] items-center text-center pl-4 pointer-events-none">
            <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
          </div>
          <input
            type="text"
            id="search-assets"
            className="input w-full leading-5 rounded-3xl outline-none py-2 pl-10 lg:placeholder:text-16 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 lg:text-16  font-500 font-body cursor-pointer text-blue-300 bg-gray-200 dark:bg-black dark:text-white h-10"
            placeholder="Search"
            required
            value={filterOption.search}
            onChange={(e) =>
              setFilterOption((prev: any) => ({
                ...prev,
                search: e.target.value
              }))
            }
          />
        </div>
      </div>
      <Portal>
        {modalOpen === ASSET_FILTER_MODAL && (
          <AssetFilterModal
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
        )}
      </Portal>
    </>
  );
};

export default FilterWithSearch;
