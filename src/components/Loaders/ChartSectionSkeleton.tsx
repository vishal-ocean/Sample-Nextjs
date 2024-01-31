import { cn } from "@/utils";

interface ChartSectionSkeletonProps {
  sectionClassName?: string;
}
const ChartSectionSkeleton = ({
  sectionClassName,
}: ChartSectionSkeletonProps) => {
  return (
    <div
      className={cn(
        "p-5 bg-white dark:bg-opacity-10 rounded-[24px]",
        sectionClassName
      )}
    >
      <div className="sm:flex justify-end gap-x-1 hidden animate-pulse">
        <div className="h-8 w-12" />
        <div className="h-8 w-12" />
        <div className="h-8 w-12" />
        <div className="h-8 w-12" />
      </div>

      <div className="md:px-7 sm:px-3 px-0">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center animate-pulse">
            <div className="h-4 w-4 " />
            <div className="h-4 w-[146px] " />
          </div>
          <div className="animate-pulse">
            <div className="h-8 sm:hidden w-12" />
          </div>
        </div>
        <div className="mt-5 animate-pulse">
          <div className="h-10 sm:h-12 w-[266px]" />
        </div>
        <div className=" mt-[103px] sm:mb-5 mb-0 animate-pulse">
          <div className="h-[300px] w-full !rounded-[24px]" />
        </div>
      </div>
    </div>
  );
};

export default ChartSectionSkeleton;
