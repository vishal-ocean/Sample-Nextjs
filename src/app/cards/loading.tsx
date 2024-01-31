import { CardSectionSkeleton } from "@/components/Loaders/CardSectionSkeleton";
import CardSkeleton from "@/components/Loaders/CardSkeleton";
import { FullTableSkeleton } from "@/components/Loaders/TableSkeleton";

const Loading = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr_1fr] gap-5 lg:px-4 xl:p-0">
        <div className="h-max ">
          <CardSkeleton cardClassName="w-full h-full" cardType="large" />
          <CardSkeleton cardClassName="w-full h-full my-3" />
          <CardSkeleton cardClassName="w-full h-full" />
        </div>
        <div className="lg:col-span-3 h-max  px-0 sm:px-10 lg:px-0 order-first lg:order-last">
          <CardSectionSkeleton />
          <div className="p-5 bg-white rounded-[24px] dark:bg-white/10 mt-2 h-max mx-3 sm:mx-0">
            <FullTableSkeleton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
