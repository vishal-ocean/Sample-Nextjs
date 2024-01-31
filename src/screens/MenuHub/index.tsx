import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { FOOTER_MENU_HUB } from "@/constants";
import { UilTimes } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import Link from "next/link";
import { useMenuHub } from "./useMenuHub";
const MenuHub = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? FOOTER_MENU_HUB : "");
  };
  const {
    BASIC_NAVIGATION_MENU,
    CRYPTO_MENU_ITEMS,
    NFT_MENU_ITEMS,
    BANK_MENU_ITEMS,
    WEALTH_MENU_ITEMS,
  } = useMenuHub();
  return (
    <CustomModal
      open={modalOpen === FOOTER_MENU_HUB}
      onOpenChange={handleOpenChange}
      withoutClose
      className="sm:max-w-[596px] w-full bg-transparent p-0 md:translate-y-[-50%] border-0 h-max max-h-full sm:max-h-[calc(100vh-150px)] overflow-hidden rounded-none sm:rounded-[24px]"
    >
      <div className="sm:p-8 p-[24px_10px_84px_22px] w-full sm:flex flex-col gap-y-5 bg-gray-350/90 dark:bg-white/10 dark:backdrop-blur-[100px] sm:rounded-[24px] h-screen overflow-auto sm:h-auto">
        <div className="flex justify-center gap-x-1 overflow-x-auto lg:overflow-x-hidden sm:max-w-[596px] self-center overflow-y-hidden mb-5 sm:mb-0">
          {BASIC_NAVIGATION_MENU.map((item, index) => (
            <Link
              href={item.link}
              className="min-w-[80px] sm:min-w-[90px] flex flex-col gap-y-[13px] justify-center items-center "
              key={`basicNav-${index}`}
              onClick={() => setHandleModal(item?.openModal)}
            >
              <Button className="!p-0 h-12 w-12 bg-gray-100/60 dark:bg-gray-100/10 rounded-xl flex justify-center items-center dark:hover:bg-white/30 hover:bg-white">
                {item.icon}
              </Button>
              <span className="text-12 font-500 text-center text-blue-300 dark:text-white  leading-4">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="grid sm:grid-cols-10 grid-cols-3 gap-2  sm:pr-0 pr-6">
            {BANK_MENU_ITEMS.map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "sm:col-span-2 group col-span-1 p-0",
                  !["Dashboard", "Cards"].includes(item.name) &&
                    "opacity-40 pointer-events-none"
                )}
                key={`bankNav-${index}`}
                onClick={() => setHandleModal(item?.openModal)}
              >
                <Link
                  href={item.link}
                  className={cn(
                    " bg-gray-100/60 dark:bg-gray-100/10 hover:bg-white  rounded-xl p-3 flex flex-col gap-y-2 items-start w-full ",
                    item.hoverColor,
                    item.name === "Dashboard" &&
                      "bg-gray-700 dark:bg-gray-700/30 bg-opacity-50 hover:text-white"
                  )}
                >
                  {item.icon}
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-12 text-gray-300 dark:text-white/30  font-500 leading-4",
                        item.name === "Dashboard" && "group-hover:text-white"
                      )}
                    >
                      Banking
                    </span>
                    <span
                      className={cn(
                        "text-12 text-blue-300 dark:text-white font-500 leading-4",
                        item.name === "Dashboard" && "group-hover:text-white"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>{" "}
                </Link>
              </Button>
            ))}
          </div>
          <div className="grid sm:grid-cols-10 grid-cols-3 gap-2  sm:pr-0 pr-6">
            {CRYPTO_MENU_ITEMS.map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "sm:col-span-2 group col-span-1 p-0",
                  item.name === "Market" && "opacity-40 pointer-events-none"
                )}
                key={`cryptoNav-${index}`}
                onClick={() => setHandleModal(item?.openModal)}
              >
                <Link
                  href={item.link}
                  className={cn(
                    " bg-gray-100/60 dark:bg-gray-100/10 hover:bg-white  rounded-xl p-3 flex flex-col gap-y-2 items-start w-full",
                    item.hoverColor,
                    item.name === "Dashboard" &&
                      "bg-gray-700 dark:bg-gray-700/30 bg-opacity-50 hover:text-white"
                  )}
                >
                  {item.icon}
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-12 text-gray-300 font-500 leading-4",
                        item.name === "Dashboard" && "group-hover:text-white"
                      )}
                    >
                      Crypto
                    </span>
                    <span
                      className={cn(
                        "text-12 text-blue-300 dark:text-white font-500 leading-4 whitespace-nowrap",
                        item.name === "Dashboard" && "group-hover:text-white"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
          <div className="grid sm:grid-cols-10 grid-cols-3 gap-2  sm:pr-0 pr-6">
            {WEALTH_MENU_ITEMS.map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "sm:col-span-2 group col-span-1 p-0",
                  item.name === "P2P Market" && "opacity-40 pointer-events-none"
                )}
                key={`wealthNav-${index}`}
                onClick={() => setHandleModal(item?.openModal)}
              >
                <Link
                  href={item.link}
                  className={cn(
                    " bg-gray-100/60 dark:bg-gray-100/10  hover:bg-white  rounded-xl p-3 flex flex-col gap-y-2 items-start w-full",
                    item.hoverColor,
                    item.name === "Portfolio" &&
                      "bg-gray-700 dark:bg-gray-700/30 bg-opacity-50 hover:text-white"
                  )}
                >
                  {item.icon}
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-12 text-gray-300 font-500 leading-4",
                        item.name === "Portfolio" && "group-hover:text-white"
                      )}
                    >
                      {item.subName}
                    </span>
                    <span
                      className={cn(
                        "text-12 text-blue-300 dark:text-white font-500 leading-4",
                        item.name === "Portfolio" && "group-hover:text-white"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
          <div className="grid sm:grid-cols-10 grid-cols-3 gap-2  sm:pr-0 pr-6">
            {NFT_MENU_ITEMS.map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "sm:col-span-2 col-span-1 p-0 opacity-40 group pointer-events-none"
                )}
                key={`wealthNav-${index}`}
                onClick={() => setHandleModal(item?.openModal)}
              >
                <Link
                  href={item.link}
                  className={cn(
                    "w-full bg-gray-100/60 dark:bg-gray-100/10 hover:bg-white rounded-xl p-3 flex flex-col gap-y-2 items-start"
                    // item.name === "Dashboard" && "bg-[#C0C4D2] bg-opacity-50"
                  )}
                >
                  {item.icon}
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-12 text-gray-300 font-500 leading-4",
                        item.name === "Dashboard" && "group-hover:text-white"
                      )}
                    >
                      {item.subName}
                    </span>
                    <span
                      className={cn(
                        "text-12 text-blue-300 dark:text-white font-500 leading-4",
                        item.name === "Dashboard" && "group-hover:text-white"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Button
        className="flex justify-center items-center !p-0 bg-blue-300 dark:bg-white rounded-3xl h-10 w-10 md:hidden bottom-5 fixed left-[calc(50%-22px)]"
        onClick={() => setHandleModal("")}
      >
        <UilTimes className="w-4 h-4 text-white dark:text-blue-300" />
      </Button>
    </CustomModal>
  );
};

export default MenuHub;
