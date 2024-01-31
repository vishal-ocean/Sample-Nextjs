import { Button } from '@/components/UI/Button';
import { PRIMARY_MARKET } from '@/constants';
import { UilPlus } from '@/icons';
import { useMarketPlaceTabAction } from '@/store/marketPlaceTabStore';
import Link from 'next/link';
const NoInvestmentFound = () => {
  const { setMarketPlaceTab } = useMarketPlaceTabAction;
  return (
    <div className="px-5 py-12 flex flex-col gap-y-6 justify-between items-center">
      <div className="flex justify-center items-center">
        <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
        <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
        <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-gray-600 dark:border-gray-800">
          <UilPlus className="w-4 h-4 mx-auto text-blue-300  dark:text-gray-800" />
        </div>
      </div>
      <span className="text-16 text-gray-300 font-500 leading-5">
        You have no investments yet
      </span>
      <div className="flex gap-x-1">
        <Link href="/wealth/market-place">
          <Button
            className="font-700 text-white w-fit sm:px-4 px-[14px] py-3 text-14 rounded-3xl leading-4 whitespace-nowrap"
            onClick={() => setMarketPlaceTab(PRIMARY_MARKET)}
          >
            Primary Market
          </Button>
        </Link>
        {/* <Link href="/market-place"> */}
        <Button
          // variant={"secondary"}
          className="font-700 text-blue-300 w-fit sm:px-4 px-[14px] py-3 text-14 rounded-3xl leading-4 whitespace-nowrap"
          // onClick={() => setMarketPlaceTab(SECONDARY_MARKET)}
          disabled
        >
          Secondary Market
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default NoInvestmentFound;
