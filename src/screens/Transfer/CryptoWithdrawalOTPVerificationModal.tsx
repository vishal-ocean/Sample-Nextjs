"use client";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { CRYPTO_WITHDRAWAL_OTP_VERIFICATION_MODAL } from "@/constants";
import { UilLockAccess } from "@/icons";
import {
  useResendOTPMutation,
  useWithdrawConfirmation,
} from "@/services/useCrypto";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import * as Yup from "yup";
type ValidationSchemaType = Yup.InferType<typeof validationSchema>;

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is required"),
});

const CryptoWithdrawalOTPVerificationModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const withdrawConfirmationMutation: any = useWithdrawConfirmation();
  const [seconds, setSeconds] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(true);
  const resendCode = useResendOTPMutation();

  useEffect(() => {
    if (seconds === 0) {
      setIsActive(false);
    }
    let interval: any;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount or when isActive is false
  }, [isActive, seconds]);

  const handleResendOtp = () => {
    resendCode.mutate();
    setIsActive(true);
    setSeconds(300);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CRYPTO_WITHDRAWAL_OTP_VERIFICATION_MODAL : "");
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const verifyCode = (data: ValidationSchemaType) => {
    withdrawConfirmationMutation.mutate({
      code: data?.verificationCode,
    });
  };
  return (
    <CustomModal
      open={modalOpen === CRYPTO_WITHDRAWAL_OTP_VERIFICATION_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[656px] p-5"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilLockAccess className="h-4 w-4 text-white" />
          </span>
          <p className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
            Code Verification
          </p>
        </div>
      </div>
      <div className="text-center mx-auto flex flex-col">
        <p className="mb-7 font-500 text-blue-300 dark:text-white leading-4">
          Enter the 6-digit code from your 2-factor authentication (2FA) app.
        </p>
        <form onSubmit={handleSubmit(verifyCode)}>
          <Controller
            control={control}
            name="verificationCode"
            render={({ field: { onChange, value } }) => (
              <div className="max-w-[350px] mx-auto mb-6">
                <OTPInput
                  value={value}
                  onChange={onChange}
                  numInputs={6}
                  containerStyle="!grid grid-cols-6 gap-x-2 mb-2"
                  inputStyle="w-full aspect-square h-[120%] border border-gray-300 rounded-lg text-center text-20 font-500 focus-visible:outline-primary dark:text-white"
                  skipDefaultStyles
                  renderInput={(props) => <input {...props} />}
                />
                {errors.verificationCode?.message && (
                  <p className="mb-2 p-0 text-12 font-500 leading-[120%] text-danger-100">
                    {errors.verificationCode?.message}
                  </p>
                )}
              </div>
            )}
          ></Controller>
          {isActive ? (
            <>
              <p className="text-14 font-500 text-blue-300 dark:text-white">
                {formatTime(seconds)}
              </p>
              <Button
                className="font-700 leading-5 px-4 py-3 rounded-[12px]"
                type="submit"
                disabled={
                  Boolean(errors.verificationCode?.message) ||
                  !watch("verificationCode") ||
                  watch("verificationCode").length < 6 ||
                  withdrawConfirmationMutation?.isLoading
                }
              >
                {withdrawConfirmationMutation?.isLoading
                  ? "Loading..."
                  : "Verify Code"}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="font-700 leading-5 px-4 py-3 rounded-[12px]"
              onClick={handleResendOtp}
            >
              {resendCode.isLoading ? "Sending..." : `Resend code`}
            </Button>
          )}
        </form>
      </div>
    </CustomModal>
  );
};

export default CryptoWithdrawalOTPVerificationModal;
