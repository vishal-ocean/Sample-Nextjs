import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import { CustomInput } from '@/components/UI/form/CustomInput';
import {
  CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL,
  DELIVERY_METHOD_MODAL,
  SET_3DS_PASSWORD_MODAL
} from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilAngleLeft, UilBoltAlt, UilCreditCard, UilQuestion } from '@/icons';
import { useCreateCardsMutation } from '@/services/useStrigaCards';
import { useCardAction, useCardStore } from '@/store/cardDetails';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password must be at most 30 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
      /[!#&*(),.?:{}]/,
      "Password must contain at least one special character from '!', '#' ,'&' ,'*' ,'(' , ')' ,',', '.', '?' , ':' , '{' ,'}'"
    )
    .test(
      'no-invalid-chars',
      "Password must not contain '@','$', '%', '^', '|', '<', or '>'",
      (value) => !/[\\$%@^|<>]/.test(value)
    )
});
const Set3DsPasswordModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { cardActionDetails } = useCardStore();
  const { setCardActionDetails } = useCardAction;

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SET_3DS_PASSWORD_MODAL : '');
  };

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, touchedFields }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });
  const createCard: any = useCreateCardsMutation();
  useEffect(() => {
    reset({
      password: cardActionDetails.password
    });
  }, []);
  const { userWalletDetails, strigaUserFullDetails } = useUserDataStore();
  const handleCreateCard = (data: { password: string }) => {
    const submitData = {
      userId: strigaUserFullDetails?.userId,
      nameOnCard: `${strigaUserFullDetails?.firstName} ${strigaUserFullDetails?.lastName}`,
      threeDSecurePassword: data.password || cardActionDetails?.password,
      type: 'VIRTUAL',
      address: {
        addressLine1: strigaUserFullDetails?.address?.addressLine1,
        addressLine2: strigaUserFullDetails?.address?.addressLine2 ?? '',
        postalCode: strigaUserFullDetails?.address?.postalCode,
        city: strigaUserFullDetails?.address?.city,
        countryCode: strigaUserFullDetails?.address?.country
      },
      accountIdToLink:
        userWalletDetails?.accounts?.[cardActionDetails?.selectedCurrency]
          ?.accountId
    };
    createCard?.mutate(submitData);
  };

  const onSubmit = (data: { password: string }) => {
    setCardActionDetails({ password: data.password });
    cardActionDetails.selectedType === 'Physical'
      ? setHandleModal(DELIVERY_METHOD_MODAL)
      : handleCreateCard(data);
  };

  return (
    <CustomModal
      open={modalOpen === SET_3DS_PASSWORD_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 max-h-[600px] gap-8"
    >
      <div className="flex gap-x-2 items-center">
        <span
          className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15 cursor-pointer"
          onClick={() => setHandleModal(CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL)}
        >
          <UilAngleLeft className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
          {cardActionDetails.selectedType === 'Physical' ? (
            <UilCreditCard className="h-4 w-4 text-blue-300 dark:text-white" />
          ) : (
            <UilBoltAlt className="h-4 w-4 text-blue-300 dark:text-white" />
          )}
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          {`${cardActionDetails.selectedType} Card`}
        </span>
      </div>
      <div className="flex justify-between items-end  sm:px-3">
        <div>
          <span className="text-gray-300 text-16 leading-5 font-500 tracking-widest dark:text-white/30">
            {cardActionDetails.selectedType === 'Physical' ? '2/3' : ' 2/2'}
          </span>
          <p className="text-24 leading-7 font-500 text-blue-300 mt-3 dark:text-white">
            Set 3DS password <br />
            {`for ${cardActionDetails.selectedType} Card`}
          </p>
        </div>
        <div className="relative sm:block hidden">
          <Image
            width={134}
            height={80}
            src={`/images/small-${
              cardActionDetails.selectedType === 'Physical'
                ? 'physical'
                : 'virtual'
            }-card.png`}
            alt="image"
          />

          <span className="absolute top-[10px] left-[10px] text-[8px] leading-[10px] font-500 text-white">
            {cardActionDetails.selectedType}
          </span>
          <Image
            height={20}
            width={20}
            src={AssetImages[cardActionDetails.selectedCurrency]}
            alt="token-image"
            className="top-0 right-0 absolute"
          />
          <div className="absolute flex flex-row items-center bottom-[10px] left-[10px] gap-[1px]">
            <span className="text-[8px] leading-[10px] font-500 text-white">
              ****
            </span>
            <span className="text-[8px] leading-[10px] font-500 ml-[3px] text-white">
              0000
            </span>
          </div>
          <Image
            height={20}
            width={20}
            src="/images/svg/visa.svg"
            alt="image"
            className="absolute bottom-[10px] right-[10px]"
          />
        </div>
      </div>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className=" sm:px-3">
          <div className="flex flex-row">
            <p className="text-12  leading-4 font-500 text-gray-300  dark:text-white/30">
              3DS Password{' '}
            </p>

            <UilQuestion className="w-4 h-4 bg-secondary  dark:bg-white/15 rounded-full text-white ml-1 dark:text-blue-300" />
          </div>
          <div className="">
            <div className="mt-3">
              <CustomInput
                type="password"
                {...register('password')}
                placeholder="Enter password"
                error={errors?.password?.message}
                isValid={touchedFields.password && isDirty}
                className="bg-gray-100 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 placeholder:font-500"
              />
            </div>
          </div>
          <p className="text-12 leading-4 font-500 text-gray-300 mt-3 dark:text-white/30">
            At least 8 characters, one number, one uppercase character, one
            lowercase character, and one special character (
            !&quot;#;:?\\()+=^&amp;.,\[\]{'{}'}$ )
          </p>
        </div>

        <div className="flex justify-center mt-8 mb-3">
          <Button
            className="font-700 leading-5 text-16 rounded-3xl px-6 py-4"
            type="submit"
            isLoading={createCard?.isLoading}
          >
            {cardActionDetails.selectedType === 'Physical'
              ? 'Next'
              : 'Create Virtual Card'}
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default Set3DsPasswordModal;
