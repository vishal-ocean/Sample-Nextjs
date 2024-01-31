import { getOrRegisterUserLocally } from "@/backend/KYC/users";
import CommonWrapper from "@/components/Layout/CommonWrapper";
import DashboardBlock from "@/components/Layout/DashboardBlock";
import IdleTimeOut from "@/components/Layout/IdleTimeOut";
import { ThemeProvider } from "@/components/ThemeProvider";

import KYCPage from "@/screens/KYC/step-form/KYCPage";
import "@/styles/globals.css";
import { getSession, touchSession } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Ocean Money - Alpha",
};

const getUserDetail = async () => {
  const sessionData = await getSession();
  await touchSession();
  let userData = null;

  if (sessionData?.user) {
    const { email, sub } = sessionData.user;
    userData = await getOrRegisterUserLocally(email, sub);
  }
  return { userData, sessionData };
};

const NotificationProviderWrapper = dynamic(
  () => import("@/components/Layout/NotificationProvider"),
  {
    ssr: false,
  }
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData } = await getUserDetail();
  const _headers = headers();
  const currentUrl = _headers.get("x-url");

  if (!userData) {
    return <h1>Please login...</h1>;
  }

  if (userData.kyc !== "APPROVED" && currentUrl !== "/") {
    redirect("/");
  }
  return (
    <html lang="en" className="">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <NotificationProviderWrapper>
              <CommonWrapper>
                {userData.kyc !== "APPROVED" ? (
                  <KYCPage userData={userData}></KYCPage>
                ) : (
                  <DashboardBlock userData={userData}>
                    {children}
                  </DashboardBlock>
                )}
              </CommonWrapper>
              <IdleTimeOut />
            </NotificationProviderWrapper>
          </UserProvider>
          <div className="fixed bottom-0 z-0 sm:-z-10 w-full hidden dark:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1536"
              height="462"
              viewBox="0 0 1536 462"
              fill="none"
              className="w-full lg:h-full  h-[280px]"
            >
              <g filter="url(#filter0_f_3620_23498)">
                <path
                  d="M1138.5 400C1353.7 400 1531.17 429.333 1593 444V662H-56V400C15 400 -14.5 519.5 318.5 519.5C651.5 519.5 869.5 400 1138.5 400Z"
                  fill="url(#paint0_linear_3620_23498)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_3620_23498"
                  x="-456"
                  y="0"
                  width="2449"
                  height="1062"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="200"
                    result="effect1_foregroundBlur_3620_23498"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_3620_23498"
                  x1="4.50012"
                  y1="715"
                  x2="1459.61"
                  y2="671.256"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2400FF" />
                  <stop offset="1" stopColor="#0702FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </ThemeProvider>
        <Script src="https://www.vault.striga.eu/web/sandbox/v1.1/client.min.js" />
      </body>
      <Analytics />
    </html>
  );
}
