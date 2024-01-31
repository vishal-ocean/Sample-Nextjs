'use client';
import { Switch } from '@/components/UI/Switch';
import { UilSearch } from '@/icons';
import { useGetWalletsMutation } from '@/services/useStrigaWallet';
import { useUserDataStore } from '@/store/userDataStore';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
const ChartSection = dynamic(() => import('./components/ChartSection'));
const CurrencyListing = dynamic(() =>
  import('./components/CurrencyListing').then((mod) => mod.CurrencyListing)
);
const ActionCards = dynamic(() => import('./components/ActionCards'));
const CardsSection = dynamic(() => import('./components/CardsSection'));

export const NeoBanking = () => {
  const getAllWallets = useGetWalletsMutation();
  const { strigaUserData, userWalletDetails } = useUserDataStore();

  useEffect(() => {
    if (strigaUserData.strigaId)
      getAllWallets.mutate({
        userId: strigaUserData.strigaId,
        startDate: moment().subtract(2, 'years').format('x'),
        accountId: userWalletDetails?.accounts?.EUR?.accountId,
        endDate: moment().format('x'),
        page: 1
      });
  }, [strigaUserData]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[calc(100%-360px)_336px] mt-7 gap-6 lg:px-4 xl:px-0">
        <div className="flex flex-col gap-y-2 w-full h-full lg:order-1 order-2 px-3 sm:px-10 lg:px-0">
          <ChartSection />
          <ActionCards />
        </div>
        <CardsSection />
      </div>
      <div className="px-5 py-5 sm:pb-12 lg:p-12 bg-white dark:bg-opacity-10 mt-6 rounded-[24px] mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="mb-2 sm:mb-6 gap-y-4 flex justify-between md:items-center flex-col md:flex-row">
          <p className="sm:text-24 font-500 sm:leading-8 text-16 leading-5 text-blue-300 dark:text-white">
            Accounts
          </p>
          <div className="flex gap-x-3 gap-y-2 flex-col sm:flex-row">
            <div className="flex gap-x-1 justify-between sm:justify-start items-center order-2 sm:order-1">
              <span className="text-blue-300 dark:text-white leading-4 text-14 font-700 flex items-center h-8 whitespace-nowrap">
                Show assets with 0 balance
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <Switch className="data-[state=checked]:bg-blue-300" />
              </label>
            </div>
            <div className="relative w-full md:max-w-[280px] !bg-white dark:!bg-black rounded-[28px] flex items-center order-1 sm:order-2">
              <div className="flex justify-center absolute lg:top-3 items-center text-center pl-3 pointer-events-none">
                <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
              </div>
              <input
                type="text"
                id="search-assets"
                className="input w-full leading-5 rounded-3xl outline-none py-2.5 pl-10 lg:placeholder:text-16 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 lg:text-16  font-500 font-body cursor-pointer text-blue-300 bg-gray-200 dark:text-white lg:h-fit h-10 dark:bg-black"
                placeholder="Search"
                required
              />
            </div>
          </div>
        </div>
        <CurrencyListing />
      </div>
    </div>
  );
};
