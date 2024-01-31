import StakingCardSkeleton from "./StakingCardSkeleton";

const StakesCardAssetsSkeleton = () => {
  return (
    <div className="px-3 sm:px-10 lg:px-0  lg:ml-4 xl:ml-0">
      <div className="flex justify-between animate-pulse mt-10 mb-5">
        <div className="w-[200px] h-10" />
        <div className="w-[200px] h-10" />
      </div>
      <div className="flex flex-wrap gap-2 justify-center md:justify-between lg:justify-normal">
        {[...Array(8)].map((_, index) => (
          <StakingCardSkeleton key={index} heightClass={"!h-[324px]"} />
        ))}
      </div>
    </div>
  );
};

export default StakesCardAssetsSkeleton;
