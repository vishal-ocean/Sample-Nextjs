"use client";
import dynamic from "next/dynamic";
import BuySellFooter from "../BuySellFooter/BuySellFooter";
const Header = dynamic(() => import("@/components/Layout/Headers"), {
  loading: () => <HeaderSkeleton />,
});

import { UserData } from "@/backend/KYC/users";
import { useUserDataAction } from "@/store/userDataStore";
import { useEffect } from "react";
import { HeaderSkeleton } from "../Loaders/HeaderSkeleton";
import VersionDetails from "./VersionDetails";
import { FooterModals } from "./footer/FooterModals";

const DashboardBlock = ({
  userData,
  children,
}: {
  userData: UserData;
  children: React.ReactNode;
}) => {
  const { setStrigaUserData } = useUserDataAction;
  useEffect(() => {
    if (userData) {
      setStrigaUserData(userData);
    }
  }, [userData]);

  return (
    <>
      <div className="container">
        <Header />
        <div className="min-h-[calc(100vh-252px)]">{children}</div>
        <VersionDetails />
      </div>
      <BuySellFooter />
      <FooterModals />

      <div id="portal" />
      <div id="footer-container" />
    </>
  );
};

export default DashboardBlock;
