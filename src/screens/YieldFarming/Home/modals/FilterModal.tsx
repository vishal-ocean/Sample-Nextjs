import CustomModal from "@/components/CustomModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/form/Input";
import { IconRoundedCheck } from "@/components/icons/IconRoundedCheck";
import { YIELD_FILTER_MODAL } from "@/constants";
import { UilSearch, UilTimes } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useState } from "react";
import { useYieldStaticData } from "../components/useYieldStaticData";

export const FilterModal = () => {
  const [platform, setPlatform] = useState("");
  const [chain, setChain] = useState("");
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? YIELD_FILTER_MODAL : "");
  };
  const { ChainDropdownItems } = useYieldStaticData();
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 rounded-b-none"
      open={modalOpen === YIELD_FILTER_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
    >
      <div className="flex justify-between items-center">
        <span className="text-16 text-blue-300 font-500 leading-5 dark:text-white">
          Filters
        </span>
        <div
          className="flex bg-secondary justify-center disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center cursor-pointer dark:bg-white/15 dark:text-white"
          onClick={() => setHandleModal("")}
        >
          <UilTimes className="w-4 h-4 text-blue-300 dark:text-white" />
        </div>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="platforms" className="dark:border-white/15">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex justify-between w-full mr-2">
                <div className="text-14 font-500 leading-4 text-blue-300 dark:text-white relative">
                  Platforms
                  {platform && (
                    <span className="bg-primary block h-2 w-2 absolute rounded-full -top-0.5 -right-5" />
                  )}
                </div>
                {platform && (
                  <div onClick={() => setPlatform("")}>
                    <UilTimes className="w-4 h-4 text-blue-300 dark:text-white" />
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative rounded-xl bg-gray-100 flex items-center w-full mb-2.5 dark:bg-white/5">
                <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
                  <UilSearch className="h-4 w-4 text-blue-300 dark:text-white " />
                </div>
                <Input
                  type="text"
                  id="search-assets"
                  className="input w-full leading-4 rounded-3xl outline-none py-2 pl-10 placeholder:text-gray-300 dark:placeholder:text-white/30 placeholder:font-700 placeholder:font-body placeholder:text-14 text-14  font-500 font-body cursor-pointer text-blue-300 bg-transparent border-none dark:text-white"
                  placeholder="Search"
                  required
                />
              </div>

              <div className="max-h-[250px] overflow-y-auto pr-2">
                {[...Array(5)].map((item, index) => (
                  <>
                    <div
                      className="w-full flex justify-between items-center py-2.5 cursor-pointer last:pb-0"
                      onClick={() => {
                        setPlatform(`platformname-${index}`);
                      }}
                      key={`CurrencyDropdown-${index}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-500 text-14 text-blue-300 leading-4 dark:text-white">
                          Platform name
                        </span>
                      </div>
                      {platform === `platformname-${index}` && (
                        <IconRoundedCheck className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="chains" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex justify-between w-full mr-2">
                <div className="text-14 font-500 leading-4 text-blue-300 relative dark:text-white">
                  Chains
                  {chain && (
                    <span className="bg-primary block h-2 w-2 absolute rounded-full -top-0.5 -right-5" />
                  )}
                </div>
                {chain && (
                  <div onClick={() => setChain("")}>
                    <UilTimes className="w-4 h-4 text-blue-300" />
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative rounded-xl bg-gray-100 flex items-center w-full mb-2.5 dark:bg-white/5">
                <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
                  <UilSearch className="h-4 w-4 text-blue-300 dark:text-white " />
                </div>
                <Input
                  type="text"
                  id="search-assets"
                  className="input w-full leading-4 rounded-3xl outline-none py-2 pl-10 placeholder:text-gray-300 dark:placeholder:text-white/30 placeholder:font-700 placeholder:font-body placeholder:text-14 text-14  font-500 font-body cursor-pointer text-blue-300 bg-transparent border-none dark:text-white"
                  placeholder="Search"
                  required
                />
              </div>
              <div className="max-h-[250px] overflow-y-auto mt-1 pr-2">
                {ChainDropdownItems.slice(1).map((item, index) => (
                  <>
                    <div
                      className="w-full flex justify-between items-center py-2.5 cursor-pointer"
                      onClick={() => {
                        setChain(item.chain);
                      }}
                      key={`CurrencyDropdown-${index}`}
                    >
                      <div className="flex gap-x-3 items-center">
                        <div className="rounded-3xl h-7 w-7 bg-secondary flex justify-center items-center p-1.5 dark:bg-white/10">
                          {item.chainIcon}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-500 text-14 text-blue-300 leading-4 dark:text-white">
                            {item.chainName}
                          </span>
                        </div>
                      </div>
                      {chain === item.chain && (
                        <IconRoundedCheck className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex gap-2 mt-3">
          <Button className="py-3 px-4 text-14 font-700 leading-4 w-full">
            Apply
          </Button>
          <Button className="py-3 px-4 text-14 font-700 leading-4 bg-secondary text-blue-300 w-full dark:text-white dark:bg-white/15">
            Clear
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
