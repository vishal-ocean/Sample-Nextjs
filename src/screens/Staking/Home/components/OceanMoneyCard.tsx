import { Button } from "@/components/UI/Button";
import { UilCardAtm } from "@/icons";
import Image from "next/image";
import Link from "next/link";
const OceanMoneyCard = () => {
  return (
    <div className="relative rounded-[24px]  w-full lg:w-auto h-full min-w-[282px]  sm:min-w-[260px]">
      {/* <Image
        src="/images/side-card-1.png"
        alt=""
        height={1000}
        width={1000}
        className="h-full w-full rounded-[24px] object-right "
      /> */}
      <Image
        src="/images/main-staking.png"
        alt=""
        height={2000}
        width={2000}
        className="h-full w-full rounded-[24px] absolute top-0 z-0"
      />
      <div className=" px-4 pt-3 pb-6 rounded-[24px] flex flex-col lg:p-5 lg:justify-between h-full absolute top-0 z-10 cards-side-card">
        <div className="flex justify-between lg:justify-start items-center">
          <span className="h-10 w-10 bg-primary bg-opacity-30 rounded-full p-2">
            <UilCardAtm className="h-6 w-6 text-white" />
          </span>
          <Button
            variant="secondary"
            className="px-4 py-3 text-white flex bg-secondary/10 justify-center items-center lg:hidden text-14 font-700 leading-4"
          >
            Explore Cards
          </Button>
        </div>

        <div className="mt-12 lg:mt-0 sm:px-0 px-3">
          <p className="text-white  text-24 font-500 leading-7 mb-2 lg:mb-4 lg:w-3/5">
            Ocean Money Cards
          </p>
          <p className="text-gray-300 text-16 font-500 lg:font-700 leading-5 ">
            Access a wide range of opportunities from real-estate to tokenized
            funds
          </p>

          <Link
            href={"/cards"}
            className="text-14 font-700 px-4 py-3 mt-5 w-fit lg:block hidden leading-4 bg-secondary/10 text-white rounded-full"
          >
            Explore Cards
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OceanMoneyCard;
