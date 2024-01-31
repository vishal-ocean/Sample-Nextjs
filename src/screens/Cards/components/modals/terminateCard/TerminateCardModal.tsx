import { strigaRequestConsent } from '@/backend/helper/strigaConsents';
import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import { IconDots } from '@/components/icons/IconDots';
import {
  TERMINATE_CARD_CONFIRMATION_CODE_MODAL,
  TERMINATE_CARD_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilTimes, UilTrashAlt } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import { cn } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';

export const TerminateCardModal = ({
  currentCard,
  setChallengeId
}: {
  currentCard: string;
  setChallengeId: any;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { userCardDetails, strigaUserData } = useUserDataStore();
  const [loading, setLoading] = useState(false);

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? TERMINATE_CARD_MODAL : '');
  };
  const currentCardDetail = userCardDetails.find(
    (val: any) => val.type === currentCard
  );

  const strigaUIComponentInit = async () => {
    if (typeof window !== undefined) {
      try {
        setLoading(true);
        const response = await strigaRequestConsent(strigaUserData?.strigaId);

        if (response?.challengeId && response?.dateExpires) {
          setChallengeId(response?.challengeId);
          setHandleModal(TERMINATE_CARD_CONFIRMATION_CODE_MODAL);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <CustomModal
      open={modalOpen === TERMINATE_CARD_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
      className="w-full p-5 max-w-[520px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <span
            className={cn(
              'rounded-3xl h-10 w-10 flex justify-center items-center bg-danger-100'
            )}
          >
            <UilTrashAlt className="h-4 w-4 text-white" />
          </span>
          <div>
            <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              Terminate Card
            </p>
            <p className="text-12 text-gray-300 dark:text-white/30 font-500 leading-4 ">
              {currentCard === 'PHYSICAL' ? 'Physical' : 'Virtual'}{' '}
              {currentCardDetail?.maskedCardNumber.substr(-7)}
            </p>
          </div>
        </div>
        <div
          className="flex bg-secondary cursor-pointer dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 h-10 w-10 items-center"
          onClick={() => setHandleModal('')}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="flex flex-col items-center sm:w-[480px] mt-3">
        <div className="w-[268px] h-[160px] relative mx-auto">
          {currentCard === 'PHYSICAL' ? (
            <Image
              src={'/images/physical-card-bg.png'}
              height={1000}
              width={1000}
              alt="physical card"
              className="w-full h-full"
            />
          ) : (
            <Image
              src={'/images/virtual-card-bg.png'}
              height={1000}
              width={1000}
              alt="physical card"
              className="w-full h-full"
            />
          )}
          <Image
            width={40}
            height={40}
            src={AssetImages[currentCardDetail?.linkedAccountCurrency]}
            alt="image"
            className="absolute top-0 right-0"
          />
          <p className="absolute top-5 left-5 capitalize text-16 font-500 leading-5 text-white">
            {currentCard === 'PHYSICAL' ? 'Physical' : 'Virtual'}
          </p>
          <div className="flex gap-2 items-center absolute bottom-5 left-5 text-16 font-500 leading-5 text-white">
            <IconDots className="fill-white w-4 h-4" />
            {currentCardDetail?.maskedCardNumber.substr(-4)}
          </div>
          <Image
            src={'/images/svg/visa.svg'}
            height={13}
            width={41}
            alt="physical card"
            className="absolute right-5 bottom-5"
          />
        </div>
        <p className="text-16 font-700 leading-5 text-danger-100 mt-5 text-center">
          This action will permanently <br /> deactivate your current card
        </p>
        {currentCard === 'PHYSICAL' ? (
          <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 mt-3 w-10/12 sm:w-9/12 text-center">
            Only do this if your card is is no longer usable, lost, stolen, or
            if you wish to replace it. Once you confirm, this cannot be undone.
          </p>
        ) : (
          <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 mt-3 w-10/12 sm:w-9/12 text-center">
            Once you confirm, this cannot be undone
          </p>
        )}
        <div className="flex items-center justify-center gap-x-2 mt-8 mb-3">
          <Button
            className="text-16 font-700 leading-5 bg-danger-100 px-6 py-4"
            onClick={() => {
              strigaUIComponentInit();
            }}
            isLoading={loading}
          >
            Terminate
          </Button>
          <Button
            className="text-16 font-700 leading-5 bg-secondary dark:bg-white/15 px-6 py-4 text-blue-300 dark:text-white"
            onClick={() => setHandleModal('')}
          >
            Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
