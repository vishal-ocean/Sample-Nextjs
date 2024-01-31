interface Asset {
  balance: number;
  balanceFiat: number;
  chartData: any;
  dynamic: number;
  id: number;
  marketPrice: number;
  name: string;
  shortName: string;
}

interface OrganizedAsset {
  balance: number;
  balanceFiat: number;
  chartData: any;
  dynamic: number;
  id: number;
  marketPrice: number;
  name: string;
  shortName: string;
  assetsOnOtherChains: Asset[];
}

export function getModifiedAssetsData(data: Asset[]): OrganizedAsset[] {
  // Sort the array in ascending order based on the 'id' property
  const sortedData = Array.isArray(data)
    ? data.slice().sort((a, b) => a.id - b.id)
    : [];

  const organizedAssets: Record<string, Asset[]> = {};

  // Organize assets based on shortName
  sortedData.forEach((asset) => {
    const shortName = asset.shortName;
    if (!organizedAssets[shortName]) {
      organizedAssets[shortName] = [];
    }
    organizedAssets[shortName].push(asset);
  });

  // Create the output array
  const output: OrganizedAsset[] = [];

  // Iterate through organized assets
  for (const shortName in organizedAssets) {
    const assetsOnOtherChains =
      organizedAssets[shortName].length > 1
        ? organizedAssets[shortName].slice()
        : [];

    // Sum balance and balanceFiat for multiple assets
    const totalBalance = assetsOnOtherChains.reduce(
      (sum, asset) => sum + asset.balance,
      0
    );
    const totalBalanceFiat = assetsOnOtherChains.reduce(
      (sum, asset) => sum + asset.balanceFiat,
      0
    );

    // Add assets to the output array with updated balance and balanceFiat
    output.push({
      ...organizedAssets[shortName][0],
      balance: totalBalance + organizedAssets[shortName][0].balance,
      balanceFiat: totalBalanceFiat + organizedAssets[shortName][0].balanceFiat,
      assetsOnOtherChains
    });
  }

  return output;
}
