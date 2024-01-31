"use client";
import { Button } from "@/components/UI/Button";
import { Card, CardContent } from "@/components/UI/Card";
import { Input } from "@/components/UI/form/Input";
import IconGold from "@/components/icons/IconGold";
import {
  UilAngleRightB,
  UilCircleLayer,
  UilDollarAlt,
  UilSearch,
} from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewsUpdates = () => {
  const router = useRouter();
  const [newsFilter, setNewsFilter] = useState("All");

  const NewsFilterData = [
    {
      name: "All",
      icon: "",
    },
    {
      name: "Crypto",
      icon: <UilCircleLayer className="h-4 w-4" />,
    },
    {
      name: "Wealth",
      icon: <IconGold strokeWidth={1.2} className="h-4 w-4" />,
    },
    {
      name: "NeoBanking",
      icon: <UilDollarAlt className="h-4 w-4" />,
    },
    {
      name: "Updates",
      icon: (
        <>
          <Image
            src="/images/svg/icon-group.svg"
            width={14}
            height={14}
            alt="news Image"
            className={cn(
              "h-[14px] w-auto rounded-xl dark:hidden",
              newsFilter === "Updates" && "hidden dark:block"
            )}
          />
          <Image
            src="/images/svg/updates.svg"
            width={14}
            height={14}
            alt="news Image"
            className={cn(
              "h-[14px] w-auto rounded-xl hidden dark:block",
              newsFilter === "Updates" && "block dark:hidden"
            )}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="">
        <div className="grid sm:grid-cols-12 gap-x-2 gap-y-2 grid-flow-dense px-3 sm:px-10 lg:px-4 xl:px-0">
          <Card className="sm:col-span-7 lg:col-span-9">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[300px] sm:h-[260px] lg:h-[300px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={360}
                alt="news Image"
                className="h-full w-full rounded-xl"
              />
              <div className="absolute p-5 h-full flex w-full flex-col rounded-xl justify-between top-0 left-0 bg-gradient-to-b from-[rgba(6,25,53,0.00)] form-[-27.82%] to-blue-300 to-100% hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-171.33%] hover:to-blue-300 hover:to-[65.33%]">
                <div className="flex justify-between items-center">
                  <div className="bg-black  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-1.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" pl-3 lg:pb-3 group-hover:pb-2.5 lg:group-hover:pb-[22px] transition-all">
                  <h3 className="text-24 lg:text-40 font-500 text-white leading-7 lg:leading-10 lg:tracking-[-0.8px] sm:w-3/4 lg:w-2/3">
                    Why Some Ex-Workers at Bed Bath & Beyond Face 401(k) Losses
                  </h3>
                  <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 mt-2">
                    23 Aug 2023, 4:28 AM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-5 lg:col-span-3">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[180px] sm:h-full relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={180}
                height={180}
                alt="news Image"
                className="h-full w-full rounded-xl"
              />
              <div className="absolute p-5 h-full flex flex-col  rounded-xl justify-between group top-0 left-0 bg-gradient-to-b from-[rgba(6,25,53,0.00)] form-[-27.82%] to-blue-300 to-100% hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-171.33%] hover:to-blue-300 hover:to-[65.33%]">
                <div className="flex justify-between items-center">
                  <div className="bg-secondary dark:bg-white/10  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-2.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-white  sm:w-auto  leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-6 lg:col-span-3">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[180px] sm:h-[200px] lg:h-full relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={324}
                height={180}
                alt="news Image"
                className="h-full w-full rounded-xl"
              />
              <div className="absolute p-5 h-full flex flex-col w-full rounded-xl justify-between  top-0 left-0 bg-gradient-to-b from-[rgba(6,25,53,0.00)] form-[-27.82%] to-blue-300 to-100% hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-171.33%] hover:to-blue-300 hover:to-[65.33%]">
                <div className="flex justify-between items-center">
                  <div className="bg-secondary dark:bg-white/10  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-2.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-white  sm:w-auto leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-12 lg:col-span-6">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[232px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={300}
                alt="news Image"
                className="h-full w-full rounded-xl hidden group-hover:block"
              />
              <div className="absolute p-5 h-full flex flex-col rounded-xl w-full justify-between top-0 left-0 hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-27.82%] hover:to-blue-300 hover:to-100%">
                <div className="flex justify-between items-center">
                  <div className="bg-black  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-1.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" pl-3 sm:pb-3 group-hover:pb-2.5 sm:group-hover:pb-[22px] transition-all">
                  <h3 className="text-24 font-500 text-blue-300 dark:text-white group-hover:text-white leading-7  sm:w-2/3">
                    Why Some Ex-Workers at Bed Bath & Beyond Face 401(k) Losses
                  </h3>
                  <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 mt-3 sm:mt-2">
                    23 Aug 2023, 4:28 AM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-6 lg:col-span-3">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[180px] sm:h-[200px] lg:h-full relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={324}
                height={180}
                alt="news Image"
                className="h-full w-full rounded-xl"
              />
              <div className="absolute p-5 h-full flex flex-col w-full rounded-xl justify-between  top-0 left-0 bg-gradient-to-b from-[rgba(6,25,53,0.00)] form-[-27.82%] to-blue-300 to-100% hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-171.33%] hover:to-blue-300 hover:to-[65.33%]">
                <div className="flex justify-between items-center">
                  <div className="bg-secondary dark:bg-white/10  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-2.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-white  sm:w-auto leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col md:flex-row gap-y-8 sm:gap-y-3 md:justify-between md:items-center mt-10 mb-2 sm:mb-3 md:mb-6 md:px-10 lg:px-4 xl:px-0">
          <div className="flex gap-x-1 overflow-auto px-3 sm:pl-10 md:px-0">
            {NewsFilterData.map((value, index) => {
              return (
                <Button
                  className={`bg-secondary dark:bg-white/10 flex gap-x-2 text-blue-300 dark:text-white px-4 py-3 text-14 font-700 leading-4 ${
                    newsFilter === value.name &&
                    "bg-blue-300 text-white dark:bg-white dark:text-blue-300"
                  }`}
                  onClick={() => setNewsFilter(value.name)}
                  key={index}
                >
                  {value.icon}
                  {value.name}
                </Button>
              );
            })}
          </div>
          <div className="relative w-full md:w-[200px] px-3 sm:px-10 md:px-0">
            <div className="absolute top-3 pl-4 pointer-events-none">
              <UilSearch className="w-4 h-4 text-blue-300 dark:text-white" />
            </div>
            <Input
              type=""
              id="search-assets"
              className=" h-10 w-full rounded-full outline-none align-middle pt-3.5 pb-3 pl-9 border-none pr-3 placeholder:text-gray-300 dark:text-white/30  placeholder:font-700 placeholder:font-body placeholder:text-14 placeholder:leading-4 leading-4 text-14  font-700 font-body cursor-pointer bg-secondary dark:bg-white/10  text-blue-300 dark:text-white"
              placeholder="Search"
              required
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 grid-flow-dense px-3 sm:px-10 lg:px-4 xl:px-0">
          <Card className="">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[200px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={300}
                alt="news Image"
                className="h-full w-full rounded-xl hidden group-hover:block"
              />
              <div className="absolute p-5 h-full flex flex-col  rounded-xl justify-between top-0 left-0  hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-27%] hover:to-blue-300 hover:to-100%">
                <div className="flex justify-between items-center">
                  <div className="bg-black  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-1.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-blue-300 dark:text-white group-hover:text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-blue-300 dark:text-white group-hover:text-white leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[200px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={300}
                alt="news Image"
                className="h-full w-full rounded-xl hidden group-hover:block"
              />
              <div className="absolute p-5 h-full flex flex-col  rounded-xl justify-between top-0 left-0  hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-27%] hover:to-blue-300 hover:to-100%">
                <div className="flex justify-between items-center">
                  <div className="bg-secondary dark:bg-white/10  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-2.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-blue-300 dark:text-white group-hover:text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-blue-300 dark:text-white group-hover:text-white leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[200px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={300}
                alt="news Image"
                className="h-full w-full rounded-xl hidden group-hover:block"
              />
              <div className="absolute p-5 h-full flex flex-col  rounded-xl justify-between top-0 left-0  hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-27%] hover:to-blue-300 hover:to-100%">
                <div className="flex justify-between items-center">
                  <div className="bg-secondary dark:bg-white/10  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-3.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-blue-300 dark:text-white group-hover:text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-blue-300 dark:text-white group-hover:text-white leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:row-span-2 lg:col-span-2">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[332px] sm:h-[408px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={408}
                alt="news Image"
                className="h-full w-full rounded-xl"
              />
              <div className="absolute p-5 h-full w-full flex flex-col rounded-xl justify-between top-0 left-0 bg-gradient-to-b from-[rgba(6,25,53,0.00)] form-[-27.82%] to-blue-300 to-100% hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-171.33%] hover:to-blue-300 hover:to-[65.33%]">
                <div className="flex justify-between items-center">
                  <div className="bg-black  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-1.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" pl-3 lg:pb-3 group-hover:pb-2.5 lg:group-hover:pb-[22px] transition-all">
                  <h3 className="text-24 lg:text-40 font-500 text-white leading-7 lg:leading-10 lg:tracking-[-0.8px] xl:w-3/4">
                    Why Some Ex-Workers at Bed Bath & Beyond Face 401(k) Losses
                  </h3>
                  <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 mt-3">
                    23 Aug 2023, 4:28 AM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[200px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={300}
                alt="news Image"
                className="h-full w-full rounded-xl hidden group-hover:block"
              />
              <div className="absolute p-5 h-full flex flex-col  rounded-xl justify-between top-0 left-0  hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-27%] hover:to-blue-300 hover:to-100%">
                <div className="flex justify-between items-center">
                  <div className="bg-black  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-1.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-blue-300 dark:text-white group-hover:text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-blue-300 dark:text-white group-hover:text-white leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[200px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={300}
                alt="news Image"
                className="h-full w-full rounded-xl hidden group-hover:block"
              />
              <div className="absolute p-5 h-full flex flex-col  rounded-xl justify-between top-0 left-0  hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-27%] hover:to-blue-300 hover:to-100%">
                <div className="flex justify-between items-center">
                  <div className="bg-secondary dark:bg-white/10  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-2.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-blue-300 dark:text-white group-hover:text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-blue-300 dark:text-white group-hover:text-white leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[200px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={300}
                alt="news Image"
                className="h-full w-full rounded-xl hidden group-hover:block"
              />
              <div className="absolute p-5 h-full flex flex-col  rounded-xl justify-between top-0 left-0  hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-27%] hover:to-blue-300 hover:to-100%">
                <div className="flex justify-between items-center">
                  <div className="bg-secondary dark:bg-white/10  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-3.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" flex justify-between gap-x-[54px]">
                  <div className="grid content-end">
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      01:05 AM
                    </p>
                    <p className="text-24 mt-4 font-500 leading-7 text-blue-300 dark:text-white group-hover:text-white">
                      11.05
                    </p>
                  </div>
                  <h3 className="text-16 font-700 text-blue-300 dark:text-white group-hover:text-white leading-5 line-clamp-3 group-hover:line-clamp-4">
                    Binance Offers Incentives to Accelerate Shift From
                    Stablecoin to Fresh Alternatives
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:row-span-2 lg:col-span-2">
            <CardContent className="bg-white dark:bg-white/15 rounded-xl h-[332px] sm:h-[408px] relative group cursor-pointer">
              <Image
                src="/images/newsBg.png"
                width={656}
                height={408}
                alt="news Image"
                className="h-full w-full rounded-xl"
              />
              <div className="absolute p-5 h-full w-full flex flex-col rounded-xl justify-between top-0 left-0 bg-gradient-to-b from-[rgba(6,25,53,0.00)] form-[-27.82%] to-blue-300 to-100% hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-171.33%] hover:to-blue-300 hover:to-[65.33%]">
                <div className="flex justify-between items-center">
                  <div className="bg-black  flex justify-center items-center w-10 h-10 rounded-full">
                    <Image
                      src="/images/svg/newsIcon-1.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span
                    className="bg-secondary dark:bg-white/10 rounded-3xl h-10 w-10 flex justify-center items-center"
                    onClick={() => router.push("/news-updates/news-article")}
                  >
                    <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                  </span>
                </div>
                <div className=" pl-3 lg:pb-3 group-hover:pb-2.5 lg:group-hover:pb-[22px] transition-all">
                  <h3 className="text-24 lg:text-40 font-500 text-white leading-7 lg:leading-10 lg:tracking-[-0.8px] xl:w-3/4">
                    Why Some Ex-Workers at Bed Bath & Beyond Face 401(k) Losses
                  </h3>
                  <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 mt-3">
                    23 Aug 2023, 4:28 AM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default NewsUpdates;
