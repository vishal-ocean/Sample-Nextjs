"use client";
import { Button } from "@/components/UI/Button";
import { PropertyDataType } from "@/constants/PropertyData";
import { UilAngleLeft } from "@/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ComingSoonCard from "./ComingSoonCard";

interface HeaderSectionProps {
  propertyData: PropertyDataType[];
}
const HeaderSection = ({ propertyData }: HeaderSectionProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="w-full max-w-[1000px] rounded-[24px] h-full max-h-[421px] relative flex flex-col justify-between">
          <Image
            src={
              propertyData[0]?.property_banner_image ||
              "/images/project-img.png"
            }
            alt="project-image"
            width={0}
            height={0}
            sizes="100vh"
            className=" w-full rounded-[24px] h-[220px] sm:h-[375px] lg:h-[422px]"
          />
          <div className="absolute top-0 h-full w-full p-3 lg:p-12  z-10 flex flex-col justify-between">
            <div className="flex justify-between lg:justify-start">
              <Button
                variant="secondary"
                className="font-700 text-blue-300 leading-5 hidden lg:inline"
                onClick={() => router.back()}
              >
                <span className="">Go Back</span>
              </Button>
              <Button
                variant="secondary"
                className="font-700 text-blue-300 leading-5  justify-center items-center h-10 w-10 p-0 lg:hidden flex"
                onClick={() => router.back()}
              >
                <UilAngleLeft className="h-4 w-4" />
              </Button>

              <span className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center sm:hidden">
                {/* <Image
                  src="/images/svg/dodo.svg"
                  width={16}
                  height={16}
                  alt="dodo logo"
                  className="h-4 w-4"
          /> */}
              </span>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className=" gap-x-4 items-center hidden lg:flex">
                <span className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center">
                  {/*}  <Image
                    src=""
                    width={16}
                    height={16}
                    alt="dodo logo"
                    className="h-4 w-4"
          /> */}
                </span>
                <span className="text-white font-700 leading-5">TBA</span>
              </div>
              <span className="text-white font-700 text-32 lg:text-56 tracking-[-1.12px] leading-8 lg:leading-[56px] pb-3 pl-3 lg:pl-0 w-10/12">
                {propertyData[0]?.property_name}
              </span>
            </div>
          </div>
          {propertyData?.length > 0 && (
            <div className="bg-gradient-to-t from-[#061935] dark:from-black-100 from-30% to-transparent pointer-events-none w-full h-3/4 absolute left-0 bottom-0 rounded-b-[24px]" />
          )}
        </div>
        <ComingSoonCard />
      </div>
    </>
  );
};

export default HeaderSection;
