import { MyInvestmentDataProps } from "@/constants/MyInvestmentData";
import { UilAngleRightB } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface ListAsCardViewProps {
  data: MyInvestmentDataProps[];
}
const ListAsCardView = ({ data }: ListAsCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {data.map((item, index) => (
        <div key={`real-estate-${index}`}>
          <div className="relative">
            <Image
              src={item?.estateImage}
              alt=""
              height={140}
              width={322}
              className="w-full h-full max-h-[140px] rounded-t-[24px]"
            />
            <div className="flex justify-between items-center gap-x-6 absolute top-5 left-5 right-5">
              <div className="flex gap-x-1 items-center">
                {/*      <Image
                  alt=""
                  width={40}
                  height={40}
                  src={item?.ownerLogo}
                  className="max-w-10 max-h-10"
                />*/}
                <div className="p-3 rounded-[32px] bg-secondary text-12 font-500 leading-4">
                  {item?.estateCategory}
                </div>
              </div>
              <Link
                href="/wealth/project-details/1"
                className="w-10 h-10 bg-secondary rounded-3xl items-center justify-center flex"
              >
                <UilAngleRightB className="h-4 w-4 text-blue-300" />
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded-b-[24px] px-5 pt-4 pb-5">
            <h1 className="font-500 leading-7 text-24 text-blue-300 whitespace-normal">
              {item?.estateName}
            </h1>
            <p className="text-gray-300 font-500 leading-5 whitespace-normal pt-3">
              {item?.description}
            </p>
            <div className="mt-5 flex flex-col gap-y-2 leading-4 text-12 font-500">
              <div className="flex justify-between">
                <p className=" text-blue-300">{item?.raisedPercent} raised</p>
                <p className="text-gray-300">{item?.daysLeft} days left</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={cn(
                    "bg-primary h-2 rounded-full",
                    item?.raisedPercent === "100%" && "bg-success-200"
                  )}
                  style={{ width: item?.raisedPercent }}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-blue-300">Target {item?.target}</p>
                <p className="text-gray-300">Investors {item?.investors}</p>
              </div>
            </div>
            <div className="flex mt-6 gap-x-2">
              <div
                className={cn(
                  "p-5 flex flex-col gap-y-2 rounded-[20px] w-full max-w-[125px] bg-blue-300"
                )}
              >
                <span className="font-500 text-12 text-gray-300 min-w-[97px]">
                  Min Investment
                </span>
                <span className={cn("font-500 leading-5", "text-white")}>
                  {item?.minimumInvestment}
                </span>
              </div>
              <div
                className={cn(
                  "p-5 flex flex-col gap-y-2 rounded-[20px] w-full max-w-[125px]",
                  index % 2 === 0 ? "bg-secondary" : "bg-success-200"
                )}
              >
                <span
                  className={cn(
                    "font-500 text-12 text-gray-300 min-w-[97px]",
                    index % 2 === 0 ? "text-gray-300" : "text-white/60"
                  )}
                >
                  {index % 2 === 0 ? "Interest Rate" : "Earnings"}
                </span>
                <span
                  className={cn(
                    "font-500 leading-5",
                    index % 2 === 0 ? "text-blue-300" : "text-white"
                  )}
                >
                  {index % 2 === 0
                    ? `${item?.interestRate} APR`
                    : `€${item.earnings}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListAsCardView;
