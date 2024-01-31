'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/UI/Dropdown';
import { Input } from '@/components/UI/form/Input';
import { IconRoundedCheck } from '@/components/icons/IconRoundedCheck';
import { UilAngleDown, UilSearch } from '@/icons';
import { cn } from '@/utils';
import { useState } from 'react';
import { useYieldStaticData } from './useYieldStaticData';

export const ChainDropdown = () => {
  const [openChainDropdown, setOpenChainDropdown] = useState(false);
  const [chain, setChain] = useState('All Chain');
  const { ChainDropdownItems } = useYieldStaticData();
  return (
    <>
      <div
        className={cn(
          'px-4 py-2 rounded-full bg-secondary flex justify-between items-center sm:hidden dark:bg-white/15',
          openChainDropdown &&
            'bg-blue-300 text-white dark:text-blue-300 dark:bg-white'
        )}
      >
        <div className="flex gap-x-2 items-center">
          {chain !== 'All Chain' &&
            ChainDropdownItems.find((x) => x.chain === chain)?.chainIcon}
          <span className="font-700 leading-4 text-14 ">
            {ChainDropdownItems.find((x) => x.chain === chain)?.chain}
          </span>
        </div>
        <UilAngleDown
          className={cn(
            'chevron-down h-6 w-6 transition-all dropdown-title',
            openChainDropdown && 'rotate-180'
          )}
        />
      </div>
      <DropdownMenu onOpenChange={setOpenChainDropdown}>
        <DropdownMenuTrigger className="hidden sm:block w-[120px]">
          <div
            className={cn(
              'px-4 py-2 rounded-full bg-secondary flex justify-between items-center dark:bg-white/15',
              openChainDropdown &&
                'bg-blue-300 text-white dark:text-blue-300 dark:bg-white'
            )}
            onClick={() => setOpenChainDropdown(!openChainDropdown)}
          >
            <div className="flex gap-x-2 items-center">
              {chain !== 'All Chain' &&
                ChainDropdownItems.find((x) => x.chain === chain)?.chainIcon}
              <span className="font-700 leading-4 text-14">
                {ChainDropdownItems.find((x) => x.chain === chain)?.chain}
              </span>
            </div>
            <UilAngleDown
              className={cn(
                'chevron-down h-6 w-6 transition-all dropdown-title',
                openChainDropdown && 'rotate-180'
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
              Chain
            </p>
            <div className="relative rounded-xl bg-white/60 flex items-center w-full mt-3 dark:bg-white/5">
              <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
                <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
              </div>
              <Input
                type="text"
                id="search-assets"
                className="input w-full leading-4 rounded-3xl outline-none py-1.5 pl-10 placeholder:text-gray-300
               dark:placeholder:text-white/30 placeholder:font-700 placeholder:font-body placeholder:text-14 text-14  font-500 font-body cursor-pointer text-blue-300 bg-transparent border-none dark:text-white"
                placeholder="Search"
                required
              />
            </div>
          </div>
          <div className="max-h-[250px] overflow-y-auto mt-1 pr-2">
            {ChainDropdownItems.map((item, index) => (
              <>
                <div
                  className="w-full flex justify-between items-center py-2 cursor-pointer"
                  onClick={() => {
                    setChain(item.chain);
                    setOpenChainDropdown(false);
                  }}
                  key={`CurrencyDropdown-${index}`}
                >
                  <div className="flex gap-x-3 items-center">
                    <div className="rounded-3xl h-7 w-7 bg-white flex justify-center items-center p-1.5 dark:bg-white/10">
                      {item.chainIcon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-500 text-14 text-blue-300 leading-4 dark:text-white">
                        {item.chainName}
                      </span>
                      {item.chain !== 'All Chain' && (
                        <span className="font-500 text-12 text-gray-300 leading-4 dark:text-white/30">
                          {item.chain}
                        </span>
                      )}
                    </div>
                  </div>
                  {chain === item.chain && (
                    <IconRoundedCheck className="h-4 w-4 text-primary" />
                  )}
                </div>
                {index !== ChainDropdownItems.length - 1 && (
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
