import {
  ID_TOKEN_COOKIE,
  STAKING_SUCCESS_MODAL,
  UNSTAKE_SUCCESS_MODAL,
} from "@/constants";
import AXIOS from "@/middleware/axios";
import { useHandleModalAction } from "@/store/handleModal";
import { useStakingStoreAction } from "@/store/stakingStore";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

export const useStakeListMutation = () => {
  const { setStakeList } = useStakingStoreAction;
  return useMutation({
    mutationFn: async () => {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.get(`/stakes?Currency=EUR`, {
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      setStakeList(response.data);
      return response.data;
    },
    onSuccess: () => {},
  });
};

type PreStakeMutationData = {
  duration: number;
  stakeId: number;
  amount: number;
  currency: string;
};
export const usePreStakeMutation = () => {
  return useMutation({
    mutationFn: async (data: PreStakeMutationData) => {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.post(`/stakes/prestake`, data, {
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {},
    onError: (err: any) => {
      toast.error(err?.data?.errorMessage || "Something went wrong", {
        toastId: "pre-stake-error",
      });
    },
  });
};

export const useActivateStakeMutation = () => {
  const { setHandleModal } = useHandleModalAction;
  return useMutation({
    mutationFn: async (data: { userStakeId: number }) => {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.post(`/stakes/stake`, data, {
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      setHandleModal(STAKING_SUCCESS_MODAL);
    },
    onError: (err: any) => {
      toast.error(err?.data?.errorMessage || "Something went wrong", {
        toastId: "activate-stake-error",
      });
    },
  });
};

export const useStakeDataListMutation = () => {
  const { setStakeDataList } = useStakingStoreAction;
  return useMutation({
    mutationFn: async (data: { stakeId: number }) => {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.get(`/stakes/${data?.stakeId}`, {
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      setStakeDataList(response.data);
      return response.data;
    },
    onSuccess: () => {},
  });
};

type PreUnStakeMutationData = {
  userStakeId: number;
  amount: number;
  currency: string;
};

export const usePreUnStakeMutation = () => {
  return useMutation({
    mutationFn: async (data: PreUnStakeMutationData) => {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.post(`/stakes/preunstake`, data, {
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {},
    onError: (err: any) => {
      toast.error(err?.data?.errorMessage || "Something went wrong", {
        toastId: "pre-stake-error",
      });
    },
  });
};

export const useActivateUnStakeMutation = () => {
  const { setHandleModal } = useHandleModalAction;
  return useMutation({
    mutationFn: async (data: { userUnstakeId: number }) => {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.post(`/stakes/unstake`, data, {
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      setHandleModal(UNSTAKE_SUCCESS_MODAL);
    },
    onError: (err: any) => {
      toast.error(err?.data?.errorMessage || "Something went wrong", {
        toastId: "activate-stake-error",
      });
    },
  });
};
