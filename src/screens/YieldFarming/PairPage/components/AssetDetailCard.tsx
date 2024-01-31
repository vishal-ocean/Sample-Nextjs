'use client';
import { Button } from '@/components/UI/Button';
import { AssetImages } from '@/constants/AssetsImages';
import { UilExternalLinkAlt } from '@/icons';
import Image from 'next/image';
import React from 'react';

interface AssetDetailCard {
  name: string;
  shortName: string;
  currency: string;
  description: string;
}

const AssetDetailCard: React.FC<AssetDetailCard> = ({
  name,
  shortName,
  currency,
  description
}) => {
  const CardFooterLinks = ['Website', 'Contract', 'Docs'];
  return (
    <div className="md:h-[252px] bg-gray-100 p-7 rounded-[16px] dark:bg-white/10">
      <div className="flex justify-between">
        <div className="flex gap-x-3">
          <div>
            <Image src={AssetImages[shortName]} height={40} width={40} alt="" />
          </div>
          <div>
            <div className="text-16 text-blue-300 font-500 leading-5 dark:text-white">
              {name}
            </div>
            <div className="text-16 text-gray-300 font-500 leading-5 dark:text-white/30">
              {currency}
            </div>
          </div>
        </div>
        <div>
          <Button
            size="sm"
            className="leading-4 font-700 text-14 text-white bg-purple-500 py-3 px-4"
          >
            <Image
              width={16}
              height={16}
              alt="icon"
              src="/images/svg/icon-MATIC.svg"
            />
            <span className="ms-2">Matic</span>
          </Button>
        </div>
      </div>
      <p className="my-5 text-16 font-500 text-blue-300 leading-5 dark:text-white">
        {description}
      </p>
      <div className="flex gap-x-4">
        {CardFooterLinks.map((item, index) => (
          <div
            className="flex gap-x-2 items-center"
            key={`CardFooterLinks-${index}`}
          >
            <UilExternalLinkAlt className="w-4 h-4 text-gray-300 dark:text-white/30" />
            <span className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetDetailCard;
