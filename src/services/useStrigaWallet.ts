import { STRIGA_UI_COMPONENT_OTP_MODAL } from "@/constants";
import { useCardAction } from "@/store/cardDetails";
import { useHandleModalAction } from "@/store/handleModal";
import { useCryptoStoreActions } from "@/store/useCryptoStore";
import { useNeoBankingAction } from "@/store/useNeoBankingStore";
import { useUserDataAction } from "@/store/userDataStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendDataToStriga = async (data: {
  endpoint: string;
  method: string;
  data: any;
}) => {
  return await axios.post("/api/kyc/striga/wallet", data);
};

export const useGetWalletsMutation = () => {
  const { setUserWalletDetails } = useUserDataAction;
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/wallets/get/all",
      method: "POST",
      data: data,
    });
    setUserWalletDetails(response?.data?.data?.wallets?.[0]);
    return response.data;
  });
};

export const useGetAccountByIdMutation = () => {
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/wallets/get/account",
      method: "POST",
      data: data,
    });

    return response.data;
  });
};

export const useGetTransactionsByAccountMutation = () => {
  const { setTransactions } = useNeoBankingAction;
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/wallets/get/account/statement",
      method: "POST",
      data: data,
    });
    setTransactions(
      response?.data?.data?.transactions?.map((val: any) => {
        return {
          timestamp: val.timestamp,
          balanceBefore: val.balanceBefore,
          balanceAfter: val.balanceAfter,
        };
      })
    );
    return response.data;
  });
};

export const useGetAccountDetailsMutation = () => {
  const { setHandleModal } = useHandleModalAction;
  const { setCryptoStrigaWalletAddress } = useCryptoStoreActions;
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/wallets/account/enrich",
        method: "POST",
        data: data,
      });
      return response?.data;
    },
    onSuccess: (data) => {
      // setHandleModal(TRANSFER_CRYPTO_MODAL);
      setCryptoStrigaWalletAddress(data?.data?.blockchainDepositAddress);
    },
  });
};

export const useWithdrawInitiateMutation = () => {
  const { setWithdrawalDetails } = useUserDataAction;
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/wallets/send/initiate/bank",
      method: "POST",
      data: data,
    });
    setWithdrawalDetails(response?.data?.data);
    return response?.data;
  });
};

export const useStrigaWithdrawalOtpVerificationMutation = () => {
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/wallets/transaction/confirm",
      method: "POST",
      data: data,
    });
    return response?.data;
  });
};

export const useWhitelistDestinationAddressMutation = () => {
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/wallets/whitelist-address",
      method: "POST",
      data: data,
    });
    return response?.data;
  });
};

export const useWhitelistDestinationAddressListMutation = () => {
  const { setWhitelistAddressList } = useCardAction;
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/wallets/get/whitelisted-addresses",
      method: "POST",
      data: data,
    });
    setWhitelistAddressList(response?.data?.data);
    return response?.data;
  });
};

export const useWithdrawalFeeEstimateMutation = () => {
  const { setFeeEstimateData } = useCardAction;

  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/wallets/send/initiate/onchain/fee-estimate",
      method: "POST",
      data: data,
    });
    setFeeEstimateData(response?.data?.data);
    return response?.data;
  });
};
export const useOnchainWithdrawalMutation = () => {
  const { setHandleModal } = useHandleModalAction;
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/wallets/send/initiate/onchain",
        method: "POST",
        data: data,
      });
      return response?.data;
    },
    onSuccess: (data) => {
      setHandleModal(STRIGA_UI_COMPONENT_OTP_MODAL);
    },
  });
};
