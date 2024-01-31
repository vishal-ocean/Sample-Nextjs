import { IconX } from '@/components/icons/IconX';
import { UilExternalLinkAlt, UilRedditAlienAlt } from '@/icons';
import { cn } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export const AboutSection = ({ emptyState }: { emptyState: boolean }) => {
  return (
    <div
      className={cn(
        'p-2 bg-white rounded-[24px]  col-span-full lg:col-span-9 grid md:grid-cols-[auto_auto] gap-8 h-max sm:mt-3 mt-1 dark:bg-white/10',
        emptyState && 'row-span-3'
      )}
    >
      <div className="relative rounded-[24px] md:w-[308px]">
        <Image
          src={'/images/about-card.png'}
          height={1000}
          width={1000}
          alt=""
          className="w-full h-full rounded-[24px] md:block hidden"
        />
        <Image
          src={'/images/about-card-mobile.png'}
          height={64}
          width={320}
          alt=""
          className="w-full h-auto rounded-[24px] md:hidden block"
        />
        <div className="bg-transparent rounded-[24px] flex md:flex-col  md:p-6 px-3   absolute top-0 w-full h-full  justify-between ">
          <div className="md:block flex gap-x-3 items-center">
            {' '}
            <Image
              src={'/images/svg/icon-ETH.svg'}
              height={40}
              width={40}
              alt=""
              className="ring-2 ring-white/40 rounded-full"
            />
            <div className="h-10">
              {' '}
              <p className="text-16 font-500 leading-5 text-white/60 md:mt-20">
                ETH
              </p>
              <p className="text-24 font-500 leading-7 text-white">ETH</p>
            </div>
          </div>
          <hr className="my-4  !border-white/20" />
          <div className="flex gap-1 items-center">
            <span className="flex justify-center items-center h-10 w-10 bg-white/20 rounded-full">
              <IconX className="text-white h-4 w-4" />
            </span>
            <span className="flex justify-center items-center h-10 w-10 bg-white/20 rounded-full">
              <UilRedditAlienAlt className="text-white h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
      <div className="md:py-6 flex flex-col justify-between h-full md:px-0 px-3 md:pb-6 pb-3">
        <div className="mb-6 md:mb-0">
          <p className="text-16 font-700 leading-4 text-blue-300 dark:text-white">
            About
          </p>
          <p className="text-16 font-500 leading-5 text-blue-300 mt-3 md:mt-[18px] lg:w-4/5 dark:text-white">
            Ethereum is the world&apos;s largest and most decentralized Layer1
            blockchain. The network is used for building dApps, holding assets,
            transacting and communicating without being controlled by a central
            authority. The Ethereum vision is to build a digital future on a
            global scale, that is powerful enough to help all of humanity.
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <Link
            href={''}
            className="text-14 font-700 leading-4 text-gray-300 flex gap-2 dark:text-white/30"
          >
            <UilExternalLinkAlt className="h-4 w-4" />
            Website
          </Link>
          <Link
            href={''}
            className="text-14 font-700 leading-4 text-gray-300 flex gap-2 dark:text-white/30"
          >
            <UilExternalLinkAlt className="h-4 w-4" />
            Whitepaper
          </Link>
          <Link
            href={''}
            className="text-14 font-700 leading-4 text-gray-300 flex gap-2 dark:text-white/30"
          >
            <UilExternalLinkAlt className="h-4 w-4" />
            Github
          </Link>
          <Link
            href={''}
            className="text-14 font-700 leading-4 text-gray-300 flex gap-2 dark:text-white/30"
          >
            <UilExternalLinkAlt className="h-4 w-4" />
            Explorer
          </Link>
        </div>
      </div>
    </div>
  );
};
