"use client";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { STRIGA_OTP_MODAL, SUCCESSFULLY_SEND_MODAL } from "@/constants";
import { UilLockAccess } from "@/icons";
import {
  useGetWalletsMutation,
  useStrigaWithdrawalOtpVerificationMutation,
} from "@/services/useStrigaWallet";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import * as Yup from "yup";
type ValidationSchemaType = Yup.InferType<typeof validationSchema>;

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is required"),
});

const StrigaOtpVerification = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const strigaWithdrawalOtpVerificationMutation =
    useStrigaWithdrawalOtpVerificationMutation();
  const { withdrawalDetails, strigaUserData } = useUserDataStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const getAllWallets = useGetWalletsMutation();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? STRIGA_OTP_MODAL : "");
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
    strigaWithdrawalOtpVerificationMutation.mutate({
      userId: withdrawalDetails?.transaction?.syncedOwnerId,
      challengeId: withdrawalDetails?.challengeId,
      verificationCode: data.verificationCode,
      ip: "127.0.0.1",
    });
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (strigaWithdrawalOtpVerificationMutation?.data) {
      setHandleModal(SUCCESSFULLY_SEND_MODAL);
      getAllWallets.mutate({
        userId: strigaUserData.strigaId,
        startDate: moment().subtract(2, "years").format("x"),
        endDate: moment().format("x"),
        page: 1,
      });
    }
  }, [strigaWithdrawalOtpVerificationMutation]);
  useEffect(() => {
    const handleWithdrawalError = () => {
      if (isSubmitted && strigaWithdrawalOtpVerificationMutation.isError) {
        toast.error(
          <CustomToastMessage
            message={"Invalid OTP."}
            subText={"Please try again."}
          />,
          {
            toastId: "otp-error",
          }
        );

        setIsSubmitted(false);
      }
    };

    handleWithdrawalError();
  }, [isSubmitted, strigaWithdrawalOtpVerificationMutation]);
  return (
    <CustomModal
      open={modalOpen === STRIGA_OTP_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[656px] p-5"
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
        <div className="bg-white dark:bg-transparent p-8 rounded-[16px]">
          <p className="mb-7 font-500 text-blue-300 dark:text-white leading-4">
            Enter the 6-digit code received via SMS or Email.
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
                    inputStyle="w-full aspect-square h-[120%] border border-gray-300 rounded-lg text-center text-20 font-500 focus-visible:outline-primary"
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
            <Button
              className="font-700 leading-5 px-4 py-3 rounded-[12px]"
              type="submit"
              disabled={
                Boolean(errors.verificationCode?.message) ||
                !watch("verificationCode") ||
                watch("verificationCode").length < 6 ||
                strigaWithdrawalOtpVerificationMutation?.isLoading
              }
            >
              {strigaWithdrawalOtpVerificationMutation?.isLoading
                ? "Loading..."
                : "Verify Code"}
            </Button>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default StrigaOtpVerification;
