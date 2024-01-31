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

export const PlatformDropDown = () => {
  const [openPlatformDropdown, setOpenPlatformDropdown] = useState(false);
  const [platform, setPlatform] = useState('All Chain');
  return (
    <>
      <DropdownMenu onOpenChange={setOpenPlatformDropdown}>
        <DropdownMenuTrigger className="hidden sm:block w-[120px]">
          <div
            className={cn(
              'px-4 py-2 rounded-full bg-secondary flex justify-between items-center dark:bg-white/15',
              openPlatformDropdown &&
                'bg-blue-300 text-white dark:text-blue-300 dark:bg-white'
            )}
            onClick={() => setOpenPlatformDropdown(!openPlatformDropdown)}
          >
            <span className="font-700 leading-4 text-14">Platforms</span>

            <UilAngleDown
              className={cn(
                'chevron-down h-6 w-6 transition-all dropdown-title',
                openPlatformDropdown && 'rotate-180'
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
              Platforms
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
            {[...Array(10)].map((item, index) => (
              <>
                <div
                  className="w-full flex justify-between items-center py-2 cursor-pointer"
                  onClick={() => {
                    setPlatform(`platformname-${index}`);
                    setOpenPlatformDropdown(false);
                  }}
                  key={`CurrencyDropdown-${index}`}
                >
                  <div className="flex flex-col">
                    <span className="font-500 text-14 text-blue-300 leading-4 dark:text-white">
                      Platform name
                    </span>
                  </div>
                  {platform === `platformname-${index}` && (
                    <IconRoundedCheck className="h-4 w-4 text-primary" />
                  )}
                </div>
                {index !== Number([...Array(10)]) - 1 && (
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
