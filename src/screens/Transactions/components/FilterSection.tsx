'use client';
import { Button } from '@/components/UI/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/UI/Dropdown';
import CustomToolTip from '@/components/UI/Tooltip';
import { FILTER_MODAL } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import {
  UilAngleDown,
  UilCheckCircle,
  UilFileDownloadAlt,
  UilSearch
} from '@/icons';
import { useCryptoStore } from '@/store/useCryptoStore';
import { cn } from '@/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFilterSection } from './hooks/useFilterSection';
const FilterModal = dynamic(() => import('./Modals/FilterModal'));

const FilterSection = ({
  modalOpen,
  setHandleModal,
  setHandleModalState,
  filterOption,
  setFilterOption
}: {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
  setHandleModalState: (payload: boolean) => void;
  filterOption: {
    type: string;
    startDate: string | number | Date | null;
    endDate: string | number | Date | null;
    asset: string;
  };
  setFilterOption: React.Dispatch<
    React.SetStateAction<{
      type: string;
      startDate: string | number | Date | null;
      endDate: string | number | Date | null;
      asset: string;
    }>
  >;
}) => {
  const { AssetsDropdownItems, TransactionTypeDropdownItems, formatDate } =
    useFilterSection();
  const [openTransactionTypeDropdown, setOpenTransactionTypeDropdown] =
    useState(false);
  const [openAssetDropdown, setOpenAssetDropdown] = useState(false);
  const [openDateDropdown, setOpenDateDropdown] = useState(false);
  const [assetsList, setAssetsList] = useState<any>([]);
  const { assets } = useCryptoStore();
  useEffect(() => {
    setAssetsList([{ name: 'All' }, ...assets]);
  }, [assets]);
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <div className="flex gap-x-1 sm:w-fit w-full self-end">
        <div className="sm:flex hidden  gap-x-1">
          <DropdownMenu onOpenChange={setOpenTransactionTypeDropdown}>
            <DropdownMenuTrigger className="bg-secondary dark:bg-white dark:bg-opacity-15 dark:text-white text-blue-300 text-14 font-700 py-0 h-10 px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4">
              <div className="flex items-center gap-x-2 rounded-full">
                {filterOption.type !== 'All' &&
                  TransactionTypeDropdownItems.find(
                    (item) => item.value === filterOption.type
                  )?.icon}
                <span className="font-700 leading-5 text-16 dropdown-title">
                  {filterOption.type !== 'All'
                    ? TransactionTypeDropdownItems.find(
                        (item) => item.value === filterOption.type
                      )?.name
                    : 'Type'}
                </span>
                <UilAngleDown
                  className={cn(
                    'chevron-down h-6 w-6 transition-all dropdown-title',
                    openTransactionTypeDropdown && 'rotate-180'
                  )}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary/50 dark:bg-gray-250/10 backdrop-blur-[16px] p-4 flex flex-col rounded-[12px] w-[200px] mt-1 h-[300px]">
              <DropdownMenuLabel className="text-gray-300 text-12 font-500 leading-5 py-0">
                Transaction Type
              </DropdownMenuLabel>
              <div className="max-h-[308px] overflow-y-auto">
                {TransactionTypeDropdownItems.map((item, index) => (
                  <>
                    <DropdownMenuItem
                      className="w-full flex justify-between items-center my-2 cursor-pointer"
                      onClick={() =>
                        setFilterOption((prev) => ({
                          ...prev,
                          type: item.value
                        }))
                      }
                      key={`assetsDropdown-${index}`}
                      disabled={item.disabled}
                    >
                      <div className="flex gap-x-4 items-center">
                        <div className="rounded-3xl h-7 w-7 bg-white dark:bg-opacity-10 flex justify-center items-center">
                          {item.icon}
                        </div>
                        <span className="text-14 font-500 text-blue-300  dark:text-white leading-4">
                          {item.name}
                        </span>
                      </div>
                      {filterOption.type === item.value && (
                        <UilCheckCircle className="text-primary h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                    {index !== TransactionTypeDropdownItems.length - 1 && (
                      <DropdownMenuSeparator className="p-0 m-0 bg-gray-300 opacity-10" />
                    )}
                  </>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu onOpenChange={setOpenDateDropdown}>
            <DropdownMenuTrigger className="bg-secondary dark:bg-white dark:bg-opacity-15 dark:text-white text-blue-300 text-14 font-700 py-0 h-10 px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4">
              <div className="flex items-center gap-x-2 rounded-full">
                {filterOption.startDate !== null &&
                filterOption.endDate !== null
                  ? `${formatDate(filterOption?.startDate)} - ${formatDate(
                      filterOption?.endDate
                    )}`
                  : 'Date Range'}
                <UilAngleDown
                  className={cn(
                    'chevron-down h-6 w-6 transition-all dropdown-title',
                    openDateDropdown && 'rotate-180'
                  )}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary/90 dark:bg-gray-250/10 p-4 flex flex-col gap-y-3 rounded-[24px] mt-1 w-fit">
              <DropdownMenuLabel className="text-gray-300 text-12 font-500 leading-5 py-0 placeholder:text-secondary">
                Enter start and end dates
              </DropdownMenuLabel>
              <div className="flex flex-col gap-y-2">
                <DatePicker
                  selected={filterOption.startDate}
                  onChange={(date: Date) =>
                    setFilterOption((prev) => ({
                      ...prev,
                      startDate: date
                    }))
                  }
                  selectsStart
                  startDate={filterOption.startDate}
                  endDate={filterOption.endDate}
                  className="w-[160px] rounded-[8px] bg-white/80 dark:bg-gray-250/10 py-1 px-3 border-gray-300 text-14 placeholder:text-gray-300 "
                  placeholderText="MM.DD.YYYY"
                  dateFormat="MM.dd.yyyy"
                />
                <DatePicker
                  selected={filterOption.endDate}
                  onChange={(date: Date) =>
                    setFilterOption((prev) => ({ ...prev, endDate: date }))
                  }
                  selectsEnd
                  startDate={filterOption.startDate}
                  endDate={filterOption.endDate}
                  minDate={filterOption.startDate}
                  className="w-[160px] rounded-[8px] bg-white/80 dark:bg-gray-250/10 py-1 px-3 border-gray-300 text-14 placeholder:text-gray-300"
                  placeholderText="MM.DD.YYYY"
                  dateFormat="MM.dd.yyyy"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu onOpenChange={setOpenAssetDropdown}>
            <DropdownMenuTrigger className="bg-secondary text-blue-300 dark:bg-white dark:bg-opacity-15 dark:text-white text-14 font-700 py-0 h-10 px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4">
              <div className="flex items-center gap-x-2 rounded-full">
                {filterOption.asset !== 'All' &&
                  assets?.find((x) => x.name === filterOption.asset)
                    ?.shortName && (
                    <Image
                      width={24}
                      height={24}
                      src={
                        AssetImages[
                          assets?.find((x) => x?.name === filterOption?.asset)
                            ?.shortName || 'ETH'
                        ] || ''
                      }
                      alt="image"
                    />
                  )}
                <span className="font-700 leading-5 text-16  dropdown-title">
                  {filterOption.asset !== 'All'
                    ? assets?.find((x) => x.name === filterOption.asset)
                        ?.shortName
                    : 'All'}
                </span>
                <UilAngleDown
                  className={cn(
                    'chevron-down h-6 w-6 transition-all dropdown-title',
                    openAssetDropdown && 'rotate-180'
                  )}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary/50 dark:bg-gray-250/10 backdrop-blur-[16px] p-4 flex flex-col gap-y-1 rounded-[24px] w-full mt-1">
              <DropdownMenuLabel className="text-gray-300 text-12 font-500 leading-5">
                Assets
              </DropdownMenuLabel>
              <div className="relative w-full !bg-white dark:!bg-black rounded-[12px] flex items-center">
                <div className="flex justify-center absolute top-[28%] items-center text-center pl-[10px]">
                  <UilSearch className="w-4 h-4 text-blue-300" />
                </div>
                <input
                  type="text"
                  id="search-assets"
                  className="input w-full leading-5 rounded-[12px] outline-none py-2 pl-8 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 font-500 font-body cursor-pointer text-blue-300 bg-white border-none"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <div className="max-h-[200px] overflow-y-auto mt-1">
                {assetsList
                  ?.filter((item: any) =>
                    item.name
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase())
                  )
                  ?.map((item: any, index: number) => (
                    <>
                      <DropdownMenuItem
                        className="w-full flex justify-between items-center py-2 cursor-pointer"
                        onClick={() =>
                          setFilterOption((prev) => ({
                            ...prev,
                            asset: item.name
                          }))
                        }
                        key={`assetsDropdown-${index}`}
                      >
                        <div className="flex gap-x-4 items-center">
                          <div className="rounded-3xl h-7 w-7 bg-white dark:bg-opacity-10 flex justify-center items-center">
                            {item?.shortName ? (
                              <Image
                                width={16}
                                height={16}
                                src={AssetImages[item?.shortName || 'ETH']}
                                alt="image"
                              />
                            ) : (
                              AssetsDropdownItems[0].icon
                            )}
                          </div>
                          <span className="font-500 text-14 text-blue-300 dark:text-white dark:text-100 leading-4">
                            {item.name}
                          </span>
                        </div>
                        {filterOption.asset === item.name && (
                          <UilCheckCircle className="text-primary h-4 w-4" />
                        )}
                      </DropdownMenuItem>
                      {index !== assetsList.length - 1 && (
                        <DropdownMenuSeparator className="p-0 m-0 bg-gray-300 opacity-10" />
                      )}
                    </>
                  ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          variant={'secondary'}
          className="text-14 font-700 text-blue-300 dark:bg-white dark:bg-opacity-15 dark:text-white sm:hidden flex justify-center items-center py-2 px-4 w-full leading-4"
          onClick={() => setHandleModal(FILTER_MODAL)}
        >
          <span>Filters</span>
          <UilAngleDown className="w-4 h-4" />
        </Button>
        <CustomToolTip content={'Export CSV'}>
          <div className="bg-primary rounded-3xl !p-0 h-10 w-10 flex justify-center items-center hover:bg-blue-300">
            <UilFileDownloadAlt className="w-4 h-4 text-white" />
          </div>
        </CustomToolTip>
      </div>
      {modalOpen == FILTER_MODAL && (
        <FilterModal
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          modalOpen={modalOpen}
          setHandleModal={setHandleModal}
          setHandleModalState={setHandleModalState}
        />
      )}
    </>
  );
};

export default FilterSection;
