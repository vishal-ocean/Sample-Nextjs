import CardSkeleton from "@/components/Loaders/CardSkeleton";
import ChartSectionSkeleton from "@/components/Loaders/ChartSectionSkeleton";
import { FullTableSkeleton } from "@/components/Loaders/TableSkeleton";
import TrendingMarketSkeleton from "@/components/Loaders/TrendingMarketSkeleton";

const Loading = () => {
  return (
    <>
      <TrendingMarketSkeleton />
      <div className="grid grid-cols-12 gap-3 mt-5 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="lg:col-span-9 col-span-12 lg:order-1 order-2">
          <ChartSectionSkeleton />
          <div className="grid grid-cols-6 gap-2 mt-2">
            {[...Array(6)].map((_, index) => (
              <div
                className="p-5 bg-white dark:bg-white/10 rounded-[24px] flex justify-center items-center flex-col gap-y-3 animate-pulse sm:col-span-1 col-span-2"
                key={index}
              >
                <div className="h-10 w-10 !rounded-full" />
                <div className="h-3 w-[60px]" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 col-span-12 gap-2 flex lg:flex-col lg:overflow-x-auto overflow-x-hidden remove-scrollbar lg:order-2 order-1">
          <CardSkeleton cardClassName="h-full w-full" />
          <CardSkeleton cardClassName="h-full w-full" />
          <CardSkeleton cardClassName="h-full w-full" />
        </div>
      </div>
      <div className="bg-white dark:bg-white/10 rounded-[24px] mt-5 pt-8">
        <FullTableSkeleton />
      </div>
    </>
  );
};

export default Loading;
