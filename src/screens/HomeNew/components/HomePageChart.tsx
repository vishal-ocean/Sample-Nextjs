"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { cn } from "@/utils";
import { useState } from "react";
import ChartTabContent from "./ChartTabContent";
import HomePageAssetsListing from "./HomePageAssetsListing";

const tabItems = [
  {
    tabName: "Crypto",
    tab: "crypto",
    bg: "bg-primary",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
    colorCode: "#1A48FF",
  },
  {
    tabName: "Fiat",
    tab: "fiat",
    bg: "bg-success-100",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
    colorCode: "#00C113",
  },
  {
    tabName: "Wealth",
    tab: "wealth",
    bg: "bg-orange-300",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
    colorCode: "#FF7D1F",
  },
  {
    tabName: "NFT",
    tab: "nft",
    bg: "bg-purple-200",
    activeTabBg:
      "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
    colorCode: "#8723B7",
  },
];
const HomePageChart = () => {
  const [selectedTab, setSelectedState] = useState("all");

  return (
    <div className="p-5 rounded-xl bg-white dark:bg-white/10">
      <Tabs
        defaultValue="crypto"
        className="sm:w-auto w-full whitespace-nowrap"
      >
        <TabsList className=" flex gap-1 justify-start p-0">
          {tabItems.map((item, index) => (
            <TabsTrigger
              value={item.tab}
              key={`tabs-${index}`}
              className={cn(
                " bg-secondary text-blue-300 dark:text-white py-2 px-3 rounded-full data-[state=active]:text-white dark:data-[state=active]:text-blue-300 dark:bg-white/15",
                item?.activeTabBg
                // item?.tab !== "all" && "data-[state=active]:pl-0"
              )}
              onClick={() => setSelectedState(item.tab)}
            >
              <h4 className=" leading-4 font-700 text-12 font-body">
                {item?.tabName}
              </h4>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabItems.map((item, index) => (
          <TabsContent
            value={item?.tab}
            className=""
            key={`tabContent-${index}`}
          >
            <ChartTabContent tab={item?.tab} colorCode={item?.colorCode} />
            <hr className="border-secondary my-10 dark:border-white/15" />

            <HomePageAssetsListing tab={item?.tab} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
export default HomePageChart;
