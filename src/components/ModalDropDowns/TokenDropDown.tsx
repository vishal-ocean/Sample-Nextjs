import { UilCheckCircle, UilSearch } from '@/icons';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/UI/Popover';
import { AssetImages } from '@/constants/AssetsImages';
import { useChainAssetsList } from '@/services/useCrypto';
import { cn } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';

interface TokenDropdownProps {
  openTokenDropdown: boolean;
  setOpenTokenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  tokenValue: string;
  setTokenValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  align?: 'center' | 'start' | 'end' | undefined;
  networkValue: string;
}
const TokenDropDown: React.FC<TokenDropdownProps> = ({
  tokenValue,
  setTokenValue,
  openTokenDropdown,
  setOpenTokenDropdown,
  className,
  align,
  networkValue
}) => {
  const { data: TokenDropdownItems, isLoading } = useChainAssetsList();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = Array.isArray(TokenDropdownItems)
    ? TokenDropdownItems.filter((x: any) => x.name === networkValue)
    : [];
  return (
    <Popover
      open={openTokenDropdown}
      // onOpenChange={(e) => setOpenTokenDropdown(e)}
    >
      <PopoverTrigger />
      <PopoverContent
        className={cn(
          'sm:bg-secondary/50 bg-secondary dark:bg-gray-250/10 dark:backdrop-blur-[16px] dark:border-none sm:backdrop-blur-[16px] p-4 rounded-[16px] sm:w-[424px] w-[340px]',
          className
        )}
        align={align}
      >
        <span className="text-gray-300 text-12 font-500 leading-5">Tokens</span>
        <div className="relative w-full !bg-white dark:!bg-white/10 rounded-[12px] flex items-center mt-3">
          <div className="flex justify-center absolute top-[28%] items-center text-center pl-[10px] pointer-events-none">
            <UilSearch className="w-4 h-4 text-blue-300 dark:text-white" />
          </div>
          <input
            type="text"
            id="search-assets"
            className="input w-full leading-5 rounded-[12px] outline-none py-2 pl-8 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 font-500 font-body cursor-pointer text-blue-300 bg-white border-none dark:bg-opacity-5 dark:text-white"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[160px] overflow-y-auto mt-1">
          {filteredAssets?.length > 0 &&
            filteredAssets
              ?.flatMap((y: any) => y.assets)
              ?.filter((item: any) =>
                item?.name?.toLowerCase()?.startsWith(searchQuery.toLowerCase())
              )
              ?.map((item: any, index: number) => (
                <>
                  <div
                    className="w-full flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => {
                      setTokenValue(item.name);
                      setOpenTokenDropdown(false);
                    }}
                    key={`tokenDropdown-${index}`}
                  >
                    <div className="flex gap-x-4 items-center">
                      <div className="rounded-3xl h-7 w-7 bg-white dark:bg-opacity-10 flex justify-center items-center">
                        <Image
                          width={16}
                          height={16}
                          src={AssetImages[item.shortName]}
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-500 text-14 text-blue-300 dark:text-white leading-4">
                          {item.name}
                        </span>
                        <span className="font-500 text-12 text-blue-700 leading-4 dark:text-white/30">
                          {item.shortName}
                        </span>
                      </div>
                    </div>
                    {tokenValue === item.name && (
                      <UilCheckCircle className="text-primary h-4 w-4" />
                    )}
                  </div>
                  {index !==
                    filteredAssets?.flatMap((y: any) => y.assets)?.length -
                      1 && <hr className="p-0 m-0 bg-gray-300 opacity-10" />}
                </>
              ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TokenDropDown;
