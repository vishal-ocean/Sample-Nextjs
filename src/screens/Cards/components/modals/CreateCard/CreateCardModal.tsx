'use client';

import CustomModal from '@/components/CustomModal';
import {
  CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL,
  SET_3DS_PASSWORD_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilCheck, UilCreditCard, UilEuro } from '@/icons';
import { useCardAction, useCardStore } from '@/store/cardDetails';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import { cn } from '@/utils';
import { UilBoltAlt } from '@iconscout/react-unicons';
import Image from 'next/image';

interface Currency {
  shortName: string;
  name: string;
  icon: any;
}

const CreateCardModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { cardActionDetails } = useCardStore();
  const { setCardActionDetails } = useCardAction;
  const { userCardDetails } = useUserDataStore();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL : '');
    setCardActionDetails({ selectedCurrency: '' });
  };

  const currencyData: Currency[] = [
    {
      shortName: 'EUR',
      name: 'Euro',
      icon: <UilEuro />
    },
    {
      shortName: 'USDT',
      name: 'Tether USD',
      icon: <UilEuro />
    },
    {
      shortName: 'USDC',
      name: 'USD Coin',
      icon: <UilEuro />
    },
    {
      shortName: 'BUSD',
      name: 'Binance USD',
      icon: <UilEuro />
    },
    {
      shortName: 'BTC',
      name: 'Bitcoin',
      icon: <UilEuro />
    }
  ];

  return (
    <CustomModal
      open={modalOpen === CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5  border-none"
    >
      <div className="flex gap-x-2 items-center">
        <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
          {cardActionDetails.selectedType === 'Physical' ? (
            <UilCreditCard className="h-4 w-4 text-blue-300 dark:text-white" />
          ) : (
            <UilBoltAlt className="h-4 w-4 text-blue-300 dark:text-white" />
          )}
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          {`${cardActionDetails.selectedType} Card`}
        </span>
      </div>
      <div className="mt-3 sm:px-3">
        <span className="text-16 font-500 leading-5 tracking-widest dark:text-white/30 text-gray-300">
          {cardActionDetails.selectedType === 'Physical' ? '1 / 3 ' : ' 1 / 2'}
        </span>
        <div className="flex  justify-between mt-3 sm:items-end sm:flex-row flex-col gap-y-1">
          <p className="text-blue-300  text-24 leading-7 font-500 dark:text-white">
            Choose currency for <br />
            {`your ${cardActionDetails.selectedType} Card`}{' '}
          </p>
          <p className="text-gray-300 text-12 leading-4 font-500 dark:text-white/30  text-right hidden sm:block">
            You can change currency
            <br />
            anytime in Card Settings
          </p>
          <p className="text-gray-300 text-12 leading-4 font-500 dark:text-white/30 block  sm:hidden mt-2">
            You can change currency anytime <br /> in Card Settings
          </p>
        </div>
      </div>
      <div className="flex">
        <div className=" w-[180px] relative right-5 top-5 sm:block hidden overflow-hidden">
          <Image
            src={`/images/big-${
              cardActionDetails.selectedType === 'Physical'
                ? 'physical'
                : 'virtual'
            }-card.png`}
            height={1000}
            width={1000}
            alt="physical card"
            className="w-full h-full hidden sm:block absolute"
          />
          <Image
            src={'/images/svg/visa.svg'}
            height={33}
            width={102}
            alt="physical card"
            className=" hidden sm:block absolute bottom-[44px] right-[50px]"
          />

          <div className="h-[100px] w-[100px] rounded-full absolute right-0 top-0">
            {cardActionDetails.selectedCurrency ? (
              <Image
                width={100}
                height={100}
                src={AssetImages[cardActionDetails.selectedCurrency]}
                alt="image"
              />
            ) : (
              <div className="bg-secondary dark:bg-white/15 flex items-center justify-center w-full h-full rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                >
                  <g id="wrapper">
                    <rect
                      id="Rectangle 1"
                      x="2.5"
                      y="2.5"
                      width="19"
                      height="19"
                      rx="3.5"
                      stroke="currentcolor"
                      stroke-dasharray="4 4"
                    />
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="sm:w-auto w-full">
          <div className="grid gap-2 grid-cols-1 sm:pl-10 sm:pt-5 pt-3">
            {currencyData?.map((val: any, index: number) => (
              <div
                key={index} // Make sure to provide a unique key when using map()
                className={cn(
                  'min-w-[248px] p-3 rounded-xl border-solid border-secondary dark:border-white/15 border-[1px] h-max  w-full flex cursor-pointer relative justify-between',
                  userCardDetails
                    ?.map((obj: any) => obj.linkedAccountCurrency)
                    ?.includes(val?.shortName) &&
                    'pointer-events-none bg-gray-100 dark:bg-white/5 border-none h-auto sm:w-min',
                  cardActionDetails.selectedCurrency === val?.shortName &&
                    'bg-primary border-none'
                )}
                onClick={() =>
                  setCardActionDetails({ selectedCurrency: val?.shortName })
                }
              >
                <>
                  <div className="flex gap-2">
                    <Image
                      height={24}
                      width={24}
                      src={AssetImages[val?.shortName]}
                      alt="token-image"
                      className={cn(
                        'rounded-3xl',
                        userCardDetails
                          ?.map((obj: any) => obj.linkedAccountCurrency)
                          ?.includes(val?.shortName) && 'opacity-40'
                      )}
                    />
                    <p
                      className={cn(
                        ' text-16 leading-5 font-700 text-blue-300 dark:text-white',
                        userCardDetails
                          ?.map((obj: any) => obj.linkedAccountCurrency)
                          ?.includes(val?.shortName) &&
                          'text-gray-300 dark:text-white/30',
                        cardActionDetails.selectedCurrency === val?.shortName &&
                          'text-white'
                      )}
                    >
                      {val?.shortName}
                    </p>{' '}
                  </div>
                  <div className="flex gap-2 items-center">
                    {' '}
                    {userCardDetails
                      ?.map((obj: any) => obj.linkedAccountCurrency)
                      ?.includes(val?.shortName) ? (
                      <p className="ml-2 text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
                        Applied to other card
                      </p>
                    ) : (
                      <p
                        className={cn(
                          ' text-12 leading-4 font-500 text-gray-300 dark:text-white/30',
                          cardActionDetails.selectedCurrency ===
                            val?.shortName && 'text-white/30'
                        )}
                      >
                        {val?.name}
                      </p>
                    )}
                    {cardActionDetails.selectedCurrency === val?.shortName && (
                      <UilCheck className="w-6 h-6 text-white" />
                    )}
                  </div>
                </>
              </div>
            ))}
          </div>
          <div
            className={cn(
              'px-6 py-4 bg-secondary rounded-3xl w-max mt-8  dark:bg-white/15 sm:mx-5 mx-auto mb-3',
              cardActionDetails.selectedCurrency === ''
                ? 'pointer-events-none	'
                : 'cursor-pointer'
            )}
            onClick={() => setHandleModal(SET_3DS_PASSWORD_MODAL)}
          >
            <span
              className={cn(
                'text-16 leading-5 font-500 text-gray-300 dark:text-white/30',
                cardActionDetails.selectedCurrency !== '' &&
                  'text-blue-300 dark:text-white'
              )}
            >
              Next
            </span>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateCardModal;
