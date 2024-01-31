"use client";
import TooltipSlider from "@/components/Slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { Switch } from "@/components/UI/Switch";
import { IconBagCheck } from "@/components/icons/IconBagCheck";
import { IconSlice } from "@/components/icons/IconSlice";
import { UilBuilding, UilChart, UilMultiply } from "@/icons";
import { useState } from "react";

const RealEstateType = [
  {
    name: "Coming Soon",
  },
  {
    name: "Coming Soon",
  },
  {
    name: "Coming Soon",
  },
  {
    name: "Coming Soon",
  },
  {
    name: "Coming Soon",
  },
  {
    name: "Coming Soon",
  },
];

const MarketTypes = ({ isSecondaryMarket = false }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [interestRate, setInterestRate] = useState<number | number[]>();
  const [investment, setInvestment] = useState<number | number[]>();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const itemName = event.target.value;
    setCheckedItems((prevCheckedItems: string[]) => {
      if (prevCheckedItems.includes(itemName)) {
        return prevCheckedItems.filter((item) => item !== itemName);
      } else {
        return [...prevCheckedItems, itemName];
      }
    });
  };
  return (
    <>
      <div className="bg-white dark:bg-white/15 rounded-[24px] p-8">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between">
            <div className="leading-5 text-blue-300 flex gap-x-2 items-center font-700">
              <h2 className="leading-5 font-500 text-gray-300 dark:text-white/30">
                Filters
              </h2>
              {checkedItems?.length > 0 ||
              (interestRate &&
                JSON.stringify([0, 35]) !== JSON.stringify(interestRate)) ||
              (investment &&
                JSON.stringify([5000, 560000]) !==
                  JSON.stringify(investment)) ? (
                <span className="bg-blue-800 w-2 h-2 rounded-full self-start"></span>
              ) : (
                ""
              )}
            </div>
            {checkedItems?.length > 0 ||
            (interestRate &&
              JSON.stringify([0, 35]) !== JSON.stringify(interestRate)) ||
            (investment &&
              JSON.stringify([5000, 560000]) !== JSON.stringify(investment)) ? (
              <div
                className="flex gap-x-2 items-center cursor-pointer"
                onClick={() => {
                  setCheckedItems([]);
                  setInterestRate(0);
                  setInvestment(0);
                }}
              >
                <span className="text-blue-300 dark:text-white font-700 tracking-[-0.32px] leading-5">
                  Clear All
                </span>
                <UilMultiply className="w-4 h-4 text-blue-300 dark:text-white justify-self-end font-700" />
              </div>
            ) : (
              ""
            )}
          </div>
          <Accordion type="single">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="grid grid-cols-[1fr_auto_auto]">
                <div className="leading-5 text-blue-300 dark:text-white flex gap-x-2 items-center font-700">
                  <UilBuilding className="w-4 h-4" />
                  <span>Coming Soon</span>
                  {checkedItems?.length > 0 && (
                    <span className="bg-blue-800 w-2 h-2 rounded-full self-start"></span>
                  )}
                </div>
                {checkedItems?.length > 0 && (
                  <div onClick={() => setCheckedItems([])}>
                    <UilMultiply className="w-4 h-4 text-blue-300 dark:text-white justify-self-end font-700" />
                  </div>
                )}
              </AccordionTrigger>

              {/* {RealEstateType?.map((item, index) => (
                <AccordionContent key={`real-estate-type-${index}`}>
                  <div className="gap-x-2 flex">
                    <input
                      className="accent-blue-300"
                      type="checkbox"
                      id={item.name}
                      onChange={handleCheckboxChange}
                      value={item.name}
                      checked={checkedItems.includes(item.name)}
                    />
                    <label
                      htmlFor={item.name}
                      className="tracking-[-0.32px] leading-5 font-500 text-blue-700"
                    >
                      {item?.name}
                    </label>
                  </div>
                </AccordionContent>
              ))} */}
            </AccordionItem>
            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="grid grid-cols-[1fr_auto_auto]">
                <div className="flex leading-5 gap-x-2 items-center font-700">
                  <UilChart className="w-4 h-4" />
                  <span>Interest Rate</span>
                  {interestRate &&
                    JSON.stringify([0, 35]) !==
                      JSON.stringify(interestRate) && (
                      <span className="bg-blue-800 w-2 h-2 rounded-full self-start"></span>
                    )}
                </div>
                {interestRate &&
                  JSON.stringify([0, 35]) !== JSON.stringify(interestRate) && (
                    <div onClick={() => setInterestRate([0, 35])}>
                      <UilMultiply className="w-4 h-4 text-blue-300 dark:text-white justify-self-end font-700" />
                    </div>
                  )}
              </AccordionTrigger>
              <AccordionContent>
                <TooltipSlider
                  range
                  min={0}
                  max={35}
                  defaultValue={[0, 35]}
                  tipFormatter={(value) => `${value}!`}
                  className="mx-1.5"
                  onChange={(e) => setInterestRate(e)}
                  value={interestRate}
                />
                <div className="flex justify-between mt-1 font-500 text-12 leading-4 tracking-[-0.24px] text-blue-700 dark:text-white">
                  <span>5%</span>
                  <span>35%</span>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="grid grid-cols-[1fr_auto_auto]">
                <div className="flex leading-5 gap-x-2 items-center font-700 relative">
                  <IconSlice className="w-4 h-4" />
                  <span className="max-w-[151px] whitespace-break-spaces">
                    Minimum Investment
                  </span>
                  {investment &&
                    JSON.stringify([5000, 560000]) !==
                      JSON.stringify(investment) && (
                      <span className="bg-blue-800 w-2 h-2 rounded-full self-start"></span>
                    )}
                </div>
                {investment &&
                  JSON.stringify([5000, 560000]) !==
                    JSON.stringify(investment) && (
                    <div onClick={() => setInvestment([5000, 560000])}>
                      <UilMultiply className="w-4 h-4 text-blue-300 dark:text-white justify-self-end font-700" />
                    </div>
                  )}
              </AccordionTrigger>
              <AccordionContent>
                <TooltipSlider
                  range
                  min={5000}
                  max={560000}
                  defaultValue={[5000, 560000]}
                  tipFormatter={(value) => `${value}!`}
                  className="mx-1.5"
                  onChange={(e) => setInvestment(e)}
                  value={investment}
                />
                <div className="flex justify-between mt-1 font-500 text-12 leading-4 tracking-[-0.24px] text-blue-700 dark:text-white">
                  <span>€5,000</span>
                  <span>€560,000</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center font-700">
              <IconBagCheck className="h-4 w-4 text-blue-300 dark:text-white" />
              {/* <div className="w-4 h-4 rounded-3xl bg-blue-300 dark:bg-white flex items-center justify-center">
                <UilCheck className="text-white dark:text-transparent" />
              </div> */}
              <span className="text-blue-300 dark:text-white leading-5">
                Already Invested
              </span>
            </div>
            <Switch className="data-[state=checked]:bg-blue-300 !w-6 !h-3 small-switch-thumb" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketTypes;
