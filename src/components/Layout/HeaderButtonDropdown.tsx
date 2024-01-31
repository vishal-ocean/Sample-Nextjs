"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/UI/HoverCard";
import IconEthereum from "@/components/icons/IconEthereum";
import IconOceanCard from "@/components/icons/IconOceanCard";
import { Crypto, NFTs, NeoBanking, Wealth } from "@/constants/headerStaticData";
import { UilCardAtm } from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconBank from "../icons/IconBank";
import IconGold from "../icons/IconGold";

export const HeaderButtonDropdown = () => {
  const pathname = usePathname();
  const { setHandleModal } = useHandleModalAction;

  return (
    <div className="flex gap-2">
      <HoverCard openDelay={100} closeDelay={50}>
        <HoverCardTrigger asChild className="">
          <Link
            href="/neo-banking"
            className={cn(
              "flex gap-2 text-blue-300 hover:text-white bg-white dark:bg-white/15 dark:text-white hover:bg-blue-300 group dark:hover:bg-white dark:hover:text-blue-300 py-3 px-4 items-center text-14 font-700 rounded-full cursor-pointer leading-4",
              pathname.split("/").includes("neo-banking")
                ? "bg-primary text-white dark:bg-primary dark:text-white dark:bg-opacity-[1]"
                : ""
            )}
          >
            <IconBank strokeWidth={1.5} className="h-4 w-4" />
            Neobanking
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="bg-gray-250/30 dark:bg-white/10 p-1 rounded-[12px] backdrop-blur-xl border-none">
          {NeoBanking.map((value, index) => (
            <Link
              href={value.link}
              key={`neoBanking-${index}`}
              className="flex items-center gap-3 p-2  last:border-none border-b border-gray-300/10 dark:border-gray-250/10 cursor-pointer hover:bg-blue-300 group dark:hover:bg-white/15 hover:text-white dark:text-white hover:rounded-md text-blue-300"
              onClick={() => setHandleModal(value.openModal || "")}
            >
              <span className="bg-white/30 h-7 w-7 group-hover:bg-white dark:group-hover:bg-white/10  text-blue-300 dark:bg-white/10 dark:text-white rounded-full flex justify-center items-center">
                {value.icon}
              </span>
              <p className="text-14 leading-4 font-500">{value.name}</p>
            </Link>
          ))}
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={100} closeDelay={50}>
        <HoverCardTrigger asChild>
          <Link
            href="/crypto"
            className={cn(
              "flex gap-2 text-blue-300 hover:text-white bg-white dark:bg-white dark:bg-opacity-15 dark:text-white hover:bg-blue-300 group dark:hover:bg-white dark:hover:text-blue-300 py-3 px-4 items-center text-14 font-700 rounded-full cursor-pointer leading-4",
              pathname.split("/").includes("crypto")
                ? "bg-primary text-white dark:bg-primary dark:text-white dark:bg-opacity-[1]"
                : ""
            )}
          >
            <IconEthereum className="h-4 w-4 stroke-2" />
            Crypto
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="bg-gray-250/30 dark:bg-white/10 p-1 rounded-[12px] backdrop-blur-xl border-none">
          {Crypto.map((value, index) => (
            <Link
              href={value.link}
              key={`crypto-${index}`}
              className="flex items-center gap-3 p-2 last:border-none border-b border-gray-300/10 dark:border-gray-250/10 cursor-pointer hover:bg-blue-300 group dark:hover:bg-white/15 hover:text-white dark:text-white hover:rounded-md text-blue-300"
              onClick={() => setHandleModal(value.openModal || "")}
            >
              <span className="bg-white/30 h-7 w-7 group-hover:bg-white dark:group-hover:bg-white/10  text-blue-300 dark:bg-white/10 dark:text-white rounded-full flex justify-center items-center">
                {value.icon}
              </span>
              <p className="text-14 leading-4 font-500">{value.name}</p>
            </Link>
          ))}
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={100} closeDelay={50}>
        <HoverCardTrigger asChild>
          <Link
            href="/wealth"
            className={cn(
              "flex gap-2 text-blue-300 hover:text-white bg-white dark:bg-white dark:bg-opacity-15 dark:text-white hover:bg-blue-300 group dark:hover:bg-white dark:hover:text-blue-300 py-3 px-4 items-center text-14 font-700 rounded-full cursor-pointer leading-4",
              pathname.split("/").includes("wealth")
                ? "bg-primary text-white dark:bg-primary dark:text-white dark:bg-opacity-[1]"
                : ""
            )}
          >
            <IconGold strokeWidth={1.2} className="h-4 w-4" />
            Wealth
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="bg-gray-250/30 dark:bg-white/10 p-1 rounded-[12px] backdrop-blur-xl border-none">
          {Wealth.map((value, index) => (
            <Link
              href={value.link}
              key={`wealth-${index}`}
              className="flex items-center gap-3 p-2 last:border-none border-b border-gray-300/10 dark:border-gray-250/10 cursor-pointer hover:bg-blue-300 group dark:hover:bg-white/15 hover:text-white dark:text-white hover:rounded-md text-blue-300"
            >
              <span className="bg-white/30 h-7 w-7 group-hover:bg-white dark:group-hover:bg-white/10  text-blue-300 dark:bg-white/10 dark:text-white rounded-full flex justify-center items-center">
                {value.icon}
              </span>
              <p className="text-14 leading-4 font-500">{value.name}</p>
            </Link>
          ))}
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={100} closeDelay={50}>
        <HoverCardTrigger asChild className="pointer-events-none opacity-40">
          <Link
            href=""
            className={cn(
              "flex gap-2 text-blue-300 hover:text-white bg-white dark:bg-white dark:bg-opacity-15 dark:text-white hover:bg-blue-300 group dark:hover:bg-white dark:hover:text-blue-300 py-3 px-4 items-center text-14 font-700 rounded-full cursor-pointer leading-4",
              pathname.split("/").includes("nft") ? "bg-primary text-white" : ""
            )}
          >
            <IconOceanCard className="h-4 w-4" strokeWidth={1.5} />
            NFTs
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="bg-gray-250/30 dark:bg-white/10 p-1 rounded-[12px] backdrop-blur-xl border-none">
          {NFTs.map((value, index) => (
            <div
              key={`nft-${index}`}
              className="flex items-center gap-3 py-2 last:border-none border-b border-gray-300/10 dark:border-gray-250/10 cursor-pointer hover:bg-blue-300 group dark:hover:bg-white/15 hover:text-white dark:text-white hover:rounded-md text-blue-300"
            >
              <span className="bg-white/30 h-7 w-7 group-hover:bg-white dark:group-hover:bg-white/10  text-blue-300 dark:bg-white/10 dark:text-white rounded-full flex justify-center items-center">
                {value.icon}
              </span>
              <p className="text-14 leading-4 font-500">{value.name}</p>
            </div>
          ))}
        </HoverCardContent>
      </HoverCard>
      <Link
        href={"/cards"}
        className={cn(
          "flex gap-2 text-blue-300 hover:text-white bg-white dark:bg-white dark:bg-opacity-15 dark:text-white hover:bg-blue-300 group dark:hover:bg-white dark:hover:text-blue-300 py-2 px-4 items-center text-14 font-700 rounded-full cursor-pointer leading-4",
          pathname.split("/").includes("cards") ? "bg-primary text-white" : ""
        )}
      >
        <UilCardAtm className="h-5 w-5" />
        Cards
      </Link>
    </div>
  );
};
