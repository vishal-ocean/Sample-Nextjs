import { BannerSkeleton } from "@/components/Loaders/BannerSkeleton";
import ChartSectionSkeleton from "@/components/Loaders/ChartSectionSkeleton";
import PairPageCardSkeleton from "@/components/Loaders/PairPageCardSkeleton";
import StakingCardSkeleton from "@/components/Loaders/StakingCardSkeleton";

const loading = () => {
  return (
    <>
      <BannerSkeleton />
      <div className="grid grid-cols-12 grid-rows-[repeat(7,auto)] sm:grid-rows-[repeat(5,auto)] lg:grid-rows-[repeat(4,auto)] mt-5 gap-x-5  lg:px-4 xl:px-0">
        <div className="flex flex-col gap-y-2 lg:col-span-9 col-span-full w-full h-full sm:ps-10 sm:pe-9 pe-5 mx-3 sm:mx-0  lg:px-0 row-span-2 ">
          <ChartSectionSkeleton />
          <div className="flex justify-between lg:flex-nowrap flex-wrap lg:gap-y-0 gap-y-2">
            <PairPageCardSkeleton heightClass={"!h-[124px]"} />
            <PairPageCardSkeleton heightClass={"!h-[124px]"} />
            <PairPageCardSkeleton heightClass={"!h-[124px]"} />
          </div>
          <div className="flex justify-between gap-x-2 mt-3 sm:flex-nowrap flex-wrap sm:gap-y-0 gap-y-2">
            <StakingCardSkeleton heightClass={"!h-[200px] !w-full"} />
            <StakingCardSkeleton
              heightClass={"!h-[200px] !sm:w-auto !w-full"}
            />
          </div>
        </div>
        <div className="flex flex-col col-span-12 lg:col-span-3 gap-y-2 sm:mx-0 ms-3 me-2 sm:mt-0 mt-2 sm:px-10 px-0 pt-2 lg:px-0 lg:pt-0">
          <StakingCardSkeleton heightClass={"!h-[280px] !sm:w-auto !w-full"} />
          <StakingCardSkeleton heightClass={"!h-[360px] !sm:w-auto !w-full"} />
          <StakingCardSkeleton heightClass={"!h-[292px] !sm:w-auto !w-full"} />
        </div>
        <div className="lg:col-span-9 col-span-full  row-span-1 lg:mx-0 sm:mx-10 ms-3 me-2 mt-2 lg:mt-1 bg-white dark:bg-white/10 h-[479px] rounded-[24px]  p-8 ">
          <div className="animate-pulse flex flex-col gap-y-[9px]">
            <div className="h-[21px] w-full max-w-[651px]"></div>
            <div className="h-[21px] w-full max-w-[497px]"></div>
            <div className="h-[21px] w-full max-w-[752px]"></div>
            <div className="h-[21px] w-full max-w-[857px]"></div>
            <div className="h-[21px] w-full max-w-[622px] mt-8"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
