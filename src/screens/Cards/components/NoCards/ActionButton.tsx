import { UilBell, UilChartLine, UilShieldCheck, UilSnowflake } from '@/icons';

export const ActionButton = () => {
  return (
    <div className="flex sm:flex-row flex-col gap-2  md:px-0 sm:px-6 px-3">
      <div className="p-8 rounded-xl flex flex-col gap-6 bg-white dark:bg-white/10">
        <UilSnowflake className="w-6 h-6 text-blue-300 dark:text-white" />
        <p className="text-16 leading-5 font-500 text-blue-300 max-w-[260px] dark:text-white">
          Freeze and unfreeze your Ocean Money card instantly
        </p>
      </div>
      <div className="p-8 rounded-xl flex flex-col gap-6 bg-white dark:bg-white/10">
        <UilChartLine className="w-6 h-6 text-blue-300 dark:text-white" />
        <p className="text-16 leading-5 font-500 text-blue-300 dark:text-white max-w-[260px]">
          Freeze and unfreeze your Ocean Money card instantly
        </p>
      </div>
      <div className="p-8 rounded-xl flex flex-col gap-6 bg-white dark:bg-white/10">
        <UilShieldCheck className="w-6 h-6 text-blue-300 dark:text-white" />
        <p className="text-16 leading-5 font-500 text-blue-300 dark:text-white max-w-[260px]">
          All your online payments are 3D secured
        </p>
      </div>
      <div className="p-8 rounded-xl flex flex-col gap-6 bg-white dark:bg-white/10">
        <UilBell className="w-6 h-6 text-blue-300 dark:text-white" />
        <p className="text-16 leading-5 font-500 text-blue-300 dark:text-white max-w-[260px]">
          Track every transactions with instant notifications
        </p>
      </div>
    </div>
  );
};
