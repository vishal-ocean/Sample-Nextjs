import ImageStack from "@/components/ImageStack";
import { Button } from "@/components/UI/Button";
import { PROPERTY_DATA } from "@/constants/PropertyData";
import { UilAngleRightB } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const RealEstate = ({ isMarketPlaceEstate = false }) => {
  const Images = ["/images/owner-logo.png", "/images/svg/icon-ETH.svg"];
  return (
    <>
      <div
        className={cn("grid gap-x-2 gap-y-4  md:grid-cols-2 xl:grid-cols-3")}
      >
        {!isMarketPlaceEstate && (
          <div className="rounded-[28px] p-12 flex flex-col justify-between h-full bg-[url('/images/ads.png')]">
            <div className="flex flex-col gap-y-10">
              <div className="text-40 font-500 tracking-[-0.8px] leading-10">
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-success-400 via-blue-500 to-blue-600">
                  50+ assets
                </p>
                <p className="whitespace-normal text-white">
                  to build your wealth
                </p>
              </div>
              <Link href="/wealth/market-place">
                <Button className="leading-5 font-700 w-max">
                  Explore Market
                </Button>
              </Link>
            </div>
            <ImageStack
              Images={Images}
              displayLimit={2}
              imageContainerClass="!border-none"
            />
          </div>
        )}
        {PROPERTY_DATA.map((item, index) => (
          <div key={`real-estate-${index}`}>
            <div className="relative">
              <Image
                src={item?.property_banner_image}
                alt=""
                height={140}
                width={322}
                className="w-full h-full max-h-[140px] rounded-t-[24px]"
              />
              <div className="flex justify-between items-center gap-x-6 absolute top-5 left-5 right-5">
                <div className="flex gap-x-1 items-center">
                  <Image
                    alt=""
                    width={40}
                    height={40}
                    src={item?.owner_logo}
                    className="max-w-10 max-h-10"
                  />
                  {/* <img src={item?.ownerLogo} alt="" /> */}
                  <div className="p-3 rounded-[32px] bg-secondary text-12 font-500 leading-4 text-blue-300 dark:bg-white/15 dark:text-white">
                    {item?.property_information?.real_estate_type}
                  </div>
                </div>
                <Link
                  href=""
                  // href={`/wealth/project-details/${item?.property_id}`}
                  className="w-10 h-10 bg-secondary rounded-3xl items-center justify-center flex pointer-events-none dark:bg-white/15"
                >
                  <UilAngleRightB className="text-blue-300 dark:text-white h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 rounded-b-[24px] px-5 pt-4 pb-5 h-[325px]">
              <h1 className="font-500 leading-7 text-24 text-blue-300 dark:text-white whitespace-normal">
                {item?.property_name}
              </h1>
              <p className="text-gray-300 dark:text-white/30 font-500 leading-5 whitespace-normal pt-3 h-[72px]">
                {item?.description}
              </p>
              <div className="mt-5 flex flex-col gap-y-2 leading-4 text-12 font-500">
                <div className="flex justify-between">
                  <p className=" text-blue-300 dark:text-white">
                    {item?.raisedPercent} raised
                  </p>
                  <p className="text-gray-300 dark:text-white/30">
                    {item?.daysLeft} days left
                  </p>
                </div>
                <progress
                  id="file"
                  value={item?.raisedPercent}
                  max="100"
                  className="w-full h-2"
                >
                  {item?.raisedPercent}
                </progress>
                <div className="flex justify-between">
                  <p className="text-blue-300 dark:text-white">
                    Target {item?.target}
                  </p>
                  <p className="text-gray-300 dark:text-white/30">
                    Investors {item?.investors}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <div
                  className={cn(
                    "p-5 flex flex-col gap-y-2 rounded-[20px] bg-gray-100 dark:bg-white/5"
                    // index % 2 === 0 ? "bg-gray-100" : "bg-blue-300"
                  )}
                >
                  <h3 className="font-500 text-12 text-gray-300 min-w-[97px] dark:text-white/30">
                    Min Investment
                  </h3>
                  <h2
                    className={cn(
                      "font-500 leading-5 text-blue-300 dark:text-white"
                      // index % 2 === 0 ? " " : "text-white"
                    )}
                  >
                    {item?.minimumInvestment}
                  </h2>
                </div>
                <div
                  className={cn(
                    "p-5 flex flex-col gap-y-2 rounded-[20px] bg-gray-100 dark:bg-white/5"
                    // index % 2 === 0 ? "bg-gray-100" : "bg-success-200"
                  )}
                >
                  <h3
                    className={cn(
                      "font-500 text-12 text-gray-300 dark:text-white/30 min-w-[97px]"
                      // index % 2 === 0 ? "text-gray-300" : "text-gray-100"
                    )}
                  >
                    Interest Rate
                  </h3>
                  <h2
                    className={cn(
                      "font-500 leading-5 text-blue-300 dark:text-white"
                      // index % 2 === 0 ? "text-blue-300" : "text-white"
                    )}
                  >
                    {item?.property_investment_information?.interest_rate} APR
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RealEstate;
