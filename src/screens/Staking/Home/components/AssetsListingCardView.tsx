import { STAKING_MODAL, UNSTAKE_MODAL } from "@/constants";
import { useHandleModalAction } from "@/store/handleModal";
import { useStakingStore, useStakingStoreAction } from "@/store/stakingStore";
import AssetCard from "./AssetCard";
const AssetsListingCardView = () => {
  const { setHandleModal } = useHandleModalAction;
  const { stakeList } = useStakingStore();
  const { setSelectedStake } = useStakingStoreAction;
  const handleStake = (item: any) => {
    setHandleModal(STAKING_MODAL);
    setSelectedStake(item);
  };
  const handleUnStake = (item: any) => {
    setHandleModal(UNSTAKE_MODAL);
    setSelectedStake(item);
  };
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* <div className="flex flex-wrap gap-2"> */}
      {stakeList?.map((item: any, index: number) => {
        const { apy, name, assetName, staked, rewarded, assetId, stakeId } =
          item;
        return (
          <AssetCard
            staked={staked}
            rewarded={rewarded}
            name={name}
            apy={apy}
            shortName={assetName}
            key={index}
            assetId={assetId}
            stakeId={stakeId}
            handleStake={() => handleStake(item)}
            handleUnStake={() => handleUnStake(item)}
          />
        );
      })}
    </div>
  );
};

export default AssetsListingCardView;
