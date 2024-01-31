import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { KYC_STEP, useKYCContext } from "./KycContextProvider";

import { Button } from "@/components/UI/Button";
import { UilCheckCircle, UilInfoCircle } from "@/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface VerificationProps {
  type: "email" | "mobile";
}

const calculateRemainingTime = (deadline: Date) => {
  const currentTime = new Date().getTime();
  const remainingTime = deadline.getTime() - currentTime;

  if (remainingTime <= 0) {
    return "Countdown expired";
  }

  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  return `${minutes}m ${seconds}s`;
};

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is required"),
});

type ValidationSchemaType = Yup.InferType<typeof validationSchema>;

const Verification = ({ type }: VerificationProps) => {
  const { userDetails, strigaId, refreshUserDetails, sendDataToStriga } =
    useKYCContext();

  const email = userDetails?.email;
  const emailVerification = userDetails?.emailVerification;
  const mobileVerification = userDetails?.mobileVerification;
  const countryCode = userDetails?.mobile?.countryCode;
  const number = userDetails?.mobile?.number;
  const emailVerified = userDetails?.KYC?.emailVerified;
  const mobileVerified = userDetails?.KYC?.mobileVerified;

  const [verificationComplete, setVerificationComplete] = useState(
    (type === "email" ? emailVerified : mobileVerified) || false
  );

  const verificationData =
    type === "email" ? emailVerification : mobileVerification;

  const [deadLine, setDeadline] = useState(
    verificationData ? verificationData.dateExpires : null
  );

  const [remainingTime, setRemainingTime] = useState(
    verificationData
      ? calculateRemainingTime(new Date(verificationData?.dateExpires))
      : null
  );
  const [countdownEnded, setCountdownEnded] = useState(false);

  const handleMutationError = (error: any) => {
    if (error?.response.data.type === "strigaError") {
      toast.error(error.response.data.data.message);
    }
  };

  const verify = useMutation(
    async (data: {
      endpoint: string;
      data: {
        verificationCode?: string;
        verificationId?: string;
        userId: string;
      };
    }) => {
      const response = await sendDataToStriga({
        method: "POST",
        ...data,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.data === "Accepted") {
          setVerificationComplete(true);
          setRemainingTime(null);
          setCountdownEnded(true);
          setDeadline(null);
          refreshUserDetails();
        }
      },
      onError: handleMutationError,
    }
  );

  const resendCode = useMutation(
    async () => {
      const response = await sendDataToStriga({
        method: "POST",
        endpoint: `/user/${type === "email" ? "resend-email" : "resend-sms"}`,
        data: {
          userId: strigaId as string,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setDeadline(data.data.dateExpires);
        setCountdownEnded(false);
        setRemainingTime(
          calculateRemainingTime(new Date(data.data.dateExpires))
        );
      },
      onError: handleMutationError,
    }
  );

  useEffect(() => {
    if (!verificationData) return;
    const timer = setInterval(() => {
      const newRemainingTime = calculateRemainingTime(new Date(deadLine));
      setRemainingTime(newRemainingTime);

      if (newRemainingTime === "Countdown expired") {
        setCountdownEnded(true);
        clearInterval(timer);
      }
    }, 1000);

    if (deadLine === null) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [deadLine, verificationData]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const verifyCode = async (data: ValidationSchemaType) => {
    const verifyData = {
      endpoint: `/user/${type === "email" ? "verify-email" : "verify-mobile"}`,
      data: {
        userId: strigaId as string,
        [type === "email" ? "verificationId" : "verificationCode"]:
          data.verificationCode,
      },
    };
    await verify.mutate(verifyData);
  };

  if (verificationComplete) {
    return (
      <div className="bg-white p-8 rounded-[16px]">
        <div className="flex items-center gap-x-4">
          <UilCheckCircle className="h-8 w-8 text-success-200"></UilCheckCircle>
          <p>
            Your {type} verification is complete!
            <br />
            <span className="font-600 block text-20">
              {type === "email" ? email : countryCode + " " + number}
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (countdownEnded) {
    return (
      <div className="bg-white p-8 rounded-[16px]">
        <div>
          <p className="mb-4">
            <span className="text-danger-100">Verification code expired!</span>
            <br />
            <span className="font-600 block text-20">
              {type === "mobile" ? `${countryCode} ${number}` : `${email}`}
            </span>
          </p>
          <div className="flex justify-end">
            <Button
              type="button"
              className="ml-auto"
              onClick={() => resendCode.mutate()}
              isLoading={resendCode.isLoading}
            >
              Resend code on {type}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[16px]">
      <p className="mb-4">
        We have sent your 6 digit verification code to, <br />
        <span className="font-600 block text-20">
          {type === "mobile" ? `${countryCode} ${number}` : `${email}`}
        </span>
      </p>

      <form onSubmit={handleSubmit(verifyCode)}>
        <Controller
          control={control}
          name="verificationCode"
          render={({ field: { onChange, value } }) => (
            <div className="max-w-[416px] mx-auto mb-6">
              <OtpInput
                value={value}
                onChange={onChange}
                numInputs={6}
                containerStyle="!grid grid-cols-6 gap-x-2 mb-2"
                inputStyle="w-full aspect-square bg-gray-200 rounded-lg text-center text-20 font-500"
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

        {countdownEnded ? (
          <Button type="button" onClick={() => resendCode.mutate()}>
            {resendCode.isLoading ? "Sending..." : `Resend code on ${type}`}
          </Button>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-20 font-300">{remainingTime}</p>
              <Button type="submit" isLoading={verify.isLoading}>
                {`Verify ${type}`}
              </Button>
            </div>
            <div className="text-gray-300 text-12 flex items-start gap-x-1  leading-tight mt-4">
              <UilInfoCircle className="w-4 h-4" /> You can request a new code
              after the timer expires.
            </div>
          </>
        )}
      </form>
    </div>
  );
};

const VerificationStep = () => {
  const { userDetails, changeStep } = useKYCContext();

  const emailVerified = userDetails?.KYC?.emailVerified;
  const mobileVerified = userDetails?.KYC?.mobileVerified;
  return (
    <>
      <div className="grid grid-cols-12 items-end mb-10 p-4">
        <h1 className="text-24 font-500 col-span-7">
          Verify your contact information
        </h1>
        <p className="col-span-5 text-right text-12">2/4</p>
      </div>
      <div className="grid grid-cols-1 gap-y-5">
        <Verification type="email" />
        <Verification type="mobile" />
      </div>
      {emailVerified && mobileVerified && (
        <div className="flex items-center justify-between mt-10">
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => changeStep(KYC_STEP.Register)}
          >
            Back
          </Button>
          <Button type="button" onClick={() => changeStep(KYC_STEP.Occupation)}>
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default VerificationStep;
