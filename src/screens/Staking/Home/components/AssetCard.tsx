import { Button } from "@/components/UI/Button";
import { AssetImages } from "@/constants/AssetsImages";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleRightB } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface assetCardProps {
  name: string;
  shortName: string;
  apy: string;
  staked: string;
  actualStakeValue?: string;
  rewarded: string;
  actualRewardsValue?: string;
  marketCap?: string;
  assetId?: string;
  stakeId: string;
  handleStake: () => void;
  handleUnStake: () => void;
}

const AssetCard: React.FC<assetCardProps> = ({
  name,
  shortName,
  apy,
  staked,
  rewarded,
  assetId,
  stakeId,
  handleStake,
  handleUnStake,
}) => {
  return (
    <div className="flex flex-col justify-between  w-full bg-white rounded-[24px] p-5 dark:bg-white/10">
      <div className="flex justify-between items-center gap-x-6">
        <div className="flex  gap-x-3 sm:gap-x-1 items-center">
          <Image
            alt=""
            width={40}
            height={40}
            src={AssetImages[shortName]}
            className="max-w-10 max-h-10"
          />
          <div className="flex flex-col leading-5">
            <span className="font-500 text-blue-300 text-16 leading-5 dark:text-white">
              {shortName}
            </span>
            <span className="font-500 text-gray-300 truncate w-20 sm:w-max text-16 leading-5 dark:text-white/30">
              {name}
            </span>
          </div>
        </div>
        <Link
          href={`/staking/stake-detail/${stakeId}`}
          className="w-10 h-10 bg-secondary rounded-3xl items-center justify-center flex dark:bg-white/15"
        >
          <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
        </Link>
      </div>
      <div className="my-8 flex flex-col w-[260px] gap-y-1">
        <span className="font-500 text-gray-300 text-12 leading-4 dark:text-white/30">
          APY
        </span>
        <span className="font-500 text-blue-300 text-40 leading-10 tracking-tight dark:text-white">
          {apy}%
        </span>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between">
          <span className="font-500 text-gray-300 text-12 leading-4 dark:text-white/30">
            You Staked
          </span>
          <span className="font-500 text-gray-300 text-12 leading-4 dark:text-white/30">
            Your Rewards
          </span>
        </div>
        <div className="flex justify-between">
          <span
            className={cn(
              "font-500 text-gray-300 text-16 leading-5 dark:text-white/30",
              Number(staked) > 0 && "text-blue-300 dark:text-white"
            )}
          >
            {Number(Number(staked).toFixed(7)) || 0}&nbsp;
            {shortName}
          </span>
          <span
            className={cn(
              "font-500 text-gray-300 text-16 leading-5 dark:text-white/30",
              Number(rewarded) > 0 && "text-success-200"
            )}
          >
            {readableNumber(Number(rewarded) || 0)}&nbsp;
            {shortName}
          </span>
        </div>
        {apy === "3.75" && ( // static condition to show text, remove it when doing dynamic
          <span className="font-500 text-gray-300 text-16 leading-5 dark:text-white/30">
            for 28 days
          </span>
        )}
      </div>
      <div className="flex flex-col gap-y-3 mt-10">
        <div className="flex gap-x-1">
          <Button
            className="bg-primary w-1/2 px-4 py-3 text-white text-14 font-700 leading-4 flex mx-auto"
            onClick={handleStake}
          >
            Stake
          </Button>
          <Button
            className="bg-secondary w-1/2 px-4 py-2 text-blue-300 text-14 font-700 leading-4 flex mx-auto dark:text-white dark:bg-white/15"
            onClick={handleUnStake}
          >
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
