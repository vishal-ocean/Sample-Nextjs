'use client';
import ChartDropDownModal from '@/components/ChartDropDownModal';
import { Button } from '@/components/UI/Button';
import { CHART_FILTER_DROPDOWN } from '@/constants';
import { UilAngleDown, UilChartPie } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const StakingChart = dynamic(() => import('@/components/Chart/StakingChart'));

const ChartSection = () => {
  const [range, setRange] = useState('1M');
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return (
    <>
      <div className="pt-5 sm:pb-8 pb-5 sm:pl-5 pl-3 sm:pr-5 pr-3 bg-white rounded-[24px] max-h-[592px] dark:border-white/15 dark:border dark:border-solid dark:bg-black">
        <div className="sm:flex justify-end gap-x-1 hidden">
          {['All', '1Y', '6M', '1M'].map((item, index) => (
            <Button
              variant="outline"
              className={cn(
                'h-10 p-0 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4 dark:text-white',
                range === item && 'bg-secondary dark:bg-white/15'
              )}
              key={`RangeButton-${index}`}
              onClick={() => setRange(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="md:px-7 sm:px-3 px-0">
          <div className="flex justify-between items-center sm:px-0 px-2">
            <div className="flex gap-x-2 items-center">
              <UilChartPie className="h-4 w-4 text-blue-300 dark:text-white" />
              <span className="text-gray-300 sm:text-16 text-12 font-500 sm:leading-5 leading-4 dark:text-white/30">
                Total Staked Balance
              </span>
            </div>
            <Button
              variant="secondary"
              className="text-blue-300 rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2 sm:hidden leading-4"
              onClick={() => setHandleModal(CHART_FILTER_DROPDOWN)}
            >
              {range}
              <UilAngleDown className="text-blue-300 h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-y-3 sm:gap-x-3 sm:mt-4 mt-5 sm:flex-row flex-col sm:px-0 px-2">
            <span className="sm:text-[56px] text-40 font-500 sm:tracking-[-1.12px] tracking-[-0.8px] sm:leading-[56px] leading-10">
              €29,618.99
            </span>
            <span className="text-success-200 text-14 font-700 leading-4">
              + 2.45%
            </span>
          </div>
          <div className="h-[368px] w-full mt-5 mb-5 text-12">
            <StakingChart />
          </div>
        </div>
      </div>
      {modalOpen === CHART_FILTER_DROPDOWN && (
        <ChartDropDownModal range={range} setRange={setRange} />
      )}
    </>
  );
};

export default ChartSection;
