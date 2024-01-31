'use client';
import { Button } from '@/components/UI/Button';
import { AssetImages } from '@/constants/AssetsImages';
import Image from 'next/image';
import { useStaticData } from './useStaticData';

const Transactions = () => {
  const { TRANSACTIONS_DATA } = useStaticData();
  return (
    <div className=" bg-white rounded-[24px] p-5 sm:mt-0 w-full dark:bg-white/10">
      <p className="text-gray-300 dark:text-white/30 text-12 font-500 leading-4">
        Transactions
      </p>
      <div className="gap-y-6 flex flex-col mt-6">
        {TRANSACTIONS_DATA.map((item, index) => (
          <div
            className="flex flex-row justify-between items-center flex-wrap"
            key={`transactionList-${index}`}
          >
            <div className="flex gap-3 items-center">
              <Image
                width={40}
                height={40}
                alt="icon"
                src={AssetImages[item?.name]}
                className="flex"
              />
              <div className="font-500 text-16 leading-5">
                <span className="text-blue-300 dark:text-white">
                  {item.currencyValue}
                </span>
                <span className="flex text-gray-300 dark:text-white/30">
                  {item.operation}
                </span>
              </div>
            </div>
            <div className=" flex justify-between text-16 leading-5">
              <div>
                <span className="flex justify-end font-700 text-blue-300 dark:text-white">
                  {item.currencyValue}
                </span>
                <span className="flex font-500 text-gray-300 dark:text-white/30 justify-end whitespace-nowrap">
                  {item.opeartionValue}
                </span>
              </div>
            </div>
          </div>
        ))}
        <Button
          variant="secondary"
          className="text-blue-300 dark:text-white py-4 px-6 text-16 font-700 leading-5 dark:bg-white/15"
        >
          All Transactions
        </Button>
      </div>
    </div>
  );
};

export default Transactions;
