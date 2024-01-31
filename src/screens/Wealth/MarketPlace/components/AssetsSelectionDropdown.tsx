import { UilCheckCircle, UilSearch } from "@/icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { Input } from "@/components/UI/form/Input";
import { cn } from "@/utils";
import Image from "next/image";
import { useProjectDummyList } from "./SecondaryMarket/useProjectDummyList";

interface AssetsDropdownProps {
  openAssetsDropdown: boolean;
  setOpenAssetsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  assetsValue: string;
  setAssetsValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  align?: "center" | "start" | "end" | undefined;
}
const AssetsSelectionDropdown = ({
  assetsValue,
  setAssetsValue,
  openAssetsDropdown,
  setOpenAssetsDropdown,
  className,
  align,
}: AssetsDropdownProps) => {
  const { PROJECT_LIST } = useProjectDummyList();

  return (
    <Popover
      open={openAssetsDropdown}
      onOpenChange={(e) => setOpenAssetsDropdown(e)}
    >
      <PopoverTrigger />
      <PopoverContent
        className={cn(
          "sm:bg-secondary/50 bg-secondary sm:backdrop-blur-[16px] p-4 rounded-[16px] w-[280px]",
          className
        )}
        align={align}
      >
        <span className="text-gray-300 text-12 font-500 leading-5">Tokens</span>
        <div className="relative w-full !bg-white rounded-[12px] flex items-center mt-3">
          <div className="flex justify-center absolute top-[28%] items-center text-center pl-[10px] pointer-events-none">
            <UilSearch className="w-4 h-4 text-blue-300" />
          </div>
          <Input
            type="text"
            id="search-assets"
            className="input w-full leading-5 rounded-[12px] outline-none py-2 pl-8 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 font-500 font-body cursor-pointer text-blue-300 bg-white border-none"
            placeholder="Search"
          />
        </div>
        <div className="max-h-[160px] overflow-y-auto mt-1">
          {PROJECT_LIST.filter((x) => x.value !== "all").map((item, index) => (
            <>
              <div
                className="w-full flex justify-between items-center py-2 cursor-pointer"
                onClick={() => {
                  setAssetsValue(item.value);
                  setOpenAssetsDropdown(false);
                }}
                key={`tokenDropdown-${index}`}
              >
                <div className="flex gap-x-4 items-center">
                  <div className="rounded-3xl h-7 w-7 bg-white/40 flex justify-center items-center">
                    <Image
                      width={16}
                      height={16}
                      src={item.img || ""}
                      alt="image"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-500 text-14 text-blue-300 leading-4">
                      {item.value}
                    </span>
                    <span className="font-500 text-12 text-gray-300 leading-4">
                      {item.name}
                    </span>
                  </div>
                </div>
                {assetsValue === item.value && (
                  <UilCheckCircle className="text-primary h-4 w-4" />
                )}
              </div>
              {index !==
                PROJECT_LIST.filter((x) => x.value !== "all").length - 1 && (
                <hr className="p-0 m-0 bg-gray-300 opacity-10" />
              )}
            </>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AssetsSelectionDropdown;
