import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/UI/Table';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import IconTimeCoinWithdraw from '@/components/icons/IconTimeCoinWithdraw';
import { cn } from '@/utils';
const StakeTransactionModalTable = () => {
  return (
    <Table>
      <TableHeader className="hidden sm:table-header-group">
        <TableRow className="border-none">
          {['Type', 'Amount', 'Stake Period', 'Date'].map((value, index) => (
            <TableHead
              className={cn(
                'text-12 text-gray-300 font-500 h-fit leading-4 px-3 pt-0 pb-1 dark:text-white/30',
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
      <TableHeader className="sm:hidden table-header-group">
        <TableRow className="border-none">
          {['Type', 'Amount'].map((value, index) => (
            <TableHead
              className={cn(
                'text-12 text-gray-300 font-500 h-fit leading-4 px-3 pt-0 pb-1 dark:text-white/30',
                value === 'Amount' && 'text-end',
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
          <>
            <TableRow
              key={`yield-transactions-${index}`}
              className="dark:border-white/15"
            >
              <TableCell className="pl-0 pr-3 py-4">
                <div className="flex gap-3 items-center">
                  <span className="flex justify-center items-center h-10 w-10 bg-secondary rounded-full dark:bg-white/10">
                    <IconTimeCoinDeposit
                      className="text-blue-300 h-4 w-4 dark:text-white"
                      strokeWidth={1.2}
                    />
                  </span>
                  <div className="flex flex-col">
                    {' '}
                    <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                      Stake
                    </p>{' '}
                    <p className="text-16 font-500 leading-5 text-gray-300 whitespace-nowrap dark:text-white sm:hidden block">
                      7 days
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-3 py-4 ">
                <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white sm:text-start text-end ">
                  €6,948.24
                </p>
                <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 text-end sm:text-start whitespace-nowrap">
                  0.24 ETH
                </p>
              </TableCell>
              <TableCell className="px-3 py-4 hidden sm:flex">
                <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white">
                  7 days
                </p>
              </TableCell>
              <TableCell className="px-3 py-4 hidden sm:table-cell">
                <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap text-end dark:text-white">
                  Aug 23 2023
                </p>
                <p className="text-16 font-500 leading-5 text-gray-300 text-end dark:text-white/30">
                  9:03 AM
                </p>
              </TableCell>
            </TableRow>
            <TableRow
              key={`yield-transactions-${index}`}
              className="dark:border-white/15"
            >
              <TableCell className="px-0 py-4">
                <div className="flex gap-3 items-center">
                  <span className="flex justify-center items-center h-10 w-10 bg-secondary rounded-full dark:bg-white/10">
                    <IconTimeCoinWithdraw
                      className="text-blue-300 h-4 w-4 dark:text-white"
                      strokeWidth={1.2}
                    />
                  </span>
                  <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                    Withdraw
                  </p>
                </div>
              </TableCell>
              <TableCell className="px-3 py-4 ">
                <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white text-end sm:text-start">
                  €6,948.24
                </p>
                <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 text-end sm:text-start">
                  0.24 ETH
                </p>
              </TableCell>
              <TableCell className="px-3 py-4 hidden sm:table-cell">
                <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white"></p>
              </TableCell>
              <TableCell className="px-3 py-4 hidden sm:table-cell">
                <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap text-end dark:text-white">
                  Aug 23 2023
                </p>
                <p className="text-16 font-500 leading-5 text-gray-300 text-end dark:text-white/30">
                  9:03 AM
                </p>
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export default StakeTransactionModalTable;
