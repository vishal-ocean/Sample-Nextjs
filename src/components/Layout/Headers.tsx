"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/Dropdown";
import CustomToolTip from "@/components/UI/Tooltip";
import IconTransaction from "@/components/icons/IconTransaction";
import { Tier, getNotificationStyleIcons } from "@/constants/headerStaticData";
import { IsStretchBanner } from "@/helper/isStretchBanner";
import { UilBell, UilMoon, UilSignInAlt, UilSun } from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
import { cn } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useChannel } from "ably/react";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconCloseBook } from "../icons/IconCloseBook";
import { IconSignOut } from "../icons/IconSignOut";
import { IconUser } from "../icons/IconUser";
import { HeaderButtonDropdown } from "./HeaderButtonDropdown";
import LearningCenterHeaderDropdown from "./LearningCenterHeaderDropdown";
import SideHeaderMenu from "./SideHeaderMenu";

type HeaderProps = {
  transactions?: boolean;
  notifications?: boolean;
};

const Header = ({}: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [openNotificationDropdown, setOpenNotificationDropdown] =
    useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const { setProfileTab } = useHandleModalAction;
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (openProfileDropdown || openNotificationDropdown) {
      document.body.classList.add("!m-0");
      document.body.classList.add("!overflow-y-auto");
    }
  }, [openProfileDropdown, openNotificationDropdown]);

  // const { data: notificationList, isLoading: isNotificationLoading } =
  //   useNotificationList();
  const [notificationList, setNotificationList] = useState<any>([]);
  const isNotificationLoading = false;

  const { channel } = useChannel(`${user?.sub}`, (message: any) => {
    APICall();
  });

  const APICall = async () => {
    await axios
      .get("/api/notification/crypto", { params: { auth0Id: user?.sub } })
      .then((res) => {
        setNotificationList(res.data.data);
      });
  };
  useEffect(() => {
    if (user) APICall();
  }, [user]);

  return (
    <>
      <div
        className={cn(
          "py-6 px-6 sm:px-10 lg:px-4 xl:px-0 bg-transparent",
          IsStretchBanner() ? "bg-black sm:bg-transparent" : "",
          pathname.split("/").includes("profile") ? "bg-transparent" : ""
        )}
      >
        <div className="flex justify-between items-center">
          <div onClick={() => router.replace("/")}>
            <Image
              src="/images/svg/logo.svg"
              width={203}
              height={24}
              alt="logo"
              className="cursor-pointer hidden sm:block dark:hidden"
              priority
            />
            <Image
              src="/images/svg/dark-logo.svg"
              width={203}
              height={24}
              alt="logo"
              className="cursor-pointer hidden sm:dark:block"
              priority
            />
            <Image
              src="/images/svg/icon-group.svg"
              width={10}
              height={10}
              alt="logo"
              className={cn(
                "cursor-pointer w-auto h-auto block sm:hidden dark:hidden",
                IsStretchBanner() ? "!hidden" : ""
              )}
              priority
            />
            <Image
              src="/images/svg/updates.svg"
              width={10}
              height={10}
              alt="logo"
              className={cn(
                "cursor-pointer w-auto h-auto hidden dark:block sm:dark:hidden",
                IsStretchBanner() ? "!hidden" : ""
              )}
              priority
            />
            {IsStretchBanner() && (
              <Image
                src="/images/svg/updates.svg"
                width={10}
                height={10}
                alt="logo"
                className="cursor-pointer w-auto h-auto sm:hidden"
                priority
              />
            )}
          </div>
          <div className="hidden lg:block">
            <HeaderButtonDropdown />
          </div>
          <div className="flex gap-x-1 items-center">
            <Link href="/transactions" className="hidden lg:block">
              <div className="bg-secondary dark:bg-white dark:bg-opacity-15 dark:text-white cursor-pointer py-3 px-3 sm:px-4 gap-2 text-14 font-700 leading-4 flex justify-center items-center hover:bg-blue-300 dark:hover:bg-white dark:hover:text-blue-300 rounded-3xl text-blue-300 hover:text-white">
                <IconTransaction className="w-4 h-4" strokeWidth={0.5} />
                Transactions
              </div>
            </Link>
            <LearningCenterHeaderDropdown />
            <div className="flex lg:mr-3">
              <CustomToolTip content={"Notifications"}>
                <div className="overflow-hidden relative rounded-full h-11 w-11 flex justify-center items-center">
                  <div className="absolute aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-[54px] w-[54px] rounded-full">
                    <div
                      className={cn(
                        "w-full h-full",
                        notificationList?.filter(
                          (x: any) =>
                            x?.notification?.status?.toLowerCase() === "pending"
                        )?.length > 0 && "pending "
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "bg-secondary cursor-pointer dark:bg-white/15 dark:hover:bg-white dark:hover:text-blue-300 dark:text-white !p-0 w-10 h-10 flex justify-center items-center hover:bg-blue-300 rounded-3xl text-blue-300 hover:text-white",
                      openNotificationDropdown &&
                        "!bg-blue-300 !text-white dark:!bg-white dark:!text-blue-300",
                      "relative z-20",
                      notificationList?.filter(
                        (x: any) =>
                          x?.notification?.status?.toLowerCase() === "pending"
                      )?.length > 0 && "dark:bg-gray-450 dark:bg-opacity-100",
                      IsStretchBanner()
                        ? `bg-white/15 text-white hover:bg-white/30 sm:bg-secondary sm:text-blue-300 sm:hover:bg-blue-300 ${
                            openNotificationDropdown ? "bg-white/30" : ""
                          }`
                        : ""
                    )}
                    onClick={() => setOpenNotificationDropdown(true)}
                  >
                    <UilBell className="w-4 h-4 " />
                  </div>
                </div>
              </CustomToolTip>
              <DropdownMenu
                open={openNotificationDropdown}
                onOpenChange={(e) => setOpenNotificationDropdown(e)}
              >
                <DropdownMenuTrigger />
                <DropdownMenuContent
                  className={cn(
                    "bg-white/50 dark:bg-white/10 p-2 rounded-[16px] w-[340px] backdrop-blur-xl",
                    notificationList && notificationList?.length > 5 && "pr-1"
                  )}
                >
                  <div
                    className={cn(
                      "h-full flex flex-col gap-y-2 max-h-[392px] overflow-y-auto",
                      notificationList && notificationList?.length > 5 && "pr-1"
                    )}
                  >
                    {isNotificationLoading ? (
                      <div className="flex items-center justify-center text-18 text-blue-300 w-full max-w-[340px] p-3">
                        Loading...
                      </div>
                    ) : notificationList && notificationList?.length > 0 ? (
                      notificationList?.map((item: any, index: number) => (
                        <DropdownMenuItem
                          className={cn(
                            "bg-white dark:bg-gray-450 rounded-[16px] p-[2px] overflow-hidden min-h-[68px] mr-1"
                          )}
                          key={`notificationList-${index}`}
                        >
                          <div className="absolute aspect-square w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div
                              className={cn(
                                "w-full h-full",
                                item?.notification?.status?.toLowerCase()
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 relative z-20 bg-white rounded-[16px] w-full p-3 dark:bg-gray-450">
                            <div
                              className={cn(
                                "h-10 w-10 flex justify-center items-center rounded-3xl",
                                getNotificationStyleIcons[
                                  item?.notification?.subject?.toLowerCase()
                                ]?.iconBgClass
                              )}
                            >
                              {
                                getNotificationStyleIcons[
                                  item?.notification?.subject?.toLowerCase()
                                ]?.icon
                              }
                            </div>
                            <div className="w-[200px] flex flex-col">
                              <div className="flex gap-x-2 items-center">
                                <span
                                  className={cn(
                                    "text-12 font-700 leading-4",
                                    getNotificationStyleIcons[
                                      item?.notification?.subject?.toLowerCase()
                                    ]?.textClass,
                                    "dark:text-white"
                                  )}
                                >
                                  {item?.notification?.subject || ""}
                                </span>
                                <div className="h-[3px] w-[3px] bg-blue-300 dark:bg-white" />
                                <span className="text-12 font-700 text-blue-300 dark:text-white leading-4">
                                  {item?.notification?.type || ""}
                                </span>
                              </div>
                              <div className="grid grid-cols-[auto_auto_auto] gap-x-2 items-center">
                                <span className="text-12 text-gray-300 dark:text-white font-500 leading-4 whitespace-nowrap">
                                  Transaction {item?.notification?.status}
                                </span>
                                <div className="h-[3px] w-[3px] bg-blue-300 dark:bg-white" />
                                <span className="text-12 font-700 text-blue-300 dark:text-white leading-4 whitespace-nowrap">
                                  {Number(
                                    item?.notification?.amount?.toFixed(6)
                                  )}{" "}
                                  {item?.notification?.assetShortName}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {
                                getNotificationStyleIcons[
                                  item?.notification?.status?.toLowerCase()
                                ]?.icon
                              }
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="flex items-center justify-center text-16 text-blue-300 dark:text-white w-[304px]  p-3">
                        No Notifications found.
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {user ? (
              <DropdownMenu
                open={openProfileDropdown}
                onOpenChange={setOpenProfileDropdown}
              >
                <DropdownMenuTrigger>
                  {user.picture ? (
                    Tier.map(
                      (value, index) =>
                        value.currentTier && (
                          <div
                            key={`tier-${index}`}
                            className={cn(
                              "ring-2 rounded-full relative",
                              value.borderColor
                            )}
                          >
                            <span
                              className={cn(
                                "absolute h-3.5 w-3.5 p-[3px] rounded-full text-white flex justify-center items-center -right-0.5",
                                value.tierName === "starter"
                                  ? value.bgSecondary
                                  : value.bgColor
                              )}
                            >
                              {value.tierIcon}
                            </span>

                            {user?.picture && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                width={0}
                                height={0}
                                sizes="100vh"
                                src={user?.picture}
                                alt="User Avatar"
                                className="rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer overflow-hidden"
                              />
                            )}
                          </div>
                        )
                    )
                  ) : (
                    <div className="bg-primary rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
                      <IconUser className="w-4 h-4 text-white" />
                    </div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={cn(
                    "bg-gray-250/30 dark:bg-gray-250/10 backdrop-blur-lg rounded-xl max-w-[304px] !p-4 border-none w-[240px] sm:w-[188px]"
                  )}
                  align="end"
                  sideOffset={15}
                  alignOffset={window.innerWidth > 1024 ? 0 : -20}
                >
                  {user ? (
                    <>
                      <DropdownMenuItem asChild className="cursor-pointer p-0">
                        <Link
                          href={"/profile"}
                          className="grid grid-cols-[auto_1fr] gap-3"
                        >
                          <span className="sm:h-7 sm:w-7 h-10 w-10 bg-white/30 dark:bg-white/10 flex items-center justify-center rounded-full">
                            <IconUser className="sm:h-4 sm:w-4 w-6 h-6 text-blue-300 dark:text-white" />
                          </span>
                          <p className="truncate text-blue-300 dark:text-white text-16 sm:text-14 font-500 leading-4">
                            My Account
                          </p>
                        </Link>
                      </DropdownMenuItem>
                      <hr className="border-gray-300/10 dark:border-white/10 my-2" />
                      <DropdownMenuItem asChild className="cursor-pointer p-0">
                        <span>
                          {Tier.map(
                            (value, index) =>
                              value.currentTier && (
                                <span
                                  key={`tiers-${index}`}
                                  className="grid grid-cols-[auto_1fr] items-center gap-3"
                                >
                                  <span
                                    className={cn(
                                      "sm:h-7 sm:w-7 h-10 w-10  flex items-center justify-center rounded-full text-white p-1.5",
                                      value.tierName === "starter"
                                        ? value.bgSecondary
                                        : value.bgColor
                                    )}
                                  >
                                    {value.tierIcon}
                                  </span>
                                  <p className="truncate text-blue-300 text-16 sm:text-14 font-500 leading-4 capitalize dark:text-white">
                                    {value.tierName} Tier
                                  </p>
                                </span>
                              )
                          )}
                        </span>
                      </DropdownMenuItem>
                      <hr className="border-gray-300/10 dark:border-white/10 my-2" />
                      <DropdownMenuItem asChild className="cursor-pointer p-0">
                        <Link
                          href={"/profile"}
                          className="grid grid-cols-[auto_1fr] gap-3"
                          onClick={() => setProfileTab("learning")}
                        >
                          <span className="sm:h-7 sm:w-7 h-10 w-10 bg-white/30 dark:bg-white/10 flex items-center justify-center rounded-full">
                            <IconCloseBook className="sm:h-4 sm:w-4 w-6 h-6 text-blue-300 dark:text-white" />
                          </span>
                          <p className="truncate text-blue-300 text-16 sm:text-14 leading-4 font-500 dark:text-white">
                            Learning Center
                          </p>
                        </Link>
                      </DropdownMenuItem>
                      <hr className="border-gray-300/10 dark:border-white/10 my-2" />
                      <div className="cursor-pointer p-0">
                        <div className="flex justify-between">
                          <div
                            className="dark:bg-white/10 bg-white/30 rounded-full p-1 flex"
                            onClick={() => {
                              setTheme(theme === "light" ? "dark" : "light");
                              setOpenProfileDropdown(false);
                            }}
                          >
                            <span
                              className={cn(
                                "sm:h-7 sm:w-7 h-8 w-8 flex justify-center items-center rounded-full bg-blue-300 dark:bg-transparent"
                              )}
                            >
                              <UilSun className="sm:h-4 sm:w-4 w-5 h-5 text-white" />
                            </span>
                            <span
                              className={cn(
                                "sm:h-7 sm:w-7 h-8 w-8 flex justify-center items-center rounded-full bg-transparent dark:bg-white"
                              )}
                            >
                              <UilMoon className="sm:h-4 sm:w-4 w-5 h-5 text-blue-300" />
                            </span>
                          </div>
                          <a href={"/api/auth/logout"} className="gap-3">
                            <span className="sm:h-9 sm:w-9 h-10 w-10 bg-white/30 dark:bg-white/10 flex items-center justify-center rounded-full">
                              <IconSignOut className="sm:h-4 sm:w-4 w-6 h-6 text-blue-300 dark:text-white" />
                            </span>
                            {/* <p className="truncate text-blue-300 text-16 font-500 leading-5">
                            Log out
                          </p> */}
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link
                          href={"/api/auth/login"}
                          className="grid grid-cols-[auto_1fr] gap-3"
                        >
                          <span className="h-10 w-10 bg-transparent flex items-center justify-center rounded-full">
                            <UilSignInAlt className="sm:h-4 sm:w-4 w-6 h-6 text-blue-300 dark:text-white" />
                          </span>
                          <p className="truncate text-blue-300 dark:text-white text-14 font-500 leading-4">
                            Login
                          </p>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/api/auth/login"}>
                <div className="bg-primary rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
                  <IconUser className="w-4 h-4 text-white" />
                </div>
              </Link>
            )}
            <SideHeaderMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
