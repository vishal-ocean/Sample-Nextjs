import { create } from "zustand";

type StakingStore = {
  stakeList: any;
  selectedStake: any;
  stakeDataList: any;
};

const useStakingStore = create<StakingStore>(() => ({
  stakeList: [],
  selectedStake: {},
  stakeDataList: [],
}));

const useStakingStoreAction = {
  setStakeList: (payload: any) => {
    useStakingStore.setState(() => ({
      stakeList: payload,
    }));
  },
  setSelectedStake: (payload: any) => {
    useStakingStore.setState(() => ({
      selectedStake: payload,
    }));
  },
  setStakeDataList: (payload: any) => {
    useStakingStore.setState(() => ({
      stakeDataList: payload,
    }));
  },
};

export { useStakingStore, useStakingStoreAction };
