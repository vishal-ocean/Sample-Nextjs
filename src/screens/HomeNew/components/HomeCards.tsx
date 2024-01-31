import IconBank from '@/components/icons/IconBank';
import IconEthereum from '@/components/icons/IconEthereum';
import IconGold from '@/components/icons/IconGold';
import IconOceanCard from '@/components/icons/IconOceanCard';
import { readableNumber } from '@/helper/readableNumber';
import { UilAngleRightB } from '@/icons';
import { useCryptoStore } from '@/store/useCryptoStore';
import { useUserDataStore } from '@/store/userDataStore';
import { useUser } from '@auth0/nextjs-auth0/client';

const HomeCards = () => {
  const { totalAssetsData } = useCryptoStore();
  const { user } = useUser();
  const { userWalletDetails } = useUserDataStore();
  return (
    <div className="flex w-full gap-2 mt-5">
      <div className="rounded-xl p-3 bg-white min-h-[124px] flex flex-col justify-between w-1/4 dark:bg-white/10">
        <div className="flex justify-between">
          {' '}
          <div className="flex gap-3 items-center">
            <span className="p-2 bg-gray-100 rounded-full dark:bg-white/5">
              <IconEthereum
                strokeWidth={1.5}
                height={16}
                width={16}
                className="text-gray-300 dark:text-white/30"
              />
            </span>
            <p className="text-12 leading-4 font-700 text-blue-300 dark:text-white">
              Crypto
            </p>
          </div>
          <span className="p-2 bg-white  rounded-full  dark:bg-transparent">
            <UilAngleRightB className="w-4 h-4 text-blue-300  dark:text-white" />
          </span>
        </div>
        <p className="font-700 text-20 leading-6 text-gray-300 pl-2 dark:text-white/30">
          {' '}
          €
          {Number(totalAssetsData?.balances?.[0]?.balanceFiat?.toFixed(2)) || 0}
        </p>
      </div>
      <div className="rounded-xl p-3 bg-white min-h-[124px] flex flex-col justify-between w-1/4 dark:bg-white/10">
        <div className="flex justify-between">
          {' '}
          <div className="flex gap-3 items-center">
            <span className="p-2 bg-gray-100 rounded-full dark:bg-white/5">
              <IconBank
                strokeWidth={1.5}
                className="w-4 h-4 text-gray-300 dark:text-white/30"
              />
            </span>
            <p className="text-12 leading-4 font-700 text-blue-300 dark:text-white">
              Fiat
            </p>
          </div>
          <span className="p-2 bg-white  rounded-full dark:bg-transparent">
            <UilAngleRightB className="w-4 h-4 text-blue-300 dark:text-white" />
          </span>
        </div>
        <p className="font-700 text-20 leading-6 text-gray-300 pl-2 pb-2 dark:text-white/30">
          €
          {readableNumber(
            Number(
              userWalletDetails?.accounts?.EUR?.availableBalance?.amount || 0
            ) / 100
          ) || 0}
        </p>
      </div>{' '}
      <div className="rounded-xl p-3 bg-white min-h-[124px] flex flex-col justify-between w-1/4 dark:bg-white/10">
        <div className="flex justify-between">
          {' '}
          <div className="flex gap-3 items-center">
            <span className="p-2 bg-gray-100 rounded-full dark:bg-white/5">
              <IconGold
                strokeWidth={1.2}
                className="w-4 h-4 text-gray-300 dark:text-white/30"
              />
            </span>
            <p className="text-12 leading-4 font-700 text-blue-300 dark:text-white">
              Wealth
            </p>
          </div>
          <span className="p-2 bg-white  rounded-full dark:bg-transparent">
            <UilAngleRightB className="w-4 h-4 text-blue-300  dark:text-white" />
          </span>
        </div>
        <p className="font-700 text-20 leading-6 text-gray-300 pl-2 pb-2 dark:text-white/30">
          {user?.email === 'jeel@yopmail.com' ? '€1232.45' : '€0'}
        </p>
      </div>{' '}
      <div className="rounded-xl p-3 bg-white min-h-[124px] flex flex-col justify-between w-1/4 dark:bg-white/10">
        <div className="flex justify-between">
          {' '}
          <div className="flex gap-3 items-center">
            <span className="p-2 bg-gray-100 rounded-full dark:bg-white/5">
              <IconOceanCard className="w-4 h-4 text-gray-300 dark:text-white/30" />
            </span>
            <p className="text-12 leading-4 font-700 text-blue-300 dark:text-white">
              NFTs
            </p>
          </div>
          <span className="p-2 bg-white  rounded-full dark:bg-transparent">
            <UilAngleRightB className="w-4 h-4 text-blue-300 dark:text-white" />
          </span>
        </div>
        <p className="font-700 text-20 leading-6 text-gray-300 pl-2 pb-2">€0</p>
      </div>
    </div>
  );
};
export default HomeCards;
