'use client';
import CustomModal from '@/components/CustomModal';
import AssetsDropDown from '@/components/ModalDropDowns/AssetsDropDown';
import NetworkDropdown from '@/components/ModalDropDowns/NetworkDropdown';
import Alert from '@/components/UI/Alert';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/form/Input';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import {
  YIELD_CONFIRM_WITHDRAW_MODAL,
  YIELD_CRYPTO_WITHDRAW_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilAngleUp, UilQuestion } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useCryptoStore } from '@/store/useCryptoStore';
import { cn } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';
const CryptoWithdrawModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [tokenValue, setTokenValue] = useState('');
  const { chainNetworkList } = useCryptoStore();
  const [networkValue, setNetworkValue] = useState('Ethereum');
  const [openAssetsDropDown, setOpenAssetsDropDown] = useState(false);
  const [openNetworkDropdown, setOpenNetworkDropdown] = useState(false);

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? YIELD_CRYPTO_WITHDRAW_MODAL : '');
  };
  return (
    <CustomModal
      open={modalOpen == YIELD_CRYPTO_WITHDRAW_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] md:translate-y-[-58%]"
    >
      <div className="flex gap-x-2 items-center">
        <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
          <IconTimeCoinDeposit
            className="h-4 w-4 text-white"
            strokeWidth={1.2}
          />
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          Withdraw Crypto
        </span>
      </div>
      <div className="mt-3">
        <Alert
          type="positive"
          title={`Maximize savings with BSC or Polygon`}
          subTitle="We handle the gas fees for you!  🌊"
        />
      </div>
      <div className="sm:px-7 flex flex-col gap-y-5 mt-6">
        <div>
          <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
            Asset
          </p>
          <div className="flex flex-col">
            <Button
              className="p-[14px] w-full sm:max-w-[396px] max-w-[94%] mt-3 rounded-[16px] bg-gray-100 flex justify-between items-center  dark:bg-white/5"
              onClick={() => {
                setOpenAssetsDropDown(!openAssetsDropDown);
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
                        ] || ''
                      }
                      alt="image"
                    />
                  )
                ) : (
                  <div className="w-6 h-6 rounded-3xl bg-secondary dark:bg-white/10 dark:bg-white/10" />
                )}
                <span
                  className={cn(
                    'font-700 leading-5 text-16 text-blue-300 dark:text-white',
                    !tokenValue && 'text-gray-300 dark:text-white/30'
                  )}
                >
                  {tokenValue
                    ? chainNetworkList
                        .flatMap((y: any) => y.assets)
                        .find((x) => x.name === tokenValue)?.name
                    : 'Select'}
                </span>
              </div>
              <div
                className={cn(
                  'h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-gray-300 rotate-180 dark:bg-transparent dark:text-white',
                  openAssetsDropDown &&
                    'bg-blue-300 text-white rotate-0 dark:bg-white dark:text-blue-300'
                )}
              >
                <UilAngleUp className="h-6 w-6" />
              </div>
            </Button>
            <AssetsDropDown
              openAssetsDropDown={openAssetsDropDown}
              setOpenAssetsDropDown={setOpenAssetsDropDown}
              tokenValue={tokenValue}
              setTokenValue={setTokenValue}
              className="mt-0"
              align={'center'}
              networkValue={networkValue}
            />
          </div>
        </div>
        <div>
          <p className="font-500 leading-4 text-12 text-gray-300 flex gap-x-1 items-center dark:text-white/30">
            Network
            <span className="flex justify-center items-center bg-secondary h-4 w-4 rounded-full dark:bg-white/10">
              <UilQuestion className="h-4 w-4 fill-white" />
            </span>
          </p>
          <div className="flex flex-col">
            <Button
              className="p-[14px] w-full sm:max-w-[396px] max-w-[94%] mt-3 rounded-[16px] bg-gray-100 flex justify-between items-center dark:bg-white/5"
              onClick={() => {
                setOpenNetworkDropdown(!openNetworkDropdown);
                setOpenAssetsDropDown(false);
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
                          chainNetworkList.find((x) => x.name === networkValue)
                            ?.shortName
                        ]
                      }
                      alt="image"
                    />
                  )
                ) : (
                  <div className="w-6 h-6 rounded-3xl bg-secondary dark:bg-white/10" />
                )}
                <span
                  className={cn(
                    'font-700 leading-5 text-16 text-blue-300 dark:text-white',
                    !networkValue && 'text-gray-300'
                  )}
                >
                  {networkValue
                    ? chainNetworkList.find((x) => x.name === networkValue)
                        ?.shortName
                    : 'Select'}
                </span>
              </div>
              <div
                className={cn(
                  'h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-gray-300 rotate-180 dark:text-white dark:bg-transparent',
                  openNetworkDropdown &&
                    'bg-blue-300 text-white rotate-0 dark:bg-white dark:text-blue-300'
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
              align={'center'}
              setTokenValue={setTokenValue}
            />
          </div>
        </div>
        <div>
          <p className="font-500 leading-4 text-12 text-gray-300 dark:text-white/30">
            Amount
          </p>
          <div className="flex justify-between ">
            <Input
              type="number"
              id="search-assets"
              className="input w-full leading-5 outline-none placeholder:text-16 placeholder:text-gray-300 dark:placeholder:text-white/30 placeholder:leading-5  placeholder:font-700 placeholder:font-body  text-16 font-500 font-body cursor-pointer text-blue-300  border-none rounded-[16px] mt-3 sm:mt-3 p-4 bg-gray-100 dark:bg-white/5 gap-x-6 dark:text-white"
              placeholder="0.00"
              step="any"
            />
          </div>
          <div className="mt-3 flex justify-between">
            <p className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Available 0.00
            </p>
            <span className="text-12 font-500 text-blue-300 leading-4 flex gap-x-2 dark:text-white">
              <span className="p-0 cursor-pointer">25%</span>
              <span className="p-0 cursor-pointer">50%</span>
              <span className="p-0 cursor-pointer">100%</span>
            </span>
          </div>
        </div>
        <Button
          className={cn(
            'bg-primary mb-1 mt-5 w-max sm:mb-7 leading-5 text-white font-700 flex justify-center mx-auto'
          )}
          // disabled={
          //   !tokenValue || !networkValue || getEstimateMutation.isLoading
          // }
          type="submit"
          onClick={() => setHandleModal(YIELD_CONFIRM_WITHDRAW_MODAL)}
        >
          Preview Withdraw
        </Button>
      </div>
    </CustomModal>
  );
};

export default CryptoWithdrawModal;
