"use client";
import ProjectFilterModal from "@/components/ProjectFilterModal";
import { Button } from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/Dropdown";
import { Input } from "@/components/UI/form/Input";
import { PROJECT_FILTER_MODAL } from "@/constants";
import SecondaryMarketData from "@/constants/SecondaryMarketData.json";
import { UilAngleDown, UilCheckCircle, UilSearch } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import ProjectListing from "./ProjectListing";
import { useProjectDummyList } from "./useProjectDummyList";
const SecondaryMarket = () => {
  const [offersFilter, setOffersFilter] = useState("all-offers");
  const [filterOption, setFilterOption] = useState("all");
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  const { PROJECT_LIST } = useProjectDummyList();
  return (
    <>
      <div className="bg-white rounded-[24px] p-[20px_20px_48px_20px] flex flex-col gap-y-8">
        <div className="flex justify-between gap-y-4 flex-col sm:flex-row ">
          <div className="flex gap-x-2">
            <Button
              variant="secondary"
              className={cn(
                "px-4 py-3 text-14 font-700 text-blue-300 leading-4 w-full sm:w-full",
                offersFilter === "all-offers" && "bg-blue-300 text-white"
              )}
              onClick={() => setOffersFilter("all-offers")}
            >
              All Offers
            </Button>
            <Button
              variant="secondary"
              className={cn(
                "px-4 py-3 text-14 font-700 text-blue-300 leading-4 w-full sm:w-auto",
                offersFilter === "my-offers" && "bg-blue-300 text-white"
              )}
              onClick={() => setOffersFilter("my-offers")}
            >
              My Offers
            </Button>
          </div>
          <div className="grid sm:grid-cols-[auto_auto] gap-x-1  gap-y-2">
            <div className="sm:block hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-secondary text-blue-300 text-14 font-700 py-0 h-10 px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4">
                  <div className="flex items-center gap-x-2 rounded-full">
                    {filterOption !== "all" &&
                      PROJECT_LIST.find((x) => x.value === filterOption)
                        ?.img && (
                        <Image
                          width={24}
                          height={24}
                          src={
                            PROJECT_LIST.find((x) => x.value === filterOption)
                              ?.img || ""
                          }
                          alt="image"
                        />
                      )}
                    <span className="font-700 leading-5 text-16  dropdown-title">
                      {filterOption !== "all"
                        ? PROJECT_LIST.find((x) => x.value === filterOption)
                            ?.value
                        : "All Projects"}
                    </span>
                    <UilAngleDown className="chevron-down h-6 w-6 transition-all dropdown-title" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary/50 backdrop-blur-[16px] p-4 flex flex-col gap-y-1 rounded-[24px] w-[300px] mt-1">
                  <DropdownMenuLabel className="text-gray-300 text-12 font-500 leading-5">
                    Projects
                  </DropdownMenuLabel>
                  <div className="relative w-full !bg-white rounded-[12px] flex items-center">
                    <div className="flex justify-center absolute top-[28%] items-center text-center pl-[10px] pointer-events-none">
                      <UilSearch className="w-4 h-4 text-blue-300" />
                    </div>
                    <Input
                      type="text"
                      id="search-assets"
                      className="input w-full leading-5 rounded-[12px] outline-none py-2 pl-8 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 font-500 font-body cursor-pointer text-blue-300 bg-white border-none"
                      placeholder="Search"
                      required
                    />
                  </div>
                  <div className="max-h-[200px] overflow-y-auto mt-1">
                    {PROJECT_LIST.map((item, index) => (
                      <>
                        <DropdownMenuItem
                          className="w-full flex justify-between items-center py-2 cursor-pointer"
                          onClick={() => setFilterOption(item.value)}
                          key={`assetsDropdown-${index}`}
                        >
                          <div className="flex gap-x-4 items-center">
                            <div className="rounded-3xl h-7 w-7 bg-white/40 flex justify-center items-center">
                              {item.img ? (
                                <Image
                                  width={16}
                                  height={16}
                                  src={item.img}
                                  alt="image"
                                />
                              ) : (
                                item.icon
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-500 text-14 text-blue-300 leading-4">
                                {filterOption !== "all"
                                  ? item.value
                                  : item.name}
                              </span>
                              {filterOption !== "all" && (
                                <span className="font-500 text-12 text-gray-300 leading-4">
                                  {item.name}
                                </span>
                              )}
                            </div>
                          </div>
                          {filterOption === item.value && (
                            <UilCheckCircle className="text-primary h-4 w-4" />
                          )}
                        </DropdownMenuItem>
                        {index !== PROJECT_LIST.length - 1 && (
                          <DropdownMenuSeparator className="p-0 m-0 bg-gray-300 opacity-10" />
                        )}
                      </>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="sm:hidden block order-2 sm:order-1">
              <Button
                variant="secondary"
                className="flex items-center gap-x-2 rounded-3xl w-full px-0 sm:px-4 py-2.5 sm:py-2 sm:w-fit sm:min-w-[100px] min-w-[84px]"
                onClick={() => setHandleModal(PROJECT_FILTER_MODAL)}
              >
                <div className="flex items-center gap-x-2 rounded-full">
                  {filterOption !== "all" &&
                    PROJECT_LIST.find((x) => x.value === filterOption)?.img && (
                      <Image
                        width={24}
                        height={24}
                        src={
                          PROJECT_LIST.find((x) => x.value === filterOption)
                            ?.img || ""
                        }
                        alt="image"
                      />
                    )}
                  <span className="font-700 leading-5 text-16  dropdown-title">
                    {filterOption !== "all"
                      ? PROJECT_LIST.find((x) => x.value === filterOption)
                          ?.value
                      : "All Projects"}
                  </span>
                </div>
                <UilAngleDown className="chevron-down md:h-6 md:w-6 w-4 h-4 transition-all dropdown-title" />
              </Button>
            </div>
            <div className="relative w-full lg:w-[280px] !bg-white rounded-[28px] flex items-center sm:order-2 order-1">
              <div className="flex absolute top-[12px]  items-center text-center pl-4 pointer-events-none">
                <UilSearch className="h-4 w-4 text-blue-300" />
              </div>
              <Input
                type="text"
                className="input w-full rounded-3xl outline-none py-3 px-4 pl-10 lg:placeholder:text-14 placeholder:text-gray-300 placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 font-500 cursor-pointer text-blue-300 bg-gray-200 lg:h-fit h-10 border-none leading-4"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <ProjectListing data={SecondaryMarketData} />
      </div>
      {modalOpen === PROJECT_FILTER_MODAL && (
        <ProjectFilterModal
          filterOption={filterOption}
          setFilterOption={setFilterOption}
        />
      )}
    </>
  );
};

export default SecondaryMarket;
