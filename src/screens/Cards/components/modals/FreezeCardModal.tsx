import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import CustomToastMessage from '@/components/UI/CustomToast/CustomToastMessage';
import { FREEZE_CARD_MODAL } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilSnowflake, UilTimes } from '@/icons';
import {
  useBlockCardMutation,
  useGetCardsMutation,
  useUnBlockCardMutation
} from '@/services/useStrigaCards';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';

interface PropsType {
  cardStatus: string;
  handleFreezeCard: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export const FreezeCardModal = ({
  currentCard,
  cardDetails
}: {
  currentCard: string;
  cardDetails: any;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const blockCard: any = useBlockCardMutation();
  const unblockCard: any = useUnBlockCardMutation();
  const getAllCards = useGetCardsMutation();
  const { userCardDetails, strigaUserData } = useUserDataStore();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? FREEZE_CARD_MODAL : '');
  };

  useEffect(() => {
    if (blockCard.data) {
      if (blockCard?.data?.status) {
        toast.success(
          <CustomToastMessage message={`Card Freeze successfully`} />
        );
        // setIsCardFreeze(true);
        setHandleModal('');
        getAllCards.mutate({
          userId: strigaUserData.strigaId,
          offset: 0,
          limit: 100
        });
      }
    }
  }, [blockCard.data]);

  useEffect(() => {
    if (unblockCard.data) {
      if (unblockCard?.data?.status) {
        toast.success(
          <CustomToastMessage message={`Card Unfreeze successfully`} />
        );
        // setIsCardFreeze(false);
        setHandleModal('');
        getAllCards.mutate({
          userId: strigaUserData.strigaId,
          offset: 0,
          limit: 100
        });
      }
    }
  }, [unblockCard.data]);

  const handleFreezeCard = () => {
    try {
      if (cardDetails.status === 'ACTIVE') {
        blockCard.mutate({
          cardId: cardDetails.id
        });
      } else if (cardDetails?.status === 'BLOCKED') {
        unblockCard.mutate({
          cardId: cardDetails.id
        });
      } else {
        toast.error(
          <CustomToastMessage
            message={'Something went wrong.'}
            subText={cardDetails?.maskedCardNumber}
          />
        );
      }
    } catch (err: any) {
      toast.error(<CustomToastMessage message={err} />);
    } finally {
    }
  };
  return (
    <CustomModal
      open={modalOpen === FREEZE_CARD_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
      className="max-w-[520px] w-full p-5"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <span className="rounded-3xl h-10 w-10 flex justify-center items-center bg-primary">
            <UilSnowflake className="h-4 w-4 text-white" />
          </span>
          <div>
            <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white flex gap-1">
              {cardDetails.status === 'ACTIVE' ? 'Freeze' : 'Unfreeze'} Card
            </p>
          </div>
        </div>
        <div
          className="flex bg-secondary cursor-pointer dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 sm:w-10 sm:h-10 items-center"
          onClick={() => setHandleModal('')}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="mt-2">
        <div className="relative w-[268px] h-[160px]  mx-auto">
          <Image
            src={`/images/${
              currentCard === 'PHYSICAL' ? 'physical' : 'virtual'
            }-card-bg.png`}
            height={1000}
            width={1000}
            alt="card"
            className="w-full h-full"
          />
          <p className="text-16 font-500 leading-5 text-white absolute top-5 left-5 capitalize">
            {currentCard}
          </p>
          <p className="text-16 font-500 leading-5 text-white align-middle absolute bottom-5 left-5 flex gap-1">
            {userCardDetails
              .find((obj: any) => obj.type === currentCard)
              ?.maskedCardNumber?.slice(-8)}
          </p>
          <Image
            src={'/images/svg/visa.svg'}
            height={100}
            width={200}
            alt="visa"
            className="w-11 h-3.5 absolute bottom-5 right-5"
          />
          <Image
            src={
              AssetImages[
                userCardDetails.find((obj: any) => obj.type === currentCard)
                  ?.linkedAccountCurrency
              ]
            }
            height={100}
            width={200}
            alt="visa"
            className="w-10 h-10 absolute top-0 right-0"
          />
        </div>
        <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white text-center mt-5">
          {cardDetails.status === 'ACTIVE' ? 'Freeze' : 'Unfreeze'} this card?
        </p>
        <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 text-center mt-2">
          You can unfreeze it back anytime
        </p>
        <div className="flex justify-center gap-2 mt-5 mb-3">
          <Button
            className="flex gap-2 items-center px-4 py-[9.5px] font-700 text-white leading-4 text-14"
            onClick={() => {
              handleFreezeCard();
            }}
            isLoading={blockCard.isLoading || unblockCard.isLoading}
          >
            <UilSnowflake className="h-4 w-4" />
            Yes, {cardDetails.status === 'ACTIVE' ? 'freeze' : 'unfreeze'}
          </Button>
          <Button
            className="px-4 py-[9.5px] font-700 text-blue-300 bg-secondary dark:text-white dark:bg-white/15 leading-4 text-14"
            onClick={() => setHandleModal('')}
          >
            Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
