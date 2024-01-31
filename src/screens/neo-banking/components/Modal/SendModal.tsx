import CustomModal from "@/components/CustomModal";
import Alert from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { PercentageButton } from "@/components/UI/PercentageButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { Input } from "@/components/UI/form/Input";
import IconTransfer from "@/components/icons/IconTransfer";
import { SEND_CURRENCY_MODAL, STRIGA_OTP_MODAL } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleUp, UilEuro } from "@/icons";
import { useWithdrawInitiateMutation } from "@/services/useStrigaWallet";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import {
  useNeoBankingAction,
  useNeoBankingStore,
} from "@/store/useNeoBankingStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  iban: Yup.string().required("IBAN address is required."),
  bic: Yup.string().required("BIC address is required."),
  amount: Yup.number()
    .typeError("Amount is required.")
    .required("Amount is required."),
});
const SendCurrencyModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { accountCurrency } = useNeoBankingStore();
  const [currencyValue, setCurrencyValue] = useState("");
  const [openCurrencyDropdown, setOpenCurrencyDropdown] = useState(false);
  const { setHandleModal } = useHandleModalAction;
  const { userWalletDetails } = useUserDataStore();
  const withdrawalMutation: any = useWithdrawInitiateMutation();
  const { setAccountCurrency } = useNeoBankingAction;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SEND_CURRENCY_MODAL : "");
  };
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    if (
      data.amount >
      Number(userWalletDetails?.accounts?.EUR?.availableBalance?.amount || 0) /
        100
    ) {
      toast.error(<CustomToastMessage message="Insufficient balance" />, {
        toastId: "transfer-error",
      });
      return;
    }
    withdrawalMutation.mutate({
      destination: {
        iban: data.iban,
        bic: data.bic,
      },
      amount: Math.floor(data.amount * 100).toString(),
      sourceAccountId: userWalletDetails?.accounts?.EUR?.accountId,
      userId: userWalletDetails?.accounts?.EUR?.ownerId,
    });
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (withdrawalMutation?.data?.data?.challengeId) {
      setHandleModal(STRIGA_OTP_MODAL);
    }
  }, [withdrawalMutation]);

  useEffect(() => {
    const handleWithdrawalError = () => {
      if (isSubmitted && withdrawalMutation.isError) {
        const { response } = withdrawalMutation.error;
        const strigaError = response?.data?.type === "strigaError";

        const message = strigaError
          ? response?.data?.data?.message
          : "Something went wrong";
        const subText = strigaError
          ? response?.data?.data?.errorDetails?.map((item: any) => item.msg)
          : null;

        toast.error(
          <CustomToastMessage message={message} subText={subText} />,
          {
            toastId: "transfer-error",
          }
        );

        setIsSubmitted(false);
      }
    };

    handleWithdrawalError();
  }, [isSubmitted, withdrawalMutation]);

  useEffect(() => {
    if (accountCurrency !== "") {
      setCurrencyValue(accountCurrency);
      setTimeout(() => {
        setAccountCurrency("");
      }, 1000);
    }
  }, [accountCurrency]);

  const setAmountPercentage = (percentage: number) => {
    setValue(
      "amount",
      (Number(userWalletDetails?.accounts?.EUR?.availableBalance?.amount || 0) /
        100) *
        percentage
    );
  };
  return (
    <CustomModal
      open={modalOpen === SEND_CURRENCY_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] py-5 px-3 sm:px-5 bottom-0 md:bottom-auto translate-y-0 sm:-translate-y-1/2"
    >
      <div className="flex gap-x-2 items-center mb-1">
        <span className="h-10 w-10 bg-primary text-white flex justify-center items-center rounded-full">
          <IconTransfer strokeWidth={2} className="h-4 w-4" />
        </span>
        <span>
          <p className="text-blue-300 dark:text-white text-12 font-500 leading-4">
            Send
          </p>
        </span>
      </div>
      <div>
        <Alert
          isLearnMore={false}
          type="warning"
          title="Only send funds to a bank account in your name"
          subTitle="Transfers from third parties will fail"
        />
        <div className="px-2 sm:px-7 mb-0 sm:mb-7 mt-10 max-h-[400px] overflow-y-auto  overflow-x-hidden">
          <p className="text-16 font-500 leading-5 dark:text-white text-blue-300">
            Currency
          </p>
          <div className="mt-5">
            <p className="text-12 font-500 leading-4 dark:text-white/30 text-gray-300">
              Currency
            </p>
            <Popover
              open={openCurrencyDropdown}
              onOpenChange={(e) => setOpenCurrencyDropdown(e)}
            >
              <PopoverTrigger className="w-full mt-3">
                <Button
                  className={`w-full sm:max-w-[396px] max-w-[94%] rounded-[16px] bg-gray-100 dark:bg-white dark:bg-opacity-5 flex justify-between items-center ${
                    currencyValue ? "px-[14px] py-3" : "p-[14px] "
                  }`}
                  onClick={() => setOpenCurrencyDropdown(!openCurrencyDropdown)}
                >
                  <div className="flex gap-x-2 items-center">
                    {currencyValue ? (
                      <div className="h-7 w-7 rounded-full bg-blue-300 text-white dark:text-blue-300 dark:bg-white  flex justify-center items-center">
                        <UilEuro className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-3xl bg-secondary dark:bg-white/30" />
                    )}
                    <span
                      className={cn(
                        "font-700 leading-5 text-16 text-blue-300 dark:text-white",
                        !currencyValue && "text-gray-300 dark:text-white/30"
                      )}
                    >
                      {currencyValue ? "Euro" : "Select"}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-transparent flex justify-center items-center text-gray-300 dark:text-white rotate-180",
                      openCurrencyDropdown &&
                        "bg-blue-300 text-white rotate-0 dark:bg-white dark:text-blue-300"
                    )}
                  >
                    <UilAngleUp className="h-6 w-6" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "bg-secondary/50 dark:bg-gray-250/30  backdrop-blur-[16px] p-4 rounded-[16px] bottom-0 w-[300px] sm:w-[424px] dark:border-none"
                )}
                align="center"
              >
                <p className="font-500 leading-4 text-12 dark:text-white text-blue-300 mb-1">
                  Currency
                </p>
                <div className="max-h-[160px] overflow-y-auto mt-1">
                  {/* {CurrencyData.map((item, index) => {
                    const balance = parseFloat(
                      item.balance.replace(/[^\d.-]/g, "")
                    );
                    return (
                      <> */}
                  <div
                    className={cn(
                      "w-full flex justify-between items-center py-2 cursor-pointer last:pb-0"
                      // balance ? "" : "pointer-events-none"
                    )}
                    onClick={() => {
                      setCurrencyValue(
                        userWalletDetails?.accounts?.EUR?.currency
                      );
                      setOpenCurrencyDropdown(false);
                    }}
                    // key={`CurrencyDropdown-${index}`}
                  >
                    <div className="flex gap-x-3 items-center">
                      <div
                        className={cn(
                          "rounded-3xl h-7 w-7 text-white flex justify-center items-center p-1.5 bg-blue-300 dark:bg-white dark:text-blue-300"
                          // item.currency === "GBP" && "p-[9px]"
                          // balance ? "" : "bg-secondary"
                        )}
                      >
                        <UilEuro className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "font-500 text-14 leading-4 text-blue-300 dark:text-white"
                            // balance ? "" : "text-gray-300"
                          )}
                        >
                          Euro
                        </span>
                        <span className="font-500 text-12 text-gray-300 dark:text-white/30 leading-4">
                          {userWalletDetails?.accounts?.EUR?.currency}
                        </span>
                      </div>
                    </div>
                    <div>
                      {userWalletDetails?.accounts?.EUR?.currency === "EUR" ? (
                        <p
                          className={cn(
                            "text-14 font-500 leading-4 capitalize text-right text-blue-300 dark:text-white"
                            // balance ? "" : "text-gray-300"
                          )}
                        >
                          €
                          {readableNumber(
                            Number(
                              userWalletDetails?.accounts?.EUR?.availableBalance
                                ?.amount || 0
                            ) / 100
                          ) || 0}
                        </p>
                      ) : (
                        <>
                          <p
                            className={cn(
                              "text-14 font-500 leading-4 capitalize text-right text-blue-300 dark:text-white"
                              // balance ? "" : "text-gray-300"
                            )}
                          >
                            {userWalletDetails?.accounts?.EUR?.balance}
                          </p>
                          <p className="text-gray-300 dark:text-white/30 text-12 font-500 leading-4 uppercase text-right">
                            {userWalletDetails?.accounts?.EUR?.balanceInEuro}
                          </p>
                        </>
                      )}
                    </div>
                    {/* {currencyValue === item.currency && (
                      <span className="bg-primary rounded-full h-4 w-4 p-[1px] flex items-center justify-center">
                        <UilCheck className="text-white rounded-full" />
                      </span>
                    )} */}
                    {/* </div>
                        {index !== CurrencyData.length - 1 && (
                          <hr className="border-gray-300/10" />
                        )} */}
                    {/* </>
                    );
                  })} */}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Amount
              </p>
              <Input
                className="text-16 font-700 leading-5 text-blue-300 placeholder:text-16 placeholder:font-700 placeholder:leading-5 bg-gray-100 placeholder:text-gray-300 rounded-[16px] p-4 border-none mt-3 dark:bg-white dark:text-white dark:bg-opacity-5"
                placeholder="0.00"
                name="amount"
                type="number"
                step="any"
                register={register("amount")}
                errorMessage={errors?.amount?.message}
                min={0}
              />
              <div className="flex justify-between mt-3">
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  Available €
                  {currencyValue
                    ? Number(
                        userWalletDetails?.accounts?.EUR?.availableBalance
                          ?.amount || 0
                      ) / 100 || 0
                    : 0.0}
                </p>
                <span className="flex gap-x-2">
                  <PercentageButton
                    percentage={25}
                    onClick={() => setAmountPercentage(0.25)}
                    disabled={!currencyValue}
                  />
                  <PercentageButton
                    percentage={50}
                    onClick={() => setAmountPercentage(0.5)}
                    disabled={!currencyValue}
                  />
                  <PercentageButton
                    percentage={100}
                    onClick={() => setAmountPercentage(1)}
                    disabled={!currencyValue}
                  />
                </span>
              </div>
            </div>
            <div className="mt-10">
              <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                Destination Account
              </p>

              <div className="mt-5">
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  IBAN
                </p>
                <div className="relative mt-3 flex justify-center items-center">
                  <Input
                    className="text-16 font-700 leading-5 text-blue-300 placeholder:text-16 placeholder:font-700 placeholder:leading-5 bg-gray-100 placeholder:text-gray-300 rounded-[16px] p-4 border-none mt-3 dark:bg-white dark:text-white dark:bg-opacity-5"
                    placeholder="IBAN"
                    register={register("iban")}
                    name="iban"
                    errorMessage={errors?.iban?.message}
                  />
                  {/* {!errors?.iban?.message && (
                    <span className="h-4 w-4 rounded-full flex justify-center items-center bg-success-200 absolute right-5">
                      <UilCheck className="text-white w-amx h-max" />
                    </span>
                  )} */}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  BIC
                </p>
                <div className="relative mt-3 flex justify-center items-center">
                  <Input
                    className="text-16 font-700 leading-5 text-blue-300 placeholder:text-16 placeholder:font-700 placeholder:leading-5 bg-gray-100 placeholder:text-gray-300 rounded-[16px] p-4 border-none mt-3 dark:text-white dark:bg-white dark:bg-opacity-5"
                    placeholder="BIC"
                    register={register("bic")}
                    name="bic"
                    errorMessage={errors?.bic?.message}
                  />
                  {/* {!errors?.bic?.message && (
                    <span className="h-4 w-4 rounded-full flex justify-center items-center bg-success-200 absolute right-5">
                      <UilCheck className="text-white w-amx h-max" />
                    </span>
                  )} */}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className={cn(
                "text-16 !font-700 leading-5 px-6 py-4 mt-10 s:mt-4 flex mx-auto"
              )}
              disabled={!currencyValue || !watch("amount")}
            >
              Confirm and Send
            </Button>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default SendCurrencyModal;
