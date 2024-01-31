interface TabLabels {
  [key: string]: {
    buttonText: string;
    depositLabel?: string;
    totalLabel?: string;
    depositValue?: number;
    totalValue?: number | string;
  };
}
const useChartTabContent = () => {
  const tabColorClasses: Record<string, Record<string, string>> = {
    all: {
      bg: "bg-primary",
      text: "!text-blue-300",
    },
    crypto: {
      bg: "bg-primary",
      text: "!text-blue-300",
    },
    nft: {
      bg: "bg-purple-200",
      text: "!text-purple-200",
    },
    fiat: {
      bg: "bg-success-100",
      text: "!text-success-100",
    },
    wealth: {
      bg: "bg-orange-300",
      text: "!text-orange-300",
    },
  };

  const tabLabels: TabLabels = {
    all: {
      buttonText: "Deposit",
      depositLabel: "Investments Value",
      totalLabel: "Available Balance",
      depositValue: 0,
      totalValue: 0,
    },
    crypto: {
      buttonText: "Deposit Crypto",
    },
    nft: {
      buttonText: "Deposit NFT",
      depositLabel: "Deposited",
      totalLabel: "Total Volume",
      depositValue: 0,
      totalValue: 0.0,
    },
    fiat: {
      buttonText: "Deposit Fiat",
      depositLabel: "Direct Deposit",
      totalLabel: "Total Earnings",
      depositValue: 0,
      totalValue: 0,
    },
    wealth: {
      buttonText: "Invest",
      depositLabel: "Total Invested",
      totalLabel: "Total Earnings",
      depositValue: 0,
      totalValue: 0,
    },
  };
  return { tabColorClasses, tabLabels };
};

export default useChartTabContent;
