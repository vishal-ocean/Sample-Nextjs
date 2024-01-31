"use client";
import CustomToolTip from "@/components/UI/Tooltip";
import IconBank from "@/components/icons/IconBank";
import IconCoinStacked from "@/components/icons/IconCoinStacked";
import IconEthereum from "@/components/icons/IconEthereum";
import IconGold from "@/components/icons/IconGold";
import { FOOTER_MENU_HUB } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFooter } from "../useFooter";

const SwapConfirmationModal = dynamic(
  () => import("@/screens/SwapModals/SwapConfirmationModal")
);
const SwapSuccessModal = dynamic(
  () => import("@/screens/SwapModals/SwapSuccessModal")
);

type Direction = "up" | "down";

export const Footer = () => {
  const [scrollDirection, setScrollDirection] = useState<Direction>("up");
  const { modalOpen, isFooterModal } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const {
    MODAL_WITH_NO_FOOTER_IN_RESPONSIVE,
    SWAP_MODALS,
    MODALS_WITH_NO_FOOTER_ANIMATION,
    TRANSFER_MODALS,
    MODALS_WITH_NO_FOOTER,
  } = useFooter();
  useEffect(() => {
    let lastScrollY = document.documentElement.scrollTop;

    const updateScrollDirection = () => {
      const scrollY = document.documentElement.scrollTop;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return (
    <>
      {!isFooterModal && (
        // <FooterContainer>
        <div
          className={cn(
            "fixed sm:pb-6 pb-0 pt-1 left-0 right-0 transition-all duration-200 sm:max-w-[368px] mx-auto flex justify-center items-center gap-x-2 bottom-0 z-[60]",
            modalOpen.length > 0 && "pr-[5px]",
            MODAL_WITH_NO_FOOTER_IN_RESPONSIVE.includes(modalOpen) &&
              "md:flex hidden",
            MODALS_WITH_NO_FOOTER.includes(modalOpen) && "!hidden"
          )}
        >
          <div
            className={cn(
              "flex justify-center items-center gap-x-2 bg-gray-250/50 dark:bg-gray-250/10 rounded-3xl p-2 backdrop-blur-[10px] h-[68px] mb-5 sm:mb-0",
              modalOpen.length > 0 && "shadow-lg"
            )}
          >
            <CustomToolTip content={"Menu"}>
              <div
                className={cn(
                  "bg-white rounded-3xl sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0",
                  modalOpen === FOOTER_MENU_HUB && "bg-blue-300"
                )}
                onClick={() => setHandleModal(FOOTER_MENU_HUB)}
              >
                <IconCoinStacked
                  className={cn(
                    "w-6 h-6 text-blue-300",
                    modalOpen === FOOTER_MENU_HUB && "text-white"
                  )}
                  strokeWidth={1.5}
                />
              </div>
            </CustomToolTip>
            <CustomToolTip content={"Banking"}>
              <div className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0">
                <IconBank strokeWidth={1.5} className="h-6 w-6 text-white" />
              </div>
            </CustomToolTip>
            <CustomToolTip content={"Crypto"}>
              <Link
                href={"/crypto"}
                className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0"
              >
                <IconEthereum
                  className="h-6 w-6 text-white"
                  strokeWidth={1.5}
                />
              </Link>
            </CustomToolTip>
            <CustomToolTip content={"Wealth"}>
              <Link
                href={"/wealth"}
                className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0"
              >
                <IconGold strokeWidth={1.2} className="h-6 w-6 text-white" />
              </Link>
            </CustomToolTip>
          </div>
        </div>
      )}
    </>
  );
};
