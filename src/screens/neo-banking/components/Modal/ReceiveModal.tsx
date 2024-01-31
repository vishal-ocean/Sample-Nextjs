import CustomModal from "@/components/CustomModal";
import Alert from "@/components/UI/Alert";
import IconTopUp from "@/components/icons/IconTopUp";
import { RECEIVE_CURRENCY_MODAL } from "@/constants";
import { useGetAccountDetailsMutation } from "@/services/useStrigaWallet";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import {
  useNeoBankingAction,
  useNeoBankingStore,
} from "@/store/useNeoBankingStore";
import { useUserDataStore } from "@/store/userDataStore";
import { useEffect, useState } from "react";
import { ReceiveModalAccountDetail } from "../ReceiveModalAccountDetail";
import ReceiveModalCurrencyDropdown from "../ReceiveModalCurrencyDropdown";

const ReceiveCurrencyModal = () => {
  const { modalOpen } = useHandleModalStore();
  const [currencyValue, setCurrencyValue] = useState("");
  const [openCurrencyDropdown, setOpenCurrencyDropdown] = useState(false);
  const { setHandleModal } = useHandleModalAction;
  const { userWalletDetails } = useUserDataStore();
  const getAccountDetailsMutation = useGetAccountDetailsMutation();
  const { setAccountCurrency } = useNeoBankingAction;
  const { accountCurrency } = useNeoBankingStore();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? RECEIVE_CURRENCY_MODAL : "");
  };
  useEffect(() => {
    if (accountCurrency !== "") {
      setCurrencyValue(accountCurrency);
      getAccountDetailsMutation.mutate({
        userId: userWalletDetails?.accounts?.EUR?.ownerId,
        accountId: userWalletDetails?.accounts?.EUR?.accountId,
      });
      setTimeout(() => {
        setAccountCurrency("");
      }, 1000);
    }
  }, [accountCurrency]);

  const handleCurrencySelection = (currency: string) => {
    setCurrencyValue(currency);
    getAccountDetailsMutation.mutate({
      userId: userWalletDetails?.accounts?.EUR?.ownerId,
      accountId: userWalletDetails?.accounts?.EUR?.accountId,
    });
    setOpenCurrencyDropdown(false);
  };

  return (
    <CustomModal
      open={modalOpen === RECEIVE_CURRENCY_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 bottom-0 md:bottom-auto translate-y-0 sm:!-translate-y-[55%]"
    >
      <div className="flex gap-x-2 items-center mb-1">
        <span className="h-10 w-10 bg-primary text-white flex justify-center items-center rounded-full">
          <IconTopUp strokeWidth={2} className="h-4 w-4" />
        </span>
        <span>
          <p className="text-blue-300 text-12 font-500 leading-4 dark:text-white">
            Receive
          </p>
        </span>
      </div>
      <div>
        <Alert
          isLearnMore={false}
          type="warning"
          title="Only send funds from a bank account in your name"
          subTitle="Transfers from third parties will fail"
        />
        <div className="sm:px-7 mb-5 sm:mb-7 mt-5 ">
          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            Select Currency to receive
          </p>

          <ReceiveModalCurrencyDropdown
            currencyValue={currencyValue}
            openCurrencyDropdown={openCurrencyDropdown}
            setOpenCurrencyDropdown={setOpenCurrencyDropdown}
            handleCurrencySelection={handleCurrencySelection}
            userWalletDetails={userWalletDetails}
          />
          {currencyValue && (
            <ReceiveModalAccountDetail
              getAccountDetailsMutation={getAccountDetailsMutation}
            />
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default ReceiveCurrencyModal;
