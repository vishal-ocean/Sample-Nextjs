import { Button } from "@/components/UI/Button";
import { IconCoinStaking } from "@/components/icons/IconCoinStaking";
import IconGold from "@/components/icons/IconGold";
import { IconStar } from "@/components/icons/IconStar";
import Image from "next/image";
const CardsSection = () => {
  return (
    <div className="flex lg:flex-col gap-2 gap-x-2 lg:order-2 order-1 overflow-x-auto lg:overflow-x-hidden px-3 sm:pl-10 md:px-10 lg:px-0 remove-scrollbar">
      <div className="h-full relative rounded-[24px] min-w-[260px] lg:min-w-0 w-1/3 lg:w-auto">
        <Image
          src={"/images/wave.png"}
          width={1000}
          height={1000}
          sizes="100vh"
          alt=""
          className="w-full h-full rounded-[24px] absolute top-0 -z-10 hidden lg:block"
        />
        <Image
          src={"/images/small-wave.png"}
          width={1000}
          height={1000}
          sizes="100vh"
          alt=""
          className="w-full h-full rounded-[24px] absolute top-0 -z-10 lg:hidden block"
        />
        <div className=" rounded-[24px] flex flex-col p-3 lg:justify-between h-full ">
          <div className="flex justify-between lg:justify-start items-center">
            <span className="lg:h-10 lg:w-10 h-8 w-8 bg-primary rounded-full flex justify-center items-center">
              <IconStar className="text-white h-5 w-5 " />
            </span>
            <Button
              variant="secondary"
              className="text-14 font-700 px-4 py-3 w-fit block leading-4 bg-secondary/10 backdrop-blur-[20px] text-white/60 lg:hidden pointer-events-none"
            >
              Coming Soon
            </Button>
          </div>
          <div className="mt-12 lg:mt-0 ml-3 mb-3 lg:ml-2 lg:mb-2">
            <p className="text-white text-24 font-500 leading-7 mb-2">
              WAVE Tier
            </p>
            <p className="text-white/60 text-16 font-500 whitespace-break-spaces leading-5 w-[88%]">
              Explore our staking options today and let your crypto work for you
            </p>
            <Button
              variant="secondary"
              className="text-14 font-700 px-4 py-3 mt-5 w-fit lg:block hidden leading-4 bg-secondary/10 backdrop-blur-[10px] text-white/60 pointer-events-none"
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
      <div className=" relative rounded-[24px] min-w-[260px] lg:min-w-0 w-1/3 lg:w-auto">
        <Image
          src={"/images/wealth-side-card.png"}
          width={1000}
          height={1000}
          sizes="100vh"
          alt=""
          className="w-full h-full hidden lg:block rounded-[24px]"
        />
        <Image
          src={"/images/small-wealth.png"}
          width={1000}
          height={1000}
          sizes="100vh"
          alt=""
          className="w-full h-full rounded-[24px] absolute top-0 -z-10 lg:hidden block"
        />
        <div className="flex flex-col justify-between p-3 rounded-[24px] absolute top-0 h-full w-full">
          <div className="flex justify-between items-center ">
            <span className="h-10 w-10 overflow-hidden bg-secondary/10 relative backdrop-blur-[10px] bg-opacity-30 rounded-full flex justify-center items-center">
              <IconGold className="text-orange-700 h-5 w-5" />
              <span className="h-9 w-9 bg-orange-700 blur-lg absolute translate-y-5"></span>
            </span>

            <Button className="bg-secondary/10 text-14 backdrop-blur-[10px] w-fit text-white/60 px-4 py-3 font-700 rounded-3xl leading-4 pointer-events-none">
              Grow Your Wealth
            </Button>
          </div>
          <div className="mr-2 mb-2 w-2/3 lg:w-[57%] ml-auto">
            <p className="text-16 text-white font-700 leading-5 w-11/12 lg:w-auto">
              Access a wide range of opportunities
            </p>
            <p className="text-12 text-gray-300 mt-2 whitespace-break-spaces leading-4 font-500">
              From crypto-related to sports funds and more
            </p>
          </div>
        </div>
      </div>
      <div className="relative rounded-[24px] min-w-[260px] lg:min-w-0 w-1/3 lg:w-auto">
        <Image
          src={"/images/staking.png"}
          width={1000}
          height={1000}
          sizes="100vh"
          alt=""
          className="w-full h-full hidden lg:block rounded-[24px]"
        />
        <Image
          src={"/images/small-staking.png"}
          width={1000}
          height={1000}
          sizes="100vh"
          alt=""
          className="w-full h-full rounded-[24px] absolute top-0 -z-10 lg:hidden block"
        />
        <div className="flex flex-col justify-between p-3 rounded-[24px] absolute top-0 h-full w-full">
          <div className="flex justify-between items-center ">
            <span className="h-10 w-10 overflow-hidden bg-secondary/10 relative backdrop-blur-[10px] bg-opacity-30 rounded-full flex justify-center items-center">
              <IconCoinStaking className="text-primary h-5 w-5" />
              <span className="h-9 w-9 bg-primary blur-lg absolute translate-y-5"></span>
            </span>

            <Button className="bg-secondary/10 text-14 backdrop-blur-[10px] w-fit text-white/60 px-4 py-3 font-700 rounded-3xl leading-4 pointer-events-none">
              Coming Soon
            </Button>
          </div>
          <div className="mr-2 mb-2 w-2/3 lg:w-[57%] ml-auto">
            <p className="text-16 text-white font-700 leading-5 w-5/6 lg:w-[68%] xl:w-3/4">
              Let your crypto work for you
            </p>
            <p className="text-12 text-gray-300 mt-2 whitespace-break-spaces leading-4 font-500">
              Explore our staking options today and earn even more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
