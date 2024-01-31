import { PRIMARY_MARKET } from "@/constants";
import { create } from "zustand";

type marketPlaceTabStore = {
  marketPlaceTab: string;
};
const useMarketPlaceTabStore = create<marketPlaceTabStore>(() => ({
  marketPlaceTab: PRIMARY_MARKET,
}));

const useMarketPlaceTabAction = {
  setMarketPlaceTab: (payload: string) => {
    useMarketPlaceTabStore.setState(() => ({
      marketPlaceTab: payload,
    }));
  },
};
export { useMarketPlaceTabAction, useMarketPlaceTabStore };
