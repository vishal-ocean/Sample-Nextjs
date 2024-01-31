'use client';
import { strigaRequestConsent } from '@/backend/helper/strigaConsents';
import CustomModal from '@/components/CustomModal';
import {
  CARD_SETTINGS_MODAL,
  CHANGE_CURRENCY_MODAL,
  STRIGA_UI_COMPONENT_OTP_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilAngleLeft, UilCheck, UilEuro, UilSetting } from '@/icons';
import { useGetCardDetailsMutation } from '@/services/useStrigaCards';
import { useCardAction, useCardStore } from '@/store/cardDetails';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useTransactionAction } from '@/store/useTransactionStore';
import { useUserDataStore } from '@/store/userDataStore';
import { cn } from '@/utils';
import Image from 'next/image';
import { useEffect } from 'react';
interface Currency {
  shortName: string;
  name: string;
  icon: any;
}

const ChangeCurrencyModal = ({
  currentCard,
  setChallengeId
}: {
  currentCard: string;
  setChallengeId: any;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { cardActionDetails, cardDetails } = useCardStore();
  const { setCardActionDetails } = useCardAction;
  const { userCardDetails, strigaUserData } = useUserDataStore();
  const getCardDetails = useGetCardDetailsMutation();
  const { setOtpVerificationType } = useTransactionAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CHANGE_CURRENCY_MODAL : '');
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
  const currentCardDetail = userCardDetails.find(
    (val: any) => val.type === currentCard
  );
  const strigaUIComponentInit = async () => {
    if (typeof window !== undefined) {
      const response = await strigaRequestConsent(strigaUserData?.strigaId);
      if (response?.challengeId && response?.dateExpires) {
        setChallengeId(response?.challengeId);
      }
    }
  };
  useEffect(() => {
    getCardDetails.mutate({
      cardId: userCardDetails?.find((item: any) => item?.type === currentCard)
        ?.id
    });
  }, [currentCard]);

  useEffect(() => {
    setCardActionDetails({
      selectedCurrency: cardDetails?.linkedAccountCurrency
    });
  }, [cardDetails?.linkedAccountCurrency]);

  return (
    <CustomModal
      open={modalOpen === CHANGE_CURRENCY_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5  max-h-[600px] border-none"
    >
      <div className="flex gap-x-2 items-center">
        <span
          className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15 cursor-pointer"
          onClick={() => setHandleModal(CARD_SETTINGS_MODAL)}
        >
          <UilAngleLeft className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
          <UilSetting className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <div className="flex flex-col">
          <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
            Settings{' '}
          </span>
          <span className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
            {currentCard === 'PHYSICAL' ? 'Physical' : 'Virtual'}{' '}
            {currentCardDetail?.maskedCardNumber.substr(-7)}
          </span>
        </div>
      </div>
      <div className="mt-3 sm:px-3">
        <div className="flex  justify-between sm:items-end sm:flex-row flex-col gap-y-2">
          <p className="text-blue-300  text-24 leading-7 font-500 dark:text-white">
            {`${currentCard === 'VIRTUAL' ? 'Virtual' : 'Physical'} Card`}{' '}
            <br className="hidden sm:block" />
            currency
          </p>
          <p className="text-gray-300 text-12 leading-4 font-500 dark:text-white/30 sm:text-right ">
            You can change
            <br className="hidden sm:block" />
            &nbsp;currency anytime
          </p>
        </div>
      </div>
      <div className="flex">
        <div className=" w-[180px] relative right-5 top-5 sm:block hidden overflow-hidden">
          <Image
            src={`/images/big-${
              currentCard === 'PHYSICAL' ? 'physical' : 'virtual'
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
          <div className="grid gap-2 grid-cols-1 sm:pl-10 sm:pt-5 ">
            {currencyData?.map((val: any, index: number) => (
              <div
                key={index} // Make sure to provide a unique key when using map()
                className={cn(
                  'min-w-[248px] p-3 rounded-xl border-solid border-secondary dark:border-white/15 border-[1px] h-max  w-full flex cursor-pointer relative justify-between',
                  userCardDetails
                    ?.filter((obj: any) => obj.type !== currentCard)
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
                      className="rounded-3xl "
                    />
                    <p
                      className={cn(
                        ' text-16 leading-5 font-700 text-blue-300 dark:text-white',
                        userCardDetails
                          ?.filter((obj: any) => obj.type !== currentCard)
                          ?.map((obj: any) => obj.linkedAccountCurrency)
                          ?.includes(val?.shortName) && 'text-gray-300',
                        cardActionDetails.selectedCurrency === val?.shortName &&
                          'text-white'
                      )}
                    >
                      {val?.shortName}
                    </p>{' '}
                  </div>
                  {userCardDetails
                    ?.filter((obj: any) => obj.type !== currentCard)
                    ?.map((obj: any) => obj.linkedAccountCurrency)
                    ?.includes(val?.shortName) ? (
                    <p className="ml-2 text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
                      Applied to other card
                    </p>
                  ) : (
                    <div className="flex gap-2 items-center">
                      {' '}
                      <p
                        className={cn(
                          ' text-12 leading-4 font-500 text-gray-300 dark:text-white/30',
                          cardActionDetails.selectedCurrency ===
                            val?.shortName && 'text-white/30'
                        )}
                      >
                        {val?.name}
                      </p>
                      {cardActionDetails.selectedCurrency ===
                        val?.shortName && (
                        <UilCheck className="w-6 h-6 text-white" />
                      )}
                    </div>
                  )}
                </>
              </div>
            ))}
          </div>
          <div
            className={cn(
              'px-6 py-4 bg-secondary rounded-3xl w-max mt-8  dark:bg-white/15 sm:mx-5 mx-auto mb-[10px]',
              !cardActionDetails.selectedCurrency ||
                cardActionDetails.selectedCurrency ===
                  cardDetails?.linkedAccountCurrency
                ? 'pointer-events-none	'
                : 'cursor-pointer'
            )}
            onClick={() => {
              strigaUIComponentInit();
              setOtpVerificationType(CHANGE_CURRENCY_MODAL);
              setHandleModal(STRIGA_UI_COMPONENT_OTP_MODAL);
            }}
          >
            <span
              className={cn(
                'text-16 leading-5 font-500 ',
                !cardActionDetails.selectedCurrency ||
                  cardActionDetails.selectedCurrency ==
                    cardDetails?.linkedAccountCurrency
                  ? 'text-gray-300 dark:text-white/30'
                  : 'text-blue-300 dark:text-white'
              )}
            >
              Save
            </span>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ChangeCurrencyModal;
