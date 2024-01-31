export const useAssetList = () => {
  const tabAssetsListConstants: Record<string, Record<string, string>> = {
    all: {
      titleText: 'My Assets',
      bg: 'bg-primary',
      textWhite: '!text-white',
      noAssetsText: 'You haven’t purchased any assets yet',
      marketButtonText: 'Crypto Dashboard',
      link: '/crypto'
    },
    crypto: {
      titleText: 'Crypto Assets',
      bg: 'bg-primary',
      textWhite: '!text-white',
      noAssetsText: 'No Crypto assets yet',
      marketButtonText: 'Crypto Dashboard',
      link: '/crypto'
    },
    nft: {
      titleText: 'NFT Assets',
      bg: 'bg-purple-200',
      textWhite: '!text-white',
      noAssetsText: 'No NFT assets yet',
      marketButtonText: 'NFTs',
      addButtonText: 'Add Wealth',
      link: ''
    },
    fiat: {
      titleText: 'Fiat Assets',
      bg: 'bg-success-100',
      textWhite: '!text-white',
      noAssetsText: 'No Fiat assets yet',
      marketButtonText: 'Fiat Market',
      link: ''
    },
    wealth: {
      titleText: 'Wealth Assets',
      bg: 'bg-orange-300',
      textWhite: '!text-white',
      noAssetsText: 'No Wealth assets yet',
      marketButtonText: 'Wealth Dashboard',
      addButtonText: 'Add Wealth',
      link: '/wealth'
    }
  };
  return { tabAssetsListConstants };
};
