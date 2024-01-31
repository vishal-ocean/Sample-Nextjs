"use client";
import { Button } from "@/components/UI/Button";
import { UilAngleLeftB } from "@/icons";
import { useRouter } from "next/navigation";

const HeaderCard = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="px-3 sm:px-10 lg:px-4 xl:px-0">
      <div className="bg-white w-full rounded-[24px] p-5 md:p-12 flex flex-col ">
        <div className="flex justify-between md:items-start items-center">
          <Button
            variant="secondary"
            className="rounded-3xl text-blue-300 h-10 w-10 md:h-fit md:w-fit md:py-4 md:px-6 p-0 font-700 leading-5"
            onClick={handleGoBack}
          >
            <UilAngleLeftB className="block md:hidden h-4 w-4" />
            <span className="hidden md:block">Go Back</span>
          </Button>
          <span className="text-12 text-gray-300 font-500 leading-4">
            Crypto Services / Crypto Market
          </span>
        </div>
        <div className="sm:mt-[80px] mt-10 flex justify-between items-center px-5 pb-5 md:p-0">
          <span className="text-blue-300 font-500 text-32 tracking-[-0.64px] sm:text-40 md:text-[56px] sm:tracking-[-0.8px] md:tracking-[-1.12px] leading-[100%]">
            Crypto Market
          </span>
        </div>
      </div>{" "}
    </div>
  );
};

export default HeaderCard;
