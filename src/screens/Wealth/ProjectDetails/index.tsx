"use client";
import SlideModal, { SlideModalHandle } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";
import { Tabs, TabsContent, TabsList } from "@/components/UI/Tabs";
import {
  ADD_CARD_MODAL,
  DEPOSIT_MODAL,
  INVESTMENT_SUCCESS_MODAL,
  INVEST_MODAL,
  INVEST_SUMMARY_MODAL,
  TOP_UP_BALANCE_MODAL,
  TOP_UP_SUCCESS_MODAL,
} from "@/constants";
import { PROPERTY_DATA, PropertyDataType } from "@/constants/PropertyData";
import { useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HeaderSection from "./components/HeaderSection";
import ProjectUpdateNotification from "./components/Modals/ProjectUpdateNotification";
import MyInvestments from "./components/TabContents/MyInvestments";
import Overview from "./components/TabContents/Overview";

// ADDED LAZY LOADED MODAL COMPONENT
const AddCardModal = dynamic(() => import("./components/Modals/AddCardModal"));
const DepositModal = dynamic(() => import("./components/Modals/DepositModal"));
const InvestModal = dynamic(() => import("./components/Modals/InvestModal"));
const InvestSummaryModal = dynamic(
  () => import("./components/Modals/InvestSummaryModal")
);
const InvestmentSuccessModal = dynamic(
  () => import("./components/Modals/InvestmentSuccessModal")
);
const TopUpBalanceModal = dynamic(
  () => import("./components/Modals/TopUpBalanceModal")
);
const TopUpSuccessModal = dynamic(
  () => import("./components/Modals/TopUpSuccessModal")
);

const tabItems = [
  {
    tabName: "My Investments",
    tab: "myInvestments",
    bg: "bg-secondary",
    activeTabBg: "bg-blue-300 text-white hover:bg-blue-300 hover:text-white",
  },
  {
    tabName: "Overview",
    tab: "overview",
    bg: "bg-secondary",
    activeTabBg: "bg-blue-300 text-white hover:bg-blue-300 hover:text-white",
  },
  {
    tabName: "Management",
    tab: "management",
    bg: "bg-secondary",
    activeTabBg: "bg-blue-300 text-white hover:bg-blue-300 hover:text-white",
  },
  {
    tabName: "Documents",
    tab: "documents",
    bg: "bg-secondary",
    activeTabBg: "bg-blue-300 text-white hover:bg-blue-300 hover:text-white",
  },
];
const ProjectDetails = () => {
  const { property_id } = useParams();
  const { modalOpen } = useHandleModalStore();
  const [propertyData, setPropertyData] = useState<PropertyDataType[]>([]);
  const [tabs, setTabs] = useState("overview");
  const slideModalRef = useRef<SlideModalHandle>(null);

  useEffect(() => {
    setPropertyData(
      PROPERTY_DATA.filter((item) => item.property_id === property_id)
    );
  }, [property_id]);
  return (
    <>
      <HeaderSection propertyData={propertyData} />
      <Tabs
        defaultValue="overview"
        className="sm:w-auto w-full whitespace-nowrap pb-3 md:pb-0 relative "
        value={tabs}
      >
        <TabsList className="flex justify-between mt-10 sm:mt-6 lg:mt-10 h-fit overflow-x-auto items-center px-3 sm:px-10 lg:px-4 xl:px-0">
          <div className="flex gap-x-1 sm:gap-x-2 w-fit">
            {tabItems.map((item, index) => (
              <div
                key={`tabs-${index}`}
                className={cn(
                  "relative flex gap-x-2 justify-center items-center hover:bg-white text-blue-300 py-3 px-4 rounded-3xl pointer-events-none opacity-50 font-700 text-14 leading-4",
                  item?.bg,
                  item.tab === tabs && item?.activeTabBg,
                  item.tab === "overview" && "cursor-pointer opacity-100"
                )}
                onClick={() => setTabs(item.tab)}
              >
                {item?.tabName}
              </div>
            ))}
          </div>
          <Button
            variant="secondary"
            className="text-14 font-700 leading-4 h-10 py-0 px-4 hidden lg:flex"
            onClick={() => slideModalRef.current?.open()}
          >
            Updates
          </Button>
          <SlideModal ref={slideModalRef} className="max-w-[656px]">
            <div className="h-full max-h-screen" id="notification-slide-modal">
              <ProjectUpdateNotification />
            </div>
          </SlideModal>
        </TabsList>
        <TabsContent
          value="overview"
          className="mt-5 sm:mt-6 mx-3 sm:mx-10 lg:mx-4 xl:mx-0"
        >
          <Overview propertyData={propertyData[0]} />
        </TabsContent>
        <TabsContent
          value="myInvestments"
          className="mt-5 sm:mt-6 mx-3 sm:mx-10 lg:mx-4 xl:mx-0"
        >
          <MyInvestments />
        </TabsContent>
      </Tabs>
      {modalOpen === TOP_UP_BALANCE_MODAL && <TopUpBalanceModal />}
      {modalOpen === DEPOSIT_MODAL && <DepositModal />}
      {modalOpen === ADD_CARD_MODAL && <AddCardModal />}
      {modalOpen === TOP_UP_SUCCESS_MODAL && <TopUpSuccessModal />}
      {modalOpen === INVEST_MODAL && <InvestModal />}
      {modalOpen === INVEST_SUMMARY_MODAL && <InvestSummaryModal />}
      {modalOpen === INVESTMENT_SUCCESS_MODAL && <InvestmentSuccessModal />}
    </>
  );
};

export default ProjectDetails;
