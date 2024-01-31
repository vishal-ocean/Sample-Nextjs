import { IsStretchBanner } from "@/helper/isStretchBanner";
import { UilPlay, UilSearch } from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../UI/Dropdown";
import { Input } from "../UI/form/Input";
import { IconBook } from "../icons/IconBook";
import { IconBulb } from "../icons/IconBulb";

const LearningCenterHeaderDropdown = () => {
  const [noVideo, setNoVideo] = useState("");
  const pathname = usePathname();
  const { setProfileTab } = useHandleModalAction;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "text-blue-300 dark:bg-white/15 dark:text-white bg-secondary rounded-full h-10 w-10 flex justify-center items-center data-[state=open]:bg-blue-300 hover:bg-blue-300 hover:text-white dark:hover:bg-white dark:hover:text-blue-300 dark:data-[state=open]:bg-white dark:data-[state=open]:text-blue-300 data-[state=open]:text-white",
          IsStretchBanner()
            ? "bg-white/15 text-white hover:bg-white/30 data-[state=open]:bg-white/30 sm:bg-secondary sm:text-blue-300 sm:hover:bg-blue-300 sm:data-[state=open]:bg-blue-300"
            : ""
        )}
      >
        <IconBulb strokeWidth={1.2} className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-gray-250/50 dark:bg-white/10 rounded-[24px] backdrop-blur-[28px] p-3 pr-1.5"
        align="end"
        alignOffset={-100}
        sideOffset={10}
      >
        <div>
          <div className="flex justify-between mb-3 pr-1.5">
            <div className="relative rounded-[28px] bg-white dark:bg-white/15 flex items-center w-[210px] sm:w-[240px] ">
              <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
                <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
              </div>
              <Input
                type="text"
                id="search-assets"
                className="input leading-5 rounded-3xl outline-none py-2 pl-10 sm:placeholder:text-16 placeholder:text-gray-300 dark:placeholder:text-white/30 placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 md:text-16 font-500 font-body cursor-pointer text-blue-300 bg-transparent border-none lg:h-fit h-10"
                placeholder="Search"
                required
                onChange={(e) => setNoVideo(e.target.value)}
              />
            </div>
            <Link
              href={"/profile"}
              className="px-4 py-3 rounded-full text-blue-300 bg-white/40 dark:bg-white/15 text-14 font-700 leading-4 whitespace-nowrap dark:text-white"
              onClick={() => setProfileTab("learning")}
            >
              See All
            </Link>
          </div>
          {!noVideo ? (
            <div className="grid sm:grid-cols-2 gap-2 max-h-[350px] overflow-auto pr-1.5">
              <div className="rounded-[20px] w-[305px] sm:w-[240px] relative">
                <Image
                  src={"/images/crypto-learning-card.png"}
                  height={500}
                  width={500}
                  className="w-full h-full absolute -z-10 rounded-[20px] "
                  alt=""
                />
                <div className="pt-2 pr-2 pl-5 pb-5 rounded-[20px]">
                  <div className="flex justify-between items-center ">
                    <p className="text-12 font-500 leading-4 text-white">
                      Crypto
                    </p>
                    <div className="flex gap-x-1 ">
                      <span className="h-10 w-10 rounded-full bg-primary/10 flex justify-center items-center text-white">
                        <IconBook className="h-4 w-4" />
                      </span>
                      <span className="h-10 w-10 rounded-full bg-primary/25 flex justify-center items-center text-white">
                        <UilPlay className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <p className="text-12 font-500 leading-4 text-white mt-5">
                    2 min
                  </p>
                  <p className="text-20 font-500 leading-5 text-blue-300 mt-2 w-4/5">
                    How to add Partner’s assets
                  </p>
                </div>
              </div>
              <div className="rounded-[20px] w-[305px] sm:w-[240px] relative">
                <Image
                  src={"/images/wealth-learning-card.png"}
                  height={500}
                  width={500}
                  className="w-full h-full absolute -z-10 rounded-[20px] "
                  alt=""
                />
                <div className="pt-2 pr-2 pl-5 pb-5 rounded-[20px]">
                  <div className="flex justify-between items-center ">
                    <p className="text-12 font-500 leading-4 text-white">
                      Crypto
                    </p>
                    <div className="flex gap-x-1 ">
                      <span className="h-10 w-10 rounded-full bg-orange-500/10 flex justify-center items-center text-white">
                        <IconBook className="h-4 w-4" />
                      </span>
                      <span className="h-10 w-10 rounded-full bg-orange-500/25 flex justify-center items-center text-white">
                        <UilPlay className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <p className="text-12 font-500 leading-4 text-white mt-5">
                    2 min
                  </p>
                  <p className="text-20 font-500 leading-5 text-blue-300 mt-2 w-4/5">
                    How to add Partner’s assets
                  </p>
                </div>
              </div>
              <div className="rounded-[20px] w-[305px] sm:w-[240px] relative">
                <Image
                  src={"/images/wealth-learning-card.png"}
                  height={500}
                  width={500}
                  className="w-full h-full absolute -z-10 rounded-[20px] "
                  alt=""
                />
                <div className="pt-2 pr-2 pl-5 pb-5 rounded-[20px]">
                  <div className="flex justify-between items-center ">
                    <p className="text-12 font-500 leading-4 text-white">
                      Crypto
                    </p>
                    <div className="flex gap-x-1 ">
                      <span className="h-10 w-10 rounded-full bg-orange-500/10 flex justify-center items-center text-white">
                        <IconBook className="h-4 w-4" />
                      </span>
                      <span className="h-10 w-10 rounded-full bg-orange-500/25 flex justify-center items-center text-white">
                        <UilPlay className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <p className="text-12 font-500 leading-4 text-white mt-5">
                    2 min
                  </p>
                  <p className="text-20 font-500 leading-5 text-blue-300 mt-2 w-4/5">
                    How to add Partner’s assets
                  </p>
                </div>
              </div>
              <div className="rounded-[20px] w-[305px] sm:w-[240px] relative">
                <Image
                  src={"/images/neobanking-learning-card.png"}
                  height={500}
                  width={500}
                  className="w-full h-full absolute -z-10 rounded-[20px] "
                  alt=""
                />
                <div className="pt-2 pr-2 pl-5 pb-5 rounded-[20px]">
                  <div className="flex justify-between items-center ">
                    <p className="text-12 font-500 leading-4 text-white">
                      Crypto
                    </p>
                    <div className="flex gap-x-1 ">
                      <span className="h-10 w-10 rounded-full bg-success-400/10 flex justify-center items-center text-white">
                        <IconBook className="h-4 w-4" />
                      </span>
                      <span className="h-10 w-10 rounded-full bg-success-600/25 flex justify-center items-center text-white">
                        <UilPlay className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <p className="text-12 font-500 leading-4 text-white mt-5">
                    2 min
                  </p>
                  <p className="text-20 font-500 leading-5 text-blue-300 mt-2 w-4/5">
                    How to add Partner’s assets
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[20px] bg-white/20 py-10 h-[196px] w-[316px] sm:w-[488px] pr-1.5">
              <div className="w-[200px] mx-auto flex flex-col items-center">
                <div className="flex">
                  <span className="ring-2 ring-gray-100/10 bg-secondary/10 h-10 w-10 flex rounded-full"></span>
                  <span className="ring-2 ring-gray-100/10 bg-secondary/10 h-10 w-10 flex justify-center items-center rounded-full -translate-x-4">
                    <UilPlay className="w-4 h-4 text-blue-300" />
                  </span>
                </div>
                <p className="text-16 font-500 leading-5 text-blue-300 mt-5">
                  No videos found
                </p>
                <p className="text-12 font-500 leading-4 text-blue-300 mt-1 text-center">
                  <span className="text-primary underline underline-offset-2">
                    Contact Support
                  </span>{" "}
                  if you can’t find what you are looking for
                </p>
              </div>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LearningCenterHeaderDropdown;
