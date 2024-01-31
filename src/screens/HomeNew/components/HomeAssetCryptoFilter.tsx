import { Button } from '@/components/UI/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/UI/Dropdown';
import { ASSET_FILTER_MODAL } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilAngleDown, UilCheckCircle } from '@/icons';
import { useHandleModalAction } from '@/store/handleModal';
import { cn } from '@/utils';
import Image from 'next/image';
const HomeAssetCryptoFilter = ({
  setOpenChainDropdown,
  filterOption,
  chainNetworkList,
  setFilterOption
}: any) => {
  const { setHandleModal } = useHandleModalAction;
  const filterDataOption = [
    { name: 'Ethereum', shortName: 'ETH' },
    { name: 'Polygon', shortName: 'POLYGON' },
    { name: 'Bitcoin', shortName: 'BTC' }
  ];
  const chainNetworkListData = Array.isArray(chainNetworkList)
    ? chainNetworkList?.filter(
        (val: any) =>
          val.name !== 'Ethereum' &&
          val.name !== 'Polygon' &&
          val.name !== 'Bitcoin'
      )
    : [];
  return (
    <>
      <div className="sm:flex hidden gap-x-1 sm:col-span-2 xl:col-span-1 order-2 sm:order-3 xl:order-1">
        <div
          className={cn(
            'py-2 px-3 bg-white rounded-3xl cursor-pointer dark:bg-transparent border border-secondary flex items-center dark:border-white/15',
            filterOption.chainId === 'All' &&
              'bg-secondary dark:bg-white/15 border-none'
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
              'text-12 leading-4 text-blue-300 font-700 dark:text-white'
            )}
          >
            All Chains{' '}
          </span>
        </div>

        {filterDataOption?.map((val: any) => (
          <>
            {' '}
            <div
              className={cn(
                'py-2 px-3 bg-white border border-secondary rounded-3xl flex flex-row gap-2 items-center cursor-pointer dark:bg-transparent dark:border-white/15',
                filterOption.chainId === val.name &&
                  'bg-secondary dark:bg-white/15 border-none'
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
                  'text-12 leading-4 text-blue-300 font-700 dark:text-white  whitespace-nowrap'
                )}
              >
                {val.name}
              </span>
            </div>
          </>
        ))}
        {chainNetworkListData?.length > 0 && (
          <>
            <div className="sm:block hidden w-max  border border-secondary rounded-3xl dark:border-white/15">
              <DropdownMenu onOpenChange={setOpenChainDropdown}>
                <DropdownMenuTrigger
                  className={cn(
                    'bg-white dark:bg-transparent text-blue-300 dark:text-white text-12 font-700 py-0 h-10 px-3 rounded-3xl  data-[state=open]:bg-secondary  dark:data-[state=open]:bg-white/15 leading-4  max-w-[90px] whitespace-nowrap ',
                    chainNetworkListData?.find(
                      (x: any) => x.name === filterOption.chainId
                    ) && 'bg-secondary dark:bg-white/15'
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
                        <span className="font-700 leading-4 text-12  dropdown-title">
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
          </>
        )}
      </div>
      <div className="sm:hidden block order-1 justify-self-end">
        {/* <Button
          variant="secondary"
          className="px-3 py-0 h-10 dark:bg-white/15 dark:text-white rounded-full font-700 text-14 w-[calc(100%-25px)]"
          onClick={() => setHandleModal(ASSET_FILTER_MODAL)}
        >
          <div className="flex items-center gap-x-2 rounded-full w-full justify-between">
            {filterOption.chainId === "All" ? (
              "All Chain"
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
        </Button> */}
        <Button
          variant="secondary"
          className={cn(
            'px-3 py-0 h-10 dark:bg-white/15 dark:text-white rounded-full font-700 text-14 block ',
            [...filterDataOption, ...chainNetworkListData]?.find(
              (x: any) => x.name === filterOption.chainId
            ) && 'bg-blue-300 text-white  dark:text-blue-300  dark:bg-white'
          )}
          onClick={() => setHandleModal(ASSET_FILTER_MODAL)}
        >
          <div className="flex items-center gap-x-2 rounded-full justify-between whitespace-nowrap">
            {[...filterDataOption, ...chainNetworkListData]?.find(
              (x: any) => x.name === filterOption.chainId
            ) ? (
              <>
                {[...filterDataOption, ...chainNetworkListData]?.find(
                  (x: any) => x.name === filterOption.chainId
                )?.shortName && (
                  <Image
                    width={24}
                    height={24}
                    src={
                      AssetImages[
                        [...filterDataOption, ...chainNetworkListData]?.find(
                          (x: any) => x.name === filterOption.chainId
                        )?.shortName
                      ]
                    }
                    alt="image"
                  />
                )}
                <span className="font-700 leading-5 text-16  dropdown-title w-16 truncate">
                  {
                    [...filterDataOption, ...chainNetworkListData]?.find(
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
        </Button>
      </div>
    </>
  );
};

export default HomeAssetCryptoFilter;
