import CustomModal from '@/components/CustomModal';
import { SquareImageStack } from '@/components/SquareImageStack';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/UI/Table';
import { Input } from '@/components/UI/form/Input';
import IconTransaction from '@/components/icons/IconTransaction';
import { YIELD_TRANSACTIONS_MODAL } from '@/constants';
import { UilSearch } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import Link from 'next/link';
import { AssetsDropdown } from '../components/AssetsDropdown';
import { DateRangeDropDown } from '../components/DateRangeDropDown';

export const YieldTransactionsModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? YIELD_TRANSACTIONS_MODAL : '');
  };

  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 !rounded-[24px]"
      open={modalOpen === YIELD_TRANSACTIONS_MODAL}
      onOpenChange={handleOpenChange}
    >
      <div className="flex items-center gap-2">
        <SquareImageStack />
        <div>
          <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
            BTC / USDT / USDCe
          </p>
          <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
            Transactions
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center  sm:px-7">
          <p className="text-40 font-500 leading-10 text-blue-300 tracking-[-0.8px] dark:text-white">
            Transactions
          </p>
          <Link
            href={''}
            className="px-4 py-3 text-14 font-700 leading-4 text-blue-300 bg-secondary rounded-full dark:text-white dark:bg-white/15"
          >
            View All
          </Link>
        </div>
        <hr className="my-8 border-secondary dark:border-white/15" />
        <div className="flex justify-between flex-col sm:flex-row gap-2  sm:px-7">
          <div className="flex gap-1">
            <AssetsDropdown />
            <DateRangeDropDown />
          </div>
          <div className="relative rounded-[28px] bg-gray-200 flex items-center sm:w-[200px] dark:bg-black">
            <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
              <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
            </div>
            <Input
              type="text"
              id="search-assets"
              className="input w-full leading-5 rounded-3xl outline-none py-2 pl-10 sm:placeholder:text-16 placeholder:text-gray-300 dark:placeholder:text-white/30 placeholder:font-700 placeholder:font-body placeholder:text-14 text-14 md:text-16 font-body font-700 cursor-pointer text-blue-300 dark:text-white bg-transparent border-none lg:h-fit h-10"
              placeholder="Search"
              required
            />
          </div>
        </div>
        <div className="py-[60px] px-5 bg-gray-200 rounded-[24px] mt-5  sm:px-7 dark:bg-white/10">
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-gray-600 dark:border-gray-800">
              <IconTransaction
                strokeWidth={0.5}
                className="w-4 h-4 mx-auto text-blue-300  dark:text-gray-800"
              />
            </div>
          </div>
          <p className="text-16 font-500 leading-5 text-gray-300 text-center mt-4 dark:text-white/30">
            You have no transactions yet
          </p>
        </div>
        <div className="h-[400px] overflow-auto mt-5 sm:px-7">
          <Table>
            <TableHeader className="hidden lg:table-header-group">
              <TableRow className="border-none">
                {['Amount', 'Balance', 'Tokens', 'Date'].map((value, index) => (
                  <TableHead
                    className={cn(
                      'text-12 text-gray-300 font-500 h-fit leading-4 px-3 py-0 dark:text-white/30',
                      value === 'Date' && 'text-end',
                      index == 0 && 'pl-0'
                    )}
                    key={`vaults-header-${index}`}
                  >
                    {value}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)]?.map((_, index) => (
                <TableRow
                  key={`yield-transactions-${index}`}
                  className="dark:border-white/15"
                >
                  <TableCell className="pl-0 pr-3 py-5">
                    <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white">
                      0.0000024 ETH
                    </p>
                    <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
                      €6,948.24
                    </p>
                  </TableCell>
                  <TableCell className="px-3 py-5 hidden sm:table-cell">
                    <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white">
                      0.0000024 ETH
                    </p>
                    <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
                      €6,948.24
                    </p>
                  </TableCell>
                  <TableCell className="px-3 py-5 hidden sm:table-cell">
                    <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white">
                      4
                    </p>
                  </TableCell>
                  <TableCell className="px-3 py-5 ">
                    <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap text-end dark:text-white">
                      Aug 23 2023
                    </p>
                    <p className="text-16 font-500 leading-5 text-gray-300 text-end dark:text-white/30">
                      9:03 AM
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </CustomModal>
  );
};
