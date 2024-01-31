'use client';
import ChartDropDownModal from '@/components/ChartDropDownModal';
import { Button } from '@/components/UI/Button';
import { CHART_FILTER_DROPDOWN } from '@/constants';
import { UilAngleDown } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const StakeChart = dynamic(() =>
  import('@/components/Chart/StakeChart').then((mod) => mod.StakeChart)
);
export const ChartSection = ({ emptyState }: { emptyState: boolean }) => {
  const [range, setRange] = useState('All');
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  return (
    <>
      <div className="sm:pt-5 pt-3 pr-5 pl-5 sm:pl-12 sm:pb-12 pb-6 bg-white rounded-[24px] col-span-3 gap-2 dark:border-white/15 dark:border dark:border-solid dark:bg-transparent">
        <div className="flex justify-between">
          <div className="sm:mt-5 mt-3">
            <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
              Price
            </p>
            <div className="my-4 flex sm:flex-row flex-col gap-3">
              <p className="sm:text-[56px] text-40 font-500 sm:leading-[56px] leading-10 tracking-[-1.12px]">
                €1,776.11
              </p>
              <p className="text-success-200 text-14 font-700 leading-4">
                + 12.86%
              </p>
            </div>
          </div>
          <div className="hidden sm:flex gap-1">
            {['All', '1Y', '6M', '1M'].map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  'h-10 p-0 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4 dark:text-white',
                  range === item
                    ? 'bg-secondary dark:bg-white/15'
                    : 'bg-transparent'
                )}
                key={`RangeButton-${index}`}
                onClick={() => {
                  setRange(item);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          <Button
            variant="secondary"
            className="text-blue-300 rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2 sm:hidden leading-4 dark:text-white"
            onClick={() => setHandleModal(CHART_FILTER_DROPDOWN)}
          >
            {range}
            <UilAngleDown className="text-blue-300 h-4 w-4 dark:text-white" />
          </Button>
        </div>
        <StakeChart emptyState={emptyState} />
      </div>
      {modalOpen === CHART_FILTER_DROPDOWN && (
        <ChartDropDownModal range={range} setRange={setRange} />
      )}
    </>
  );
};
