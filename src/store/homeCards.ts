import { create } from "zustand";

type HomeCards = {
  crypto: boolean;
  banking: boolean;
  nftVault: boolean;
  wealthManagement: boolean;
};

const useHomeCards = create<HomeCards>(() => ({
  crypto: false,
  banking: false,
  nftVault: false,
  wealthManagement: false,
}));

const useHomeCardAction = {
  setHomeCardData: (payload: string) => {
    useHomeCards.setState((prev: any) => ({
      [payload]: !prev?.[payload],
    }));
  },
};

export { useHomeCards, useHomeCardAction };
