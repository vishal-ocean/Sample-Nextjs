"use client";
import {
  ASSETS_DROPDOWN,
  STAKING_ACTION_MODAL,
  STAKING_MODAL,
  STAKING_SUCCESS_MODAL,
  UNSTAKE_MODAL,
  UNSTAKE_SUCCESS_MODAL,
  UNSTAKE_WARNING_MODAL,
} from "@/constants";
import { useHandleModalStore } from "@/store/handleModal";
import dynamic from "next/dynamic";
import { useState } from "react";
import ChartSection from "./components/ChartSection";
import OceanMoneyCard from "./components/OceanMoneyCard";
import StakesCardAssets from "./components/StakesCardAssets";
import AssetsDropDownModal from "./components/StakingModals/AssetsDropDownModal";
import StakingActionModal from "./components/StakingModals/StakingActionModal";
import TotalRewards from "./components/TotalRewards";
const StakingModal = dynamic(
  () => import("./components/StakingModals/StakingModal")
);
const StakingSuccessModal = dynamic(
  () => import("./components/StakingModals/StakingSuccessModal")
);
const UnstakeModal = dynamic(
  () => import("./components/StakingModals/UnstakeModal")
);
const UnstakeSuccessModal = dynamic(
  () => import("./components/StakingModals/UnstakeSuccessModal")
);
const UnstakeWarningModal = dynamic(
  () => import("./components/StakingModals/UnstakeWarningModal")
);

const StakingPage = () => {
  const { modalOpen } = useHandleModalStore();
  const [assetItem, setAssetItem] = useState("All");

  return (
    <>
      <div className="grid grid-cols-12 gap-2 sm:gap-6">
        <div className="lg:col-span-8 xl:col-span-9 col-span-12 w-full h-full px-3 sm:px-10 lg:px-0 lg:ml-4 xl:ml-0">
          <ChartSection />
        </div>
        <div className="flex lg:flex-col lg:col-span-4 xl:col-span-3 col-span-12 w-full px-3 sm:px-10 lg:px-0 lg:pr-4 xl:pr-0 gap-2 overflow-x-auto remove-scrollbar gap-x-2">
          <TotalRewards />
          <OceanMoneyCard />
        </div>
      </div>
      <StakesCardAssets assetItem={assetItem} />
      {modalOpen === STAKING_MODAL && <StakingModal />}
      {modalOpen === STAKING_SUCCESS_MODAL && <StakingSuccessModal />}
      {modalOpen === UNSTAKE_MODAL && <UnstakeModal />}
      {modalOpen === UNSTAKE_WARNING_MODAL && <UnstakeWarningModal />}
      {modalOpen === UNSTAKE_SUCCESS_MODAL && <UnstakeSuccessModal />}

      {modalOpen === STAKING_ACTION_MODAL && <StakingActionModal />}
      {modalOpen === ASSETS_DROPDOWN && (
        <AssetsDropDownModal
          assetItem={assetItem}
          setAssetItem={setAssetItem}
        />
      )}
    </>
  );
};

export default StakingPage;
