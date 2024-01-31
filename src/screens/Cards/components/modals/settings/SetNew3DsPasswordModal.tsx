import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import { CustomInput } from '@/components/UI/form/CustomInput';
import { IconDots } from '@/components/icons/IconDots';
import { CARD_SETTINGS_MODAL, SET_NEW_CARD_3DS_PASSWORD } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilAngleLeft, UilSetting, UilTimes } from '@/icons';
import { useSetNew3DsPasswordMutation } from '@/services/useStrigaCards';
import { useCardAction } from '@/store/cardDetails';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import { cn } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required('New password is required')
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
    ),
  repeatPassword: Yup.string()
    .required('Repeat password is required')
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
    .oneOf(
      [Yup.ref('newPassword')],
      'New password and repeat password must match'
    )
});
const SetNew3DsPasswordModal = ({ currentCard }: { currentCard: string }) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { setCardActionDetails } = useCardAction;
  const { userCardDetails } = useUserDataStore();
  const setNew3dsPassword = useSetNew3DsPasswordMutation();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SET_NEW_CARD_3DS_PASSWORD : '');
  };

  const currentCardDetail = userCardDetails.find(
    (val: any) => val.type === currentCard
  );

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, touchedFields, isValid }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  //   useEffect(() => {
  //     reset({
  //       password: cardActionDetails.password,
  //     });
  //   }, []);

  const onSubmit = (data: any) => {
    setNew3dsPassword.mutate({
      cardId: currentCardDetail?.id,
      threeDSecurePassword: data.newPassword
    });
  };

  useEffect(() => {
    if (setNew3dsPassword?.data?.status) {
      setHandleModal('');
    }
  }, [setNew3dsPassword]);

  return (
    <CustomModal
      open={modalOpen === SET_NEW_CARD_3DS_PASSWORD}
      onOpenChange={handleOpenChange}
      withoutClose
      className="w-full p-5 max-w-[520px] sm:min-w-[520px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <span
            className={cn(
              'rounded-3xl h-10 w-10 flex justify-center items-center bg-secondary dark:bg-white/15 cursor-pointer'
            )}
            onClick={() => setHandleModal(CARD_SETTINGS_MODAL)}
          >
            <UilAngleLeft className="h-4 w-4 text-blue-300 dark:text-white" />
          </span>
          <span
            className={cn(
              'rounded-3xl h-10 w-10 flex justify-center items-center bg-secondary dark:bg-white/15'
            )}
          >
            <UilSetting className="h-4 w-4 text-blue-300 dark:text-white" />
          </span>
          <div>
            <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              Settings
            </p>
            <p className="text-12 text-gray-300 dark:text-white/30 font-500 leading-4 ">
              {currentCard === 'PHYSICAL' ? 'Physical' : 'Virtual'}{' '}
              {currentCardDetail?.maskedCardNumber.substr(-7)}
            </p>
          </div>
        </div>
        <div
          className="flex bg-secondary cursor-pointer dark:bg-white dark:bg-opacity-15 disabled:text-gray-300 text-black rounded-full !p-0 h-10 w-10 items-center"
          onClick={() => setHandleModal('')}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="sm:px-3 py-3">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-gray-300 text-16 leading-5 font-500 dark:text-white/30">
              3DS Password
            </span>
            <p className="text-24 leading-7 font-500 text-blue-300 mt-3 dark:text-white">
              Change 3DS password <br /> for{' '}
              {currentCardDetail.type === 'PHYSICAL' ? 'Physical' : 'Virtual'}{' '}
              card
            </p>
          </div>
          <div className="relative sm:block hidden">
            <Image
              width={134}
              height={80}
              src={`/images/small-${
                currentCardDetail.type === 'PHYSICAL' ? 'physical' : 'virtual'
              }-card.png`}
              alt="image"
            />

            <span className="absolute top-[10px] left-[10px] text-[8px] leading-[10px] font-500 text-white">
              {currentCardDetail.type === 'PHYSICAL' ? 'Physical' : 'Virtual'}
            </span>
            <Image
              height={20}
              width={20}
              src={AssetImages[currentCardDetail.linkedAccountCurrency]}
              alt="token-image"
              className="top-0 right-0 absolute"
            />
            <div className="absolute flex flex-row items-center bottom-[10px] left-[10px] gap-[1px]">
              <span className="text-[8px] leading-[10px] font-500 text-white flex gap-1 items-center">
                <IconDots className="h-3 w-3 fill-white" />
                {currentCardDetail.maskedCardNumber.substr(-4)}
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
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8"
        >
          <div className="mt-8">
            <p className="text-12  leading-4 font-500 text-gray-300  dark:text-white/30">
              Set New password
            </p>

            <div className="mt-3">
              <CustomInput
                type="password"
                {...register('newPassword')}
                placeholder="New password"
                error={errors?.newPassword?.message}
                isValid={touchedFields.newPassword && isDirty}
                className="bg-gray-100 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 placeholder:font-500"
              />
            </div>
            <p className="text-12 leading-4 font-500 text-gray-300 mt-3 dark:text-white/30">
              At least 8 characters, one number, one uppercase character, one
              lowercase character, and one special character (
              !&quot;#;:?\\()+=^&amp;.,\[\]{'{}'}$ )
            </p>
          </div>
          <div className="mt-5">
            <p className="text-12  leading-4 font-500 text-gray-300  dark:text-white/30">
              Repeat password
            </p>

            <div className="mt-3">
              <CustomInput
                type="password"
                {...register('repeatPassword')}
                placeholder="Repeat password"
                error={errors?.repeatPassword?.message}
                isValid={touchedFields.repeatPassword && isDirty}
                className="bg-gray-100 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 placeholder:font-500"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              className="font-700  text-16 rounded-3xl px-6 py-4 leading-5"
              type="submit"
              disabled={!isValid}
              isLoading={setNew3dsPassword?.isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default SetNew3DsPasswordModal;
