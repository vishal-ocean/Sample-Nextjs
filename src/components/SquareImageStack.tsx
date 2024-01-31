import { cn } from '@/utils';
import Image from 'next/image';
const ImageData = [
  '/images/svg/icon-BTC.svg',
  '/images/svg/icon-ETH.svg',
  '/images/svg/icon-USDT.svg',
  '/images/svg/icon-XRP.svg'
];
export const SquareImageStack = () => {
  return (
    <div className="h-10 w-10 relative grid grid-cols-[auto_auto] justify-items-center">
      {ImageData.map((value, index) => (
        <div
          key={index}
          className={cn(
            'h-6 w-6 ring-2 ring-white rounded-full z-10 relative col-span-1 dark:ring-white/15',
            ImageData.length > 2 &&
              ImageData.length % 2 != 0 &&
              ImageData.length - 1 == index &&
              '!col-span-2 -left-1',
            index % 2 != 0 && '-left-2',
            index > 1 && 'bottom-2'
          )}
        >
          <Image
            src={value}
            height={24}
            width={24}
            alt=""
            className="h-6 w-6 rounded-full"
          />
        </div>
      ))}
    </div>
  );
};
