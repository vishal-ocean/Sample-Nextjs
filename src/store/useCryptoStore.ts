import { create } from "zustand";

type AssetsListingData = {
  balance?: number;
  balanceFiat?: number;
  chartData?: any;
  dynamic?: number;
  id: number;
  marketPrice?: number;
  name: string;
  shortName: string;
};
type CryptoStore = {
  assetDetails: AssetsListingData;
  assets: AssetsListingData[];
  chainNetworkList: any[];
  transferDetails: any;
  assetAddress: string;
  totalAssetsData: any;
  swapPreviewData: any;
  goBack: boolean;
  cryptoStrigaWalletAddress: string | null | undefined;
};

const useCryptoStore = create<CryptoStore>(() => ({
  assetDetails: {
    balance: 0,
    balanceFiat: 0,
    chartData: [],
    dynamic: 0,
    id: 0,
    marketPrice: 0,
    name: "",
    shortName: "",
  },
  assets: [],
  chainNetworkList: [],
  transferDetails: {},
  assetAddress: "",
  totalAssetsData: {},
  swapPreviewData: {},
  goBack: false,
  cryptoStrigaWalletAddress: "",
}));

const useCryptoStoreActions = {
  setAssetDetailsData: (payload: AssetsListingData) => {
    useCryptoStore.setState(() => ({
      assetDetails: payload,
    }));
  },
  setAssetsData: (payload: AssetsListingData[]) => {
    useCryptoStore.setState(() => ({
      assets: payload,
    }));
  },
  setChainNetworkList: (payload: any[]) => {
    useCryptoStore.setState(() => ({
      chainNetworkList: payload,
    }));
  },
  setTransferDetails: (payload: any) => {
    useCryptoStore.setState(() => ({
      transferDetails: payload,
    }));
  },
  setAssetAddress: (payload: string) => {
    useCryptoStore.setState(() => ({
      assetAddress: payload,
    }));
  },
  setTotalAssetsData: (payload: any) => {
    useCryptoStore.setState(() => ({
      totalAssetsData: payload,
    }));
  },
  setSwapPreviewData: (payload: any) => {
    useCryptoStore.setState(() => ({
      swapPreviewData: payload,
    }));
  },
  setGoBack: (payload: boolean) => {
    useCryptoStore.setState(() => ({
      goBack: payload,
    }));
  },
  setCryptoStrigaWalletAddress: (payload: string) => {
    useCryptoStore.setState(() => ({
      cryptoStrigaWalletAddress: payload,
    }));
  },
};

export { useCryptoStore, useCryptoStoreActions };
