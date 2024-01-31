/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AssetFilterModal from '@/components/AssetFilterModal';
import FilterWithSearch from '@/components/FilterWithSearch';
import { Button } from '@/components/UI/Button';
import IconBorrow from '@/components/icons/IconBorrow';
import { IconSwap } from '@/components/icons/IconSwap';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import IconTimeCoinWithdraw from '@/components/icons/IconTimeCoinWithdraw';
import { ASSET_FILTER_MODAL } from '@/constants';

import {
  ASSETS_LISTING_ACTION_MODAL,
  CRYPTO_DEPOSIT_MODAL,
  SWAP_CRYPTO_MODAL,
  TRANSFER_CRYPTO_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';

import { Portal } from '@/components/Portal';
import { useDebounce } from '@/hooks/useDebounce';
import { UilAngleDown, UilMinus, UilPlus } from '@/icons';
import AssetsActionsModal from '@/screens/Crypto/Home/components/AssetsActionsModal';
import CardsSection from '@/screens/Crypto/Home/components/CardsSection';
import ChartSection from '@/screens/Crypto/Home/components/ChartSection';
import { useAssetsData } from '@/services/useCrypto';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useCryptoStore } from '@/store/useCryptoStore';
import { cn } from '@/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const AssetsListing = dynamic(
  () => import('@/screens/Crypto/Home/components/AssetsListing')
);

const TrendingOnMarket = dynamic(
  () => import('@/screens/Crypto/Home/components/TrendingOnMarket')
);

type FilterOption = {
  chainId: string | null;
  search: string;
  ShowZeroBalance: boolean;
};

