import CustomModal from "@/components/CustomModal";
import { ACCOUNT_DETAIL_MODAL } from "@/constants";
import { UilCopy } from "@/icons";
import { useGetAccountDetailsMutation } from "@/services/useStrigaWallet";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useCurrency } from "../useCurrency";
type DataProps = {
  currency: string;
};

export const CurrencyAccountDetail = [
  {
    currency: "EUR",
    AccountNumber: "0000002110794",
    AccountHolderName: "Samuel James Pitman",
    BankName: "OpenPayd",
    BankCountry: "United Kingdom",
    BankAddress: "42, Ocean Road, UK <br/> STJ 3011",
    IBAN: "MT80CFTE28004000000000000002110794",
    BIC: "CFTEMTM1",
    Provider: "BBS",
  },
  {
    currency: "USD",
    AccountNumber: "0000002110794",
    AccountHolderName: "Samuel James Pitman",
    BankName: "OpenPayd",
    BankCountry: "United Kingdom",
    BankAddress: "Level 3, 137 Spinola Road St. Julians’s <br/> STJ 3011",
    IBAN: "MT80CFTE28004000000000000002110794",
    BIC: "CFTEMTM1",
    Provider: "BBS",
  },
  {
    currency: "GBP",
    AccountNumber: "0000002110794",
    AccountHolderName: "Samuel James Pitman",
    BankName: "OpenPayd",
    BankCountry: "United Kingdom",
    BankAddress: `Level 3, 137 Spinola Road St. Julians’s  <br/>  STJ 3011`,
    IBAN: "MT80CFTE28004000000000000002110794",
    BIC: "CFTEMTM1",
    Provider: "BBS",
  },
];

export const AccountDetailModal = ({ currency }: DataProps) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { CurrencyData } = useCurrency();
  const { userWalletDetails } = useUserDataStore();
  const getAccountDetailsMutation = useGetAccountDetailsMutation();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ACCOUNT_DETAIL_MODAL : "");
  };

  const handleCopyToClipboard = (value: string, toastId: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard", { toastId });
  };

  useEffect(() => {
    getAccountDetailsMutation.mutate({
      userId: userWalletDetails?.accounts?.EUR?.ownerId,
      accountId: userWalletDetails?.accounts?.EUR?.accountId,
    });
  }, []);

  return (
    <CustomModal
      open={modalOpen === ACCOUNT_DETAIL_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 bottom-0 md:bottom-auto translate-y-0 sm:-translate-y-1/2 pr-4"
    >
      {CurrencyData.map(
        (value, index) =>
          value.currency === currency && (
            <div key={index} className="flex gap-x-2 items-center mb-2">
              <span className="h-10 w-10 bg-blue-300 text-white dark:bg-white dark:text-blue-300 flex justify-center items-center rounded-full">
                {value.currencyIcon}
              </span>
              <span>
                <p className="text-blue-300 dark:text-white text-12 font-500 leading-4 capitalize">
                  {value.currencyName}
                </p>
                <p className="text-gray-300 dark:text-white/30 text-12 font-500 leading-4">
                  Account Details
                </p>
              </span>
            </div>
          )
      )}
      <div className="mt-6 mb-5 sm:mb-7 sm:px-7 mr-1 sm:mr-0">
        {[
          "accountNumber",
          "bankAccountHolderName",
          "bankName",
          "bankCountry",
          "bankAddress",
          "iban",
          "bic",
          "provider",
        ].map((field, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex gap-x-6 justify-between text-blue-300 text-14 font-500 leading-4 cursor-pointer`}
            >
              <p className="text-gray-300 dark:text-white/30 text-12 font-500 leading-4 whitespace-nowrap">
                {FieldLabels[field]}
              </p>
              <span
                className="text-12 font-500 leading-4 text-blue-300 dark:text-white flex gap-x-2 justify-end w-full"
                onClick={() =>
                  handleCopyToClipboard(
                    getAccountDetailsMutation?.data?.data?.[field],
                    `${field}-${getAccountDetailsMutation?.data?.data?.[field]}`
                  )
                }
              >
                {getAccountDetailsMutation?.isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 w-12" />
                  </div>
                ) : (
                  <>
                    <p className="text-right break-words w-[63%] sm:w-full">
                      {getAccountDetailsMutation?.data?.data?.[field]}
                    </p>
                    <UilCopy className="h-4 w-4" />
                  </>
                )}
              </span>
            </div>
            {index < 7 && <hr className="border-gray-300/10 my-4" />}
          </React.Fragment>
        ))}
      </div>
    </CustomModal>
  );
};

const FieldLabels: Record<string, string> = {
  accountNumber: "Account number",
  bankAccountHolderName: "Account holder name",
  bankName: "Name of the bank",
  bankCountry: "Country of the bank",
  bankAddress: "Address of the bank",
  iban: "vIBAN",
  bic: "BIC",
  provider: "Provider",
};
