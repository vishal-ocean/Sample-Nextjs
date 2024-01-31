"use client";
import { UilAngleRightB } from "@/icons";

import IconBank from "@/components/icons/IconBank";
import IconEthereum from "@/components/icons/IconEthereum";
import IconGold from "@/components/icons/IconGold";
import IconOceanCard from "@/components/icons/IconOceanCard";
import { readableNumber } from "@/helper/readableNumber";
import { useCryptoStore } from "@/store/useCryptoStore";
import { useUserDataStore } from "@/store/userDataStore";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";

const HomeCards = () => {
  const { totalAssetsData } = useCryptoStore();
  const { user } = useUser();
  const { userWalletDetails } = useUserDataStore();
  return (
    <>
      <div className="flex gap-2 mx-auto mt-3 overflow-x-auto overflow-y-hidden px-3 sm:pl-10 lg:px-4 xl:px-0 remove-scrollbar">
        <div className="rounded-[28px]  h-[168px] sm:h-[180px] min-w-[220px] sm:min-w-[280px] lg:w-[324px] crypto-card relative">
          <Image
            src="/images/crypto-card.png"
            height={500}
            width={500}
            alt=""
            className="w-full h-full rounded-[28px] absolute -z-10 min-w-[220px] sm:min-w-[280px] lg:w-[324px] min-h-[168px] sm:min-h-[180px]"
          />
          <div className="p-4 sm:p-6 flex flex-col justify-between relative z-0 h-full">
            <div className="flex justify-between">
              <span className="h-10 w-10 flex justify-center items-center bg-primary/30 rounded-full">
                <IconEthereum
                  strokeWidth={1.5}
                  height={24}
                  width={24}
                  className="text-white"
                />
              </span>
              <Link href={"/crypto"}>
                <span className="h-10 w-10 flex justify-center items-center bg-white/20 rounded-full">
                  <UilAngleRightB className="w-4 h-4 text-white" />
                </span>
              </Link>
            </div>
            <div>
              <p className="text-16 font-500 leading-4 text-white">Crypto</p>
              <p className="text-26 font-700 leading-7 text-gray-100 mt-2">
                €
                {Number(
                  totalAssetsData?.balances?.[0]?.balanceFiat?.toFixed(2)
                ) || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] h-[168px] sm:h-[180px] min-w-[220px] sm:min-w-[280px] lg:w-[324px] relative">
          <Image
            src="/images/fiat-card.png"
            height={500}
            width={500}
            alt=""
            className="w-full rounded-[28px] absolute -z-10 min-w-[220px] sm:min-w-[280px] lg:w-[324px] min-h-[168px] sm:min-h-[180px]"
          />
          <div className="p-4 sm:p-6 flex flex-col justify-between relative z-0 h-full fiat-card rounded-[28px]">
            <div className="flex justify-between">
              <span className="h-10 w-10 flex justify-center items-center rounded-full bg-success-500 bg-opacity-30">
                <IconBank strokeWidth={1.5} className="h-5 w-5 text-white" />
              </span>
              <Link href={"/neo-banking"} className="">
                <span className="h-10 w-10 flex justify-center items-center bg-white/20 rounded-full">
                  <UilAngleRightB className="w-4 h-4 text-white" />
                </span>
              </Link>
            </div>
            <div>
              <p className="text-16 font-500 leading-4 text-white">Fiat</p>
              <p className="text-26 font-700 leading-7 text-white mt-2">
                €
                {readableNumber(
                  Number(
                    userWalletDetails?.accounts?.EUR?.availableBalance
                      ?.amount || 0
                  ) / 100
                ) || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px]  h-[168px] sm:h-[180px] min-w-[220px] sm:min-w-[280px] lg:w-[324px] wealth-card relative">
          <Image
            src="/images/wealth-card.png"
            height={500}
            width={500}
            alt=""
            className="w-full rounded-[28px] absolute -z-10 min-w-[220px] sm:min-w-[280px] lg:w-[324px] min-h-[168px] sm:min-h-[180px]"
          />
          <div className="p-4 sm:p-6 flex flex-col justify-between relative z-0 h-full">
            <div className="flex justify-between">
              <span className="h-10 w-10 flex justify-center items-center bg-orange-600 bg-opacity-30 rounded-full">
                <IconGold strokeWidth={1.2} className="w-5 h-5 text-white" />
              </span>
              <Link href={"/wealth"}>
                <span className="h-10 w-10 flex justify-center items-center bg-white/20 rounded-full">
                  <UilAngleRightB className="w-4 h-4 text-white" />
                </span>
              </Link>
            </div>
            <div>
              <p className="text-16 font-500 leading-4 text-white">
                Wealth Management
              </p>
              <p className="text-26 font-700 leading-7 text-gray-100 mt-2">
                {user?.email === "jeel@yopmail.com" ? "€1232.45" : "€0"}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px]  h-[168px] sm:h-[180px] min-w-[220px] sm:min-w-[280px] lg:w-[324px] relative">
          <Image
            src="/images/nft-card.png"
            height={500}
            width={500}
            alt=""
            className="w-full rounded-[28px] absolute -z-10 min-w-[220px] sm:min-w-[280px] lg:w-[324px] min-h-[168px] sm:min-h-[180px]"
          />
          <div className="p-4 sm:p-6 flex flex-col justify-between relative z-0 h-full">
            <div className="flex justify-between">
              <span className="h-10 w-10 flex justify-center items-center bg-purple-400  rounded-full bg-opacity-30">
                <IconOceanCard className="text-white h-6 w-6" />
              </span>
              <Link href={""} className="invisible">
                <span className="h-10 w-10 flex justify-center items-center bg-white/20 rounded-full">
                  <UilAngleRightB className="w-4 h-4 text-white" />
                </span>{" "}
              </Link>
            </div>
            <div>
              <p className="text-16 font-500 leading-4 text-white">
                NFT - <span className="text-white"> Coming Soon</span>
              </p>
              <p className="text-26 font-700 leading-7 text-white mt-2">€0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCards;
