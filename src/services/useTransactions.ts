import { ID_TOKEN_COOKIE } from "@/constants";
import { default as AXIOS } from "@/middleware/axios";
import { useTransactionAction } from "@/store/useTransactionStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

type TransactionDataParams = {
  params: {
    TransactionType: string;
    AfterDate?: string | null;
    BeforeDate?: string | null;
    assets?: (number | undefined)[] | number;
  };
};

export const useTransactionsData = ({ params }: TransactionDataParams) => {
  return useQuery(["transactionsData"], async () => {
    try {
      // const tokenResponse = await axios.get("/api/auth-token");
      const response = await AXIOS.get(`/transactions`, {
        params,
        headers: {
          Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  });
};

export const useTransactionDetails = () => {
  const { setTransactionDetails } = useTransactionAction;
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        // const tokenResponse = await axios.get("/api/auth-token");
        const response = await AXIOS.get(`/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        });
        setTransactionDetails(response.data);
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
};

export const useTransactionEstimate = () => {
  const { setTransactionEstimate } = useTransactionAction;
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        // const tokenResponse = await axios.get("/api/auth-token");
        const response = await AXIOS.post(`/transactions/fee`, data, {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        });
        setTransactionEstimate(response.data);
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
};
