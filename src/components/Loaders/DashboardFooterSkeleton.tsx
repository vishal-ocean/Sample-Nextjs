const DashboardFooterSkeleton = () => {
  return (
    <div className="fixed sm:pb-6 pb-0 pt-1 left-0 right-0 transition-all duration-200 sm:max-w-[368px] mx-auto flex justify-center items-center gap-x-2 bottom-0 z-[60]">
      <div className="flex animate-pulse justify-center items-center gap-x-2 dashboard-footer rounded-3xl p-2 backdrop-blur-[10px] w-[232px] sm:w-[248px] h-[60px] sm:h-[64px] mb-5 sm:mb-0">
        <div className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0" />
        <div className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0" />
        <div className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0" />
        <div className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0" />
      </div>
    </div>
  );
};

export default DashboardFooterSkeleton;
