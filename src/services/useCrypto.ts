import {
  CRYPTO_WITHDRAWAL_OTP_VERIFICATION_MODAL,
  ID_TOKEN_COOKIE,
  OPERATION_ID_COOKIE,
  TRANSFER_SWAP_SUCCESS_MODAL,
} from "@/constants";
import AXIOS from "@/middleware/axios";
import { useHandleModalAction } from "@/store/handleModal";
import { useCryptoStoreActions } from "@/store/useCryptoStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { toast } from "react-toastify";

export const useAssetsData = (params: any) => {
  const { setAssetsData } = useCryptoStoreActions;

  return useQuery(["assets"], async () => {
    try {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.get("/assets?Currency=eur", {
        params,
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      const assets = response.data !== null ? response.data : [];
      setAssetsData(assets);
      return assets;
    } catch (error) {
      return error;
    }
  });
};

export const useChainAssetsList = (availableToSwap?: boolean | undefined) => {
  const { setChainNetworkList } = useCryptoStoreActions;
  return useQuery(["chainAssets"], async () => {
    try {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.get(
        `/catalogs/chains?AvailableToSwap=${availableToSwap || false}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        }
      );
      const chainNetwork = response.data !== null ? response.data : [];
      await setChainNetworkList(chainNetwork);
      return chainNetwork;
    } catch (error) {
      return error;
    }
  });
};

export type WithdrawData = {
  destinationAddress: string;
  amountToSend: number;
  assetId: number;
};
export const useWithdraw = () => {
  const { setHandleModal } = useHandleModalAction;
  return useMutation({
    mutationFn: async (data: WithdrawData) => {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.post(`/transactions`, data, {
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });

      setCookie(OPERATION_ID_COOKIE, response.data?.operationId);
      return response.data;
    },
    onSuccess: () => {
      setHandleModal(CRYPTO_WITHDRAWAL_OTP_VERIFICATION_MODAL);
    },
  });
};

export const useGetAssetAddress = () => {
  const { setAssetAddress } = useCryptoStoreActions;
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        // const tokenResponse = await axios.get("/api/auth-token");
        const response = await AXIOS.get(`/assets/${id}/addresses`, {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        });
        setAssetAddress(response?.data?.[0]?.address);
        return response.data;
      } catch (error) {
        setAssetAddress("");
        return error;
      }
    },
  });
};

export const useGetAsset = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        // const tokenResponse = await axios.get("/api/auth-token");
        const response = await AXIOS.get(`/assets/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        });
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
};

export const useTotalAssetsData = () => {
  const { setTotalAssetsData } = useCryptoStoreActions;

  return useQuery(["totalAssetsData"], async () => {
    try {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.get("/assets/totals", {
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      const assets = response.data !== null ? response.data : [];
      setTotalAssetsData(assets);
      return assets;
    } catch (error) {
      return error;
    }
  });
};

export const useGetChartData = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        // const tokenResponse = await axios.get("/api/auth-token");
        const response = await AXIOS.get(`/assets/balance`, {
          params,
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        });
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
};

type AssetGraphDataParamsType = {
  Currency: string;
  From: string;
  To: string;
};

export const useGetAssetsChartData = (
  params: AssetGraphDataParamsType,
  id: number
) => {
  return useQuery(["assetsChartData"], async () => {
    try {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.get(`catalogs/assets/${id}/price`, {
        params,
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      const data = response.data !== null ? response.data : [];
      return data;
    } catch (error) {
      return error;
    }
  });
};

//Swap Methods
export const useGetSwapEstimate = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      try {
        // const tokenResponse = await axios.get("/api/auth-token");
        const response = await AXIOS.get(`/swap`, {
          params,
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        });
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
};

export const useSwap = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        // const tokenResponse = await axios.get("/api/auth-token");
        const response = await AXIOS.post(`swap`, data, {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        });
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
};

export const useWithdrawConfirmation = () => {
  const { setHandleModal } = useHandleModalAction;
  return useMutation({
    mutationFn: async (data) => {
      const response = await AXIOS.post(
        `/transactions/${getCookie(OPERATION_ID_COOKIE)}/confirmation`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        }
      );
      deleteCookie(OPERATION_ID_COOKIE);
      return response.data.data;
    },
    onSuccess: () => {
      setHandleModal(TRANSFER_SWAP_SUCCESS_MODAL);
    },
    onError: (data: any) => {
      toast.error(
        data?.response?.data?.data?.message || "Something went wrong",
        {
          toastId: "error",
        }
      );
    },
  });
};

export const useResendOTPMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await AXIOS.post(
        `/transactions/${getCookie(OPERATION_ID_COOKIE)}/confirmation/new`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        }
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("OTP Resent Successfully", {
        toastId: "success",
      });
    },
    onError: (data: any) => {
      toast.error(
        data?.response?.data?.data?.message || "Something went wrong",
        {
          toastId: "error",
        }
      );
    },
  });
};
