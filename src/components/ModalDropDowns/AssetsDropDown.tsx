import { UilSearch } from '@/icons';

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

interface AssetsDropDownProps {
  openAssetsDropDown: boolean;
  setOpenAssetsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  tokenValue: string;
  setTokenValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  align?: 'center' | 'start' | 'end' | undefined;
  networkValue: string;
}
const AssetsDropDown: React.FC<AssetsDropDownProps> = ({
  tokenValue,
  setTokenValue,
  openAssetsDropDown,
  setOpenAssetsDropDown,
  className,
  align,
  networkValue
}) => {
  const { data: AssetsDropDownItems, isLoading } = useChainAssetsList();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = Array.isArray(AssetsDropDownItems)
    ? AssetsDropDownItems?.filter((x: any) => x.name === networkValue)
    : [];
  return (
    <Popover
      open={openAssetsDropDown}
      // onOpenChange={(e) => setOpenAssetsDropDown(e)}
    >
      <PopoverTrigger />
      <PopoverContent
        className={cn(
          'sm:bg-secondary/50 bg-secondary sm:backdrop-blur-[16px] p-4 rounded-[16px] sm:w-[424px] w-[340px] dark:bg-gray-250/10 dark:border-none',
          className
        )}
        align={align}
      >
        <span className="text-gray-300 text-12 font-500 leading-5 dark:text-white/30">
          Asset
        </span>
        <div className="relative w-full !bg-white rounded-[12px] flex items-center mt-3 dark:!bg-white/10">
          <div className="flex justify-center absolute top-[28%] items-center text-center pl-[10px] pointer-events-none">
            <UilSearch className="w-4 h-4 text-blue-300 dark:text-white" />
          </div>
          <input
            type="text"
            id="search-assets"
            className="input w-full leading-5 rounded-[12px] outline-none py-2 pl-8 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 font-500 font-body cursor-pointer text-blue-300 bg-white border-none dark:text-white dark:bg-white/5"
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
                    className={`w-full flex justify-between items-center py-2 cursor-pointer pe-2 border-b-2 border-gray-300 border-opacity-[0.1] dark:border-white/15 `}
                    onClick={() => {
                      setTokenValue(item.name);
                      setOpenAssetsDropDown(false);
                    }}
                    key={`AssetsDropDown-${index}`}
                  >
                    <div className="flex gap-x-3 items-center">
                      <Image
                        width={16}
                        height={16}
                        alt="icon"
                        src={AssetImages[item?.shortName]}
                        className="flex"
                      />
                      <div className="font-500 text-16 leading-5">
                        <span className="text-blue-300 dark:text-white">
                          {item.name}
                        </span>
                        <span className="flex text-gray-300 dark:text-white/30">
                          {item.shortName}
                        </span>
                      </div>
                    </div>
                    <div className=" flex justify-between text-16 leading-5">
                      <div>
                        <span className="flex justify-end font-700 text-blue-300 dark:text-white">
                          BTC 0.0004982
                        </span>
                        <span className="flex font-500 text-gray-300 dark:text-white/30 justify-end whitespace-nowrap">
                          €425.34
                        </span>
                      </div>
                      {/* {tokenValue === item.name && (
                        <UilCheckCircle className="text-primary h-4 w-4 ms-2 items-center" />
                      )} */}
                    </div>
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

export default AssetsDropDown;
