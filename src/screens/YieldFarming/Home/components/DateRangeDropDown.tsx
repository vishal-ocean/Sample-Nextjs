'use Client';
import { DatePicker } from '@/components/UI/DatePicker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/UI/Dropdown';
import { UilAngleDown } from '@/icons';
import { cn } from '@/utils';
import { useState } from 'react';
type FilterOptionType = {
  startDate: string | Date | null;
  endDate: string | Date | null;
};
export const DateRangeDropDown = () => {
  const [filterOption, setFilterOption] = useState<FilterOptionType>({
    startDate: 'null',
    endDate: 'null'
  });
  const [openDateDropdown, setOpenDateDropdown] = useState(false);
  return (
    <>
      <DropdownMenu onOpenChange={setOpenDateDropdown}>
        <DropdownMenuTrigger className="bg-secondary w-full block text-blue-300 text-14 font-700 py-0 h-10 px-0 sm:px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4 dark:bg-white/15 dark:text-white  dark:data-[state=open]:bg-white dark:data-[state=open]:text-blue-300">
          <div className="flex items-center gap-x-2 rounded-full justify-center">
            Date
            <UilAngleDown
              className={cn(
                'chevron-down h-6 w-6 transition-all dropdown-title',
                openDateDropdown && 'rotate-180'
              )}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-secondary/90 p-4 flex flex-col gap-y-3 rounded-[24px] mt-1 w-fit dark:bg-gray-450"
          align="start"
        >
          <DropdownMenuLabel className="text-gray-300 text-12 font-500 leading-5 py-0 placeholder:text-secondary dark:text-white/30 ">
            Enter start and end dates
          </DropdownMenuLabel>
          <div className="flex flex-col gap-y-2">
            <DatePicker
              onChange={(date: Date) =>
                setFilterOption((prev) => ({
                  ...prev,
                  startDate: date
                }))
              }
              className="w-[160px] rounded-[8px] bg-white/80 py-1 px-3 border-gray-300 text-14 placeholder:text-gray-300 dark:bg-white/5 dark:placeholder:text-white/30 "
              placeholderText="MM.DD.YYYY"
              dateFormat="MM.dd.yyyy"
            />
            <DatePicker
              onChange={(date: Date) =>
                setFilterOption((prev) => ({ ...prev, endDate: date }))
              }
              className="w-[160px] rounded-[8px] bg-white/80 py-1 px-3 border-gray-300 text-14 placeholder:text-gray-300 dark:bg-white/5 dark:placeholder:text-white/30  "
              placeholderText="MM.DD.YYYY"
              dateFormat="MM.dd.yyyy"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
ssr: false;
