import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { DELIVERY_METHOD_MODAL, SET_3DS_PASSWORD_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import {
  UilAngleLeft,
  UilBoltAlt,
  UilCheck,
  UilCreditCard,
  UilEnvelope,
  UilLocationPoint,
  UilTimes,
} from "@/icons";
import { useCreateCardsMutation } from "@/services/useStrigaCards";
import { useCardAction, useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import Image from "next/image";

const DeliveryMethodModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { cardActionDetails } = useCardStore();

  const createCard: any = useCreateCardsMutation();
  const { setCardActionDetails } = useCardAction;
  const { userWalletDetails, strigaUserFullDetails } = useUserDataStore();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? DELIVERY_METHOD_MODAL : "");
  };
  const deliveryMethodData = [
    {
      method: "Ordinary",
      value: "POST",
      time: "9-10 days",
      trackingNumber: "Tracking number",
      service: "DHL Global Mail",
      icon: UilEnvelope,
      trackingIcon: false,
      mailIcon: false,
    },
    {
      method: "Tracked",
      value: "TRACKED",
      time: "3-6 days",
      trackingNumber: "Tracking number",
      service: "DHL Global Mail",
      icon: UilLocationPoint,
      trackingIcon: true,
      mailIcon: true,
    },
    {
      method: "Express",
      value: "EXPRESS",
      time: "1-2 days",
      trackingNumber: "Tracking number",
      service: "DHL Express",
      icon: UilBoltAlt,
      trackingIcon: true,
      mailIcon: true,
    },
  ];

  const handleSubmit = () => {
    const submitData = {
      userId: strigaUserFullDetails?.userId,
      nameOnCard: `${strigaUserFullDetails?.firstName} ${strigaUserFullDetails?.lastName}`,
      threeDSecurePassword: cardActionDetails?.password,
      type: "PHYSICAL",
      address: {
        addressLine1: strigaUserFullDetails?.address?.addressLine1,
        addressLine2: strigaUserFullDetails?.address?.addressLine2 ?? "",
        postalCode: strigaUserFullDetails?.address?.postalCode,
        city: strigaUserFullDetails?.address?.city,
        countryCode: strigaUserFullDetails?.address?.country,
        dispatchMethod: cardActionDetails?.selectedDeliveryMethod,
      },
      accountIdToLink:
        userWalletDetails?.accounts?.[cardActionDetails?.selectedCurrency]
          ?.accountId,
    };
    createCard?.mutate(submitData);
  };

  return (
    <CustomModal
      open={modalOpen === DELIVERY_METHOD_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px]  sm:pr-5   py-5 pl-5 pr-0 max-h-[600px] gap-5"
    >
      <div className="flex gap-x-2 items-center">
        <span
          className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15 cursor-pointer"
          onClick={() => setHandleModal(SET_3DS_PASSWORD_MODAL)}
        >
          <UilAngleLeft className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
          <UilCreditCard className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          Physical Card{" "}
        </span>
      </div>
      <div className="flex justify-between items-end  sm:px-3 mt-3">
        <div className="">
          <span className="text-gray-300 text-16 leading-5 font-500 tracking-widest dark:text-white/30">
            3/3
          </span>
          <p className="text-24 leading-7 font-500 text-blue-300 mt-3 dark:text-white">
            Pick delivery method <br />
            and address
          </p>
        </div>
        <div className="relative sm:block hidden">
          <Image
            width={134}
            height={80}
            src={`/images/small-${
              cardActionDetails.selectedType === "Physical"
                ? "physical"
                : "virtual"
            }-card.png`}
            alt="image"
          />
          <span className="absolute top-[10px] left-[10px] text-[8px] leading-[10px] font-500 text-white">
            Physical{" "}
          </span>
          <Image
            height={20}
            width={20}
            src={AssetImages[cardActionDetails.selectedCurrency]}
            alt="token-image"
            className="top-0 right-0 absolute"
          />
          <div className="absolute flex flex-row items-center bottom-[10px] left-[10px] gap-[1px]">
            <span className="text-[8px] leading-[10px] font-500 text-white">
              ****
            </span>
            <span className="text-[8px] leading-[10px] font-500 ml-[3px] text-white">
              0000
            </span>
          </div>
          <Image
            src="/images/svg/visa.svg"
            height={20}
            width={20}
            alt="visa-image"
            className="absolute bottom-2.5 right-2.5"
          />
        </div>
      </div>

      <div className="sm:px-3 overflow-y-hidden">
        <span className="text-12 leading-4 font-500 text-gray-300 mb-3 dark:text-white/30">
          Delivery Method
        </span>

        <div className="gap-2 mt-3 flex overflow-y-hidden remove-scrollbar pr-5">
          {deliveryMethodData.map((method: any, index: any) => (
            <>
              <div
                key={index}
                className={cn(
                  "p-3 rounded-xl border-[1px] border-solid border-secondary dark:border-white/15 cursor-pointer  sm:flex-1  sm:min-w-min  min-w-[146px] relative",
                  cardActionDetails.selectedDeliveryMethod === method.value &&
                    "bg-primary"
                )}
                onClick={() =>
                  setCardActionDetails({
                    selectedDeliveryMethod: method.value,
                  })
                }
              >
                <div className="flex justify-between">
                  <method.icon
                    className={cn(
                      "w-6 h-6 dark:text-white",
                      cardActionDetails.selectedDeliveryMethod ===
                        method.value && "text-white"
                    )}
                  />
                  {cardActionDetails.selectedDeliveryMethod ===
                    method.value && <UilCheck className="text-white w-6 h-6" />}
                </div>

                <p
                  className={cn(
                    "text-16 leading-5 font-700 text-blue-300 mt-5 dark:text-white",
                    cardActionDetails.selectedDeliveryMethod === method.value &&
                      "text-white"
                  )}
                >
                  {method.method}
                </p>
                <p
                  className={cn(
                    "text-12 leading-4 font-500 text-gray-300 mt-1 dark:text-white/30",
                    cardActionDetails.selectedDeliveryMethod === method.value &&
                      "text-white/30"
                  )}
                >
                  {method.time}
                </p>
                <div className="flex gap-[6px] mt-3 mb-1 items-center">
                  {method.trackingIcon ? (
                    <UilCheck className="bg-success-200 text-white w-3 h-3 p-[1px] rounded-full" />
                  ) : (
                    <UilTimes
                      className={cn(
                        "w-3 h-3 dark:text-white",
                        cardActionDetails.selectedDeliveryMethod ===
                          method.value && "text-white"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "text-12 leading-4 font-500 text-gray-300 dark:text-white/30",
                      cardActionDetails.selectedDeliveryMethod ===
                        method.value && "text-white dark:text-white"
                    )}
                  >
                    {method.trackingNumber}
                  </span>
                </div>
                <div className="flex gap-[6px] items-center">
                  {" "}
                  {method.mailIcon ? (
                    <UilCheck className="bg-success-200 text-white w-3 h-3 p-[1px] rounded-full" />
                  ) : (
                    <UilTimes
                      className={cn(
                        "w-3 h-3 dark:text-white",
                        cardActionDetails.selectedDeliveryMethod ===
                          method.value && "text-white"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "text-12 leading-4 font-500 text-gray-300 dark:text-white/30",
                      cardActionDetails.selectedDeliveryMethod ===
                        method.value && "text-white dark:text-white"
                    )}
                  >
                    {method.service}
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="p-5 bg-gray-100  rounded-[16px] mt-3 mr-5 sm:mr-0 dark:bg-white/5">
          <p className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
            Delivery Address
          </p>
          <p className="text-16 leading-5 font-500 text-blue-300 mt-3 dark:text-white">
            {`${strigaUserFullDetails?.address?.addressLine1}, ${strigaUserFullDetails?.address?.addressLine2}, ${strigaUserFullDetails?.address?.city}, ${strigaUserFullDetails?.address?.state}, ${strigaUserFullDetails?.address?.country}`}
          </p>
        </div>
      </div>

      <Button
        className="font-700 leading-5 text-16 rounded-3xl px-6 py-4 w-max m-auto mt-3"
        type="submit"
        disabled={
          cardActionDetails.selectedDeliveryMethod === "" ||
          createCard?.isLoading
        }
        onClick={handleSubmit}
        isLoading={createCard?.isLoading}
      >
        Confirm and Order
      </Button>
    </CustomModal>
  );
};

export default DeliveryMethodModal;
