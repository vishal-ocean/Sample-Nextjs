import CustomModal from "@/components/CustomModal";
import { Switch } from "@/components/UI/Switch";
import { IconCardLimit } from "@/components/icons/IconCardLimit";
import { IconContactless } from "@/components/icons/IconContactless";
import {
  CARD_SETTINGS_MODAL,
  CARD_TRANSACTION_LIMIT,
  CHANGE_CURRENCY_MODAL,
  SET_NEW_CARD_3DS_PASSWORD,
} from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import {
  UilAngleRightB,
  UilGlobe,
  UilLockAlt,
  UilSetting,
  UilTachometerFastAlt,
  UilTimes,
} from "@/icons";
import {
  useGetCardsMutation,
  useUpdateCardSettingMutation,
} from "@/services/useStrigaCards";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CardSettingsModal = ({ currentCard }: { currentCard: string }) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { userCardDetails, strigaUserData } = useUserDataStore();
  const getAllCards = useGetCardsMutation();
  const [ref, setRef] = useState(false);

  const onUpdateSettingSuccess = () => {
    getAllCards.mutate({
      userId: strigaUserData.strigaId,
      offset: 0,
      limit: 100,
    });
  };
  const updateCardSetting = useUpdateCardSettingMutation(
    onUpdateSettingSuccess
  );
  const currentCardDetail = userCardDetails.find(
    (val: any) => val.type === currentCard
  );
  const [cardSetting, setCardSetting] = useState({
    contactlessEnabled: false,
    withdrawalEnabled: false,
    internetPurchaseEnabled: false,
  });

  useEffect(() => {
    setCardSetting({
      contactlessEnabled: currentCardDetail?.security?.contactlessEnabled,
      withdrawalEnabled: currentCardDetail?.security?.withdrawalEnabled,
      internetPurchaseEnabled:
        currentCardDetail?.security?.internetPurchaseEnabled,
    });
  }, [userCardDetails]);

  useEffect(() => {
    if (ref) {
      updateCardSetting.mutate({
        cardId: currentCardDetail?.id,
        security: cardSetting,
      });
    }
  }, [cardSetting]);

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CARD_SETTINGS_MODAL : "");
  };

  return (
    <CustomModal
      open={modalOpen === CARD_SETTINGS_MODAL}
      onOpenChange={handleOpenChange}
      withoutClose
      className="w-full p-5 max-w-[520px] sm:min-w-[520px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <span
            className={cn(
              "rounded-3xl h-10 w-10 flex justify-center items-center bg-secondary dark:bg-white/15"
            )}
          >
            <UilSetting className="h-4 w-4 text-blue-300 dark:text-white" />
          </span>
          <div>
            <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              Settings
            </p>
            <p className="text-12 text-gray-300 dark:text-white/30 font-500 leading-4 ">
              {currentCard === "PHYSICAL" ? "Physical" : "Virtual"}{" "}
              {currentCardDetail?.maskedCardNumber.substr(-7)}
            </p>
          </div>
        </div>
        <div
          className="flex bg-secondary cursor-pointer dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 h-10 w-10 items-center"
          onClick={() => setHandleModal("")}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="sm:p-3 mt-3 sm:mt-0">
        <p className="text-24 text-blue-300 font-500 leading-7 dark:text-white">
          Settings
        </p>
        <div className="grid sm:grid-cols-3 sm:gap-2 mt-8 sm:mt-5">
          <div
            className="sm:p-4 sm:border border-secondary dark:border-white/15 rounded-[16px] grid grid-cols-[auto_1fr_auto] sm:grid-cols-2 gap-3 sm:gap-0 items-center cursor-pointer"
            onClick={() => {
              setHandleModal(CHANGE_CURRENCY_MODAL);
            }}
          >
            <Image
              width={24}
              height={24}
              src={AssetImages[currentCardDetail?.linkedAccountCurrency]}
              alt="image"
              className="order-1 h-7 w-7 sm:w-6 sm:h-6"
            />
            <UilAngleRightB className="h-6 w-6 text-blue-300 dark:text-white justify-self-end order-3 sm:order-2" />
            <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white sm:mt-6 order-2 sm:order-3">
              Card Currency
            </p>
          </div>
          <hr className="my-4 border-gray-300/10 dark:border-white/15 sm:hidden" />
          <div
            className="sm:p-4 sm:border border-secondary dark:border-white/15 rounded-[16px] grid grid-cols-[auto_1fr_auto] sm:grid-cols-2 gap-3 sm:gap-0 items-center cursor-pointer"
            onClick={() => setHandleModal(SET_NEW_CARD_3DS_PASSWORD)}
          >
            <span className="flex items-center justify-center h-7 w-7 bg-secondary dark:bg-opacity-15 sm:bg-transparent rounded-full">
              <UilLockAlt className="h-4 w-4 sm:w-6 sm:h-6 text-blue-300 dark:text-white" />
            </span>
            <UilAngleRightB className="h-6 w-6 text-blue-300 dark:text-white justify-self-end order-3 sm:order-2" />
            <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white sm:mt-6 order-2 sm:order-3">
              3DS Password
            </p>
          </div>
          <hr className="my-4 border-gray-300/10 dark:border-white/15 sm:hidden" />
          <div
            className="sm:p-4 sm:border border-secondary dark:border-white/15 rounded-[16px] grid grid-cols-[auto_1fr_auto] sm:grid-cols-2 gap-3 sm:gap-0 items-center cursor-pointer"
            onClick={() => setHandleModal(CARD_TRANSACTION_LIMIT)}
          >
            <span className="flex items-center justify-center h-7 w-7 bg-secondary dark:bg-opacity-15 sm:bg-transparent rounded-full">
              <UilTachometerFastAlt className="h-4 w-4 sm:w-6 sm:h-6 text-blue-300 dark:text-white" />
            </span>
            <UilAngleRightB className="h-6 w-6 text-blue-300 dark:text-white justify-self-end order-3 sm:order-2" />
            <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white sm:mt-6 order-2 sm:order-3">
              Transaction Limits
            </p>
          </div>
        </div>
        <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 mt-8">
          Payment Methods
        </p>
        <div className="grid sm:grid-cols-3 sm:gap-2 mt-5 sm:mt-3">
          <div className="sm:p-4 sm:bg-gray-100 dark:sm:bg-white/5 rounded-[16px] grid grid-cols-[auto_1fr_auto] sm:grid-cols-2 gap-3 sm:gap-0 items-center">
            <span className="flex items-center justify-center h-7 w-7 bg-secondary dark:bg-opacity-15 sm:bg-transparent rounded-full order-1">
              <UilGlobe className="h-4 w-4 sm:w-6 sm:h-6 text-blue-300 dark:text-white order-1" />
            </span>
            <Switch
              className="data-[state=checked]:!bg-primary w-6 h-4 p-0 order-3 sm:order-2 justify-self-end"
              thumbClassName="h-3 w-3 data-[state=checked]:translate-x-2.5 data-[state=unchecked]:translate-x-0.5 my-0.5 dark:bg-white"
              // defaultChecked={cardSetting.internetPurchaseEnabled}
              checked={cardSetting.internetPurchaseEnabled}
              onCheckedChange={(e) => {
                setCardSetting({ ...cardSetting, internetPurchaseEnabled: e });
                setRef(true);
              }}
            />
            <div className="order-2 sm:order-3">
              <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white sm:mt-6">
                Online Purchases
              </p>
              <p
                className={cn(
                  "mt-1 text-12 font-500 leading-4 hidden sm:block",
                  cardSetting.internetPurchaseEnabled
                    ? "text-primary"
                    : "text-gray-300 dark:text-white/30"
                )}
              >
                {cardSetting.internetPurchaseEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
          <hr className="my-4 border-gray-300/10 dark:border-white/15 sm:hidden" />
          <div className="sm:p-4 sm:bg-gray-100 dark:sm:bg-white/5 rounded-[16px] grid grid-cols-[auto_1fr_auto] sm:grid-cols-2 gap-3 sm:gap-0 items-center">
            <span className="flex items-center justify-center h-7 w-7 bg-secondary dark:bg-opacity-15 sm:bg-transparent rounded-full order-1">
              <IconCardLimit className="h-4 w-4 sm:w-6 sm:h-6 text-blue-300 dark:text-white order-1" />
            </span>
            <Switch
              className="data-[state=checked]:!bg-primary w-6 h-4 p-0 order-3 sm:order-2 justify-self-end"
              thumbClassName="h-3 w-3 data-[state=checked]:translate-x-2.5 data-[state=unchecked]:translate-x-0.5 my-0.5 dark:bg-white"
              // defaultChecked={cardSetting?.withdrawalEnabled}
              checked={cardSetting?.withdrawalEnabled}
              onCheckedChange={(e) => {
                setCardSetting({ ...cardSetting, withdrawalEnabled: e });
                setRef(true);
              }}
            />
            <div className="order-2 sm:order-3">
              <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white sm:mt-6">
                ATM Withdrawals
              </p>
              <p
                className={cn(
                  "mt-1 text-12 font-500 leading-4 hidden sm:block",
                  cardSetting?.withdrawalEnabled
                    ? "text-primary"
                    : "text-gray-300 dark:text-white/30"
                )}
              >
                {cardSetting?.withdrawalEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
          <hr className="my-4 border-gray-300/10 dark:border-white/15 sm:hidden" />
          <div className="sm:p-4 sm:bg-gray-100 dark:sm:bg-white/5 rounded-[16px] grid grid-cols-[auto_1fr_auto] sm:grid-cols-2 gap-3 sm:gap-0 items-center">
            <span className="flex items-center justify-center h-7 w-7 bg-secondary dark:bg-opacity-15 sm:bg-transparent rounded-full order-1">
              <IconContactless className="h-4 w-4 sm:w-6 sm:h-6 text-blue-300 dark:text-white order-1" />
            </span>
            <Switch
              className="data-[state=checked]:!bg-primary w-6 h-4 p-0 order-3 sm:order-2 justify-self-end"
              thumbClassName="h-3 w-3 data-[state=checked]:translate-x-2.5 data-[state=unchecked]:translate-x-0.5 my-0.5 dark:bg-white"
              // defaultChecked={cardSetting?.contactlessEnabled}
              checked={cardSetting?.contactlessEnabled}
              onCheckedChange={(e) => {
                setCardSetting({ ...cardSetting, contactlessEnabled: e });
                setRef(true);
              }}
            />
            <div className="order-2 sm:order-3">
              <p className="sm:text-16 text-14 font-500 sm:font-700 leading-5 text-blue-300 dark:text-white sm:mt-6">
                Contactless Purchases
              </p>
              <p
                className={cn(
                  "mt-1 text-12 font-500 leading-4 hidden sm:block",
                  cardSetting?.contactlessEnabled
                    ? "text-primary"
                    : "text-gray-300 dark:text-white/30"
                )}
              >
                {cardSetting?.contactlessEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
