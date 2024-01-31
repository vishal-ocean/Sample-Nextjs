"use client";
import { UserData } from "@/backend/KYC/users";

import ReleaseInfo from "@/components/ReleaseInfo";
import CustomToolTip from "@/components/UI/Tooltip";
import { UilSignout } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import KYC from "./KYC";
import KYCError from "./KYCError";
import { KycContextProvider } from "./KycContextProvider";
import PendingReview from "./PendingReview";

const KYCPage = ({ userData }: { userData: UserData }) => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const TnCAcceptedAccount: any = localStorage?.getItem("isTermsAccepted");

  useEffect(() => {
    if (TnCAcceptedAccount === userData.email) {
      setIsTermsAccepted(true);
    }
  }, [TnCAcceptedAccount]);

  return (
    <>
      <KycContextProvider userData={userData}>
        <div
          className={cn(
            "space-y-4 max-w-lg mx-auto",
            userData.kyc === "PENDING_REVIEW" ? "max-w-xl" : "max-w-md",
            !isTermsAccepted && "max-w-3xl"
          )}
        >
          <div className="mx-auto my-8 flex justify-between sm:px-0 px-4">
            {/* <div className="w-6"></div> */}
            <Image
              src="/images/svg/logo.svg"
              width={0}
              height={0}
              alt="logo"
              sizes="100vh"
              className="cursor-pointer h-full w-full max-h-6  max-w-[203px]"
              priority
            />

            <CustomToolTip content={"Logout"}>
              <a href="/api/auth/logout" className="py-2 px-0 text-gray-300">
                <UilSignout></UilSignout>
              </a>
            </CustomToolTip>
          </div>
          {isTermsAccepted ? (
            <div className="min-h-[calc(100vh-218px)]">
              {userData.kyc === "PENDING_REVIEW" ? (
                <PendingReview />
              ) : ["REJECTED", "REJECTED_FINAL", "ON_HOLD"].includes(
                  userData.kyc
                ) ? (
                <KYCError userData={userData} />
              ) : (
                <KYC />
              )}
            </div>
          ) : (
            <ReleaseInfo setIsTermsAccepted={setIsTermsAccepted} />
          )}
        </div>
      </KycContextProvider>
    </>
  );
};

export default KYCPage;
