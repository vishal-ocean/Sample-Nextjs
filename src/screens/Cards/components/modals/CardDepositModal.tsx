import CustomModal from "@/components/CustomModal";
import Alert from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import CustomToolTip from "@/components/UI/Tooltip";
import IconTimeCoinDeposit from "@/components/icons/IconTimeCoinDeposit";
import { CARD_DEPOSIT_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { UilAngleUp, UilCheck, UilCopy, UilQuestion } from "@/icons";
import { useChainAssetsList } from "@/services/useCrypto";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore } from "@/store/useCryptoStore";
import { cn } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
type AssetsData = {
  id: number;
  name: string;
  shortName: string;
};
const CardDepositModal = ({
  assetAddress,
  isLoading,
}: {
  assetAddress: string;
  isLoading: boolean;
}) => {
  const [openTokenDropdown, setOpenTokenDropdown] = useState(false);
  const [openNetworkDropdown, setOpenNetworkDropdown] = useState(false);
  const { modalOpen } = useHandleModalStore();
  const [isDataCopy, setIsDataCopy] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const { chainNetworkList } = useCryptoStore();
  const { data } = useChainAssetsList();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CARD_DEPOSIT_MODAL : "");
  };

  useEffect(() => {
    // Set a timeout to change the state after 3 seconds
    const timeout = setTimeout(() => {
      setIsDataCopy(false);
      setIsCopy(false);
    }, 3000);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, [isDataCopy, isCopy]);

  return (
    <>
      <CustomModal
        open={modalOpen == CARD_DEPOSIT_MODAL}
        onOpenChange={handleOpenChange}
        className="max-w-[520px] md:translate-y-[-58%]"
      >
        <div className="flex gap-x-2 items-center">
          <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
            <IconTimeCoinDeposit
              className="h-4 w-4 text-white"
              strokeWidth={1.2}
            />
          </span>
          <span className="text-12 text-blue-300 dark:text-white font-500 leading-4">
            Deposit Crypto
          </span>
        </div>

        <div
          className={cn(
            "sm:px-7 flex flex-col mt-6"
            // tokenValue && networkValue && "max-h-[425px] overflow-y-auto pr-1"
          )}
        >
          <div>
            <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30 flex gap-x-1 items-center">
              Network
              <span className="flex justify-center items-center bg-secondary dark:bg-white/30 h-4 w-4 rounded-full">
                <UilQuestion className="h-4 w-4 fill-white dark:fill-blue-300" />
              </span>
            </p>
            <div className="flex flex-col">
              <Button
                className="p-[14px] w-full sm:max-w-[396px] max-w-[90%] mt-3 rounded-[16px] bg-gray-100 dark:bg-white dark:bg-opacity-5 flex justify-between items-center"
                onClick={() => {
                  setOpenNetworkDropdown(!openNetworkDropdown);
                  setOpenTokenDropdown(false);
                }}
              >
                <div className="flex gap-x-2 items-center">
                  {chainNetworkList.length > 0 ? (
                    chainNetworkList.find((x) => x.name === "Ethereum")
                      ?.shortName && (
                      <Image
                        width={24}
                        height={24}
                        src={
                          AssetImages[
                            chainNetworkList.find((x) => x.name === "Ethereum")
                              ?.shortName
                          ]
                        }
                        alt="image"
                      />
                    )
                  ) : (
                    <div className="w-6 h-6 rounded-3xl bg-secondary dark:bg-opacity-10" />
                  )}
                  <span
                    className={cn(
                      "font-700 leading-5 text-16 text-blue-300 dark:text-white",

                      chainNetworkList.length < 0 &&
                        "text-gray-300 dark:text-white/30"
                    )}
                  >
                    {chainNetworkList.length > 0
                      ? chainNetworkList.find((x) => x.name === "Ethereum")
                          ?.shortName
                      : "Select"}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-white dark:bg-opacity-5 flex justify-center items-center text-gray-300 dark:text-white/30 rotate-180"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>

            </div>
          </div>
          <div className="mt-5">
            <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
              Asset
            </p>
            <div className="flex flex-col">
              <Button
                className="p-[14px] w-full sm:max-w-[396px] max-w-[90%] mt-3 rounded-[16px] bg-gray-100 dark:bg-white dark:bg-opacity-5 flex justify-between items-center"
                onClick={() => {
                  setOpenTokenDropdown(!openTokenDropdown);
                  setOpenNetworkDropdown(false);
                }}
              >
                <div className="flex gap-x-2 items-center">
                  {chainNetworkList.length > 0 ? (
                    chainNetworkList
                      .flatMap((y: any) => y.assets)
                      .find((x) => x.shortName === "USDT")?.shortName && (
                      <Image
                        width={24}
                        height={24}
                        src={
                          AssetImages[
                            chainNetworkList
                              .flatMap((y: any) => y.assets)
                              .find((x) => x.shortName === "USDT")?.shortName
                          ] || ""
                        }
                        alt="image"
                      />
                    )
                  ) : (
                    <div className="w-6 h-6 rounded-3xl bg-secondary dark:bg-opacity-10" />
                  )}
                  <span
                    className={cn(
                      "font-700 leading-5 text-16 text-blue-300 dark:text-white",
                      chainNetworkList.length < 0 &&
                        "text-gray-300 dark:text-white/30"
                    )}
                  >
                    {chainNetworkList.length > 0
                      ? chainNetworkList
                          .flatMap((y: any) => y.assets)
                          .find((x) => x.shortName === "USDT")?.name
                      : "Select"}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-white dark:bg-opacity-5 flex justify-center items-center text-gray-300 dark:text-white/30 rotate-180"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>

            </div>
          </div>
          {isLoading ? (
            <div className="mt-5 animate-pulse flex flex-col gap-y-4 justify-center items-center text-18 text-blue-300 font-500 dark:text-white">
              <div className="h-[52px] w-full !rounded-[16px]" />
              <div className="h-[200px] w-full !rounded-[16px]" />
              <div className="h-10 w-full " />
            </div>
          ) : (
            assetAddress && (
              <div className="mt-5">
                <Alert
                  type="warning"
                  title={`Send only ${
                    chainNetworkList
                      .flatMap((y: any) => y.assets)
                      .find((x) => x.shortName === "USDT")?.shortName
                  } to this address`}
                  subTitle="Sending any other token may result in the permanent loss of your deposit"
                />
                <div className="bg-gray-100 dark:bg-white dark:bg-opacity-5 rounded-[16px] p-5 md:p-3 flex md:flex-row flex-col gap-y-3 gap-x-7 mt-3 items-center">
                  <div className="h-auto mx-auto my-0 max-w-[180px] w-full bg-white p-4 rounded-xl">
                    <QRCode
                      size={180}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={assetAddress}
                      viewBox={`0 0 180 180`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] items-center justify-between px-4 py-3 gap-4 bg-gray-100 dark:bg-white dark:bg-opacity-5 rounded-[16px] mt-2">
                  <p className="text-blue-300 dark:text-white text-16 font-500 leading-5 truncate py-1">
                    {assetAddress}
                  </p>

                  <CustomToolTip content={"Copied to clipboard"}>
                    <Button
                      variant={"outline"}
                      className="p-0"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(assetAddress)
                          .then(() => {
                            // Text was successfully copied to clipboard
                            toast.success("Copied to clipboard", {
                              toastId: assetAddress,
                            });
                            setIsDataCopy(true);
                          })
                          .catch((error) => {
                            // Handle the error if the text couldn't be copied
                            toast.error("Error in copied to clipboard", {
                              toastId: assetAddress,
                            });
                          });
                      }}
                    >
                      {isDataCopy ? (
                        <div className="h-6 w-6 bg-success-200 flex justify-center items-center rounded-full">
                          <UilCheck className="text-white w-4 h-4" />
                        </div>
                      ) : (
                        <UilCopy className="text-blue-300 dark:text-white w-6 h-6 cursor-pointer" />
                      )}
                    </Button>
                  </CustomToolTip>
                </div>
              </div>
            )
          )}
          <div className="flex mt-2 sm:mt-10 mb-1 justify-center ">
            <Button
              className={`leading-5 py-3.5 px-6 text-16  font-700 bg-primary dark:bg-primary dark:text-white text-white  ${
                isCopy ? "text-white !bg-success-200" : ""
              }`}
              disabled={!assetAddress}

              onClick={() => {
                navigator.clipboard
                  .writeText(assetAddress)
                  .then(() => {
                    // Text was successfully copied to clipboard
                    toast.success("Copied to clipboard", {
                      toastId: assetAddress,
                    });
                    setIsCopy(true);
                  })
                  .catch((error) => {
                    // Handle the error if the text couldn't be copied
                    toast.error("Error in copied to clipboard", {
                      toastId: assetAddress,
                    });
                  });
              }}
            >
              {!isCopy ? (
                "Copy Deposit Address"
              ) : (
                <span className="flex gap-2 items-center">
                  <UilCheck className=" w-6 h-6" /> Copied to clipboard
                </span>
              )}
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default CardDepositModal;
