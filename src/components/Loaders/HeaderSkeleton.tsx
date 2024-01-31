export const HeaderSkeleton = () => {
  return (
    <div className="py-6 px-6 sm:px-10 lg:px-4 xl:px-0">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 animate-pulse items-center">
          <div className="h-6 w-6 rounded-full" />
          <div className="h-4 w-[160px] rounded-full hidden sm:block" />
        </div>
        <div className="gap-2 hidden lg:flex">
          {[...Array(4)]?.map((_, index) => (
            <div
              className="h-10 w-[100px] items-center grid grid-cols-[auto_1fr] gap-2 rounded-full animate-pulse bg-white dark:bg-opacity-10 py-3 px-4"
              key={index}
            >
              <div className="h-4 w-4 rounded-full" />
              <div className="h-4 w-full rounded-full" />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            <div className="h-10 w-[130px] items-center hidden md:grid grid-cols-[auto_1fr] gap-2 rounded-full animate-pulse bg-white dark:bg-opacity-10 py-3 px-4">
              <div className="h-4 w-4 rounded-full" />
              <div className="h-4 w-full rounded-full" />
            </div>
            <div className="h-10 w-10 animate-pulse rounded-full bg-white dark:bg-opacity-10 flex justify-center items-center">
              <div className="h-4 w-4" />
            </div>
            <div className="h-10 w-10 animate-pulse rounded-full bg-white dark:bg-opacity-10 flex justify-center items-center">
              <div className="h-4 w-4" />
            </div>
          </div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-white dark:bg-opacity-10 flex justify-center items-center">
            <div className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
