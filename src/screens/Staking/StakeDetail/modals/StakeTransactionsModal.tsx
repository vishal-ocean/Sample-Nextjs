import CustomModal from '@/components/CustomModal';
import { Input } from '@/components/UI/form/Input';
import IconTransaction from '@/components/icons/IconTransaction';
import { STAKING_TRANSACTIONS_MODAL } from '@/constants';
import { UilSearch } from '@/icons';
import { DateRangeDropDown } from '@/screens/YieldFarming/Home/components/DateRangeDropDown';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
const StakeTransactionModalTable = dynamic(
  () => import('../components/StakeTransactionModalTable')
);

export const StakeTransactionsModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? STAKING_TRANSACTIONS_MODAL : '');
  };

  return (
    <CustomModal
      className="p-2 sm:p-3 w-full !rounded-t-[16px] bottom-0 !rounded-[24px]"
      open={modalOpen === STAKING_TRANSACTIONS_MODAL}
      onOpenChange={handleOpenChange}
    >
      <div className="flex items-center gap-2 px-3 pt-3 sm:px-2 sm:pt-2">
        <span className="h-10 w-10 flex justify-center items-center bg-secondary rounded-full dark:bg-white/15">
          <IconTransaction
            className="h-4 w-4 text-blue-300 dark:text-white"
            strokeWidth={0.3}
          />
        </span>
        <Image src={'/images/svg/icon-ETH.svg'} height={40} width={40} alt="" />
        <div>
          <p className="text-12 leading-4 sm:text-16 text-blue-300 font-500 sm:leading-5 dark:text-white">
            Ethereum Staking
          </p>
          <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
            Transactions
          </p>
        </div>
      </div>
      <div className="mt-6 ">
        <div className="flex justify-between items-center sm:px-9 px-3">
          <p className="text-24 sm:text-40 font-500 leading-7 sm:leading-10 text-blue-300 tracking-[-0.8px] dark:text-white">
            Transactions
          </p>
          <Link
            href={''}
            className="px-4 py-3 text-14 font-700 leading-4 text-blue-300 bg-secondary rounded-full dark:text-white dark:bg-white/15"
          >
            View All
          </Link>
        </div>
        <hr className="my-5 mx-2 sm:my-8 border-secondary dark:border-white/15" />
        <div className="flex justify-between gap-2 sm:px-9 px-3">
          <div className="flex gap-1 sm:order-1 order-2 min-w-[86px]">
            <DateRangeDropDown />
          </div>
          <div className="relative rounded-[28px] bg-gray-200 flex items-center sm:w-[200px] dark:bg-white/5 sm:order-2 order-1">
            <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
              <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
            </div>
            <Input
              type="text"
              id="search-assets"
              className="input w-full leading-5 rounded-3xl outline-none py-2 pl-10 sm:placeholder:text-16 placeholder:text-gray-300 dark:placeholder:text-white/30 placeholder:font-700 placeholder:font-body placeholder:text-14 text-14 md:text-16 font-body font-700 cursor-pointer text-blue-300 bg-transparent border-none lg:h-fit h-10 dark:text-white"
              placeholder="Search"
              required
            />
          </div>
        </div>
        {/* <div className="py-[60px] px-5 bg-gray-200 rounded-[24px] mt-5">
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center">
              <IconTransaction
                strokeWidth={0.5}
                className="w-4 h-4 mx-auto text-blue-300"
              />
            </div>
          </div>
          <p className="text-16 font-500 leading-5 text-gray-300 text-center mt-4">
            You have no transactions yet
          </p>
        </div> */}
        <div className="h-[400px] overflow-auto mt-5 sm:px-9 px-3">
          <StakeTransactionModalTable />
        </div>
      </div>
    </CustomModal>
  );
};
