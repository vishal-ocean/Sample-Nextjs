import { create } from 'zustand';

type NeoBankingStore = {
  accountCurrency: string;
  transactions: any;
};
const useNeoBankingStore = create<NeoBankingStore>(() => ({
  accountCurrency: '',
  transactions: []
}));

const useNeoBankingAction = {
  setAccountCurrency: (payload: string) => {
    useNeoBankingStore.setState(() => ({
      accountCurrency: payload
    }));
  },
  setTransactions: (payload: any) => {
    useNeoBankingStore.setState(() => ({
      transactions: payload
    }));
  }
};

export { useNeoBankingAction, useNeoBankingStore };
