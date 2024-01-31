"use client";
import { CHAT_CONVERSATIONS_LIST_MODAL, CHAT_MODAL } from "@/constants";
import ChatConversationListModal from "@/screens/Wealth/Chat/ChatConversationListModal";
import ChatModal from "@/screens/Wealth/Chat/ChatModal";
import { useHandleModalStore } from "@/store/handleModal";
import CardsSection from "./components/CardsSection";
import ChartSection from "./components/ChartSection";
import MyInvestmentSection from "./components/MyInvestmentSection";

const WealthHomePage = () => {
  const { modalOpen } = useHandleModalStore();

  return (
    <>
      <div className="grid grid-cols-12 gap-2 sm:gap-6">
        <div className="lg:col-span-8 xl:col-span-9 col-span-12 w-full h-full lg:order-1 order-2 px-3 sm:px-10 lg:px-0 lg:ml-4 xl:ml-0">
          <ChartSection />
        </div>
        <CardsSection />
      </div>
      <MyInvestmentSection />
      {modalOpen === CHAT_CONVERSATIONS_LIST_MODAL && (
        <ChatConversationListModal />
      )}
      {modalOpen === CHAT_MODAL && <ChatModal />}
    </>
  );
};

export default WealthHomePage;