function getIsAssetWithZeroBalance() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAssetWithZeroBalance');
  }
  return 0; // Default value for SSR
}
function getSelectedChainId() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('selectedChainId');
  }
  return 0; // Default value for SSR
}
const HomePage = () => {
  const isAssetWithZeroBalance: any = getIsAssetWithZeroBalance();
  const selectedChainId = getSelectedChainId();

  const [filterOption, setFilterOption] = useState<FilterOption>({
    chainId: selectedChainId || 'All',
    search: '',
    ShowZeroBalance: isAssetWithZeroBalance
      ? JSON.parse(isAssetWithZeroBalance)
      : true
  });
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { chainNetworkList } = useCryptoStore();
  const debouncedValue = useDebounce(filterOption, 600);
  const {
    data: assetsData,
    isLoading,
    refetch,
    isRefetching
  } = useAssetsData({
    ...(filterOption.chainId !== 'All' && {
      ChainIds:
        chainNetworkList.find((x) => x.name === filterOption.chainId)?.id || 1
    }),
    ...(filterOption.search !== '' && {
      Name: filterOption.search
    }),
    ShowZeroBalance: filterOption.ShowZeroBalance
  });

  useEffect(() => {
    refetch();
  }, [debouncedValue]);

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
      <TrendingOnMarket />
      <div className="grid grid-cols-12 mt-7 gap-6 lg:px-4 xl:px-0">
        <div className="flex flex-col gap-y-2 lg:col-span-8 xl:col-span-9 col-span-12 w-full h-full lg:order-1 order-2 px-3 sm:px-10 lg:px-0">
          <ChartSection />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <div
              className="rounded-[24px] bg-white py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer dark:bg-white/10"
              onClick={() => setHandleModal(SWAP_CRYPTO_MODAL)}
            >
              <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                <IconSwap className=" h-4 w-4 text-white" />
              </span>
              <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                Swap
              </p>
            </div>
            <div
              className="rounded-[24px] bg-white py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer dark:bg-white/10"
              onClick={() => setHandleModal(TRANSFER_CRYPTO_MODAL)}
            >
              <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                <IconTimeCoinWithdraw
                  strokeWidth={1.2}
                  className=" h-4 w-4 text-white"
                />
              </span>
              <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                Withdraw
              </p>
            </div>
            <div
              className="rounded-[24px] bg-white py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer dark:bg-white/10"
              onClick={() => setHandleModal(CRYPTO_DEPOSIT_MODAL)}
            >
              <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                <IconTimeCoinDeposit
                  strokeWidth={1.2}
                  className=" h-4 w-4 text-white"
                />
              </span>
              <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                Deposit
              </p>
            </div>
            <div className="rounded-[24px] bg-gray-100 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none dark:bg-white/5">
              <span className="h-10 w-10 bg-secondary dark:bg-white/[0.15] rounded-full flex justify-center items-center">
                <UilPlus className=" h-4 w-4 text-gray-300" />
              </span>
              <p className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                Buy
              </p>
            </div>
            <div className="rounded-[24px] bg-gray-100 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none dark:bg-white/5">
              <span className="h-10 w-10 bg-secondary dark:bg-white/[0.15] rounded-full flex justify-center items-center">
                <UilMinus className=" h-4 w-4 text-gray-300" />
              </span>
              <p className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                Sell
              </p>
            </div>
            <div className="rounded-[24px] bg-gray-100 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none dark:bg-white/5">
              <span className="h-10 w-10 bg-secondary dark:bg-white/[0.15] rounded-full flex justify-center items-center">
                <IconBorrow className=" h-4 w-4 text-gray-300" />
              </span>
              <p className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                Borrow
              </p>
            </div>
          </div>
        </div>
        <CardsSection />
      </div>

      <div className="flex-row gap-2 sm:hidden flex mt-8 px-4 py-1 mb-1 overflow-auto">
        <div
          className={cn(
            'py-2 px-4 bg-secondary rounded-3xl cursor-pointer dark:bg-white/15',
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
              'text-14 leading-4 text-blue-300 font-700  dark:text-white',
              filterOption.chainId === 'All' && 'text-white dark:text-blue-300'
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
                'py-2 px-4 pr-8 bg-secondary rounded-3xl flex flex-row gap-2 items-center cursor-pointer dark:bg-white/15',
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
                  'text-14 leading-4 text-blue-300 font-700 whitespace-nowrap dark:text-white',
                  filterOption.chainId === val.name &&
                    'text-white dark:text-blue-300'
                )}
              >
                {val.name}
              </span>
            </div>
          </>
        ))}
        {chainNetworkListData?.length > 0 && (
          <>
            <div className="sm:hidden block">
              <Button
                variant="secondary"
                className={cn(
                  'px-3 py-0 h-10 dark:bg-white/15 dark:text-white rounded-full font-700 text-14 block ',
                  chainNetworkListData?.find(
                    (x: any) => x.name === filterOption.chainId
                  ) &&
                    'bg-blue-300 text-white  dark:text-blue-300  dark:bg-white'
                )}
                onClick={() => setHandleModal(ASSET_FILTER_MODAL)}
              >
                <div className="flex items-center gap-x-2 rounded-full justify-between whitespace-nowrap">
                  {chainNetworkListData?.find(
                    (x: any) => x.name === filterOption.chainId
                  ) ? (
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
                  ) : (
                    'More'
                  )}
                  <UilAngleDown className="chevron-down h-6 w-6 transition-all dropdown-title" />
                </div>
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="mt-0 sm:mt-6 bg-white dark:bg-white/10 rounded-[24px] py-5 px-[10px] h-fit flex flex-col mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] justify-between  md:items-center items-start gap-y-4 px-[10px]">
          {/* <span className="sm:text-24 text-16 font-500 text-blue-300 dark:text-white leading-7">
            Assets
          </span> */}
          <FilterWithSearch
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
        </div>
        <AssetsListing
          data={assetsData && assetsData}
          isLoading={isLoading}
          isRefetching={isRefetching}
          filterOption={filterOption}
        />
      </div>
      {modalOpen === ASSETS_LISTING_ACTION_MODAL && <AssetsActionsModal />}
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

export default HomePage;
