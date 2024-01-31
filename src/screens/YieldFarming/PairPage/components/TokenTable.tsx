'use client';
import { Button } from '@/components/UI/Button';
import { cn } from '@/utils';
import { useState } from 'react';
import AssetsListing from './AssetsListing';
import { useStaticData } from './useStaticData';

const TokenTable = () => {
  const [tab, setTab] = useState('1LP');

  const { TOKEN_TABLE_DATA } = useStaticData();
  return (
    <div className="md:col-span-8 col-span-6 bg-white rounded-[24px] px-5 pt-4 dark:bg-white/10">
      <div className="flex justify-between">
        <div>
          {['1LP', 'Total Pool'].map((item, index) => (
            <Button
              variant="outline"
              className={cn(
                'h-10 p-0 mx-1 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4 bg-secondary dark:bg-white/15 dark:text-white',
                tab === item &&
                  'bg-black text-white dark:bg-white dark:text-blue-300'
              )}
              onClick={() => setTab(item)}
              key={`tab-${index}`}
            >
              {item}
            </Button>
          ))}
        </div>
        <div>
          <Button
            variant="outline"
            className="h-10 p-0 mx-1 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4 bg-secondary dark:bg-white/15 dark:text-white"
          >
            Assets Details
          </Button>
        </div>
      </div>
      <AssetsListing
        data={TOKEN_TABLE_DATA}
        isLoading={false}
        isRefetching={false}
      />
    </div>
  );
};

export default TokenTable;
