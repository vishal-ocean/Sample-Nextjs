import CustomModal from '@/components/CustomModal';
import Alert from '@/components/UI/Alert';
import { Button } from '@/components/UI/Button';
import { PercentageButton } from '@/components/UI/PercentageButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/UI/Popover';
import { Input } from '@/components/UI/form/Input';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import { STAKING_MODAL } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilAngleUp, UilCheckCircle, UilQuestion } from '@/icons';
import { useGetAsset } from '@/services/useCrypto';
import {
  useActivateStakeMutation,
  usePreStakeMutation
} from '@/services/useStake';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useStakingStore, useStakingStoreAction } from '@/store/stakingStore';
import { cn } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const title: Record<string, string> = {
  ETH: 'Ethereum',
  USDT: 'Tether'
};

const validationSchema = Yup.object({
  amount: Yup.number()
    .typeError('Amount is required.')
    .required('Amount is required.'),
  duration: Yup.string().required('Duration is required.')
});
const StakingModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { selectedStake } = useStakingStore();
  const { setSelectedStake } = useStakingStoreAction;
  const getAssetMutation = useGetAsset();
  const preStakeMutation = usePreStakeMutation();
  const activateStakeMutation = useActivateStakeMutation();

  const [openDurationDropDown, setOpenDurationDropDown] = useState(false);
  const [duration, setDuration] = useState('30');

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? STAKING_MODAL : '');
  };

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      duration: '28'
    }
  });

  useEffect(() => {
    getAssetMutation.mutate(selectedStake?.assetId);
  }, [selectedStake]);

  useEffect(() => {
    if (Number(watch('amount')) > 0 && watch('duration')) {
      preStakeMutation?.mutate({
        duration: Number(watch('duration') || duration),
        stakeId: selectedStake?.stakeId,
        amount: Number(watch('amount')),
        currency: 'EUR'
      });
    }
  }, [watch('amount'), watch('duration')]);

  const handleAmountChange = async (percentage: number) => {
    setValue(
      'amount',
      (Number(getAssetMutation.data?.balance || 0) * percentage) / 100
    );
  };

  const onSubmit = (data: any) => {
    if (Number(data?.amount) > Number(getAssetMutation.data?.balance)) {
      toast.error('Insufficient funds for stake');
      return;
    }
    setSelectedStake({ ...selectedStake, ...data });
    activateStakeMutation?.mutate({
      userStakeId: preStakeMutation?.data?.userStakeId
    });
  };
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 !rounded-[24px] max-w-[520px]"
      open={modalOpen === STAKING_MODAL}
      onOpenChange={handleOpenChange}
    >
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 items-center">
        <Image
          src={AssetImages[selectedStake?.assetName || 'ETH']}
          height={40}
          width={40}
          alt="stake-icon"
        />
        <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center">
          <IconTimeCoinDeposit
            className="w-4 h-4 text-white"
            strokeWidth={1.2}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
            Stake {title[selectedStake?.assetName]}
          </span>
          <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            {selectedStake?.assetName}
          </span>
        </div>
      </div>
      <Alert
        type="warning"
        title="Warning alert title"
        subTitle="Warning alert subtitle"
      />
      <form className="mt-3 sm:mx-7 mx-0" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-3">
          <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
            Amount to Stake
          </span>
          <div className="relative">
            <span className="absolute top-[17px] left-4 text-16 font-700 text-gray-300 leading-5 z-10 dark:text-white/30">
              {selectedStake?.assetName}
            </span>
            <div className="relative">
              <Input
                className={cn(
                  'py-4 pl-[56px] rounded-[16px] text-16 font-700 bg-gray-100 text-blue-300 border-none leading-5 dark:text-white dark:bg-white/5',
                  errors?.amount?.message && '!top-[18px]'
                )}
                register={register('amount')}
                errorMessage={errors?.amount?.message}
                errorIconClass="!top-[18px]"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Available {getAssetMutation?.data?.balance || 0}{' '}
              {selectedStake?.assetName}
            </span>
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
        <div className="mt-8 flex flex-col gap-y-3">
          <div className="flex gap-x-1">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Stake Duration
            </span>
            <div className="h-4 w-4 bg-secondary rounded-full flex justify-center dark:bg-white/10">
              <UilQuestion className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="p-4 rounded-[16px] bg-gray-100 w-full flex justify-between cursor-pointer dark:bg-white/5"
              onClick={() => setOpenDurationDropDown(!openDurationDropDown)}
            >
              <span className="text-blue-300 font-700 leading-5 dark:text-white">
                {duration ? duration : 'Select'} days
              </span>
              <div
                className={cn(
                  'h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-blue-300 rotate-180 dark:text-white dark:bg-white/10',
                  openDurationDropDown &&
                    'bg-blue-300 text-white rotate-0 dark:bg-white dark:text-blue-300'
                )}
              >
                <UilAngleUp className="h-6 w-6" />
              </div>
            </div>
            <Popover
              open={openDurationDropDown}
              // onOpenChange={(e) => setOpenSwapMethodDropdown(e)}
            >
              <PopoverTrigger />
              <PopoverContent
                className={cn(
                  'sm:bg-secondary/50 bg-secondary sm:backdrop-blur-[16px] p-4 rounded-[16px] sm:w-[424px] w-[360px] mt-0 flex flex-col dark:bg-gray-250/10 dark:border-none'
                )}
                align={'center'}
              >
                {['30'].map((item, index) => (
                  <div
                    className="cursor-pointer text-14 font-700 leading-4 text-blue-300 flex justify-between dark:text-white py-3"
                    onClick={() => {
                      setOpenDurationDropDown(false);
                      setDuration(item);
                      setValue('duration', item);
                    }}
                    key={index}
                  >
                    <span>{item} days</span>
                    {duration === item && (
                      <UilCheckCircle className="text-primary h-4 w-4" />
                    )}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-y-3">
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Staking
            </span>
            <div className="flex gap-x-2">
              <Image
                src={AssetImages[selectedStake?.assetName]}
                height={16}
                width={16}
                alt="ETH"
              />
              <span className="text-12 font-500 text-blue-300 leading-4 dark:text-white">
                {title[selectedStake?.assetName]}
              </span>
            </div>
          </div>
          <hr className="dark:border-white/15" />
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              APY
            </span>

            <span className="text-12 font-500 text-blue-300 leading-4 dark:text-white">
              {selectedStake?.apy}
            </span>
          </div>
          <hr className="dark:border-white/15" />
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4 dark:text-white/30">
              Fee
            </span>
            {preStakeMutation?.isLoading ? (
              <div className="animate-pulse">
                <div className="h-3 w-6" />
              </div>
            ) : (
              <span className="text-12 font-500 text-blue-300 leading-4 dark:text-white">
                €{preStakeMutation?.data?.feeFiat || 0}
              </span>
            )}
          </div>
        </div>

        <div className="sm:mt-10 mt-[60px] mb-5 flex justify-center">
          <Button
            type="submit"
            className="rounded-full py-4 px-6 font-700 leading-5"
            disabled={
              preStakeMutation?.isLoading || activateStakeMutation?.isLoading
            }
          >
            Stake {title[selectedStake?.assetName]}
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default StakingModal;
