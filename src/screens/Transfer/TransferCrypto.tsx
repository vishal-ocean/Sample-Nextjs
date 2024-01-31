/* eslint-disable react-hooks/exhaustive-deps */
import CustomModal from "@/components/CustomModal";
import NetworkDropdown from "@/components/ModalDropDowns/NetworkDropdown";
import TokenDropDown from "@/components/ModalDropDowns/TokenDropDown";
import { Button } from "@/components/UI/Button";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { PercentageButton } from "@/components/UI/PercentageButton";
import { Input } from "@/components/UI/form/Input";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import {
  CONFIRM_TRANSFER_CRYPTO_MODAL,
  TRANSFER_CRYPTO_MODAL,
} from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { UilAngleUp, UilQuestion } from "@/icons";
import { useGetAsset } from "@/services/useCrypto";
import { useTransactionEstimate } from "@/services/useTransactions";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore, useCryptoStoreActions } from "@/store/useCryptoStore";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  walletAddress: Yup.string().required("Wallet address is required."),
  amount: Yup.number()
    .typeError("Amount is required.")
    .required("Amount is required."),
});
const TransferCrypto = () => {
  const [tokenValue, setTokenValue] = useState("");
  const [networkValue, setNetworkValue] = useState("Ethereum");
  const [openTokenDropdown, setOpenTokenDropdown] = useState(false);
  const [openNetworkDropdown, setOpenNetworkDropdown] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { setTransferDetails } = useCryptoStoreActions;
  const { assetDetails, chainNetworkList, transferDetails } = useCryptoStore();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? TRANSFER_CRYPTO_MODAL : "");
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
  const setInitialData = () => {
    for (const chain of chainNetworkList) {
      const asset = chain.assets.find((x: any) => x.id === assetDetails.id);
      if (asset) {
        setNetworkValue(chain.name);
      }
    }
  };

  const getAssetMutation = useGetAsset();
  useEffect(() => {
    if (assetDetails) {
      setTokenValue(assetDetails.name);
      setInitialData();
    }
  }, [assetDetails]);

  useEffect(() => {
    if (tokenValue) {
      const assetId =
        assetDetails?.id !== 0
          ? assetDetails?.id
          : chainNetworkList
              .flatMap((y: any) => y.assets)
              .find((x) => x.name === tokenValue)?.id;
      getAssetMutation.mutate(assetId);
    }
  }, [tokenValue]);

  const getEstimateMutation = useTransactionEstimate();
  const onSubmit = (data: any) => {
    if (getAssetMutation?.data?.balance === 0) {
      toast.error(
        <CustomToastMessage
          message="This amount cannot be transfer"
          subText="You have 0 balance to transfer"
        />,
        { toastId: "zero-amount-error" }
      );
      return;
    }
    getEstimateMutation.mutate({
      destinationAddress: data?.walletAddress,
      amountToSend: Number(data.amount),
      assetId: chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.name === tokenValue)?.id,
    });
    setTransferDetails({
      destinationAddress: data?.walletAddress,
      amountToSend: Number(data.amount),
      assetsId: chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.name === tokenValue)?.id,
      selectedNetwork: networkValue,
      selectedAsset: tokenValue,
    });
  };

  const handleAmountChange = async (percentage: number) => {
    getEstimateMutation.mutate({
      destinationAddress: watch("walletAddress"),
      amountToSend: Number(
        (getAssetMutation?.data?.balance * percentage) / 100
      ),
      assetId: chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.name === tokenValue)?.id,
    });
    setPercentage(percentage);
  };

  useEffect(() => {
    if (getEstimateMutation.data && percentage > 0) {
      const finalAmount =
        Number((getAssetMutation?.data?.balance * percentage) / 100) -
        getEstimateMutation?.data?.high?.networkFee;
      setValue("amount", finalAmount);
    }
    if (getEstimateMutation.data && transferDetails.amountToSend) {
      const finalAmount =
        Number(getAssetMutation?.data?.balance) -
        Number(getEstimateMutation?.data?.high?.networkFee);

      if (finalAmount < transferDetails.amountToSend || isNaN(finalAmount)) {
        toast.error(
          <CustomToastMessage
            message="This amount cannot be transfer"
            subText="Insufficient balance"
          />,
          { toastId: "amount-error" }
        );
      } else {
        setHandleModal(CONFIRM_TRANSFER_CRYPTO_MODAL);
      }
    } else if (getEstimateMutation.data === null) {
      toast.error(
        <CustomToastMessage
          message="Something Went wrong"
          subText="Please try again later"
        />,
        { toastId: "error" }
      );
    }
  }, [getEstimateMutation.data, transferDetails]);

  useEffect(() => {
    if (Object.keys(transferDetails).length > 0) {
      setValue("walletAddress", transferDetails.destinationAddress);
      setValue("amount", transferDetails.amountToSend);
      setTokenValue(transferDetails.selectedAsset);
      setNetworkValue(transferDetails.selectedNetwork);
    }
  }, [transferDetails]);

  return (
    <>
      <CustomModal
        open={modalOpen == TRANSFER_CRYPTO_MODAL}
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
                  setOpenNetworkDropdown(!openNetworkDropdown);
                  setOpenTokenDropdown(false);
                }}
              >
                <div className="flex gap-x-2 items-center">
                  {networkValue ? (
                    chainNetworkList.find((x) => x.name === networkValue)
                      ?.shortName && (
                      <Image
                        width={24}
                        height={24}
                        src={
                          AssetImages[
                            chainNetworkList.find(
                              (x) => x.name === networkValue
                            )?.shortName
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
                      !networkValue && "text-gray-300 dark:text-white/30"
                    )}
                  >
                    {networkValue
                      ? chainNetworkList.find((x) => x.name === networkValue)
                          ?.shortName
                      : "Select"}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-opacity-5 flex justify-center items-center text-gray-300 dark:text-white/30 rotate-180",
                    openNetworkDropdown &&
                      "bg-blue-300 text-white rotate-0 dark:bg-white dark:bg-opacity-60 dark:text-blue-300"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>
              <NetworkDropdown
                openNetworkDropdown={openNetworkDropdown}
                setOpenNetworkDropdown={setOpenNetworkDropdown}
                networkValue={networkValue}
                setNetworkValue={setNetworkValue}
                className="mt-0"
                align={"center"}
                setTokenValue={setTokenValue}
              />
            </div>
          </div>
          <div>
            <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
              Asset
            </p>
            <div className="flex flex-col">
              <Button
                className="p-[14px] w-full sm:max-w-[396px] max-w-[94%] mt-3 rounded-[16px] bg-gray-100 dark:bg-opacity-5 flex justify-between items-center"
                onClick={() => {
                  setOpenTokenDropdown(!openTokenDropdown);
                  setOpenNetworkDropdown(false);
                }}
              >
                <div className="flex gap-x-2 items-center">
                  {tokenValue ? (
                    chainNetworkList
                      .flatMap((y: any) => y.assets)
                      .find((x) => x.name === tokenValue)?.shortName && (
                      <Image
                        width={24}
                        height={24}
                        src={
                          AssetImages[
                            chainNetworkList
                              .flatMap((y: any) => y.assets)
                              .find((x) => x.name === tokenValue)?.shortName
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
                      !tokenValue && "text-gray-300 dark:text-white/80"
                    )}
                  >
                    {tokenValue
                      ? chainNetworkList
                          .flatMap((y: any) => y.assets)
                          .find((x) => x.name === tokenValue)?.name
                      : "Select"}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-opacity-5 flex justify-center items-center text-gray-300 dark:text-white/30 rotate-180",
                    openTokenDropdown &&
                      "bg-blue-300 text-white rotate-0 dark:bg-white dark:bg-opacity-60 dark:text-blue-300"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>
              <TokenDropDown
                openTokenDropdown={openTokenDropdown}
                setOpenTokenDropdown={setOpenTokenDropdown}
                tokenValue={tokenValue}
                setTokenValue={setTokenValue}
                className="mt-0"
                align={"center"}
                networkValue={networkValue}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
                Withdrawal Address
              </p>
              <div className="flex justify-between">
                <Input
                  type="text"
                  id="search-assets"
                  className="input w-full leading-5 outline-none placeholder:text-16 placeholder:text-gray-300 dark:text-white placeholder:leading-5  placeholder:font-700 placeholder:font-body  text-16 font-500 font-body cursor-pointer text-blue-300  border-none mt-3 sm:mt-3 p-4 rounded-[16px] bg-gray-100 dark:bg-opacity-5 gap-x-6"
                  placeholder="Enter destination wallet address"
                  register={register("walletAddress")}
                  errorMessage={errors?.walletAddress?.message}
                />
              </div>
              {/* {errors.walletAddress && (
                <Error message={errors?.walletAddress?.message} />
              )} */}
            </div>
            <div className="mt-5">
              <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
                Amount
              </p>
              <div className="flex justify-between ">
                <Input
                  type="number"
                  id="search-assets"
                  className="input w-full leading-5 outline-none placeholder:text-16 placeholder:text-gray-300 placeholder:leading-5  placeholder:font-700 placeholder:font-body  text-16 font-500 font-body cursor-pointer text-blue-300  border-none rounded-[16px] mt-3 sm:mt-3 p-4 bg-gray-100 dark:bg-opacity-5 gap-x-6"
                  placeholder="0.00"
                  register={register("amount")}
                  step="any"
                  errorMessage={errors?.amount?.message}
                  // onChange={(e) => setAmount(e.target.value)}
                  // value={amount}
                />
              </div>
              {/* {errors.amount && <Error message={errors.amount.message} />} */}
              <div className="mt-3 flex justify-between">
                <p className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
                  Available {getAssetMutation?.data?.balance || 0}{" "}
                  {getAssetMutation?.data?.shortName || ""}
                </p>
                <span className="flex gap-x-2">
                  <PercentageButton
                    percentage={25}
                    onClick={() => handleAmountChange(25)}
                  />
                  <PercentageButton
                    percentage={50}
                    onClick={() => handleAmountChange(50)}
                  />
                  <PercentageButton
                    percentage={100}
                    onClick={() => handleAmountChange(100)}
                  />
                </span>
              </div>
            </div>

            <Button
              className={cn(
                "bg-primary mb-1 mt-5 w-max sm:mb-7 leading-5 text-white font-700 flex justify-center mx-auto"
              )}
              disabled={
                !tokenValue || !networkValue || getEstimateMutation.isLoading
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

export default TransferCrypto;
