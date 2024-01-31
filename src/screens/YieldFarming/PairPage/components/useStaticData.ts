export const useStaticData = () => {
  const TOKEN_TABLE_DATA = [
    {
      name: "BTC",
      shortName: "BTC",
      tokenAmount: 0.000065,
      value: 0.11,
    },
    {
      name: "USDT",
      shortName: "USDT",
      tokenAmount: 0.000065,
      value: 0.11,
    },
    {
      name: "ETH",
      shortName: "ETH",
      tokenAmount: 0.000065,
      value: 0.11,
    },
    {
      name: "XRP",
      shortName: "XRP",
      tokenAmount: 0.000065,
      value: 0.11,
    },
    {
      name: "BTC",
      shortName: "BTC",
      tokenAmount: 0.000065,
      value: 0.11,
    },
    {
      name: "USDT",
      shortName: "USDT",
      tokenAmount: 0.000065,
      value: 0.11,
    },
    {
      name: "ETH",
      shortName: "ETH",
      tokenAmount: 0.000065,
      value: 0.11,
    },
    {
      name: "XRP",
      shortName: "XRP",
      tokenAmount: 0.000065,
      value: 0.11,
    },
  ];
  const SAFETY_SCORE_DATA = [
    {
      name: "Beefy",
      status: "success",
      description: "Low-complexity strategy",
    },
    {
      name: "Beefy",
      status: "success",
      description: "Low-complexity strategy",
    },
    {
      name: "Beefy",
      status: "failed",
      description: "Low-complexity strategy",
    },
    {
      name: "Beefy",
      status: "success",
      description: "Low-complexity strategy",
    },
    {
      name: "Beefy",
      status: "failed",
      description: "Low-complexity strategy",
    },
    {
      name: "Beefy",
      status: "failed",
      description: "Low-complexity strategy",
    },
  ];
  const TRANSACTIONS_DATA = [
    {
      name: "BTC",
      currencyValue: "+ €27.21",
      operation: "Deposit",
      opeartionValue: "+ 0.97 BTC",
    },
    {
      name: "ETH",
      currencyValue: "– €27.21",
      operation: "Withdraw",
      opeartionValue: "– 0.97 ETH",
    },
    {
      name: "USDT",
      currencyValue: "+ €27.21",
      operation: "Deposit",
      opeartionValue: "+ 24.97 USDT",
    },
  ];
  const ASSETS_DETAILS_DATA = [
    {
      name: "BTC",
      shortName: "BTC",
      currency: "Bitcoin",
      description:
        "Real USD (USDR) is the world’s first stablecoin collateralized by tokenized, yield-producing real estate. USDR has a value accrual system built into its design. Using a consistent stream of dependable yield derived from rental revenue, Real USD delivers a native yield to holders.",
    },
    {
      name: "USDT",
      shortName: "USDT",
      currency: "Tether",
      description:
        "Real USD (USDR) is the world’s first stablecoin collateralized by tokenized, yield-producing real estate. USDR has a value accrual system built into its design. Using a consistent stream of dependable yield derived from rental revenue, Real USD delivers a native yield to holders.",
    },
    {
      name: "USDT",
      shortName: "USDT",
      currency: "Tether",
      description:
        "Real USD (USDR) is the world’s first stablecoin collateralized by tokenized, yield-producing real estate. USDR has a value accrual system built into its design. Using a consistent stream of dependable yield derived from rental revenue, Real USD delivers a native yield to holders.",
    },
  ];
  return {
    SAFETY_SCORE_DATA,
    TOKEN_TABLE_DATA,
    TRANSACTIONS_DATA,
    ASSETS_DETAILS_DATA,
  };
};
