"use client";
import {
  UilAngleRightB,
  UilCheckCircle,
  UilMultiply,
  UilSearch,
  UilTimes,
} from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import DatePicker from "react-datepicker";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContentWithoutClose,
  DialogTrigger,
} from "@/components/UI/Dialog";
import IconCalendar from "@/components/icons/IconCalander";
import IconEthereum from "@/components/icons/IconEthereum";
import IconTopUp from "@/components/icons/IconTopUp";
import { FILTER_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { useCryptoStore } from "@/store/useCryptoStore";
import { useEffect, useState } from "react";
import { useFilterSection } from "../hooks/useFilterSection";

type FilterOption = {
  type: string;
  startDate: string | number | Date | null;
  endDate: string | number | Date | null;
  asset: string;
};

type filterModal = {
  filterOption: FilterOption;
  setFilterOption: React.Dispatch<React.SetStateAction<FilterOption>>;
  modalOpen: string;
  setHandleModal: (payload: string) => void;
  setHandleModalState: (Payload: boolean) => void;
};

const FilterModal = ({
  filterOption,
  setFilterOption,
  modalOpen,
  setHandleModal,
  setHandleModalState,
}: filterModal) => {
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? FILTER_MODAL : "");
    setHandleModalState(false);
  };

  const { TransactionTypeDropdownItems, AssetsDropdownItems } =
    useFilterSection();
  const [assetsList, setAssetsList] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { assets } = useCryptoStore();
  useEffect(() => {
    setAssetsList([{ name: "All" }, ...assets]);
  }, [assets]);

  const handleApplyFilter = () => setHandleModal("");
  const handleClearAll = () => {
    setFilterOption({
      type: "all",
      startDate: null,
      endDate: null,
      asset: "all",
    });
  };
  return (
    <>
      <Dialog open={modalOpen == FILTER_MODAL} onOpenChange={handleOpenChange}>
        <DialogTrigger />
        <DialogContentWithoutClose
          className={cn(
            "max-w-[656px] sm:-translate-y-1/2 translate-y-0 rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
            "p-5 sm:max-w-[520px] w-full bottom-0 top-auto"
          )}
        >
          <div className="flex justify-between">
            <span className="text-24 font-500 text-blue-300 dark:text-white leading-7">
              Filters
            </span>
            <Button
              variant="secondary"
              className="!p-0 h-10 w-10 text-blue-300 dark:bg-white/10 dark:text-white flex justify-center items-center"
              onClick={() => setHandleModal("")}
            >
              <UilTimes className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-[22px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-2">
                    <div className="flex gap-x-2">
                      <div className="flex gap-x-2 items-center">
                        <div className="w-7 h-7 rounded-full flex justify-center items-center bg-secondary dark:bg-white/10 dark:text-white text-blue-300">
                          <IconTopUp strokeWidth={2} className="h-4 w-4" />
                        </div>
                        <span className="text-blue-300 dark:text-white font-700 leading-5">
                          Transaction Type
                        </span>
                      </div>
                      {filterOption.type !== "" && (
                        <div className="h-2 w-2 rounded-3xl bg-primary" />
                      )}
                    </div>
                    {filterOption.type !== "" && (
                      <Button
                        variant={"outline"}
                        className="!p-0"
                        onClick={() =>
                          setFilterOption((prev) => ({
                            ...prev,
                            type: "all",
                          }))
                        }
                      >
                        <UilMultiply className="w-4 h-4 font-700" />
                      </Button>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-3 max-h-[200px] overflow-y-auto">
                    {TransactionTypeDropdownItems.map((item, index) => (
                      <div
                        className="flex justify-between cursor-pointer mr-2"
                        onClick={() =>
                          ["TopUp", "Transfer", "All"].includes(item.value) &&
                          setFilterOption((prev) => ({
                            ...prev,
                            type: item.value,
                          }))
                        }
                        key={`typeAccordionContent-${index}`}
                      >
                        <div className="flex gap-x-4 items-center">
                          <div className="rounded-3xl h-7 w-7 bg-secondary dark:bg-white/10 flex justify-center items-center">
                            {item.icon}
                          </div>
                          <span className="font-500 text-blue-300 dark:text-white leading-5">
                            {item.name}
                          </span>
                        </div>
                        {filterOption.type === item.value && (
                          <UilCheckCircle className="text-primary h-4 w-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-2">
                    <div className="flex gap-x-2">
                      <div className="flex gap-x-2 items-center">
                        <div className="w-7 h-7 rounded-full flex justify-center items-center bg-secondary dark:bg-white/10 dark:text-white text-blue-300">
                          <IconCalendar className="h-4 w-4" />
                        </div>
                        <span className="text-blue-300 dark:text-white font-700 leading-5">
                          Date Range
                        </span>
                      </div>
                      {filterOption.startDate !== null &&
                        filterOption.endDate !== null && (
                          <div className="h-2 w-2 rounded-3xl bg-primary" />
                        )}
                    </div>
                    {filterOption.startDate !== null &&
                      filterOption.endDate !== null && (
                        <Button
                          variant={"outline"}
                          className="!p-0"
                          onClick={() =>
                            setFilterOption((prev) => ({
                              ...prev,
                              startDate: null,
                              endDate: null,
                            }))
                          }
                        >
                          <UilMultiply className="w-4 h-4 font-700" />
                        </Button>
                      )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-x-2 items-center">
                    <DatePicker
                      selected={filterOption.startDate}
                      onChange={(date: Date) =>
                        setFilterOption((prev) => ({
                          ...prev,
                          startDate: date,
                        }))
                      }
                      selectsStart
                      startDate={filterOption.startDate}
                      endDate={filterOption.endDate}
                      className="w-[144px] rounded-[8px] bg-gray-200 dark:bg-opacity-20 py-2 px-3 border-gray-300 text-14 placeholder:text-gray-300"
                      placeholderText="MM.DD.YYYY"
                      dateFormat="MM.dd.yyyy"
                    />
                    <UilAngleRightB className="w-4 h-4 text-gray-300" />
                    <DatePicker
                      selected={filterOption.endDate}
                      onChange={(date: Date) =>
                        setFilterOption((prev) => ({ ...prev, endDate: date }))
                      }
                      selectsEnd
                      startDate={filterOption.startDate}
                      endDate={filterOption.endDate}
                      minDate={filterOption.startDate}
                      className="w-[144px] rounded-[8px] bg-gray-200 dark:bg-opacity-20 py-2 px-3 border-gray-300 text-14 placeholder:text-gray-300"
                      placeholderText="MM.DD.YYYY"
                      dateFormat="MM.dd.yyyy"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-2">
                    <div className="flex gap-x-2">
                      <div className="flex gap-x-2 items-center">
                        <div className="w-7 h-7 rounded-full flex justify-center items-center bg-secondary dark:bg-white/10 dark:text-white text-blue-300">
                          <IconEthereum strokeWidth={1.2} className="h-4 w-4" />
                        </div>
                        <span className="text-blue-300 dark:text-white font-700 leading-5">
                          Assets
                        </span>
                      </div>
                      {filterOption.asset !== "" && (
                        <div className="h-2 w-2 rounded-3xl bg-primary" />
                      )}
                    </div>
                    {filterOption.asset !== "" && (
                      <Button
                        variant={"outline"}
                        className="!p-0"
                        onClick={() =>
                          setFilterOption((prev) => ({
                            ...prev,
                            asset: "All",
                          }))
                        }
                      >
                        <UilMultiply className="w-4 h-4 font-700" />
                      </Button>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-3">
                    <div className="relative w-full !bg-gray-100 dark:!bg-white/10 rounded-[12px] flex items-center">
                      <div className="flex justify-center absolute top-[28%] items-center text-center pl-[10px] pointer-events-none">
                        <UilSearch className="w-4 h-4 text-blue-300 dark:text-white" />
                      </div>
                      <input
                        type="text"
                        id="search-assets"
                        className="input w-full leading-5 rounded-[12px] outline-none py-2 pl-8 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 font-500 font-body cursor-pointer text-blue-300 bg-gray-100 dark:bg-white/10 dark:text-white border-none"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                      />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto mt-1 flex flex-col gap-y-3">
                      {assetsList
                        ?.filter((item: any) =>
                          item.name
                            .toLowerCase()
                            .startsWith(searchQuery.toLowerCase())
                        )
                        ?.map((item: any, index: number) => (
                          <div
                            className="flex justify-between cursor-pointer"
                            onClick={() =>
                              setFilterOption((prev) => ({
                                ...prev,
                                asset: item.name,
                              }))
                            }
                            key={`assetsAccordionContent-${index}`}
                          >
                            <div className="flex gap-x-4 items-center">
                              <div className="rounded-3xl  h-7 w-7 bg-secondary dark:bg-white/10 flex justify-center items-center">
                                {item?.shortName ? (
                                  <Image
                                    width={16}
                                    height={16}
                                    src={AssetImages[item?.shortName || "ETH"]}
                                    alt="image"
                                  />
                                ) : (
                                  AssetsDropdownItems[0].icon
                                )}
                              </div>
                              <span className="font-500 text-blue-300 dark:text-white leading-5">
                                {item.name}
                              </span>
                            </div>
                            {filterOption.asset === item.name && (
                              <UilCheckCircle className="text-primary h-4 w-4" />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-5 flex gap-x-2 w-full">
            <Button
              className="font-700 text-white px-6 py-4 w-full leading-5"
              onClick={handleApplyFilter}
            >
              Apply
            </Button>
            <Button
              variant="secondary"
              className="font-700 text-blue-300 px-6 py-4 w-full leading-5"
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </div>
        </DialogContentWithoutClose>
      </Dialog>
    </>
  );
};

export default FilterModal;
