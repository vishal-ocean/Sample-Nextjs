"use client";
import { ID_TOKEN_COOKIE } from "@/constants";
import { useUser } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BannerSkeleton } from "../Loaders/BannerSkeleton";
import CardSkeleton from "../Loaders/CardSkeleton";
import ChartTabContentSkeleton from "../Loaders/ChartTabContentSkeleton";
import DashboardFooterSkeleton from "../Loaders/DashboardFooterSkeleton";
import { HeaderSkeleton } from "../Loaders/HeaderSkeleton";
import CustomToastContainer from "../UI/CustomToast/CustomToastContainer";
const CommonWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const { user } = useUser();
  const [isTokenAvailable, setIsTokenAvailable] = useState(false);
  const getLoadingComponent = (pathname: string) =>
    dynamic(() => import(`../../app${pathname}/loading`), {
      ssr: false,
    });
  useEffect(() => {
    if (user) {
      const getToken = async () => {
        const token = await axios.get("/api/auth-token");
        // if (
        //   getCookie(IS_MFA) &&
        //   getCookie(ID_TOKEN_COOKIE) !== token.data.idToken
        // ) {
        //   setHandleModal(TRANSFER_SWAP_SUCCESS_MODAL);
        //   setCookie(MFA_TOKEN_COOKIE, token.data.idToken);
        //   setIsTokenAvailable(true);
        // } else {
        setCookie(ID_TOKEN_COOKIE, token.data.idToken);
        setIsTokenAvailable(true);
        // }
      };
      getToken();
    }
  }, [user]);

  const DynamicLoadingComp = getLoadingComponent(pathname);
  if (!user || !getCookie(ID_TOKEN_COOKIE) || !isTokenAvailable) {
    return (
      <div className="container">
        <HeaderSkeleton />
        {pathname !== "/" ? (
          <DynamicLoadingComp />
        ) : (
          <>
            <BannerSkeleton />
            <div className="flex gap-2 mx-auto mt-3 overflow-x-auto overflow-y-hidden px-3 sm:pl-10 lg:px-4 xl:px-0 remove-scrollbar">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
            <ChartTabContentSkeleton />
          </>
        )}
        <DashboardFooterSkeleton />
      </div>
    );
  }
  return (
    <>
      <CustomToastContainer />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default CommonWrapper;
