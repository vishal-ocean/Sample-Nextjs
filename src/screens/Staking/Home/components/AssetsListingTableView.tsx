import { Button, buttonVariants } from '@/components/UI/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/UI/Table';
import {
  STAKING_ACTION_MODAL,
  STAKING_MODAL,
  UNSTAKE_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { readableNumber } from '@/helper/readableNumber';
import { UilAngleRightB, UilEllipsisH } from '@/icons';
import { useHandleModalAction } from '@/store/handleModal';
import { useStakingStore } from '@/store/stakingStore';
import { cn } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AssetsListingTableView = () => {
  const HEADERS = [
    'Stakes',
    'APY',
    'You Staked',
    'Your Rewards',
    'Staking Market Cap',
    ''
  ];
  const { setHandleModal } = useHandleModalAction;
  const { stakeList } = useStakingStore();
  const router = useRouter();

  return (
    <Table extraClass="sm:overflow-scroll	">
      <TableHeader className="sm:contents hidden">
        <TableRow className="border-0 border-none ">
          {HEADERS?.map((header, index) => (
            <TableHead
              key={`tableHead-${index}`}
              className="text-12 text-gray-300 font-500 h-fit dark:text-white/30"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="text-14 sm:text-16">
        {stakeList?.map((item: any, index: number) => (
          <TableRow
            key={`listView-${index}`}
            className="dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer"
          >
            <TableCell
              className="md:py-6 sm:py-4 py-5 min-h-[40px] w-fit sm:min-w-[200px]"
              onClick={() =>
                router.push(`/staking/stake-detail/${item?.stakeId}`)
              }
            >
              <div className="flex gap-x-3 items-center">
                <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
                  <Image
                    src={AssetImages[item?.assetName]}
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <div className="flex flex-col ">
                  <span className="text-blue-300 font-500 leading-5 dark:text-white">
                    {item?.assetName}
                  </span>
                  <span className="text-16 text-gray-300 font-500 leading-5 dark:text-white/30">
                    {item?.assetName}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell
              className="md:py-6 sm:py-4 py-5 min-h-[40px] w-fit sm:min-w-[120px] sm:p-4 p-0"
              onClick={() =>
                router.push(`/staking/stake-detail/${item?.stakeId}`)
              }
            >
              <div className="flex flex-col sm:items-baseline items-end">
                <span className="text-blue-300 font-500 leading-5 dark:text-white sm:hidden text-16">
                  €{readableNumber(Number(item?.stakedFiat) || 0)}
                </span>
                <span
                  className={cn(
                    'font-500 leading-5 text-16 sm:text-black dark:text-white text-gray-300'
                  )}
                >
                  {item?.apy}%
                </span>
              </div>
            </TableCell>
            <TableCell
              className="md:py-6 py-4 min-h-[40px]   sm:hidden table-cell w-20"
              onClick={() => setHandleModal(STAKING_ACTION_MODAL)}
            >
              <UilEllipsisH className="w-10 h-10 p-3 text-blue-300 dark:text-white" />
            </TableCell>
            <TableCell
              className="md:py-6 py-4 min-h-[40px] w-fit min-w-[180px] sm:table-cell	 hidden"
              onClick={() =>
                router.push(`/staking/stake-detail/${item?.stakeId}`)
              }
            >
              <div className="flex flex-col">
                <span className="text-blue-300 font-500 leading-5 dark:text-white">
                  €{readableNumber(Number(item?.stakedFiat) || 0)}
                </span>
                <span className="text-gray-300 font-500 leading-5 dark:text-white/30">
                  {item?.staked || 0}&nbsp;{item.assetName}
                </span>
              </div>
            </TableCell>
            <TableCell
              className="md:py-6 py-4 min-h-[40px] w-fit min-w-[180px]  sm:table-cell	 hidden"
              onClick={() =>
                router.push(`/staking/stake-detail/${item?.stakeId}`)
              }
            >
              <div className="flex flex-col">
                <span
                  className={`leading-5 ${
                    Number(item.rewardedFiat) > 0
                      ? 'text-success-300 font-700 dark:text-success-200'
                      : ' text-gray-300 font-500 dark:text-white/30'
                  }`}
                >
                  €{readableNumber(Number(item?.rewardedFiat) || 0)}
                </span>
                <span className="text-gray-300 font-500 leading-5 dark:text-white/30">
                  {item?.rewarded || 0}&nbsp;{item.assetName}
                </span>
              </div>
            </TableCell>
            <TableCell
              className="md:py-6 py-4 min-h-[40px] w-fit min-w-[160px]  sm:table-cell	 hidden"
              onClick={() =>
                router.push(`/staking/stake-detail/${item?.stakeId}`)
              }
            >
              <span
                className={cn(
                  'font-500 leading-5 text-16 text-black dark:text-white'
                )}
              >
                €{readableNumber(Number(item.marketCap) || 0)}
              </span>
            </TableCell>

            <TableCell className="leading-5 md:py-6 py-4 min-h-[40px]  gap-x-1 justify-end  sm:flex hidden">
              <Button
                variant="secondary"
                className="text-blue-300 text-14 font-700 py-0 bg-white px-4 h-10 rounded-3xl hover:text-white hover:bg-blue-300  leading-4 dark:text-white dark:bg-inherit dark:hover:bg-white/30"
                onClick={() => setHandleModal(UNSTAKE_MODAL)}
              >
                Withdraw
              </Button>
              <Button
                variant="secondary"
                className="text-blue-300 text-14 font-700 py-0 px-4 h-10 rounded-3xl hover:text-white hover:bg-blue-300  leading-4 dark:bg-white/15 dark:text-white dark:hover:bg-white/30"
                onClick={() => setHandleModal(STAKING_MODAL)}
              >
                Stake
              </Button>
              <Link
                href={`/staking/stake-detail/${item?.stakeId}`}
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'text-14 font-700 h-10 w-10 rounded-3xl flex justify-center items-center leading-4 !p-0 dark:bg-white/15 dark:hover:bg-white/30'
                )}
              >
                <UilAngleRightB className="w-4 h-4 text-blue-300 dark:text-white" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssetsListingTableView;
