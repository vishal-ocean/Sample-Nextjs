import ChartSectionSkeleton from "@/components/Loaders/ChartSectionSkeleton";
import StakesCardAssetsSkeleton from "@/components/Loaders/StakesCardAssetsSkeleton";
import StakingCardSkeleton from "@/components/Loaders/StakingCardSkeleton";

const Loading = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-2 sm:gap-6">
        <div className="lg:col-span-8 xl:col-span-9 col-span-12 w-full h-full px-3 sm:px-10 lg:px-0 lg:ml-4 xl:ml-0">
          <ChartSectionSkeleton />
        </div>
        <div className="flex flex-col lg:col-span-4 xl:col-span-3 col-span-12 w-full px-3 sm:px-10 lg:px-0 lg:ml-4 xl:ml-0 gap-2">
          <StakingCardSkeleton />
          <StakingCardSkeleton />
        </div>
      </div>
      <StakesCardAssetsSkeleton />
    </>
  );
};

export default Loading;
