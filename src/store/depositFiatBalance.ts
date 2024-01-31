import { create } from "zustand";

type depositAmount = {
  amount: number;
};
type depositAmountStore = {
  depositFiat: depositAmount[];
};
const useDepositFiatBalanceStore = create<depositAmountStore>(() => ({
  depositFiat: [],
}));

const useDepositFiatBalanceAction = {
  setDepositFiat: (payload: any) => {
    useDepositFiatBalanceStore.setState(() => ({
      depositFiat: [payload],
    }));
  },
};
export { useDepositFiatBalanceStore, useDepositFiatBalanceAction };
