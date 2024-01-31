import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import CustomToastMessage from '@/components/UI/CustomToast/CustomToastMessage';
import { CustomInput } from '@/components/UI/form/CustomInput';
import {
  TERMINATE_CARD_CONFIRMATION_CODE_MODAL,
  TERMINATE_CARD_MODAL
} from '@/constants';
import { UilAngleLeft, UilTrashAlt } from '@/icons';
import { useCardAction } from '@/store/cardDetails';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  verificationCode: Yup.string()
    .required('This code is required.')
    .matches(/^[0-9]{6}$/, 'Code must be a 6-digit number.')
});
const ConfirmationCodeModal = ({
  currentCard,
  handleVerifyOtp,
  confirmationMutation,
  handleTerminateCard,
  terminateCardMutation
}: {
  currentCard: string;
  handleVerifyOtp: any;
  confirmationMutation: any;
  handleTerminateCard: any;
  terminateCardMutation: any;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { userCardDetails, strigaUserData } = useUserDataStore();
  const { setHandleModal } = useHandleModalAction;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setCardAuthToken } = useCardAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? TERMINATE_CARD_CONFIRMATION_CODE_MODAL : '');
  };

  const currentCardDetail = userCardDetails.find(
    (val: any) => val.type === currentCard
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, touchedFields }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const onSubmit = (data: any) => {
    handleVerifyOtp(data);
    setIsSubmitted(true);
  };
  useEffect(() => {
    if (!isSubmitted) {
      confirmationMutation?.reset();
      return;
    }
  }, [isSubmitted]);

  useEffect(() => {
    const handleAPICall = () => {
      if (isSubmitted && confirmationMutation.isError) {
        toast.error(
          <CustomToastMessage
            message={'Invalid OTP.'}
            subText={'Please try again.'}
          />,
          {
            toastId: 'otp-error'
          }
        );

        setIsSubmitted(false);
      } else if (isSubmitted && confirmationMutation?.data) {
        if (confirmationMutation?.isSuccess) {
          // currentCard === "PHYSICAL"
          //   ? setHandleModal(SUCCESSFULLY_TERMINATE_CARD_MODAL)
          // :
          handleTerminateCard({ cardId: currentCardDetail?.id }, currentCard);
        }
        setCardAuthToken(confirmationMutation?.data?.data?.cardAuthToken);
      }
    };

    handleAPICall();
  }, [
    isSubmitted,
    confirmationMutation?.isSuccess,
    confirmationMutation.isError
  ]);

  return (
    <CustomModal
      open={modalOpen === TERMINATE_CARD_CONFIRMATION_CODE_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 pr-3 sm:pr-5 max-h-[600px]"
    >
      <div className="flex gap-x-2 items-center">
        <span
          className="bg-secondary rounded-3xl h-10 w-10 flex justify-center items-center cursor-pointer dark:bg-white/15"
          onClick={() => setHandleModal(TERMINATE_CARD_MODAL)}
        >
          <UilAngleLeft className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <span className="bg-danger-100 rounded-3xl h-10 w-10 flex justify-center items-center">
          <UilTrashAlt className="h-4 w-4 text-white" />
        </span>
        <div className="flex flex-col">
          <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
            Terminate Card{' '}
          </span>
          <span className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
            {currentCard === 'PHYSICAL' ? 'Physical' : 'Virtual'}{' '}
            {currentCardDetail?.maskedCardNumber.substr(-7)}
          </span>
        </div>
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="px-3 mt-3"
      >
        <p className="text-blue-300 text-24 leading-7 font-500 dark:text-white">
          Enter confirmation code
          <br /> we sent to your email
        </p>
        <div className="mt-8">
          <p className="text-12  leading-4 font-500 text-gray-300  dark:text-white/30">
            Code
          </p>
          <div className="mt-3 relative">
            <CustomInput
              type="text"
              {...register('verificationCode')}
              placeholder=""
              error={errors?.verificationCode?.message}
              isValid={watch('verificationCode')?.length === 6}
              className="bg-gray-100 dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-center mt-8 mb-3">
          <Button
            className="font-700 leading-5 text-16 rounded-3xl px-6 py-4"
            type="submit"
            disabled={
              !!Object.keys(errors)?.length ||
              watch('verificationCode')?.length !== 6
            }
            isLoading={
              confirmationMutation?.isLoading ||
              terminateCardMutation?.isLoading
            }
          >
            Confirm
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default ConfirmationCodeModal;
