"use client";
import { Button } from "@/components/UI/Button";
import { Tier } from "@/constants/headerStaticData";
import { readableNumber } from "@/helper/readableNumber";
import { useCryptoStore } from "@/store/useCryptoStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export const HomeTopBanner = () => {
  const { user, error, isLoading } = useUser();
  const { totalAssetsData } = useCryptoStore();
  const { userWalletDetails } = useUserDataStore();

  return (
    <>
      <div className="w-full h-[284px] bg-black rounded-[16px] relative overflow-hidden">
        <Image
          width={2000}
          height={2000}
          className="h-full w-full absolute top-0 left-0"
          src="/images/home-banner-ellipse.png"
          alt="image"
        />
        <div className="absolute top-5 inset-x-5 flex justify-between">
          <div className="text-24 font-500 leading-7 text-white">
            Welcome back,
            <p className="text-white/30">{user?.nickname}</p>
          </div>
          <div className="p-2 rounded-full backdrop-blur-md bg-white/15 flex h-max w-max -space-x-2 overflow-hidden">
            <div className="outline outline-2 outline-[#28292D] rounded-full">
              <Image
                src="/images/svg/icon-LTC.svg"
                height={24}
                width={24}
                alt="avatar"
                className="rounded-full"
              />
            </div>
            <div className="outline outline-2 outline-[#28292D] rounded-full">
              <Image
                src="/images/svg/icon-USDT.svg"
                height={24}
                width={24}
                alt="avatar"
                className="rounded-full"
              />
            </div>
            <div className="outline outline-2 outline-[#28292D] rounded-full">
              <Image
                src="/images/svg/icon-BTC.svg"
                height={24}
                width={24}
                alt="avatar"
                className="rounded-full"
              />
            </div>
            <div className="h-6 w-6 backdrop-blur-md bg-white/10 outline outline-2 outline-[#28292D] rounded-full text-12 font-700 leading-4 flex items-center justify-center text-white">
              +3
            </div>
          </div>
        </div>
        <div className="top-[60px] absolute flex flex-col justify-center items-center w-full">
          <p className="text-14 font-700 leading-4 text-white/30">
            Your Total Balance
          </p>
          <div className="flex gap-3 mt-3">
            <p className="text-[56px] font-500 leading-[56px] tracking-[-1.12px] text-white">
              {readableNumber(
                Number(
                  totalAssetsData?.balances?.[0]?.balanceFiat?.toFixed(2) || 0
                ) +
                  (Number(
                    userWalletDetails?.accounts?.EUR?.availableBalance
                      ?.amount || 0
                  ) / 100 || 0)
              )}
            </p>
            <p className="text-14 font-700 leading-4 text-success-200">
              + 2.35%
            </p>
          </div>
        </div>
        <div className="absolute bottom-5 inset-x-5 flex justify-between">
          {Tier.map(
            (item, index) =>
              item.currentTier && (
                <div
                  className="p-2 pr-4 rounded-full bg-white/15 backdrop-blur-md flex gap-2 items-center"
                  key={`tier-${index}`}
                >
                  <div className="h-6 w-6 flex justify-center text-white items-center bg-white/10 overflow-hidden rounded-full relative p-1.5">
                    <div
                      className={cn(
                        "h-6 w-6 blur-md rounded-full -z-10 absolute top-1/3",
                        item.bgColor
                      )}
                    />
                    {item.tierIcon}
                  </div>
                  <p className="text-12 font-700 leading-4 text-white">
                    {item.currentWave.toLocaleString()}
                    <span className="ml-1 text-white/30">WAVE</span>
                  </p>
                </div>
              )
          )}
          <Button className="px-4 py-2 font-700 text-14">Deposit</Button>
        </div>
        <div className="">
          <div className="w-[300px] sm:w-[360px] h-20 sm:absolute flex bottom-0 gap-5 items-end sm:left-[35%] ml-8 sm:ml-3 overflow-hidden">
            {[...Array(60)].map((_, progressIndex) => (
              <div
                key={`ruler-${progressIndex}`}
                className={cn(
                  "w-0.5 bg-white h-10 border border-white rounded-full [&:nth-child(10n+0)]:h-20 tier-ruler-progress",
                  progressIndex == 1 && "hidden",
                  (progressIndex == 0 || progressIndex == 2) &&
                    "hidden sm:block"
                  // 10 * (index + 1) == progressIndex && "h-20" window.innerWidth < 640 ? 220 :
                )}
                //   style={{
                //     transform: `translateX(-${
                //       (220 * (index + 1) * progress) / 100
                //     }px)`,
                //   }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
