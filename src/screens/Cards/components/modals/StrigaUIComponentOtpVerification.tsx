'use client';
import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import CustomToastMessage from '@/components/UI/CustomToast/CustomToastMessage';
import { STRIGA_UI_COMPONENT_OTP_MODAL } from '@/constants';
import { UilLockAccess } from '@/icons';
import { useCardAction } from '@/store/cardDetails';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import OTPInput from 'react-otp-input';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
type ValidationSchemaType = Yup.InferType<typeof validationSchema>;

interface StrigaUIComponentOtpVerification {
  handleVerifyOtp: (data: ValidationSchemaType) => void;
  confirmationMutation: any;
  showModal: string;
}
const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required('Verification code is required')
});

const StrigaUIComponentOtpVerification = ({
  handleVerifyOtp,
  confirmationMutation,
  showModal
}: StrigaUIComponentOtpVerification) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { setCardAuthToken } = useCardAction;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? STRIGA_UI_COMPONENT_OTP_MODAL : '');
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const verifyCode = (data: ValidationSchemaType) => {
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
        setCardAuthToken(confirmationMutation?.data?.data?.cardAuthToken);
        setHandleModal(showModal);
      }
    };

    handleAPICall();
  }, [isSubmitted, confirmationMutation]);
  return (
    <CustomModal
      open={modalOpen === STRIGA_UI_COMPONENT_OTP_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilLockAccess className="h-4 w-4 text-white" />
          </span>
          <p className="text-12 text-blue-300 dark:text-white font-500 leading-4">
            OTP Verification
          </p>
        </div>
      </div>
      <div className="text-center mx-auto flex flex-col">
        <div className="bg-white dark:bg-transparent sm:p-8 rounded-[16px] pt-3">
          <p className="mb-7 font-500 text-blue-300 dark:text-white leading-7 text-24">
            Enter the 6-digit code <br /> received via SMS or Email.
          </p>
          <form onSubmit={handleSubmit(verifyCode)}>
            <Controller
              control={control}
              name="verificationCode"
              render={({ field: { onChange, value } }) => (
                <div className="max-w-[328px] mx-auto mb-8">
                  <OTPInput
                    value={value}
                    onChange={onChange}
                    numInputs={6}
                    inputType="number"
                    containerStyle="!grid grid-cols-6 gap-x-2 mb-2"
                    inputStyle="bg-transparent w-full rounded-lg  aspect-square h-[120%] border border-solid	 border-secondary dark:border-white/15 rounded-lg text-center text-20 font-500 focus-visible:outline-primary"
                    skipDefaultStyles
                    renderInput={(props) => <input {...props} />}
                  />
                  {errors.verificationCode?.message && (
                    <p className="mb-2 p-0 text-12 font-500 leading-[120%] text-danger-100 ">
                      {errors.verificationCode?.message}
                    </p>
                  )}
                </div>
              )}
            ></Controller>
            <Button
              className="font-700 leading-5 px-6 py-4 rounded-3xl "
              type="submit"
              disabled={
                Boolean(errors.verificationCode?.message) ||
                !watch('verificationCode') ||
                watch('verificationCode').length < 6 ||
                confirmationMutation?.isLoading
              }
            >
              {confirmationMutation?.isLoading ? 'Loading...' : 'Verify'}
            </Button>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default StrigaUIComponentOtpVerification;
