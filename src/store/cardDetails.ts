import { create } from "zustand";

type CardDetails = {
  name: string;
  cardNumber: number;
  expiration: string;
  cvv: string;
};

type CardStore = {
  cardData: CardDetails[];
  cardAuthToken: string;
  cardDetails: any;
  whitelistAddressList: any;
  feeEstimateData: any;
  activateCardDetails: any;
  virtualCardCurrencyDetails: string;
  cardActionDetails: {
    selectedCurrency: string;
    selectedType: string;
    password: string;
    selectedDeliveryMethod: string;
  };
  currentCard: string;
};

const useCardStore = create<CardStore>(() => ({
  cardData: [],
  cardAuthToken: "",
  cardDetails: {},
  whitelistAddressList: [],
  feeEstimateData: {},
  activateCardDetails: {},
  virtualCardCurrencyDetails: "",
  cardActionDetails: {
    selectedCurrency: "",
    selectedType: "",
    password: "",
    selectedDeliveryMethod: "",
  },
  currentCard: "PHYSICAL",
}));

const useCardAction = {
  setCardData: (payload: CardDetails) => {
    useCardStore.setState((prev) => ({
      cardData: [...prev.cardData, payload],
    }));
  },

  setCardAuthToken: (payload: string) => {
    useCardStore.setState(() => ({
      cardAuthToken: payload,
    }));
  },

  setCardDetails: (payload: any) => {
    useCardStore.setState(() => ({
      cardDetails: payload,
    }));
  },
  setActivateCardDetails: (payload: any) => {
    useCardStore.setState(() => ({
      activateCardDetails: payload,
    }));
  },
  setWhitelistAddressList: (payload: any) => {
    useCardStore.setState(() => ({
      whitelistAddressList: payload,
    }));
  },
  setFeeEstimateData: (payload: any) => {
    useCardStore.setState(() => ({
      feeEstimateData: payload,
    }));
  },

  setCardActionDetails: (payload: Partial<CardStore["cardActionDetails"]>) => {
    useCardStore.setState((prev) => ({
      cardActionDetails: { ...prev.cardActionDetails, ...payload },
    }));
  },
  setCurrentCard: (payload: string) => {
    useCardStore.setState(() => ({
      currentCard: payload,
    }));
  },
};

export { useCardAction, useCardStore };
