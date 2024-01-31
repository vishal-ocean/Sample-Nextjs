import { BannerSkeleton } from "@/components/Loaders/BannerSkeleton";
import CardSkeleton from "@/components/Loaders/CardSkeleton";
import { FullTableSkeleton } from "@/components/Loaders/TableSkeleton";

const Loading = () => {
  return (
    <>
      <BannerSkeleton />
      <div className="flex gap-2 mx-auto mt-6 overflow-x-auto overflow-y-hidden px-3 sm:pl-10 lg:px-4 xl:px-0 remove-scrollbar">
        <CardSkeleton cardClassName="!w-full" />
        <CardSkeleton cardClassName="!w-full" />
        <CardSkeleton cardClassName="!w-full" />
      </div>
      <div className="bg-white dark:bg-white/10 rounded-[24px] pt-8 mt-6 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <FullTableSkeleton />
      </div>
    </>
  );
};

export default Loading;
