"use client";
import CustomModal from "@/components/CustomModal";
import TooltipSlider from "@/components/Slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { Button } from "@/components/UI/Button";
import { Switch } from "@/components/UI/Switch";
import { IconRoundedCheck } from "@/components/icons/IconRoundedCheck";
import { FILTER_MODAL } from "@/constants";
import {
  UilBuilding,
  UilChart,
  UilMoneyWithdraw,
  UilMultiply,
  UilTimes,
} from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useState } from "react";

const RealEstateType = [
  {
    name: "Hotel",
  },
  {
    name: "Office Building",
  },
  {
    name: "Factory",
  },
  {
    name: "Storehouse",
  },
  {
    name: "Living house",
  },
  {
    name: "Restaurant",
  },
];

const FilterModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
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
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? FILTER_MODAL : "");
  };

  return (
    <CustomModal
      open={modalOpen === FILTER_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
      className="w-full sm:max-w-[476px] p-5 bottom-0 md:bottom-auto translate-y-0 sm:-translate-y-1/2"
    >
      <div className=" ">
        <div className="flex justify-between items-center">
          <p className="sm:text-24 font-500 leading-5 text-16 sm:leading-10 text-blue-300 dark:text-white">
            Filters
          </p>
          <div
            className="flex bg-secondary cursor-pointer disabled:text-gray-300 dark:bg-white dark:bg-opacity-15 text-black rounded-full !p-0 h-7 w-7 sm:w-10 sm:h-10 items-center"
            onClick={() => setHandleModal("")}
          >
            <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
          </div>
        </div>
        <div className="flex flex-col sm:px-2.5 mt-6">
          <Accordion type="single">
            <AccordionItem value="item-1" className="border-none" disabled>
              <AccordionTrigger className="grid grid-cols-[1fr_auto_auto]">
                <div className="leading-4 text-14 font-500 text-blue-300 dark:text-white flex gap-x-2 items-center ">
                  <UilBuilding className="w-4 h-4" />
                  <span>Coming Soon</span>
                  {checkedItems?.length > 0 && (
                    <span className="bg-blue-800 w-2 h-2 rounded-full self-start"></span>
                  )}
                </div>
                {checkedItems?.length > 0 && (
                  <div onClick={() => setCheckedItems([])}>
                    <UilMultiply className="w-4 h-4 text-blue-300 justify-self-end font-700" />
                  </div>
                )}
              </AccordionTrigger>

              {RealEstateType?.map((item, index) => (
                <AccordionContent key={`real-estate-type-${index}`}>
                  <div className="gap-x-2 flex mt-1">
                    <input
                      className="accent-blue-300 dark:accent-white"
                      type="checkbox"
                      id={item.name}
                      onChange={handleCheckboxChange}
                      value={item.name}
                      checked={checkedItems.includes(item.name)}
                    />
                    <label
                      htmlFor={item.name}
                      className="tracking-[-0.32px] leading-5 font-500 text-blue-700 dark:text-white"
                    >
                      {item?.name}
                    </label>
                  </div>
                </AccordionContent>
              ))}
            </AccordionItem>
            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="grid grid-cols-[1fr_auto_auto]">
                <div className="flex gap-x-2 items-center leading-4 text-14 font-500">
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
                      <UilMultiply className="w-4 h-4 text-blue-300 justify-self-end font-700" />
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
                <div className="flex gap-x-2 items-center leading-4 text-14 font-500 relative">
                  <UilMoneyWithdraw className="w-4 h-4" />
                  <span>Min Investment</span>
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
                      <UilMultiply className="w-4 h-4 text-blue-300 justify-self-end font-700" />
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
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-x-2 items-center leading-4 text-14 font-500">
              <IconRoundedCheck className="h-4 w-4 text-blue-300 dark:text-white" />
              {/* <div className="w-4 h-4 rounded-3xl bg-blue-300 flex items-center justify-center">
                <UilCheck className="text-white" />
              </div> */}
              <span>Already Invested</span>
            </div>
            <Switch className="data-[state=checked]:bg-blue-300 !w-6 !h-3 small-switch-thumb" />
          </div>
        </div>
        <div className="flex gap-x-2 mt-8">
          <Button className="text-16 font-700 leading-5 py-2.5 w-full hover:bg-blue-300 dark:hover:bg-white dark:hover:text-blue-300">
            Apply
          </Button>
          <Button className="text-16 font-700 leading-5 py-2.5 bg-secondary dark:bg-white/15 dark:text-white text-blue-300 w-full hover:bg-secondary/10">
            Clear
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default FilterModal;
