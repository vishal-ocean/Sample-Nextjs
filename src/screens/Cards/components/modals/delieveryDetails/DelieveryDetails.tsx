import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import CustomToolTip from "@/components/UI/Tooltip";
import { IconDots } from "@/components/icons/IconDots";
import { DELIVERY_DETAILS_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { expectedDeliveryDate } from "@/helper/expectedDeliveryDate";
import { UilCheck, UilCopy } from "@/icons";
import { useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { UilTruck } from "@iconscout/react-unicons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeliveryDetails = ({ selectedCard }: { selectedCard: string }) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [isDataCopy, setIsDataCopy] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const { cardDetails } = useCardStore();
  const { strigaUserFullDetails, userCardDetails } = useUserDataStore();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? DELIVERY_DETAILS_MODAL : "");
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
    <CustomModal
      open={modalOpen === DELIVERY_DETAILS_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 pr-3 sm:pr-5 max-h-[600px]"
    >
      <div className="flex gap-x-2 items-center">
        <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
          <UilTruck className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          Delivery Details
        </span>
      </div>
      <div className="flex flex-col gap-5 px-3 mt-3">
        <div className="flex items-end">
          <div>
            <p className="text-gray-300 text-16 leading-5 font-500 dark:text-white/30">
              Arrival date
            </p>
            <p className="text-blue-300 text-24 leading-7 font-500 mt-3 sm:pr-14 dark:text-white">
              Expected to arrive by{" "}
              {expectedDeliveryDate(
                cardDetails?.createdAt,
                cardDetails?.address?.dispatchMethod
              )}
            </p>
          </div>
          <div className="relative w-[134px]">
            <Image
              width={134}
              height={80}
              src="/images/small-physical-card.png"
              className="max-w-none"
              alt="image"
            />
            <span className="absolute top-[10px] left-[10px] text-[8px] leading-[10px] font-500 text-white">
              Physical
            </span>
            <Image
              width={20}
              height={20}
              src={
                AssetImages[
                  userCardDetails.find((val: any) => val.type === "PHYSICAL")
                    ?.linkedAccountCurrency
                ]
              }
              alt="image"
              className="absolute top-0 right-0"
            />
            <div className="absolute flex flex-row items-center bottom-1.5 left-2.5 gap-[1px]">
              <IconDots className="h-4 w-4 fill-white" />
              <span className="text-[8px] leading-[10px] font-500 ml-[3px] text-white">
                0000
              </span>
            </div>
            <Image
              src={"/images/svg/visa.svg"}
              height={8}
              width={21}
              alt=""
              className="absolute bottom-2.5 right-2.5"
            />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col gap-3",
            cardDetails?.status === "StandardLatvianPostMail" && "hidden"
          )}
        >
          <p className="text-gray-300 text-12 leading-4 font-500 dark:text-white/30">
            Tracking Number
          </p>

          <div className="grid grid-cols-[1fr_auto] items-center justify-between px-5 py-3 gap-4 bg-gray-100 dark:bg-white dark:bg-opacity-5 rounded-[16px] ">
            <p className="text-blue-300 dark:text-white text-16 font-500 leading-5 truncate py-1 ">
              {cardDetails?.address?.trackingNumber || "GM1234567890123456"}
            </p>

            <CustomToolTip content={"Copy to clipboard"}>
              <Button
                variant={"outline"}
                className="p-0 mx-1"
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      cardDetails?.address.trackingNumber ||
                        "GM1234567890123456"
                    )
                    .then(() => {
                      // Text was successfully copied to clipboard
                      toast.success("Copied to clipboard", {
                        toastId: "tracking-number",
                      });
                      setIsDataCopy(true);
                    })
                    .catch((error) => {
                      // Handle the error if the text couldn't be copied
                      toast.error("Error in copied to clipboard", {
                        toastId: "tracking-number",
                      });
                    });
                }}
              >
                {isDataCopy ? (
                  <div className="h-6 w-6 bg-success-200 flex justify-center items-center rounded-full">
                    <UilCheck className="text-white w-4 h-4" />
                  </div>
                ) : (
                  <UilCopy className="text-blue-300 dark:text-white w-4 h-4 cursor-pointer" />
                )}
              </Button>
            </CustomToolTip>
          </div>

          <p className="text-gray-300 text-12 leading-4 font-500 dark:text-white/30">
            Track the delivery on DHL Global Mail website
          </p>
        </div>

        <div className="p-5 flex flex-col gap-3 bg-gray-100 rounded-[16px] dark:bg-white/5">
          <p className="text-gray-300 text-12 leading-4 font-500 dark:text-white/30">
            Delivery Address
          </p>
          <p className="text-16 leading-5 font-500 text-blue-300 sm:pr-24 dark:text-white">
            {`${strigaUserFullDetails?.address?.addressLine1}, ${strigaUserFullDetails?.address?.addressLine2}, ${strigaUserFullDetails?.address?.city}, ${strigaUserFullDetails?.address?.state}, ${strigaUserFullDetails?.address?.country}`}
          </p>
        </div>

        <Button
          variant="secondary"
          className="mb-1 sm:mb-3 font-700 text-blue-300 mt-3 w-fit px-6 py-4 self-center leading-5 text-16 dark:bg-white dark:bg-opacity-15 dark:text-white"
        >
          OK
        </Button>
      </div>
    </CustomModal>
  );
};

export default DeliveryDetails;
