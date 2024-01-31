import { Button } from "@/components/UI/Button";
import {
  UilArrowCircleDown,
  UilExchange,
  UilGraphBar,
  UilLocationArrow,
} from "@/icons";
import Image from "next/image";
const CardSection = () => {
  return (
    <div>
      <div className="p-3 bg-white rounded-[48px] min-w-[332px] h-fit">
        <div className="flex gap-x-1">
          <Button
            variant="secondary"
            className="rounded-3xl w-full h-[52px] flex justify-center items-center py-0 px-6 gap-x-2 font-700 leading-5"
          >
            <UilExchange className="w-6 h-6 text-blue-300" />
            Swap
          </Button>
          <Button
            variant="secondary"
            className="rounded-3xl w-full h-[52px] flex justify-center items-center py-0 px-6 gap-x-2 font-700 leading-5"
          >
            <UilLocationArrow className="w-6 h-6 text-blue-300" />
            Transfer
          </Button>
        </div>
        <Button className="rounded-3xl w-[308px] h-[52px] flex p-0 gap-x-2 font-700 leading-5 mt-2">
          <UilArrowCircleDown className="w-6 h-6 text-white" />
          Deposit
        </Button>
      </div>
      <div className="p-3 bg-white rounded-[48px] h-fit mt-2">
        <div className="flex flex-col justify-between p-6 bg-blue-200 rounded-[36px] h-[220px]">
          <span className="bg-blue-300 rounded-3xl h-10 w-10 flex justify-center">
            <Image
              src="/images/svg/icon-flower.svg"
              height={16}
              width={16}
              alt="flower-icon"
              className="mx-auto"
            />
          </span>
          <div className="flex flex-col">
            <span className="text-24 font-500 text-blue-300 leading-7">
              Yield Farming
            </span>
            <span className="text-16 font-500 text-blue-300 mt-3 opacity-40 leading-5">
              Higher returns on your crypto holdings with DeFi yield farming{" "}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between p-6 bg-blue-100 rounded-[36px] h-[220px] mt-2">
          <span className="bg-blue-300 rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilGraphBar className="h-4 w-4 text-white" />
          </span>
          <div className="flex flex-col">
            <span className="text-24 font-500 text-blue-300 leading-7">
              Staking
            </span>
            <span className="text-16 font-500 text-blue-300 mt-3 opacity-40 leading-5">
              Great way to grow your crypto assets passively with Staking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
