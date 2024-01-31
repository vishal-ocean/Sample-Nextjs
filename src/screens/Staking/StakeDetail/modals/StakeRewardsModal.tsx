import CustomModal from '@/components/CustomModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/UI/Table';
import { IconStar } from '@/components/icons/IconStar';
import { STAKING_REWARDS_MODAL } from '@/constants';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import Image from 'next/image';

export const StakeRewardsModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? STAKING_REWARDS_MODAL : '');
  };

  return (
    <CustomModal
      className="p-1 sm:p-3 w-full !rounded-t-[16px] bottom-0 !rounded-[24px]"
      open={modalOpen === STAKING_REWARDS_MODAL}
      onOpenChange={handleOpenChange}
    >
      <div className="flex items-center gap-2 px-4 sm:px-2 sm:pt-2 pt-4">
        <span className="h-10 w-10 flex justify-center items-center bg-success-200 rounded-full">
          <IconStar className="h-4 w-4 text-white" />
        </span>
        <Image src={'/images/svg/icon-ETH.svg'} height={40} width={40} alt="" />
        <div>
          <p className="sm:text-16 text-12 text-blue-300 font-500 sm:leading-5 leading-4 dark:text-white">
            Ethereum Staking
          </p>
          <p className="text-12 text-gray-300 font-500 leading-4 dark:text-white/30">
            Rewards
          </p>
        </div>
      </div>
      <div className="mt-6 ">
        <div className="flex justify-between items-center sm:px-9 px-4">
          <p className="text-24 sm:text-40 font-500 leading-7 sm:leading-10 text-blue-300 tracking-[-0.8px] dark:text-white">
            Rewards
          </p>
        </div>

        <div className="h-[400px] overflow-auto mt-6 sm:mt-10 sm:px-9 px-4">
          <Table>
            <TableHeader className="">
              <TableRow className="border-none">
                {['Reward Amount', 'Date'].map((value, index) => (
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
            <TableBody>
              {[...Array(10)]?.map((_, index) => (
                <TableRow
                  key={`yield-transactions-${index}`}
                  className="dark:border-white/15"
                >
                  <TableCell className="pl-0 pr-3 py-4">
                    <p className="text-16 font-700 leading-5 text-success-200 whitespace-nowrap">
                      + €50
                    </p>
                    <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
                      0.00000046 ETH
                    </p>
                  </TableCell>
                  <TableCell className="px-3 py-4">
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
