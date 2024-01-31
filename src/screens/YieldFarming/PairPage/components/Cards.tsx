'use client';
import { UilBoltAlt, UilBrightness, UilLock } from '@/icons';

const Cards = () => {
  return (
    <div className="overflow-x-scroll remove-scrollbar">
      <div className="flex sm:grid-cols-3  gap-2 sm:grid ">
        <div className="rounded-[24px] sm:w-auto sm:h-auto h-[92px] w-[200px] min-h-[92px] min-w-[200px] bg-white p-5 cursor-pointer dark:bg-white/10">
          <div className="flex">
            <UilLock className="w-4 h-4" />
            <span className="gap-x-2 text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
              Total Value Locked
            </span>
          </div>
          <p className="sm:text-24 text-20 font-500 sm:leading-7 leading-6 text-blue-300 dark:text-white mt-3 lg:mt-10 md:mt-5 ">
            €12,498,278.92
          </p>
        </div>
        <div className="rounded-[24px] sm:w-auto sm:h-auto h-[92px] w-[200px] min-h-[92px] min-w-[200px] bg-white p-5 cursor-pointer dark:bg-white/10">
          <div className="flex gap-x-2">
            <UilBoltAlt className="w-4 h-4" />
            <span className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
              APY
            </span>
          </div>
          <p className="sm:text-24 text-20 font-500 sm:leading-7 text-blue-300 dark:text-white mt-3 lg:mt-10 md:mt-5">
            8.74%
          </p>
        </div>
        <div className="rounded-[24px] sm:w-auto sm:h-auto h-[92px] w-[200px] min-h-[92px] min-w-[200px] bg-white p-5 cursor-pointer dark:bg-white/10">
          <div className="flex gap-x-2">
            <UilBrightness className="w-4 h-4" />
            <span className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
              Daily APY
            </span>
          </div>
          <p className="sm:text-24 text-20 font-500 sm:leading-7 text-blue-300 dark:text-white mt-3 lg:mt-10 md:mt-5">
            0.0230%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
