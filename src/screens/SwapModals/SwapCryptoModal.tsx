import CustomModal from "@/components/CustomModal";
import NetworkDropdown from "@/components/ModalDropDowns/NetworkDropdown";
import TokenDropDown from "@/components/ModalDropDowns/TokenDropDown";
import Alert from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import { PercentageButton } from "@/components/UI/PercentageButton";
import { Input } from "@/components/UI/form/Input";
import IconExchange from "@/components/icons/IconExchange";
import { IconSwap } from "@/components/icons/IconSwap";
import { SWAP_CONFIRMATION_MODAL, SWAP_CRYPTO_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { useDebounce } from "@/hooks/useDebounce";
import { UilAngleUp } from "@/icons";
import { useGetAsset, useGetSwapEstimate } from "@/services/useCrypto";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStore, useCryptoStoreActions } from "@/store/useCryptoStore";
import { cn } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const SwapCryptoModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [fromNetwork, setFromNetwork] = useState("");
  const [toNetwork, setToNetwork] = useState("");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [openFromNetworkDropdown, setOpenFromNetworkDropdown] = useState(false);
  const [openToNetworkDropdown, setOpenToNetworkDropdown] = useState(false);
  const [openFromTokenDropdown, setOpenFromTokenDropdown] = useState(false);
  const [openToTokenDropdown, setOpenToTokenDropdown] = useState(false);
  const [openSwapMethodDropdown, setOpenSwapMethodDropdown] = useState(false);
  const [swapMethod, setSwapMethod] = useState("DEX");
  const [openTooltip, setOpenTooltip] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [swapAmount, setSwapAmount] = useState<number | string>("");
  const [exchangeAnimation, setExchangeAnimation] = useState(false);

  const { setSwapPreviewData, setGoBack } = useCryptoStoreActions;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SWAP_CRYPTO_MODAL : "");
  };
  const handlePreviewSwap = () => {
    let totalAmountFiat = 0;
    getSwapEstimateMutation?.data?.fee?.forEach((item: any) => {
      totalAmountFiat += item.amountFiat;
    });
    setSwapPreviewData({
      fromNetwork,
      toNetwork,
      fromToken,
      toToken,
      swapMethod,
      swapAmount: Number(swapAmount),
      totalFeeFiat: totalAmountFiat,
      exchangeAmount: getSwapEstimateMutation?.data?.outputAmount,
    });
    setHandleModal(SWAP_CONFIRMATION_MODAL);
  };
  const { assetDetails, chainNetworkList, swapPreviewData, goBack } =
    useCryptoStore();
  const getFromAssetMutation = useGetAsset();
  const getToAssetMutation = useGetAsset();
  const getSwapEstimateMutation: any = useGetSwapEstimate();
  const setInitialData = () => {
    for (const chain of chainNetworkList) {
      const asset = chain.assets.find((x: any) => x.id === assetDetails.id);
      if (asset) {
        setFromNetwork(chain.name);
      }
    }
  };
  useEffect(() => {
    if (assetDetails) {
      setFromToken(assetDetails.name);
      setInitialData();
    }
  }, [assetDetails]);
  useEffect(() => {
    if (fromToken) {
      const assetId = chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.name === fromToken)?.id;
      getFromAssetMutation.mutate(assetId);
    }
  }, [fromToken]);

  useEffect(() => {
    if (toToken) {
      const assetId = chainNetworkList
        .flatMap((y: any) => y.assets)
        .find((x) => x.name === toToken)?.id;
      getToAssetMutation.mutate(assetId);
    }
  }, [toToken]);

  const debouncedValue = useDebounce(swapAmount, 600);
  const handleAmountChange = async (percentage: number) => {
    setPercentage(percentage);
  };
  useEffect(() => {
    if (getFromAssetMutation?.data) {
      const finalAmount =
        (getFromAssetMutation?.data?.balance * percentage) / 100;
      setSwapAmount(finalAmount);
    }
  }, [percentage]);
  useEffect(() => {
    const fetchData = () => {
      if (fromNetwork && toNetwork && fromToken && toToken && swapAmount) {
        getSwapEstimateMutation.mutate({
          currency: "eur",
          FromAssetId: chainNetworkList
            .flatMap((y: any) => y.assets)
            .find((x) => x.name === fromToken)?.id,
          ToAssetId: chainNetworkList
            .flatMap((y: any) => y.assets)
            .find((x) => x.name === toToken)?.id,
          Amount: swapAmount,
          Slippage: 1,
        });
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [fromToken, toToken, debouncedValue]);

  useEffect(() => {
    if (Object.keys(swapPreviewData).length !== 0 && goBack) {
      setFromToken(swapPreviewData.fromToken);
      setToToken(swapPreviewData.toToken);
      setFromNetwork(swapPreviewData.fromNetwork);
      setToNetwork(swapPreviewData.toNetwork);
      setSwapAmount(swapPreviewData?.swapAmount);
      setSwapPreviewData({});
      setGoBack(false);
    }
  }, []);
  const handleExchange = () => {
    if (fromNetwork && toNetwork && fromToken && toToken)
      setExchangeAnimation(true);
    const currentData = {
      fromNetwork,
      toNetwork,
      fromToken,
      toToken,
      swapAmount,
    };
    setFromToken(currentData.toToken);
    setToToken(currentData.fromToken);
    setFromNetwork(currentData.toNetwork);
    setToNetwork(currentData.fromNetwork);
    setSwapAmount(getSwapEstimateMutation?.data?.outputAmount);
    setTimeout(() => {
      setExchangeAnimation(false);
    }, 1000);
  };
  return (
    <CustomModal
      open={modalOpen === SWAP_CRYPTO_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 md:translate-y-[-58%]"
    >
      <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 sm:justify-between">
        <div className="flex gap-x-2 items-center">
          <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
            <IconSwap className="h-4 w-4 text-white" />
          </span>
          <span className="text-12 text-blue-300 dark:text-white font-500 leading-4">
            Swap Crypto
          </span>
        </div>
      </div>
      <Alert
        type="warning"
        title="Warning alert title"
        subTitle="Warning alert subtitle"
      />
      <div className="sm:px-7 flex mt-3 flex-col">
        {/* <div className="flex flex-col gap-y-3">
          <div>
            <p className="font-500 leading-4 text-12 text-gray-300 flex gap-x-1 items-center dark:text-white/30">
              Swap Method
              <TooltipProvider>
                <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                  <TooltipTrigger className={`cursor-pointer`} asChild>
                    <div
                      onMouseOver={() => setOpenTooltip(true)}
                      onMouseOut={() => setOpenTooltip(false)}
                    >
                      <UilInfoCircle className="h-4 w-4 text-blue-300 dark:text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipPortal>
                    <TooltipContent
                      side="bottom"
                      align="center"
                      sideOffset={5}
                      className={cn(
                        "TooltipContent bg-gray-250 w-full sm:max-w-[424px] p-4 rounded-[12px] max-w-[350px] z-50"
                      )}
                    >
                      <div className="flex flex-col gap-y-2">
                        <div className="flex flex-col">
                          <span className="text-12 font-700 text-blue-300 leading-4">
                            CEX (Centralized Exchange):
                          </span>
                          <span className="text-12 font-500 text-blue-300 leading-4">
                            A platform operated by a centralized entity,
                            facilitating trades between users. Offers faster
                            trades and high liquidity but requires users to
                            trust the platform&apos;s security.
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-12 font-700 text-blue-300 leading-4">
                            DEX (Decentralized Exchange):
                          </span>
                          <span className="text-12 font-500 text-blue-300 leading-4">
                            A platform where trades occur directly between
                            users, without an intermediary, relying on smart
                            contracts. Offers enhanced privacy and security.
                          </span>
                        </div>
                      </div>
                      <TooltipArrow className="fill-gray-250" />
                    </TooltipContent>
                  </TooltipPortal>
                </Tooltip>
              </TooltipProvider>
            </p>
            <div className="flex flex-col">
              <Button
                className="p-[14px] w-full sm:max-w-[396px] max-w-[94%] mt-3 rounded-[16px] bg-gray-100 dark:bg-opacity-5 flex justify-between items-center pointer-events-none"
                onClick={() => {
                  setOpenFromNetworkDropdown(false);
                  setOpenFromTokenDropdown(false);
                  setOpenToNetworkDropdown(false);
                  setOpenToTokenDropdown(false);
                  setOpenSwapMethodDropdown(!openSwapMethodDropdown);
                }}
              >
                <div className="flex gap-x-2 items-center">
                  {swapMethod ? (
                    <div className="rounded-3xl h-7 w-7 bg-blue-300 flex justify-center items-center">
                      {SWAP_METHODS.find((x) => x.value === swapMethod)?.icon}
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-3xl bg-secondary" />
                  )}
                  <span
                    className={cn(
                      "font-700 leading-5 text-16 text-blue-300 dark:text-white",
                      !swapMethod && "text-gray-300"
                    )}
                  >
                    {swapMethod
                      ? SWAP_METHODS.find((x) => x.value === swapMethod)?.name
                      : "Select"}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-opacity-5 flex justify-center items-center text-gray-300 rotate-180",
                    openSwapMethodDropdown && "bg-blue-300 text-white rotate-0"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>
              <SwapMethodDropDown
                openSwapMethodDropdown={openSwapMethodDropdown}
                setOpenSwapMethodDropdown={setOpenSwapMethodDropdown}
                swapMethod={swapMethod}
                setSwapMethod={setSwapMethod}
                className="mt-0"
                align={"center"}
              />
            </div>
          </div>
        </div> */}
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between">
            <div className="flex gap-x-2">
              <span className="text-gray-300 dark:text-white/30 text-12 font-500 leading-6">
                From
              </span>
              <Button
                variant="outline"
                className="p-0 flex gap-x-1 items-center"
                onClick={() => {
                  setOpenFromNetworkDropdown(!openFromNetworkDropdown);
                  setOpenFromTokenDropdown(false);
                  setOpenToNetworkDropdown(false);
                  setOpenToTokenDropdown(false);
                  setOpenSwapMethodDropdown(false);
                }}
              >
                {fromNetwork ? (
                  chainNetworkList.find((x) => x.name === fromNetwork)
                    ?.shortName && (
                    <Image
                      width={16}
                      height={16}
                      src={
                        AssetImages[
                          chainNetworkList.find((x) => x.name === fromNetwork)
                            ?.shortName
                        ]
                      }
                      alt="image"
                    />
                  )
                ) : (
                  <div className="w-4 h-4 rounded-3xl bg-secondary dark:bg-white/30" />
                )}
                <span
                  className={cn(
                    "font-500 leading-4 text-12 text-blue-300 dark:text-white",
                    !fromNetwork && "text-gray-300"
                  )}
                >
                  {fromNetwork
                    ? chainNetworkList.find((x) => x.name === fromNetwork)
                        ?.shortName
                    : "Select"}
                </span>
                <div
                  className={cn(
                    "h-4 w-4 rounded-3xl bg-white dark:bg-white/10 dark:text-white flex justify-center items-center text-secondary rotate-180",
                    openFromNetworkDropdown && "bg-blue-300 text-white rotate-0"
                  )}
                >
                  <UilAngleUp className="h-4 w-4" />
                </div>
              </Button>
            </div>
            <NetworkDropdown
              networkValue={fromNetwork}
              setNetworkValue={setFromNetwork}
              openNetworkDropdown={openFromNetworkDropdown}
              setOpenNetworkDropdown={setOpenFromNetworkDropdown}
              className={"ml-0 sm:!mr-[-10px]"}
              align="end"
              setTokenValue={setFromToken}
              availableToSwap
            />
          </div>
          <div className="bg-gray-100 dark:bg-opacity-5 rounded-[16px] flex p-[14px] items-center max-h-[52px]">
            <Button
              variant="outline"
              className="p-0 flex gap-x-1 items-center min-w-[100px]"
              onClick={() => {
                setOpenFromTokenDropdown(!openFromTokenDropdown);
                setOpenFromNetworkDropdown(false);
                setOpenToNetworkDropdown(false);
                setOpenToTokenDropdown(false);
                setOpenSwapMethodDropdown(false);
              }}
            >
              {fromToken ? (
                chainNetworkList
                  .flatMap((y: any) => y.assets)
                  .find((x) => x.name === fromToken)?.shortName && (
                  <Image
                    width={24}
                    height={24}
                    src={
                      AssetImages[
                        chainNetworkList
                          .flatMap((y: any) => y.assets)
                          .find((x) => x.name === fromToken)?.shortName
                      ] || ""
                    }
                    alt="image"
                    className="h-6 w-6"
                  />
                )
              ) : (
                <div className="w-6 h-6 rounded-3xl bg-secondary dark:bg-white/30" />
              )}
              <span
                className={cn(
                  "font-500 leading-4 text-16 text-blue-300 dark:text-white",
                  !fromToken && "text-gray-300"
                )}
              >
                {fromToken
                  ? chainNetworkList
                      .flatMap((y: any) => y.assets)
                      .find((x) => x.name === fromToken)?.shortName
                  : "Select"}
              </span>
              <div
                className={cn(
                  "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-white/10 flex justify-center items-center text-secondary rotate-180",
                  openFromTokenDropdown && "bg-blue-300 text-white rotate-0"
                )}
              >
                <UilAngleUp className="h-6 w-6" />
              </div>
            </Button>
            <hr className="w-8 rotate-90 border-1 border-secondary m-0 p-0" />
            <Input
              type="number"
              className="w-full !p-0 border-none text-16 font-500 placeholder:text-gray-300 placeholder:text-16 leading-10 tracking-[-0.8px] text-blue-300 rounded-[5px] py-0"
              placeholder="0.00"
              value={swapAmount}
              onChange={(e) => setSwapAmount(e.target.value)}
            />
            <TokenDropDown
              openTokenDropdown={openFromTokenDropdown}
              setOpenTokenDropdown={setOpenFromTokenDropdown}
              tokenValue={fromToken}
              setTokenValue={setFromToken}
              className={"ml-0 mt-6 sm:!mr-[-10px]"}
              align={"end"}
              networkValue={fromNetwork}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 dark:text-white/30 text-12 font-500 leading-4">
              Available {getFromAssetMutation?.data?.balance || 0}{" "}
              {getFromAssetMutation?.data?.shortName || ""}
            </span>
            <div className="flex gap-x-2">
              <PercentageButton
                percentage={25}
                onClick={() => handleAmountChange(25)}
                disabled={getFromAssetMutation?.isLoading}
              />
              <PercentageButton
                percentage={50}
                onClick={() => handleAmountChange(50)}
                disabled={getFromAssetMutation?.isLoading}
              />

              <PercentageButton
                percentage={100}
                onClick={() => handleAmountChange(100)}
                disabled={getFromAssetMutation?.isLoading}
              />
            </div>
          </div>
          {getSwapEstimateMutation?.data?.error && (
            <span className="text-danger-100 text-12 font-500 leading-4">
              {getSwapEstimateMutation?.data?.error || "Something went wrong!"}
            </span>
          )}
        </div>
        <div className="my-1 items-center grid grid-cols-[1fr_auto_1fr] gap-x-2 relative">
          <hr
            className={cn(
              "w-full max-w-[184px] border-1 border-secondary",
              exchangeAnimation && "exchange-hr-animation"
            )}
          />
          <div className="absolute aspect-square w-[55px] h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className={cn(
                "w-full h-full rounded-full",
                exchangeAnimation && "exchange-btn-animation"
              )}
            />
          </div>
          <Button
            variant={"outline"}
            className={cn(
              "p-0 h-10 w-10 flex justify-center items-center rounded-3xl bg-gray-100 dark:bg-opacity-5 hover:bg-blue-300 hover:text-white hover:rotate-180 hover:transition ease-in-out z-20",
              exchangeAnimation && "scale-125"
            )}
            onClick={handleExchange}
            disabled={getSwapEstimateMutation?.isLoading}
          >
            <IconExchange strokeWidth={1.2} />
          </Button>
          <hr
            className={cn(
              "w-full max-w-[184px] border-1 border-secondary rotate-180",
              exchangeAnimation && "exchange-hr-animation"
            )}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between">
            <div className="flex gap-x-2">
              <span className="text-gray-300 dark:text-white/30 text-12 font-500 leading-6">
                To
              </span>
              <Button
                variant="outline"
                className="p-0 flex gap-x-1 items-center"
                onClick={() => {
                  setOpenToNetworkDropdown(!openToNetworkDropdown);
                  setOpenFromNetworkDropdown(false);
                  setOpenFromTokenDropdown(false);
                  setOpenToTokenDropdown(false);
                  setOpenSwapMethodDropdown(false);
                }}
              >
                {toNetwork ? (
                  chainNetworkList.find((x) => x.name === toNetwork)
                    ?.shortName && (
                    <Image
                      width={16}
                      height={16}
                      src={
                        AssetImages[
                          chainNetworkList.find((x) => x.name === toNetwork)
                            ?.shortName
                        ]
                      }
                      alt="image"
                    />
                  )
                ) : (
                  <div className="w-4 h-4 rounded-3xl bg-secondary dark:bg-white/30" />
                )}
                <span
                  className={cn(
                    "font-500 leading-4 text-12 text-blue-300 dark:text-white",
                    !toNetwork && "text-gray-300"
                  )}
                >
                  {toNetwork
                    ? chainNetworkList.find((x) => x.name === toNetwork)
                        ?.shortName
                    : "Select"}
                </span>
                <div
                  className={cn(
                    "h-4 w-4 rounded-3xl bg-white flex justify-center items-center text-secondary rotate-180 dark:bg-white/10",
                    openToNetworkDropdown &&
                      "bg-blue-300 text-white rotate-0 dark:text-white"
                  )}
                >
                  <UilAngleUp className="h-4 w-4" />
                </div>
              </Button>
            </div>
            <NetworkDropdown
              networkValue={toNetwork}
              setNetworkValue={setToNetwork}
              openNetworkDropdown={openToNetworkDropdown}
              setOpenNetworkDropdown={setOpenToNetworkDropdown}
              className={"ml-0 sm:!mr-[-10px]"}
              align={"end"}
              setTokenValue={setToToken}
              availableToSwap
            />
          </div>

          <div
            className={cn(
              "relative bg-gray-100 dark:bg-white dark:bg-opacity-5 rounded-t-[16px] rounded-b-[16px] flex p-[14px] items-center max-h-[52px] z-20",
              getSwapEstimateMutation?.isLoading &&
                "dark:bg-gray-450 dark:bg-opacity-100"
            )}
          >
            <Button
              variant="outline"
              className="p-0 flex gap-x-1 items-center min-w-[100px]"
              onClick={() => {
                setOpenToTokenDropdown(!openToTokenDropdown);
                setOpenFromNetworkDropdown(false);
                setOpenFromTokenDropdown(false);
                setOpenToNetworkDropdown(false);
                setOpenSwapMethodDropdown(false);
              }}
            >
              {toToken ? (
                chainNetworkList
                  .flatMap((y: any) => y.assets)
                  .find((x) => x.name === toToken)?.shortName && (
                  <Image
                    width={24}
                    height={24}
                    src={
                      AssetImages[
                        chainNetworkList
                          .flatMap((y: any) => y.assets)
                          .find((x) => x.name === toToken)?.shortName
                      ] || ""
                    }
                    alt="image"
                    className="h-6 w-6"
                  />
                )
              ) : (
                <div className="w-6 h-6 rounded-3xl bg-secondary dark:bg-white/30" />
              )}
              <span
                className={cn(
                  "font-500 leading-4 text-16 text-blue-300 dark:text-white",
                  !toToken && "text-gray-300"
                )}
              >
                {toToken
                  ? chainNetworkList
                      .flatMap((y: any) => y.assets)
                      .find((x) => x.name === toToken)?.shortName
                  : "Select"}
              </span>
              <div
                className={cn(
                  "h-6 w-6 rounded-3xl bg-gray-100 dark:bg-opacity-5 flex justify-center items-center text-secondary rotate-180",
                  openToTokenDropdown && "bg-blue-300 text-white rotate-0"
                )}
              >
                <UilAngleUp className="h-6 w-6" />
              </div>
            </Button>
            <hr className="w-8 rotate-90 border-1 border-secondary m-0 p-0" />
            {getSwapEstimateMutation?.isLoading ? (
              <div className="animate-pulse">
                <div className="w-[200px] rounded-[70px] h-6" />
              </div>
            ) : (
              <Input
                type="number"
                className="w-full !p-0 border-none text-16 font-500 placeholder:text-gray-300 placeholder:text-16 leading-10 tracking-[-0.8px] text-blue-300 rounded-[5px] py-0 pointer-events-none"
                placeholder="0.00"
                value={
                  getSwapEstimateMutation?.isLoading
                    ? ""
                    : getSwapEstimateMutation?.data?.outputAmount
                }
              />
            )}
            <TokenDropDown
              openTokenDropdown={openToTokenDropdown}
              setOpenTokenDropdown={setOpenToTokenDropdown}
              tokenValue={toToken}
              setTokenValue={setToToken}
              className={"sm:!mr-[-10px] ml-0 mt-6"}
              align={"end"}
              networkValue={toNetwork}
            />
          </div>
          <div className="relative overflow-hidden rounded-b-[16px] h-7 mt-[-38px]">
            <div className="absolute aspect-square w-full max-w-[478px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div
                className={cn(
                  "w-full h-full rounded-[16px]",
                  getSwapEstimateMutation?.isLoading &&
                    "swap-amount-loading-animation"
                )}
              />
            </div>
          </div>
          <span className="text-gray-300 dark:text-white/30 text-12 font-500 leading-4">
            Available {getToAssetMutation?.data?.balance || 0}{" "}
            {getToAssetMutation?.data?.shortName || ""}
          </span>
          {getSwapEstimateMutation?.data && (
            <span className="text-gray-300 text-12 font-500 leading-4">
              Exchange Fee{" "}
              {Number(getSwapEstimateMutation?.data?.feeAmount?.toFixed(8))}{" "}
              {getFromAssetMutation?.data?.shortName}
            </span>
          )}
        </div>
        <Button
          className="px-6 py-4 text-16 font-700 leading-5 mt-4 mb-0 sm:mb-5 w-fit self-center"
          onClick={handlePreviewSwap}
          disabled={
            getSwapEstimateMutation?.data?.error ||
            getSwapEstimateMutation?.isLoading ||
            getFromAssetMutation?.data?.balance === 0 ||
            swapAmount > getFromAssetMutation?.data?.balance ||
            !fromNetwork ||
            !toNetwork ||
            !fromToken ||
            !toToken ||
            !swapAmount
          }
        >
          Preview Swap
        </Button>
      </div>
    </CustomModal>
  );
};

export default SwapCryptoModal;
