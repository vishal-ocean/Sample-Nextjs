const SkeletonLoader = () => {
  return (
    <div className="relative">
      <div className="skeleton pt-5">
        <div className="mb-12">
          <div className="content rounded-[16px] h-6 w-2/3 "></div>
          <div className="content mt-3 rounded-[16px] h-6 w-1/3 "></div>
        </div>
        <div className="grid grid-cols-1 gap-y-5">
          {[1, 2, 3, 4, 6].map((i) => (
            <div key={i}>
              <div className="content rounded-[16px] h-4 w-1/3 "></div>
              <div className="content mt-3 rounded-[16px] h-14 w-full "></div>
            </div>
          ))}
          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-4">
              <div className="content rounded-[16px] h-4 w-full "></div>
              <div className="content mt-3 rounded-[16px] h-14 w-full "></div>
            </div>
            <div className="col-span-8">
              <div className="content rounded-[16px] h-4 w-1/3 "></div>
              <div className="content mt-3 rounded-[16px] h-14 w-full "></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-10">
          <span></span>
          <div className="w-24 content h-14  rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
