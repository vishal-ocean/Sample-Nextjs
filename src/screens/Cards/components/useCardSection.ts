import {
  CARD_WITHDRAW_MODAL,
  CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL,
  VERIFY_TRANSACTION,
} from "@/constants";
import { useGetAssetAddress } from "@/services/useCrypto";
import {
  useCardConfirmConsentMutation,
  useReportCardMissingMutation,
  useTerminateCardMutation,
} from "@/services/useStrigaCards";

import {
  useGetAccountDetailsMutation,
  useOnchainWithdrawalMutation,
  useStrigaWithdrawalOtpVerificationMutation,
  useWhitelistDestinationAddressListMutation,
  useWhitelistDestinationAddressMutation,
} from "@/services/useStrigaWallet";
import { useCardAction, useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore } from "@/store/useCryptoStore";
import {
  useTransactionAction,
  useTransactionStore,
} from "@/store/useTransactionStore";
import { useUserDataStore } from "@/store/userDataStore";
import { useEffect, useRef, useState } from "react";

export const useCardSection = () => {
  const slickRef = useRef<any>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { setHandleModal } = useHandleModalAction;
  const { userCardDetails, userWalletDetails, strigaUserData } =
    useUserDataStore();
  const getAccountDetails = useGetAccountDetailsMutation();
  const whitelistDestinationAddress = useWhitelistDestinationAddressMutation();
  const whitelistDestinationAddressList =
    useWhitelistDestinationAddressListMutation();
  const getAssetAddress = useGetAssetAddress();
  const { assetAddress } = useCryptoStore();
  const { setCardActionDetails,setCurrentCard } = useCardAction;
  const { modalOpen } = useHandleModalStore();
  const OnchainWithdrawalMutation = useOnchainWithdrawalMutation();
  const withdrawOtpVerificationMutation =
    useStrigaWithdrawalOtpVerificationMutation();
  const { otpVerificationType } = useTransactionStore();
  const confirmConsent: any = useCardConfirmConsentMutation();
  const terminateCard: any = useTerminateCardMutation();
  const { whitelistAddressList, cardDetails } = useCardStore();
  const { setOtpVerificationType } = useTransactionAction;
  const terminatePhysicalCardMutation = useReportCardMissingMutation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAddressWhitelisted, setIsAddressWhitelisted] =
    useState<boolean>(false);
    // const { setCurrentCard } = useCardAction;
  // const [imageIndex, setImageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [challengeId, setChallengeId] = useState("");
  const [showModal, setShowModal] = useState("");

  const handleVerifyOtp = (data: { verificationCode: string }) => {
    withdrawOtpVerificationMutation.mutate({
      userId: strigaUserData?.strigaId,
      challengeId: OnchainWithdrawalMutation?.data?.data?.challengeId,
      verificationCode: data.verificationCode,
      ip: "127.0.0.1",
    });
  };
  const handleStrigaUIVerifyOtp = (data: { verificationCode: string }) => {
    confirmConsent.mutate({
      userId: strigaUserData?.strigaId,
      challengeId: challengeId,
      verificationCode: data.verificationCode,
    });
  };
  const handleTerminateCard = (data: { cardId: string }, cardType: string) => {
    if (cardType === "PHYSICAL") {
      terminatePhysicalCardMutation.mutate({
        cardId: data.cardId,
      });
    } else {
      terminateCard.mutate({
        cardId: data.cardId,
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
    }
  };
  useEffect(() => {
    if (sliderRef.current) {
      const scrollContainer = sliderRef.current;
      const updateScrollPosition = () => {
        const newScrollPosition = scrollContainer.scrollLeft;
        if (newScrollPosition > scrollPosition) {
          setCurrentCard("VIRTUAL")
        }
        if (newScrollPosition < scrollPosition) {
          setCurrentCard("PHYSICAL")
        }
        setScrollPosition(newScrollPosition);
      };
      scrollContainer.addEventListener('scroll', updateScrollPosition);
      updateScrollPosition();
      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollPosition);
      }}
  }, [scrollPosition]);


  const withdrawModal = () => {
    const isWhitelisted = whitelistAddressList?.addresses.some(
      (item: any) => item.address === assetAddress
    );
    if (!isWhitelisted) {
      whitelistDestinationAddress.mutate({
        userId: strigaUserData?.strigaId,
        address: assetAddress,
        currency: "USDT",
        network: "ETH",
      });
    }
    setHandleModal(CARD_WITHDRAW_MODAL);
    setOtpVerificationType(VERIFY_TRANSACTION);
  };

  const onCardSwitch = (cardType: string) => {
    if (cardType === "PHYSICAL") {
      scrollLeft();
    } else {
      scrollRight();
    }
    slickRef.current.slickGoTo(cardType === "PHYSICAL" ? 0 : 1);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const orderCard = (cardType: string) => {
    setHandleModal(CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL);
    setCardActionDetails({
      selectedCurrency: "",
      selectedType: cardType,
      password: "",
      selectedDeliveryMethod: "",
    });
  };
  return {
    sliderRef,
    slickRef,
    setHandleModal,
    userCardDetails,
    userWalletDetails,
    strigaUserData,
    getAccountDetails,
    whitelistDestinationAddressList,
    getAssetAddress,
    assetAddress,
    setCardActionDetails,
    modalOpen,
    OnchainWithdrawalMutation,
    withdrawOtpVerificationMutation,
    otpVerificationType,
    confirmConsent,
    whitelistAddressList,
    cardDetails,
    isAddressWhitelisted,
    setIsAddressWhitelisted,
    isLoading,
    setIsLoading,
    setChallengeId,
    showModal,
    setShowModal,
    handleVerifyOtp,
    handleStrigaUIVerifyOtp,
    scrollRight,
    scrollLeft,
    withdrawModal,
    onCardSwitch,
    orderCard,
    terminateCard,
    handleTerminateCard,
  };
};
