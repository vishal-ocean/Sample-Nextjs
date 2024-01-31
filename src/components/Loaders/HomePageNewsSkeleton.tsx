import CardSkeleton from "./CardSkeleton";

const HomePageNewsSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between animate-pulse">
        <div className="w-[100px] h-[40px]" />
        <div className="w-[100px] h-[40px]" />
      </div>
      <div className="mt-3">
        <CardSkeleton />
      </div>
      <div className="mt-3">
        <CardSkeleton />
      </div>
    </div>
  );
};

export default HomePageNewsSkeleton;
