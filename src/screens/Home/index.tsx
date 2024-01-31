"use client";
import {
  ADD_CARD_MODAL,
  CONTACT_SUPPORT_MODAL,
  DEPOSIT_MODAL,
  DEPOSIT_SUCCESS_MODAL,
  RECEIVE_CURRENCY_MODAL,
} from "@/constants";
import { useTotalAssetsData } from "@/services/useCrypto";
import { useGetWalletsMutation } from "@/services/useStrigaWallet";
import { useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import moment from "moment";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import ContactSupportModal from "./components/ContactSupportModal";
const HomeCards = dynamic(() => import("./components/HomeCards"));
const HomeDepositModal = dynamic(() => import("./components/HomeDepositModal"));
const HomePageBanner = dynamic(() => import("./components/HomePageBanner"));
const HomePageChart = dynamic(() => import("./components/HomePageChart"));
const HomePageNews = dynamic(() => import("./components/HomePageNews"));
const AddCardDetails = dynamic(
  () => import("@/screens/FiatDeposit/AddCardDetails")
);
const DepositFiatDone = dynamic(
  () => import("@/screens/FiatDeposit/DepositFiatDone")
);
const FiatDeposit = dynamic(() => import("@/screens/FiatDeposit/FiatDeposit"));

const HomePageScreen = () => {
  const { modalOpen } = useHandleModalStore();
  const { data, isLoading } = useTotalAssetsData();
  const getAllWallets = useGetWalletsMutation();
  const { strigaUserData, userWalletDetails } = useUserDataStore();
  useEffect(() => {
    if (strigaUserData.strigaId)
      getAllWallets.mutate({
        userId: strigaUserData.strigaId,
        startDate: moment().subtract(2, "years").format("x"),
        accountId: userWalletDetails?.accounts?.EUR?.accountId,
        endDate: moment().format("x"),
        page: 1,
      });
  }, [strigaUserData]);

  return (
    <>
      {/* <div className="mb-6 relative mx-3 sm:mx-10 lg:mx-4 xl:mx-0"> */}
      {/* <HomePageTopMovers /> */}
      {/* <BannerCards /> */}
      {/* </div> */}
      <HomePageBanner />
      <HomeCards />
      <div className="grid grid-cols-12 gap-x-2 mt-6 lg:mx-4 xl:mx-0">
        <div className="col-span-12 lg:col-span-9 mx-3 sm:mx-10 lg:mx-0">
          <HomePageChart />
        </div>
        <div className="col-span-12 lg:col-span-3 xl:mt-0 mt-5 mx-3 sm:mx-10 lg:mx-0">
          <HomePageNews />
        </div>
      </div>
      {modalOpen === DEPOSIT_MODAL && <HomeDepositModal />}
      {modalOpen === RECEIVE_CURRENCY_MODAL && <FiatDeposit />}
      {modalOpen === ADD_CARD_MODAL && <AddCardDetails />}
      {modalOpen === DEPOSIT_SUCCESS_MODAL && <DepositFiatDone />}
      {modalOpen === CONTACT_SUPPORT_MODAL && <ContactSupportModal />}
    </>
  );
};

export default HomePageScreen;
