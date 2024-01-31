import { DISCLAIMER_MODAL } from "@/constants";
import { Tier } from "@/constants/headerStaticData";
import { UilAngleRightB, UilBolt, UilCheck } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import { TierSlider } from "./TierSlider";

type TierProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};
export const Tiers = ({ modalOpen, setHandleModal }: TierProps) => {
  return (
    <>
      <div className="mt-6 p-10 bg-white dark:bg-white/10 rounded-xl hidden lg:block">
        <div className="grid grid-cols-[1.5fr_repeat(5,1fr)] gap-2">
          <div className="flex flex-col gap-2 justify-center">
            <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white w-10/12">
              The WAVE token tier system and associated benefits are subject to
              change at any time and without prior notice
            </p>
            <div
              className="text-12 font-500 leading-4 text-blue-300 dark:text-white underline underline-offset-2 cursor-pointer w-max"
              onClick={() => setHandleModal(DISCLAIMER_MODAL)}
            >
              Learn More
            </div>
          </div>
          {Tier.map((value, index) => (
            <div
              className={cn(
                " relative rounded-lg",
                value.currentTier
                  ? "bg-transparent"
                  : "bg-gray-100 dark:bg-white/5"
              )}
              key={index}
            >
              {value.currentTier && (
                <Image
                  src={value.background}
                  height={500}
                  width={500}
                  alt=""
                  className="w-full h-full absolute rounded-lg"
                />
              )}
              <div className="p-3 bg-transparent rounded-lg relative">
                <div className="flex justify-between items-center">
                  <span
                    className={cn(
                      "h-7 w-7 p-1.5 flex justify-center items-center rounded-full",
                      value.currentTier
                        ? "bg-white/10 text-white"
                        : // ? value.tierName === "starter"
                        //   ? `${value.textColor} ${value.bgColor} bg-opacity-10`
                        //   : `${value.textColor} ${value.bgColor} bg-opacity-20`
                        value.tierName === "starter"
                        ? `${value.bgSecondary} text-blue-300 bg-opacity-10 dark:bg-white/15 dar
                        dark:text-white`
                        : `${value.textColor} ${value.bgColor} bg-opacity-20`
                    )}
                  >
                    {value.tierIcon}
                  </span>
                  {value.currentTier ? (
                    <UilCheck className="h-4 w-4 text-white" />
                  ) : (
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white cursor-pointer" />
                  )}
                </div>
                <p
                  className={cn(
                    "mt-6 capitalize text-16 font-700 leading-5",
                    value.currentTier
                      ? "text-white"
                      : "text-blue-300 dark:text-white"
                  )}
                >
                  {value.tierName}
                </p>
                <p
                  className={cn(
                    "text-12 font-500 leading-4",
                    value.currentTier
                      ? "text-white"
                      : "text-gray-300 dark:text-white/30"
                  )}
                >
                  {value.wave.toLocaleString()} WAVE
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full p-2 flex items-center gap-x-2 bg-gray-100 dark:bg-white/5 rounded-xl mt-5">
          <span className="h-10 w-10 flex justify-center items-center bg-white dark:bg-white/10 rounded-full">
            <UilBolt className="h-4 w-4 text-blue-300 dark:text-white" />
          </span>
          <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white">
            Platform Benefits
          </p>
        </div>
        <div className="mt-2 grid grid-cols-[1.5fr_repeat(5,1fr)]">
          <div className="grid grid-rows-[1fr_1fr_1fr_80px]">
            <p className="border-b border-secondary dark:border-white/15 py-5 text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
              Exchange Fee
            </p>
            <p className="border-b border-secondary dark:border-white/15 py-5 text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
              Free monthly crypto withdrawals
            </p>
            <p className="border-b border-secondary dark:border-white/15 py-5 text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
              Auto Investor Fee
            </p>
            <p className="py-5 text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
              Gas fees on platform transactions are refunded up to
            </p>
          </div>
          {Tier.map((value, index) => (
            <div
              className={cn(
                "grid grid-rows-[1fr_1fr_1fr_80px] rounded-lg",
                value.currentTier && "bg-gray-100 dark:bg-white/5"
              )}
              key={index}
            >
              {value.benefits.map((item, valueIndex) => (
                <p
                  className="border-b border-secondary dark:border-white/15 py-5 text-16 font-500 leading-5 text-blue-300 dark:text-white last:border-none pl-5"
                  key={valueIndex}
                >
                  {item}&nbsp;
                  {valueIndex != 1 && (
                    <span className="text-gray-300 dark:text-white/30">%</span>
                  )}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <TierSlider />
      <p className="mt-5 text-12 font-500 leading-4 text-gray-300 dark:text-white/30 block lg:hidden">
        Disclaimer: <br />
        The WAVE token tier system and associated benefits are subject to change
        at any time and without prior notice. Ocean Money reserves the right to
        modify or discontinue any aspect of the tier system, including but not
        limited to the number of tokens required for each tier, the benefits
        associated with each tier, and the availability of the tier system
        itself. Users are encouraged to regularly review the latest information
        about the Wave token tier system and its benefits. By participating in
        the tier system, users acknowledge and accept this possibility of
        changes and discontinuation.
      </p>
    </>
  );
};
