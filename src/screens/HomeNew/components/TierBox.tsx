"use client";
import { Progress } from "@/components/UI/ProgressBar";
import { Tier } from "@/constants/headerStaticData";
import { UilAngleRight } from "@/icons";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

export const TierBox = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    Tier.map(
      (value, index) =>
        value.currentTier &&
        setTimeout(
          () => setProgress((value.currentWave * 100) / value.wave),
          500
        )
    );
  }, [Tier]);
  return (
    <>
      {Tier.map(
        (item, index) =>
          item.currentTier && (
            <div
              className="w-full bg-black p-3 pb-5 rounded-xl col-span-4 xl:col-span-3"
              key={`tier-${index}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 flex justify-center text-white items-center bg-white/10 overflow-hidden rounded-full relative p-1.5 z-10">
                    <div
                      className={cn(
                        "h-8 w-8 blur-md rounded-full -z-10 absolute top-1/3",
                        item.bgColor
                      )}
                    />
                    {item.tierIcon}
                  </div>
                  <p className="text-white text-12 font-700 leading-4">
                    {item.tierName} Tier
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">
                  <UilAngleRight className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-20 font-700 leading-6 text-white mt-10 pl-2">
                {item.currentWave.toLocaleString()}
                <span className="ml-1 text-white/30">WAVE</span>
              </p>
              <div className="mt-5 w-full sm:w-auto px-2">
                <Progress
                  fieldProgressClass="bg-white tier-progress"
                  className="bg-white/10 w-full sm:w-[282px]"
                  value={progress}
                />{" "}
                <div className="flex justify-between mt-3">
                  <p className="text-16 font-500 leading-5 text-white/30">
                    {`${(item.wave - item.currentWave).toLocaleString()}`} WAVE
                    left to
                  </p>
                  <span className="text-16 font-500 leading-5 text-white flex gap-2 items-center capitalize">
                    {index !== Tier.length - 1 && Tier[index + 1].tierName}
                    {index !== Tier.length - 1 && Tier[index + 1].tierIcon}
                  </span>
                </div>
              </div>
            </div>
          )
      )}
    </>
  );
};
