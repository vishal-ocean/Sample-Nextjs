'use client';
import { CardSectionSkeleton } from '@/components/Loaders/CardSectionSkeleton';
import CardSkeleton from '@/components/Loaders/CardSkeleton';
import { FullTableSkeleton } from '@/components/Loaders/TableSkeleton';
import {
  CARD_DETAIL_MODAL,
  CARD_SETTINGS_MODAL,
  CARD_TRANSACTION_LIMIT,
  CHANGE_CURRENCY_MODAL,
  CHANGE_CURRENCY_SUCCESS_MODAL,
  CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL,
  CREATE_VIRTUAL_OR_PHYSICAL_CARD_SUCCESS_MODAL,
  DELIVERY_DETAILS_MODAL,
  DELIVERY_METHOD_MODAL,
  FREEZE_CARD_MODAL,
  REVEAL_PIN_MODAL,
  SET_3DS_PASSWORD_MODAL,
  SET_NEW_CARD_3DS_PASSWORD,
  STRIGA_UI_COMPONENT_OTP_MODAL
} from '@/constants';
import {
  useGetCardDetailsMutation,
  useGetCardsMutation
} from '@/services/useStrigaCards';
import { useStrigaUserDetailsMutation } from '@/services/useStrigaUsers';
import { useGetWalletsMutation } from '@/services/useStrigaWallet';
import { useCardAction, useCardStore } from '@/store/cardDetails';
import { useHandleModalStore } from '@/store/handleModal';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useUserDataStore } from '@/store/userDataStore';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import StrigaUIComponentOtpVerification from './components/modals/StrigaUIComponentOtpVerification';
import { CardSettingsModal } from './components/modals/settings/CardSettingsModal';
import { CardTransactionLimitModal } from './components/modals/settings/CardTransactionLimitModal';
import ChangeCurrencyModal from './components/modals/settings/ChangeCurrencyModal';
import ChangeCurrencySuccessModal from './components/modals/settings/ChangeCurrencySuccessModal';
import SetNew3DsPasswordModal from './components/modals/settings/SetNew3DsPasswordModal';
import { useCardSection } from './components/useCardSection';
const CardSection = dynamic(() =>
  import('./components/CardSection').then((mod) => mod.CardSection)
);
const NoCards = dynamic(() =>
  import('./components/NoCards').then((mod) => mod.NoCards)
);
const SideSection = dynamic(() =>
  import('./components/SideSection').then((mod) => mod.SideSection)
);
const TransactionsList = dynamic(() =>
  import('./components/TransactionsList').then((mod) => mod.TransactionsList)
);
const CardDetailModal = dynamic(() =>
  import('./components/modals/CardDetailModal').then(
    (mod) => mod.CardDetailModal
  )
);
const FreezeCardModal = dynamic(() =>
  import('./components/modals/FreezeCardModal').then(
    (mod) => mod.FreezeCardModal
  )
);
const RevealPinModal = dynamic(() =>
  import('./components/modals/RevealPinModal').then((mod) => mod.RevealPinModal)
);
const CreateCardModal = dynamic(
  () => import('./components/modals/CreateCard/CreateCardModal')
);
const CreateCardSuccessModal = dynamic(
  () => import('./components/modals/CreateCard/CreateCardSuccessModal')
);
const DeliveryMethodModal = dynamic(
  () => import('./components/modals/CreateCard/DeliveryMethodModal')
);
const Set3DsPasswordModal = dynamic(
  () => import('./components/modals/CreateCard/Set3DsPasswordModal')
);
const DeliveryDetails = dynamic(
  () => import('./components/modals/delieveryDetails/DelieveryDetails')
);

