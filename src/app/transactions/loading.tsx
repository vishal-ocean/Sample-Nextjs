import { BannerSkeleton } from "@/components/Loaders/BannerSkeleton";
import { FullTableSkeleton } from "@/components/Loaders/TableSkeleton";

const Loading = () => {
  return (
    <>
      <BannerSkeleton />
      <div className="bg-white dark:bg-white/10 rounded-[24px] mt-5 pt-8 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <FullTableSkeleton />
      </div>
    </>
  );
};

export default Loading;
