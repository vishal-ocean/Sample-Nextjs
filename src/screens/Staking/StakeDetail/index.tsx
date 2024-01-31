'use client';
import { StakeCompoundedChart } from '@/components/Chart/StakeCompoundedChart';
import { STAKING_REWARDS_MODAL, STAKING_TRANSACTIONS_MODAL } from '@/constants';
import { UilAngleLeft } from '@/icons';
import { useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
const ChartDataCards = dynamic(() => import('./components/ChartDataCards'));
const StakeTransactionsModal = dynamic(() =>
  import('./modals/StakeTransactionsModal').then(
    (mod) => mod.StakeTransactionsModal
  )
);
const AboutSection = dynamic(() =>
  import('./components/AboutSection').then((mod) => mod.AboutSection)
);
const BalanceCard = dynamic(() =>
  import('./components/BalanceCard').then((mod) => mod.BalanceCard)
);
const ChartSection = dynamic(() =>
  import('./components/ChartSection').then((mod) => mod.ChartSection)
);
const RewardsCalculatorSection = dynamic(() =>
  import('./components/RewardsCalculatorSection').then(
    (mod) => mod.RewardsCalculatorSection
  )
);
const RewardsListing = dynamic(() =>
  import('./components/RewardsListing').then((mod) => mod.RewardsListing)
);
const TransactionsSection = dynamic(() =>
  import('./components/TransactionsSection').then(
    (mod) => mod.TransactionsSection
  )
);
const StakeRewardsModal = dynamic(() =>
  import('./modals/StakeRewardsModal').then((mod) => mod.StakeRewardsModal)
);
const EmptyStateSection = dynamic(
  () => import('./components/EmptyStateSection')
);

export const StakeDetail = () => {
  const { modalOpen } = useHandleModalStore();
  const [emptyState, setEmptyState] = useState(false);

  return (
    <>
      <div
        className={cn(
          'rounded-[24px] bg-white mx-3 sm:mx-10 lg:mx-4 xl:mx-0 gap-16 dark:bg-white/10',
          'sm:p-12 p-3'
        )}
      >
        <div className={cn('relative')}>
          <Link
            href="/staking"
            className="cursor-pointer sm:block hidden px-6 py-4 text-16 font-700 leading-5 bg-secondary text-blue-300 rounded-full w-max dark:bg-white/15 dark:text-white"
          >
            Go Back
          </Link>
          <Link
            href="/staking"
            className="cursor-pointer p-3 bg-secondary sm:hidden block rounded-full w-min"
          >
            <UilAngleLeft className="w-4 h-4 text-blue-300" />
          </Link>
          <div className="mt-20  w-max sm:px-0 px-3 pb-3 sm:pb-0 relative">
            <p className="text-32 leading-8 sm:text-[56px] font-500 sm:leading-[56px] tracking-[-1.12px] w-max">
              Ethereum Staking
            </p>
            <Image
              src={'/images/svg/icon-ETH.svg'}
              height={40}
              width={40}
              alt=""
              className="absolute -right-12 -top-3 sm:block hidden"
            />
          </div>
          <Image
            src={'/images/svg/icon-ETH.svg'}
            height={40}
            width={40}
            alt=""
            className="absolute  top-0 right-0 sm:hidden"
          />
        </div>
        {/* {emptyState && <EmptyStateSection />} */}
      </div>
      <div
        className={cn(
          'grid grid-cols-12 sm:mt-5 mt-3 gap-2 mx-3 sm:mx-10 lg:mx-4 xl:mx-0',
          emptyState
            ? 'grid-rows-[repeat(3,auto)]'
            : 'grid-rows-[repeat(4,auto)]'
        )}
      >
        <div
          className={cn(
            'col-span-full lg:col-span-9 flex flex-col justify-between lg:row-start-1 row-start-3 sm:mt-0 mt-1',
            emptyState ? 'row-span-3' : 'row-span-2'
          )}
        >
          <ChartSection emptyState={emptyState} />
          <ChartDataCards />
        </div>
        <BalanceCard emptyState={emptyState} />
        {emptyState && <EmptyStateSection />}
        {!emptyState && <AboutSection emptyState={emptyState} />}
        <TransactionsSection emptyState={emptyState} />
        {!emptyState && <RewardsCalculatorSection />}
        {!emptyState && (
          <div className="col-span-full lg:col-span-4 p-5 rounded-[20px] bg-white dark:bg-white/10 row-span-4  sm:mt-3 min-h-[404px]">
            <StakeCompoundedChart />
          </div>
        )}

        <RewardsListing emptyState={emptyState} />
      </div>
      {modalOpen === STAKING_TRANSACTIONS_MODAL && <StakeTransactionsModal />}
      {modalOpen === STAKING_REWARDS_MODAL && <StakeRewardsModal />}
    </>
  );
};
