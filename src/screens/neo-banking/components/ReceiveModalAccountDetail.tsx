"use client";
import CustomToolTip from "@/components/UI/Tooltip";
import { IconRoundedCheck } from "@/components/icons/IconRoundedCheck";
import { UilCopy } from "@/icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const ReceiveModalAccountDetail = ({
  getAccountDetailsMutation,
}: {
  getAccountDetailsMutation: any;
}) => {
  const {
    accountNumber,
    bankAccountHolderName,
    bankName,
    bankCountry,
    bankAddress,
    iban,
    bic,
    provider,
  } = getAccountDetailsMutation?.data?.data || {};

  const [booleanState, setBooleanState] = useState<Record<string, boolean>>({
    accountNumber: false,
    accountName: false,
    bankName: false,
    bankCountry: false,
    bankAddress: false,
    viban: false,
    bic: false,
    provider: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooleanState({
        accountNumber: false,
        accountName: false,
        bankName: false,
        bankCountry: false,
        bankAddress: false,
        viban: false,
        bic: false,
        provider: false,
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [booleanState]);

  const handleCopyToClipboard = (value: string, stateKey: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard", { toastId: Math.random() });
    setBooleanState((prevState) => ({ ...prevState, [stateKey]: true }));
  };

  const renderField = (label: string, value: string, stateKey: string) => (
    <div
      className={`flex gap-x-6 justify-between text-blue-300 text-14 font-500 leading-4 cursor-pointer`}
    >
      <p className="text-gray-300 text-12 font-500 leading-4 whitespace-nowrap dark:text-white/30">
        {label}
      </p>
      <span
        className="text-12 font-500 leading-4 dark:text-white text-blue-300 flex gap-x-2 justify-end w-full"
        onClick={() => handleCopyToClipboard(value, stateKey)}
      >
        {getAccountDetailsMutation?.isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 w-12" />
          </div>
        ) : (
          <>
            <p className="text-right break-all w-4/5 sm:w-full ">{value}</p>
            {booleanState[stateKey] ? (
              <CustomToolTip
                content={"Copied to clipboard"}
                open={booleanState[stateKey]}
              >
                <IconRoundedCheck className="text-success-200 h-4 w-4" />
              </CustomToolTip>
            ) : (
              <UilCopy className="h-4 w-4" />
            )}
          </>
        )}
      </span>
    </div>
  );

  return (
    <div className="mt-5">
      <p className="font-500 text-12 text-blue-300 dark:text-white leading-4">
        Please transfer to the account detailed below <br /> the amount you want
        to deposit
      </p>
      <div className="mt-3 p-3 sm:p-5 bg-gray-100 dark:bg-white dark:bg-opacity-5 rounded-[16px] overflow-auto">
        {renderField("Account number", accountNumber, "accountNumber")}
        <hr className="border-gray-300/10 my-3" />
        {renderField(
          "Account holder name",
          bankAccountHolderName,
          "accountName"
        )}
        <hr className="border-gray-300/10 my-3" />
        {renderField("Name of the bank", bankName, "bankName")}
        <hr className="border-gray-300/10 my-3" />
        {renderField("Country of the bank", bankCountry, "bankCountry")}
        <hr className="border-gray-300/10 my-3" />
        {renderField("Address of the bank", bankAddress, "bankAddress")}
        <hr className="border-gray-300/10 my-3" />
        {renderField("vIBAN", iban, "viban")}
        <hr className="border-gray-300/10 my-3" />
        {renderField("BIC", bic, "bic")}
        <hr className="border-gray-300/10 my-3" />
        {renderField("Provider", provider, "provider")}
      </div>
      <p className="font-500 text-12 text-gray-300 leading-4 mt-2">
        This does not include any fees charged by your bank. This operation can
        take up two working days
      </p>
    </div>
  );
};
