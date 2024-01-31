'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/UI/Dropdown';
import { Input } from '@/components/UI/form/Input';
import { IconRoundedCheck } from '@/components/icons/IconRoundedCheck';
import { ASSETS_DROPDOWN } from '@/constants';
import { UilAngleDown, UilCircleLayer, UilSearch } from '@/icons';
import { useHandleModalAction } from '@/store/handleModal';
import { cn } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';

const AssetsDropDownItems = [
  {
    assetName: 'All Assets',
    asset: 'All Assets',
    assetIcon: <UilCircleLayer className="h-4 w-4" />
  },
  {
    assetName: 'Ethereum',
    asset: 'ETH',
    assetIcon: (
      <Image
        src={'/images/svg/icon-ETH.svg'}
        height={16}
        width={16}
        alt=""
        className="h-4 w-4 rounded-full"
      />
    )
  },
  {
    assetName: 'Tether',
    asset: 'USDT',
    assetIcon: (
      <Image
        src={'/images/svg/icon-USDT.svg'}
        height={16}
        width={16}
        alt=""
        className="h-4 w-4 rounded-full"
      />
    )
  }
];

export const AssetsDropDown = ({ assetItem }: any) => {
  const { setHandleModal } = useHandleModalAction;
  const [openAssetsDropDown, setOpenAssetsDropDown] = useState(false);
  const [asset, setAsset] = useState('All Assets');

  return (
    <>
      <div
        className={cn(
          'px-4 py-2 rounded-full bg-secondary flex justify-between items-center md:hidden order-3 cursor-pointer',
          openAssetsDropDown && 'bg-blue-300 text-white'
        )}
        onClick={() => {
          setHandleModal(ASSETS_DROPDOWN);
        }}
      >
        <div className="flex gap-x-2 items-center w-max">
          {assetItem !== 'All' &&
            AssetsDropDownItems.find((x) => x.asset === assetItem)?.assetIcon}
          <span className="font-700 leading-4 text-14 ">
            {assetItem === 'All'
              ? 'All'
              : AssetsDropDownItems.find((x) => x.asset === assetItem)?.asset}
          </span>
          {/* <span className="font-700 leading-4 text-14 ">All</span> */}
        </div>
        <UilAngleDown
          className={cn(
            'chevron-down h-6 w-6 transition-all dropdown-title',
            openAssetsDropDown && 'rotate-180'
          )}
        />
      </div>
      <DropdownMenu onOpenChange={setOpenAssetsDropDown}>
        <DropdownMenuTrigger className="hidden md:block w-[120px] order-2">
          <div
            className={cn(
              'px-4 md:py-2 rounded-full bg-secondary  py-2 md:h-10 flex justify-between items-center dark:bg-white/15 ',
              openAssetsDropDown && 'bg-blue-300 text-white'
            )}
            onClick={() => setOpenAssetsDropDown(!openAssetsDropDown)}
          >
            <div className="flex gap-x-2 items-center w-max">
              {asset !== 'All Assets' &&
                AssetsDropDownItems.find((x) => x.asset === asset)?.assetIcon}
              <span className="font-700 leading-4 text-14 dark:text-white whitespace-nowrap">
                {AssetsDropDownItems.find((x) => x.asset === asset)?.asset}
              </span>
            </div>
            <UilAngleDown
              className={cn(
                'chevron-down h-6 w-6 transition-all dropdown-title',
                openAssetsDropDown && 'rotate-180'
              )}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            'sm:bg-gray-500/50 sm:backdrop-blur-[16px] p-4 pr-3 rounded-[12px] bottom-0 w-[250px] dark:bg-gray-250/10'
          )}
          align="start"
        >
          <div>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              asset
            </p>
            <div className="relative rounded-xl bg-white/60 flex items-center w-full mt-3 dark:bg-white/5">
              <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
                <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
              </div>
              <Input
                type="text"
                id="search-assets"
                className="input w-full leading-4 rounded-3xl outline-none py-1.5 pl-10 placeholder:text-gray-300 dark:placeholder:text-white/30 placeholder:font-700 placeholder:font-body placeholder:text-14 text-14  font-500 font-body cursor-pointer text-blue-300 bg-transparent border-none dark:text-white"
                placeholder="Search"
                required
              />
            </div>
          </div>
          <div className="max-h-[250px] overflow-y-auto mt-1 pr-2">
            {AssetsDropDownItems.map((item, index) => (
              <>
                <div
                  className="w-full flex justify-between items-center py-2 cursor-pointer"
                  onClick={() => {
                    setAsset(item.asset);
                    setOpenAssetsDropDown(false);
                  }}
                  key={`CurrencyDropdown-${index}`}
                >
                  <div className="flex gap-x-3 items-center">
                    <div className="rounded-3xl h-7 w-7 bg-white flex justify-center items-center p-1.5 dark:bg-white/10">
                      {item.assetIcon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-500 text-14 text-blue-300 leading-4 dark:text-white">
                        {item.assetName}
                      </span>
                      {item.asset !== 'All Assets' && (
                        <span className="font-500 text-12 text-gray-300 leading-4 dark:text-white/30">
                          {item.asset}
                        </span>
                      )}
                    </div>
                  </div>
                  {asset === item.asset && (
                    <IconRoundedCheck className="h-4 w-4 text-primary" />
                  )}
                </div>
                {index !== AssetsDropDownItems.length - 1 && (
                  <hr className="border-gray-300/10" />
                )}
              </>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
