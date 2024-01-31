export const SUPPORTED_ASSET_IDS = [2, 8, 10];

export const SUPPORTED_ASSETS_DETAILS: Record<
  string,
  { chianId: number; assetId: number; assetName: string }
> = {
  USDT: {
    chianId: 1,
    assetId: 2,
    assetName: "Tether USD (ERC20)",
  },
  USDC: {
    chianId: 1,
    assetId: 10,
    assetName: "USD Coin",
  },
  BTC: {
    chianId: 4,
    assetId: 8,
    assetName: "Bitcoin",
  },
};
