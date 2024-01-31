const TrendingMarketSkeleton = () => {
  return (
    <div className="mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
      <div className="flex gap-x-3 items-center">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex justify-center items-center animate-pulse">
          <div className="w-5 h-5" />
        </div>
        <div className="animate-pulse">
          <div className="h-[14px] w-[60px]" />
        </div>
      </div>
      <div className="mt-4 flex gap-x-2 overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <div
            className="rounded-[24px] p-5 bg-white dark:bg-white/10 w-full min-w-[124px]"
            key={`skeleton-${index}`}
          >
            <div className="flex justify-around h-8">
              <div className="animate-pulse">
                <div className="h-5 w-5" />
              </div>
              <div className="animate-pulse flex flex-col gap-y-1">
                <div className="h-3 w-10" />
                <div className="h-3 w-5" />
              </div>
            </div>
            <div className="mt-5 animate-pulse flex flex-col gap-y-2">
              <div className="h-3 w-3/4" />
              <div className="h-3 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMarketSkeleton;
