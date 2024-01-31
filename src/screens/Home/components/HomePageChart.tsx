import { cn } from "@/utils";
import ChartTabContent from "./ChartTabContent";
import HomePageAssetsListing from "./HomePageAssetsListing";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { useState } from "react";

const tabItems = [
  {
    tabName: "All Assets",
    tab: "all",
    bg: "",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
  },
  {
    tabName: "Crypto",
    tab: "crypto",
    bg: "bg-primary",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
  },
  {
    tabName: "Fiat",
    tab: "fiat",
    bg: "bg-success-100",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
  },
  {
    tabName: "Wealth",
    tab: "wealth",
    bg: "bg-orange-300",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
  },
  {
    tabName: "NFT",
    tab: "nft",
    bg: "bg-purple-200",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
  },
];
const HomePageChart = () => {
  const [selectedTab, setSelectedState] = useState("all");
  return (
    <>
      <div className="bg-gray-100 dark:bg-transparent dark:border dark:border-white dark:border-opacity-15 py-3 sm:pt-5 rounded-[24px] ">
        <Tabs
          defaultValue="all"
          className="sm:w-auto w-full whitespace-nowrap pb-3 md:pb-0 "
        >
          <div className="remove-scrollbar sticky z-10 rounded-3xl sm:static top-2 bg-gray-250/10 dark:bg-transparent sm:bg-transparent backdrop-blur-[50px] sm:backdrop-blur-none">
            <TabsList className="flex justify-start dark:bg-transparent p-2 gap-x-1 rounded-3xl h-fit overflow-x-auto remove-scrollbar">
              {tabItems.map((item, index) => (
                <TabsTrigger
                  value={item.tab}
                  key={`tabs-${index}`}
                  className={cn(
                    "flex gap-x-2 justify-center items-center hover:bg-white dark:hover:bg-white/10 text-blue-300 dark:text-white p-3 sm:py-3 sm:px-4 rounded-full data-[state=active]:text-white dark:data-[state=active]:text-blue-300",
                    item?.activeTabBg
                    // item?.tab !== "all" && "data-[state=active]:pl-0"
                  )}
                  onClick={() => setSelectedState(item.tab)}
                >
                  {item?.tab !== "all" && selectedTab !== item.tab && (
                    <div
                      className={cn(
                        "w-[10px] h-[10px] rounded-full",
                        selectedTab === item.tab ? "" : item?.bg
                      )}
                    />
                  )}
                  <h4 className=" leading-4 font-700 text-14 font-body">
                    {item?.tabName}
                  </h4>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabItems.map((item, index) => (
            <TabsContent
              value={item?.tab}
              className="mt-0"
              key={`tabContent-${index}`}
            >
              <div className="flex md:flex-row flex-col justify-between md:items-stretch sm:px-10 px-2 mt-0">
                <ChartTabContent tab={item?.tab} />
              </div>
              <HomePageAssetsListing tab={item?.tab} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default HomePageChart;
