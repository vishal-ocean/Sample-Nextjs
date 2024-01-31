import { UserData } from "@/backend/KYC/users";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { KYCStatus } from "@prisma/client";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

interface InterfaceUserDetails {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: {
    countryCode?: string;
    number?: string;
  };
  dateOfBirth?: {
    year?: string;
    month?: string;
    day?: string;
  };
  emailVerification?: {
    dateExpires?: any;
  };
  mobileVerification?: {
    dateExpires?: any;
  };
  occupation?: string;
  sourceOfFunds?: string;
  purposeOfAccount?: string;
  selfPepDeclaration?: boolean;
  placeOfBirth?: string;
  expectedIncomingTxVolumeYearly?: string;
  expectedOutgoingTxVolumeYearly?: string;
  KYC?: {
    emailVerified?: boolean;
    mobileVerified?: boolean;
    status?: KYCStatus;
    details?: any;
    rejectionComments?: any;
  };
  userId?: string;
  createdAt?: any;
  sourceOfFundsOther?: string;
  purposeOfAccountOther?: string;
  address?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    country?: string;
  };
}

interface KYCContext {
  userDetails: InterfaceUserDetails | null;
  loadingUserDetailsFromStriga: boolean;
  strigaId: string | null;
  setStrigaId: (id: string | null) => void;
  refreshUserDetails: () => void;
  getSumSubToken: UseMutationResult<any, unknown, any>;
  sumSubToken: string | null;
  userEmail: string | null;
  updateUserDataInStriga: UseMutationResult<any, unknown, any>;
  registerUserDataInStriga: UseMutationResult<any, unknown, any>;
  stage: KYC_STEP;
  changeStep: (step: KYC_STEP) => void;
  sendDataToStriga: (data: {
    endpoint: string;
    method: string;
    data: any;
  }) => Promise<any>;
}

interface UserIdType {
  userId: string;
}

export enum KYC_STEP {
  Loading,
  Register,
  Verification,
  Occupation,
  Address,
  Sumsub,
  Error,
}

export const KYCContext = createContext<KYCContext | undefined>(undefined);

export const KycContextProvider = ({
  children,
  userData,
}: {
  children: ReactNode;
  userData: UserData;
}) => {
  const [strigaId, setStrigaId] = useState<string | null>(userData.strigaId);

  const userEmail = userData.email;

  const [sumSubToken, setSumSubToken] = useState<string | null>(null);

  const [userDetails, setUserDetails] = useState<InterfaceUserDetails | null>(
    null
  );

  const [stage, setStage] = useState<KYC_STEP>(
    userData.strigaId ? KYC_STEP.Loading : KYC_STEP.Register
  );

  const sendDataToStriga = async (data: {
    endpoint: string;
    method: string;
    data: any;
  }) => {
    return await axios.post("/api/kyc/striga", data);
  };

  const getUserDataFromStriga = useMutation(
    async (data: UserIdType) => {
      const response = await sendDataToStriga({
        endpoint: "/user",
        method: "GET",
        data: data,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.data) {
          setUserDetails(data.data);
        }
      },
    }
  );

  const getSumSubToken = useMutation(
    async () => {
      const response = await sendDataToStriga({
        endpoint: "/user/kyc/start",
        method: "POST",
        data: {
          userId: strigaId,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.data.token) {
          setSumSubToken(data.data.token);
        } else {
          setStage(KYC_STEP.Error);
        }
      },
      onError: (error) => {
        setStage(KYC_STEP.Error);
      },
    }
  );

  const updateUserDataInStriga = useMutation(
    async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/user/update",
        method: "PATCH",
        data: {
          userId: strigaId,
          ...data,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setUserDetails(data.data);
      },
      onError: (error: any) => {
        if (
          error.response.data.type === "strigaError" &&
          error.response.data.data.errorCode == "00002"
        ) {
          const { message, errorDetails } = error.response.data.data;
          errorDetails.map((item: any) => {
            toast.error(
              <CustomToastMessage
                message={message}
                subText={`${item.msg} for ${item.param}`}
              />
            );
          });
        }
      },
    }
  );

  const registerUserDataInStriga = useMutation(
    async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/user/create",
        method: "POST",
        data: {
          ...data,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setStrigaId(data.data.userId);
        refreshUserDetails(data.data.userId);
        // setUserDetails(data.data);
      },
      onError: (error: any) => {
        if (
          error.response.data.type === "strigaError" &&
          error.response.data.data.errorCode == "00002"
        ) {
          const { message, errorDetails } = error.response.data.data;
          errorDetails.map((item: any) => {
            toast.error(
              <CustomToastMessage
                message={message}
                subText={`${item.msg} for ${item.param}`}
              />
            );
          });
        }
      },
    }
  );

  const refreshUserDetails = async (_strigaId?: string) => {
    if (strigaId || _strigaId) {
      return await getUserDataFromStriga.mutate({
        userId: strigaId || (_strigaId as string),
      });
    }
  };

  useEffect(() => {
    refreshUserDetails();
  }, []);

  useMemo(() => {
    const emailVerified = userDetails?.KYC?.emailVerified;
    const mobileVerified = userDetails?.KYC?.mobileVerified;

    if (userDetails) {
      if (emailVerified === false || mobileVerified === false) {
        setStage(KYC_STEP.Verification);
      } else if (!userDetails.purposeOfAccount) {
        setStage(KYC_STEP.Occupation);
      } else if (!userDetails.address) {
        setStage(KYC_STEP.Address);
      } else {
        setStage(KYC_STEP.Sumsub);
      }
    }
  }, [userDetails]);

  const changeStep = (step: KYC_STEP) => {
    setStage(step);
  };

  const contextValue: KYCContext = {
    userDetails,
    strigaId,
    setStrigaId,
    refreshUserDetails,
    loadingUserDetailsFromStriga: getUserDataFromStriga.isLoading,
    getSumSubToken,
    sumSubToken,
    userEmail,
    updateUserDataInStriga,
    registerUserDataInStriga,
    stage,
    changeStep,
    sendDataToStriga,
  };

  return (
    <KYCContext.Provider value={contextValue}>{children}</KYCContext.Provider>
  );
};

export const useKYCContext = (): KYCContext => {
  const context = useContext(KYCContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
