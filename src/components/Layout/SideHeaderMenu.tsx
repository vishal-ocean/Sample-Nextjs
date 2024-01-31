import { AllMenuList } from "@/constants/headerStaticData";
import { IsStretchBanner } from "@/helper/isStretchBanner";
import {
  UilAngleLeft,
  UilAngleRightB,
  UilBars,
  UilCardAtm,
  UilTimes,
} from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
import { cn } from "@/utils";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../UI/Dropdown";
import IconBank from "../icons/IconBank";
import IconEthereum from "../icons/IconEthereum";
import IconGold from "../icons/IconGold";
import IconOceanCard from "../icons/IconOceanCard";
import IconTransaction from "../icons/IconTransaction";

const data = [
  {
    name: "Neobanking",
    icon: <IconBank strokeWidth={1.5} className="h-6 w-6" />,
  },
  {
    name: "Crypto",
    icon: <IconEthereum className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    name: "Wealth",
    icon: <IconGold strokeWidth={1.2} className="h-6 w-6" />,
  },
  {
    name: "NFTs",
    icon: <IconOceanCard className="h-6 w-6" strokeWidth={1.3} />,
  },
];

const SideHeaderMenu = () => {
  const [openValue, setOpenValue] = useState("");
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { setHandleModal } = useHandleModalAction;

  return (
    <>
      <DropdownMenu
        open={isOpen}
        onOpenChange={(e) => {
          setOpen(true), setIsOpen(e);
        }}
      >
        <DropdownMenuTrigger className="ml-3 cursor-pointer">
          {isOpen ? (
            <div
              className={cn(
                "h-10 w-10 lg:hidden flex justify-center items-center bg-blue-300 dark:bg-white/10 rounded-3xl text-white",
                IsStretchBanner() ? "bg-white/10" : ""
              )}
            >
              <UilTimes className="w-4 h-4" />
            </div>
          ) : (
            <div
              className={cn(
                "h-10 w-10 lg:hidden flex justify-center items-center bg-blue-300 dark:bg-white dark:text-blue-300 rounded-3xl text-white",
                IsStretchBanner() ? "bg-white text-blue-300" : ""
              )}
            >
              <UilBars className="w-4 h-4" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-transparent bg-none p-0 border-none w-[240px] shadow-none"
          align="end"
          sideOffset={15}
        >
          {isOpen && open ? (
            <>
              <div className="backdrop-blur-[40px] p-4 bg-gray-50/50 dark:bg-gray-250/10 divide-y divide-gray-300/10 dark:divide-white/15 rounded-xl">
                {data.map((item, index) => (
                  <div
                    className={cn(
                      "flex justify-between gap-3 items-center py-2 first:pt-0 cursor-pointer",
                      item.name === "NFTs" && "pointer-events-none opacity-50"
                    )}
                    key={`menu-${index}`}
                    onClick={() => {
                      setOpenValue(item.name), setOpen(false);
                    }}
                  >
                    <div className="flex gap-3 items-center">
                      <span className="bg-white/40 h-10 w-10 p-1 text-blue-300 dark:bg-white/10 dark:text-white rounded-full flex justify-center items-center">
                        {item.icon}
                      </span>
                      <span className="text-blue-300 text-16 leading-5 font-500 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                    <UilAngleRightB className="text-blue-300 dark:text-white h-4 w-4" />
                  </div>
                ))}
                <div className="flex justify-between gap-3 items-center pt-2 cursor-pointer">
                  <Link
                    href="/cards"
                    className="flex gap-3 items-center w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="bg-white/40 h-10 w-10 p-1 text-blue-300 dark:bg-white/10 rounded-full flex justify-center items-center">
                      <UilCardAtm className="h-6 w-6 text-blue-300 dark:text-white" />
                    </span>
                    <span className="text-blue-300 text-16 leading-5 font-500 dark:text-white">
                      Card
                    </span>
                  </Link>
                  {/* <UilAngleRightB className="text-blue-300 h-4 w-4" /> */}
                </div>
              </div>
              <div className="backdrop-blur-[40px] p-4 bg-gray-50/50 dark:bg-gray-250/10 divide-y divide-gray-300/10 dark:divide-white/15 mt-2 rounded-xl">
                <Link
                  href="/transactions"
                  className="flex w-full gap-3 items-center cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex gap-3 items-center">
                    <span className="bg-white/40 h-10 w-10 p-1 text-blue-300 dark:bg-white/10 rounded-full flex justify-center items-center">
                      <IconTransaction
                        className="h-6 w-6 text-blue-300 dark:text-white"
                        strokeWidth={0.6}
                      />
                    </span>
                    <span className="text-blue-300 text-16 leading-5 font-500 dark:text-white">
                      Transactions
                    </span>
                  </div>
                  {/* <UilAngleRightB className="text-blue-300 h-4 w-4" /> */}
                </Link>
                {/* <Link
                  href=""
                  className="flex justify-between gap-3 items-center pt-2 cursor-pointer pointer-events-none opacity-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex gap-3 items-center">
                    <span className="bg-white/40 h-10 w-10 p-1 text-blue-300 rounded-full flex justify-center items-center">
                      <UilLightbulbAlt className="h-6 w-6 text-blue-300" />
                    </span>
                    <span className="text-blue-300 text-16 leading-5 font-500">
                      Learning Center
                    </span>
                  </div>
                  <UilAngleRightB className="text-blue-300 h-4 w-4" />
                </Link> */}
              </div>
            </>
          ) : (
            <>
              <div
                className="backdrop-blur-[40px] p-4 bg-gray-50/50 dark:bg-gray-250/10 divide-y divide-gray-300/10 rounded-xl flex gap-3 items-center cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <UilAngleLeft className="h-5 w-5 text-blue-300 dark:text-white" />
                <p className="text-blue-300 text-16 leading-5 font-500 dark:text-white">
                  {openValue}
                </p>
              </div>
              <div className="backdrop-blur-[40px] p-4 bg-gray-50/50 dark:bg-gray-250/10 divide-y divide-gray-300/10 dark:divide-white/15 mt-2 rounded-xl">
                {openValue &&
                  AllMenuList?.[openValue].map((value, index) => (
                    <Link
                      href={value.link}
                      key={`allMenu-${index}`}
                      className="flex gap-3 items-center py-2 cursor-pointer first:pt-0 last:pb-0"
                      onClick={() => {
                        setIsOpen(false), setHandleModal(value.openModal || "");
                      }}
                    >
                      <span className="bg-white/40 h-10 w-10 p-1 text-blue-300 dark:bg-white/10 dark:text-white rounded-full flex justify-center items-center">
                        {value.icon}
                      </span>
                      <span className="text-blue-300 dark:text-white text-16 leading-5 font-500">
                        {value.name}
                      </span>
                    </Link>
                  ))}
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SideHeaderMenu;
