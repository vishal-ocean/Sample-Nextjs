/* eslint-disable react-hooks/exhaustive-deps */
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { PercentageButton } from "@/components/UI/PercentageButton";
import { Input } from "@/components/UI/form/Input";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import { CARD_CONFIRM_WITHDRAW_MODAL, CARD_WITHDRAW_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleUp, UilQuestion } from "@/icons";
import {
  useWhitelistDestinationAddressListMutation,
  useWithdrawalFeeEstimateMutation,
} from "@/services/useStrigaWallet";
import { useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore, useCryptoStoreActions } from "@/store/useCryptoStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validationSchema = Yup.object({
  amount: Yup.number()
    .typeError("Amount is required.")
    .required("Amount is required."),
});
const CardWithdrawModal = ({
  assetAddress,
  isAddressWhitelisted,
  setIsAddressWhitelisted,
}: {
  assetAddress: string;
  isAddressWhitelisted: boolean;
  setIsAddressWhitelisted: any;
}) => {
  const [amount, setAmount] = useState<number | null>();
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { setTransferDetails } = useCryptoStoreActions;
  const { chainNetworkList } = useCryptoStore();
  const whitelistDestinationAddressList =
    useWhitelistDestinationAddressListMutation();
  const withdrawalFeeEstimate = useWithdrawalFeeEstimateMutation();
  const { strigaUserData, userWalletDetails } = useUserDataStore();
  const { whitelistAddressList } = useCardStore();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CARD_WITHDRAW_MODAL : "");
  };

  const {
    watch,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAddressWhitelisted) {
        whitelistDestinationAddressList.mutate({
          userId: strigaUserData?.strigaId,
        });
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (whitelistAddressList?.addresses) {
        const isAddressPresent = whitelistAddressList?.addresses.some(
          (item: any) => item.address === assetAddress
        );
        setIsAddressWhitelisted(isAddressPresent);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [whitelistAddressList, assetAddress]);

  const onSubmit = (data: any) => {
    setTransferDetails({
      destinationAddress: userWalletDetails?.accounts?.USDT?.accountId,
      amountToSend: Number(data.amount * 100),
      assetsId: chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.shortName === "USDT")?.id,
      selectedNetwork: "Ethereum",
      selectedAsset: chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.shortName === "USDT")?.name,
    });

    setHandleModal(CARD_CONFIRM_WITHDRAW_MODAL);
  };

  const handleAmountChange = async (percentage: number) => {
    withdrawalFeeEstimate.mutate({
      userId: strigaUserData.strigaId,
      sourceAccountId: userWalletDetails?.accounts?.USDT?.accountId,
      whitelistedAddressId: whitelistAddressList?.addresses.find(
        (item: any) => item.address === assetAddress
      )?.id,
      amount: String(
        Math.floor(
          ((Number(
            userWalletDetails?.accounts?.USDT?.availableBalance?.amount
          ) /
            100) *
            percentage) /
            100
        ) * 100
      ),
    });
  };

  return (
    <>
      <CustomModal
        open={modalOpen == CARD_WITHDRAW_MODAL}
        onOpenChange={handleOpenChange}
        className="max-w-[520px] md:translate-y-[-58%]"
      >
        <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 sm:justify-between">
          <div className="flex gap-x-2 items-center">
            <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
              <IconTimeCoinWithdraw
                strokeWidth={1.2}
                className="h-4 w-4 text-white"
              />
            </span>
            <p className="text-12 text-blue-300 dark:text-white font-500 leading-4">
              Withdraw Crypto
            </p>
          </div>
        </div>
        <div
          className="sm:px-7 flex flex-col gap-y-5 mt-6"
          onSubmit={handleSubmit(onSubmit)}
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
                className="p-[14px] w-full sm:max-w-[396px] max-w-[94%] mt-3 rounded-[16px] bg-gray-100 dark:bg-opacity-5 flex justify-between items-center"
                onClick={() => {
                  // setOpenNetworkDropdown(!openNetworkDropdown);
                  // setOpenTokenDropdown(false);
                }}
              >
                <div className="flex gap-x-2 items-center">
                  {chainNetworkList.length > 0 ? (
                    chainNetworkList.find((x) => x.shortName === "ETH")
                      ?.shortName && (
                      <Image
                        width={24}
                        height={24}
                        src={
                          AssetImages[
                            chainNetworkList.find((x) => x.shortName === "ETH")
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
                      "font-700 leading-5 text-16 text-blue-300 dark:text-white"
                    )}
                  >
                    {chainNetworkList.length > 0
                      ? chainNetworkList.find((x) => x.shortName === "ETH")
                          ?.shortName
                      : "Select"}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-opacity-5 flex justify-center items-center text-gray-300 dark:text-white/30 rotate-180"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>
            </div>
          </div>
          <div>
            <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
              Asset
            </p>
            <div className="flex flex-col">
              <Button
                className="p-[14px] w-full sm:max-w-[396px] max-w-[94%] mt-3 rounded-[16px] bg-gray-100 dark:bg-opacity-5 flex justify-between items-center"
                onClick={() => {}}
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
                      "font-700 leading-5 text-16 text-blue-300 dark:text-white"
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
                    "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-opacity-5 flex justify-center items-center text-gray-300 dark:text-white/30 rotate-180"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
                Withdrawal Address
              </p>
              <div className={cn("flex justify-between")}>
                <Input
                  type="text"
                  value={assetAddress}
                  id="search-assets"
                  className="input w-full leading-5 outline-none placeholder:text-16 placeholder:text-gray-300 dark:text-white dark:placeholder:text-white/30 placeholder:leading-5 !placeholder:font-700 placeholder:font-body  text-16 !font-700 font-body cursor-pointer text-blue-300  border-none mt-3 sm:mt-3 p-4 rounded-[16px] bg-gray-100 dark:bg-opacity-5 gap-x-6"
                  placeholder="Enter destination wallet address"
                  disabled
                />
              </div>
            </div>
            <div className="mt-5">
              <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
                Amount
              </p>
              <div
                className={cn(
                  "flex justify-between opacity-50 pointer-events-none",
                  userWalletDetails?.accounts?.USDT?.availableBalance?.amount >
                    0 && "opacity-100 pointer-events-auto"
                )}
              >
                <Input
                  type="number"
                  id="search-assets"
                  className="input w-full leading-5 outline-none placeholder:text-16 placeholder:text-gray-300 placeholder:leading-5 !placeholder:font-700 placeholder:font-body dark:placeholder:text-white/30  text-16 !font-700 font-body cursor-pointer text-blue-300  border-none rounded-[16px] mt-3 sm:mt-3 p-4 bg-gray-100 dark:bg-opacity-5 gap-x-6"
                  placeholder="0.00"
                  register={register("amount")}
                  step="any"
                  errorMessage={errors?.amount?.message}
                  onChange={(e) => {
                    setAmount(Number(e.target.value)),
                      Number(e.target.value) > 0 &&
                        withdrawalFeeEstimate.mutate({
                          userId: strigaUserData.strigaId,
                          sourceAccountId:
                            userWalletDetails?.accounts?.USDT?.accountId,
                          whitelistedAddressId:
                            whitelistAddressList?.addresses.find(
                              (item: any) => item.address === assetAddress
                            )?.id,
                          amount: String(
                            Math.floor(Number(e.target.value)) * 100
                          ),
                        });
                  }}
                  value={amount || ""}
                />
              </div>
              <div className="mt-3 flex justify-between">
                <p className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
                  Available{" "}
                  {readableNumber(
                    Number(
                      userWalletDetails?.accounts?.USDT?.availableBalance
                        ?.amount
                    ) / 100 || 0
                  )}{" "}
                  {userWalletDetails?.accounts?.USDT?.currency || ""}
                </p>
                <span className="flex gap-x-2">
                  <PercentageButton
                    percentage={25}
                    onClick={() => {
                      handleAmountChange(25),
                        setAmount(
                          ((Number(
                            userWalletDetails?.accounts?.USDT?.availableBalance
                              ?.amount
                          ) /
                            100) *
                            25) /
                            100
                        );
                    }}
                  />
                  <PercentageButton
                    percentage={50}
                    onClick={() => {
                      handleAmountChange(50),
                        setAmount(
                          ((Number(
                            userWalletDetails?.accounts?.USDT?.availableBalance
                              ?.amount
                          ) /
                            100) *
                            50) /
                            100
                        );
                    }}
                  />
                  <PercentageButton
                    percentage={100}
                    onClick={() => {
                      handleAmountChange(100),
                        setAmount(
                          ((Number(
                            userWalletDetails?.accounts?.USDT?.availableBalance
                              ?.amount
                          ) /
                            100) *
                            100) /
                            100
                        );
                    }}
                  />
                </span>
              </div>
              <p className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
                Withdraw Fee{" "}
                {withdrawalFeeEstimate?.data?.data?.totalFee / 100 || 0}{" "}
                {withdrawalFeeEstimate?.data?.data?.feeCurrency}
              </p>
            </div>
            <Button
              className={cn(
                "bg-primary mb-1 mt-5 w-max sm:mb-7 leading-5 text-white font-700 flex justify-center mx-auto"
              )}
              disabled={
                chainNetworkList.length < 0 ||
                // getEstimateMutation.isLoading ||
                !isAddressWhitelisted ||
                !(
                  watch("amount") <
                  Number(
                    userWalletDetails?.accounts?.USDT?.availableBalance?.amount
                  ) /
                    100
                ) ||
                !((amount || 0) > 0) ||
                withdrawalFeeEstimate.isLoading ||
                Number(
                  userWalletDetails?.accounts?.USDT?.availableBalance?.amount
                ) /
                  100 <=
                  Number(withdrawalFeeEstimate?.data?.data?.totalFee) / 100 +
                    (amount || 0)
              }
              type="submit"
            >
              Preview Withdraw
            </Button>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default CardWithdrawModal;
