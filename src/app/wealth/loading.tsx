import CardSkeleton from "@/components/Loaders/CardSkeleton";
import ChartSectionSkeleton from "@/components/Loaders/ChartSectionSkeleton";
import { FullTableSkeleton } from "@/components/Loaders/TableSkeleton";

const Loading = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-3 mt-5 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="lg:col-span-9 col-span-12 lg:order-1 order-2">
          <ChartSectionSkeleton sectionClassName="h-full" />
        </div>
        <div className="lg:col-span-3 col-span-12 gap-2 flex lg:flex-col overflow-x-auto remove-scrollbar lg:order-2 order-1">
          <CardSkeleton cardClassName="h-full w-full" />
          <CardSkeleton cardClassName="h-full w-full" />
          <CardSkeleton cardClassName="h-full w-full" />
        </div>
      </div>
      <div className="bg-white dark:bg-white/10 rounded-[24px] mt-5 pt-8 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <FullTableSkeleton />
      </div>
    </>
  );
};

export default Loading;
