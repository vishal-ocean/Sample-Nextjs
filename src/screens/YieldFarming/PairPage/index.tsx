'use client';

import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('./components/Banner'));
const Cards = dynamic(() => import('./components/Cards'));
const ChartSection = dynamic(() => import('./components/ChartSection'));
const SafetyScore = dynamic(() => import('./components/SafetyScore'));
const Strategy = dynamic(() => import('./components/Strategy'));
const TokenTable = dynamic(() => import('./components/TokenTable'));
const TotalDeposit = dynamic(() => import('./components/TotalDeposit'));
const TransactionRatioChart = dynamic(
  () => import('./components/TransactionRatioChart')
);
const Transactions = dynamic(() => import('./components/Transactions'));

const PairPage = () => {
  return (
    <>
      <Banner />
      <div className="grid grid-cols-12 grid-rows-[repeat(7,auto)] sm:grid-rows-[repeat(5,auto)] lg:grid-rows-[repeat(4,auto)] mt-2 gap-x-2 gap-y-2 lg:px-4 xl:px-0">
        <div className="flex flex-col gap-y-2 lg:col-span-9 col-span-full w-full h-full ps-5 pe-4 lg:order-1 order-2 lg:px-0 row-span-2 ">
          <ChartSection />
          <Cards />
        </div>
        <div className="lg:col-span-3 col-span-full order-1 lg:order-2 lg:mx-0 mx-5 sm:mx-4">
          <TotalDeposit />
        </div>
        <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-full sm:order-3 order-6 row-span-1 lg:ms-0 ms-4 sm:me-0 me-5">
          <SafetyScore />
        </div>
        <div className="lg:col-span-6 sm:col-span-6 col-span-full lg:order-4 sm:order-5 order-3 row-span-1 lg:ms-0 ms-5 sm:me-0 me-5">
          <TokenTable />
        </div>
        <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-full lg:order-5 order-4 row-span-1 lg:me-0 sm:me-4 mx-5 sm:ms-0 md:mt-0 sm:mt-4">
          <TransactionRatioChart />
        </div>
        <div className="lg:col-span-3 sm:col-span-6 col-span-full sm:order-6 order-5 row-span-1 lg:me-0 me-5 sm:ms-0 ms-5">
          <Transactions />
        </div>
        <div className="lg:col-span-9 col-span-full order-7 row-span-1 lg:mx-0 mx-4">
          <div className="grid grid-cols-12 rounded-[24px] sm:h-[555px] lg:h-[436px] h-full  bg-white dark:bg-white/10">
            <Strategy />
          </div>
        </div>
      </div>
    </>
  );
};

export default PairPage;
