'use client';
import ImageStack from '@/components/ImageStack';
import { Button } from '@/components/UI/Button';
import { IconStar } from '@/components/icons/IconStar';
import { useHandleModalAction } from '@/store/handleModal';
import { cn } from '@/utils';

const TotalRewards = () => {
  const { setHandleModal } = useHandleModalAction;

  return (
    <>
      <div className="bg-white relative rounded-[24px]  w-full lg:w-auto lg:min-h-[276px] min-h-[220px] min-w-[282px] dark:bg-white/10">
        <div className="py-5 px-5   flex h-full lg:flex-col  flex-col  justify-between">
          <div className="md:flex md:justify-between md:flex-col ">
            <div className="flex gap-x-2">
              <IconStar className="w-6 h-6 flex" />
              <span className="text-12 leading-4 font-500 text-gray-300 tracking-tight  my-auto dark:text-white/30 whitespace-nowrap">
                Total Rewards
              </span>
            </div>
            <div className="block md:relative">
              <p className="md:text-40 text-24 leading-7 font-500 md:leading-10 md:mt-8 mt-4 text-success-200 tracking-tighter break-all ">
                <span className="md:absolute lg:static top-0 whitespace-nowrap">
                  €40,000
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between  md:-mt-1">
            <ImageStack
              displayLimit={2}
              height={40}
              width={40}
              Images={[
                '/images/svg/icon-ETH.svg',
                '/images/svg/icon-XRP.svg',
                '/images/svg/icon-USDT.svg',
                '/images/svg/icon-BTC.svg',
                '/images/svg/icon-BTC.svg'
              ]}
            />
            <Button
              variant="outline"
              className={cn(
                'h-10 p-0 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4 bg-secondary dark:bg-white/15 dark:text-white whitespace-nowrap'
              )}
            >
              See All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalRewards;