const CardsPage = () => {
  const { modalOpen } = useHandleModalStore();
  const getAllCards = useGetCardsMutation();
  const getCardDetails = useGetCardDetailsMutation();
  const getStrigaUserDetails = useStrigaUserDetailsMutation();
  const getAllWallets = useGetWalletsMutation();
  const { currentCard } = useCardStore();
  const { setCurrentCard } = useCardAction;
  const { confirmConsent, setChallengeId, handleStrigaUIVerifyOtp } =
    useCardSection();
  const [isCardFreeze, setIsCardFreeze] = useState({
    PHYSICAL: false,
    VIRTUAL: false
  });
  const { otpVerificationType } = useTransactionStore();

  const { strigaUserData, userCardDetails } = useUserDataStore();

  useEffect(() => {
    if (userCardDetails) {
      userCardDetails?.find((item: any) =>
        setIsCardFreeze((prevState) => ({
          ...prevState,
          [item?.type]: item.status === 'BLOCKED' ? true : false
        }))
      );
    }
  }, [currentCard, userCardDetails]);

  // useEffect(() => {
  //   if (userCardDetails.length === 1) {
  //     handleSelectedCard(userCardDetails[0].type);
  //   } else if (userCardDetails.length === 2) {
  //     handleSelectedCard(currentCard);
  //   }
  // }, [userCardDetails]);

  useEffect(() => {
    if (strigaUserData.strigaId) {
      getAllCards.mutate({
        userId: strigaUserData.strigaId,
        offset: 0,
        limit: 100
      });

      getStrigaUserDetails.mutate({
        userId: strigaUserData.strigaId
      });
      getAllWallets.mutate({
        userId: strigaUserData.strigaId,
        startDate: moment().subtract(2, 'years').format('x'),
        endDate: moment().format('x'),
        page: 1
      });
    }
  }, [strigaUserData]);

  useEffect(() => {
    if (userCardDetails?.length > 0) {
      getCardDetails.mutate({
        cardId: userCardDetails?.find((item: any) => item?.type === currentCard)
          ?.id
      });
    }
  }, [userCardDetails, currentCard]);

  if (getAllCards?.isLoading) {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr_1fr] gap-5 lg:px-4 xl:p-0">
          <div className="h-max ">
            <CardSkeleton cardClassName="w-full h-full" cardType="large" />
            <CardSkeleton cardClassName="w-full h-full my-3" />
            <CardSkeleton cardClassName="w-full h-full" />
          </div>
          <div className="lg:col-span-3 h-max  px-0 sm:px-10 lg:px-0 order-first lg:order-last">
            <CardSectionSkeleton />
            <div className="p-5 bg-white rounded-[24px] dark:bg-white/10 mt-2 h-max mx-3 sm:mx-0">
              <FullTableSkeleton />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {userCardDetails.length === 0 ? (
        <NoCards />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr_1fr] gap-5 lg:px-4 xl:p-0">
            <SideSection currentCard={currentCard} />
            <div className="lg:col-span-3 h-max  px-0 sm:px-10 lg:px-0 order-first lg:order-last">
              <CardSection
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
                isCardFreeze={isCardFreeze}
              />

              <TransactionsList currentCard={currentCard} />
            </div>
          </div>
        </>
      )}

      {modalOpen === FREEZE_CARD_MODAL && (
        <FreezeCardModal
          currentCard={currentCard}
          cardDetails={userCardDetails?.find(
            (item: any) => item?.type == currentCard
          )}
        />
      )}
      {modalOpen === CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL && (
        <CreateCardModal />
      )}
      {modalOpen === SET_3DS_PASSWORD_MODAL && <Set3DsPasswordModal />}
      {modalOpen === CREATE_VIRTUAL_OR_PHYSICAL_CARD_SUCCESS_MODAL && (
        <CreateCardSuccessModal />
      )}
      {modalOpen === DELIVERY_METHOD_MODAL && <DeliveryMethodModal />}
      {modalOpen === REVEAL_PIN_MODAL && (
        <RevealPinModal selectedCard={currentCard} />
      )}
      {modalOpen === CARD_DETAIL_MODAL && (
        <CardDetailModal selectedCard={currentCard} />
      )}
      {modalOpen === DELIVERY_DETAILS_MODAL && (
        <DeliveryDetails selectedCard={currentCard} />
      )}
      {modalOpen === CARD_SETTINGS_MODAL && (
        <CardSettingsModal currentCard={currentCard} />
      )}
      {modalOpen === CARD_TRANSACTION_LIMIT && (
        <CardTransactionLimitModal currentCard={currentCard} />
      )}
      {modalOpen === SET_NEW_CARD_3DS_PASSWORD && (
        <SetNew3DsPasswordModal currentCard={currentCard} />
      )}
      {modalOpen === CHANGE_CURRENCY_MODAL && (
        <ChangeCurrencyModal
          currentCard={currentCard}
          setChallengeId={setChallengeId}
        />
      )}

      {modalOpen === CHANGE_CURRENCY_SUCCESS_MODAL && (
        <ChangeCurrencySuccessModal
          currentCard={currentCard}
          confirmationMutation={confirmConsent}
        />
      )}

      {otpVerificationType === CHANGE_CURRENCY_MODAL &&
        modalOpen === STRIGA_UI_COMPONENT_OTP_MODAL && (
          <StrigaUIComponentOtpVerification
            handleVerifyOtp={handleStrigaUIVerifyOtp}
            confirmationMutation={confirmConsent}
            showModal={CHANGE_CURRENCY_SUCCESS_MODAL}
          />
        )}
    </>
  );
};

export default CardsPage;
