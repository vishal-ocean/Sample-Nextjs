'use client';

import { useTotalAssetsData } from '@/services/useCrypto';
import { useGetWalletsMutation } from '@/services/useStrigaWallet';
import { useUserDataStore } from '@/store/userDataStore';
import moment from 'moment';
import { useEffect } from 'react';
import HomePageNews from '../Home/components/HomePageNews';
import HomeCards from './components/HomeCards';
import HomePageChart from './components/HomePageChart';
import { HomeTopBanner } from './components/HomeTopBanner';
import { TierBox } from './components/TierBox';

const HomePage = () => {
  const { data, isLoading } = useTotalAssetsData();
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
      <HomeTopBanner />
      <HomeCards />
      <div className="grid grid-cols-12 mt-5 gap-5">
        <div className="col-span-8 xl:col-span-9 row-span-3">
          <HomePageChart />
        </div>
        <TierBox />
        <div className="col-span-4 rounded-[12px] bg-white dark:bg-white/10">
          <HomePageNews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
