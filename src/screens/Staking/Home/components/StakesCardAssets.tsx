'use client';
import { Button } from '@/components/UI/Button';
import { UilListUl, UilSearch, UilTh } from '@/icons';
import { useStakeListMutation } from '@/services/useStake';
import { useStakingStore } from '@/store/stakingStore';
import { cn } from '@/utils';
import { useEffect, useState } from 'react';
import { AssetsDropDown } from './AssetsDropDown';
import AssetsListingCardView from './AssetsListingCardView';
import AssetsListingTableView from './AssetsListingTableView';
import NoStakesFound from './NoStakesFound';

const StakesCardAssets = ({ assetItem }: any) => {
  const [gridLayout, setGridLayout] = useState(true);
  const [options, setOptions] = useState('All Stakes');
  const getStakeListMutation = useStakeListMutation();
  const { stakeList } = useStakingStore();

  useEffect(() => {
    getStakeListMutation.mutate();
  }, [assetItem]);

  return (
    <>
      <div className="rounded-[24px] flex flex-col  gap-y-3  sm:gap-y-5 mt-5 sm:mt-5 lg:mt-10  lg:gap-y-5 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="flex justify-between md:flex-row flex-col md:items-center">
          <div className="flex flex-row justify-between gap-x-2">
            {['All Stakes', 'Staked'].map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  'h-10 p-0 py-0 px-6  text-14 sm:text-16 text-blue-300 rounded-full font-700 sm:leading-5 leading-4 bg-secondary whitespace-nowrap md  :max-w-[120px] dark:bg-white/15 dark:text-white w-full',
                  options === item &&
                    'bg-black text-white dark:bg-white dark:text-blue-300'
                )}
                key={`StakesButton-${index}`}
                onClick={() => {
                  setOptions(item);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className="flex sm:gap-x-2 gap-x-1  md:justify-end justify-between mt-3 md:mt-0  md:items-center">
            <div className="relative w-full lg:w-[280px] !bg-white md:h-10 rounded-[28px] flex items-center dark:!bg-white/10 order-1">
              <div className="flex justify-center absolute top-3 md:top-[10px] items-center text-center pl-4 pointer-events-none">
                <UilSearch className="sm:w-5 sm:h-5 h-4 w-4 text-gray-300 dark:text-white/30" />
              </div>
              <input
                type=""
                id="search-assets"
                className="input h-10 w-full rounded-full outline-none py-3 pl-[45px] md:placeholder:text-16 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-16  font-500 font-body cursor-pointer   text-blue-300 dark:bg-transparent dark:text-white dark:placeholder:text-white/30"
                placeholder="Search"
                required
              />
            </div>
            <AssetsDropDown assetItem={assetItem} />
            <div className="bg-secondary rounded-3xl p-1 lg:p-[6px] gap-x-1 justify-center items-center h-10 flex  dark:bg-white/15 order-2 md:order-3">
              <div
                className={cn(
                  'rounded-full h-8 w-8  flex items-center cursor-pointer',
                  !gridLayout && 'bg-white dark:bg-white/10'
                )}
                onClick={() => setGridLayout(false)}
              >
                <UilListUl className="w-4 h-4 text-blue-300 m-auto dark:text-white" />
              </div>
              <div
                onClick={() => setGridLayout(true)}
                className={cn(
                  'rounded-full h-8 w-8 flex justify-center items-center cursor-pointer',
                  gridLayout && 'bg-white dark:bg-white/10'
                )}
              >
                <UilTh className="w-3 h-3 text-blue-300  cursor-pointer dark:text-white" />
              </div>
            </div>
          </div>
        </div>
        {options === 'All Stakes' &&
          (stakeList?.length > 0 ? (
            gridLayout ? (
              <AssetsListingCardView />
            ) : (
              <div className="bg-white rounded-[24px] sm:p-5 lg:p-12 md:p-8 p-0 dark:bg-white/10 md:overflow-scroll">
                <AssetsListingTableView />
              </div>
            )
          ) : (
            <NoStakesFound />
          ))}

        {options === 'Staked' && <NoStakesFound />}
      </div>
    </>
  );
};

export default StakesCardAssets;
