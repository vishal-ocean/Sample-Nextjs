import { create } from 'zustand';

type TransactionsStore = {
  transactionDetails: any;
  transactionEstimate: any;
  cardTransactionHistory: any;
  transactionById: any;
  otpVerificationType: string;
};
const useTransactionStore = create<TransactionsStore>(() => ({
  transactionDetails: {},
  transactionEstimate: {},
  cardTransactionHistory: [],
  transactionById: {},
  otpVerificationType: ''
}));

const useTransactionAction = {
  setTransactionDetails: (payload: any) => {
    useTransactionStore.setState(() => ({
      transactionDetails: payload
    }));
  },
  setTransactionEstimate: (payload: any) => {
    useTransactionStore.setState(() => ({
      transactionEstimate: payload
    }));
  },
  setCardTransactionHistory: (payload: any) => {
    useTransactionStore.setState((prev: any) => {
      return {
        cardTransactionHistory: [...prev?.cardTransactionHistory, ...payload]
      };
    });
  },
  setTransactionById: (payload: any) => {
    useTransactionStore.setState(() => ({
      transactionById: payload
    }));
  },
  setOtpVerificationType: (payload: string) => {
    useTransactionStore.setState(() => ({
      otpVerificationType: payload
    }));
  },
  resetCardTransactionHistory: () => {
    useTransactionStore.setState(() => ({
      cardTransactionHistory: []
    }));
  }
};

export { useTransactionAction, useTransactionStore };
