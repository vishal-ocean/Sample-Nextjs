import {
  ACTIVATE_CARD_SUCCESS_MODAL,
  BLOCK_TYPES,
  CHANGE_CURRENCY_MODAL,
  CREATE_VIRTUAL_OR_PHYSICAL_CARD_SUCCESS_MODAL,
  SUCCESSFULLY_TERMINATE_CARD_MODAL,
  TERMINATE_CARD_MODAL,
} from "@/constants";
import { useCardAction } from "@/store/cardDetails";
import { useHandleModalAction } from "@/store/handleModal";
import { useTransactionAction } from "@/store/useTransactionStore";
import { useUserDataAction } from "@/store/userDataStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const sendDataToStriga = async (data: {
  endpoint: string;
  method: string;
  data: any;
}) => {
  return await axios.post("/api/kyc/striga/card", data);
};

export const useGetCardsMutation = () => {
  const { setUserCardsDetails } = useUserDataAction;
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/card/get-all",
      method: "POST",
      data: data,
    });

    setUserCardsDetails(
      response?.data?.data?.cards?.filter(
        (item: any) =>
          item.status !== "CLOSED" &&
          (!item.blockType || !BLOCK_TYPES.includes(item.blockType))
      )
    );
    return response.data;
  });
};

export const useCreateCardsMutation = () => {
  const { setHandleModal } = useHandleModalAction;
  const { setCardDetails } = useCardAction;
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/card/create",
        method: "POST",
        data: data,
      });
      setCardDetails(response?.data?.data);
      return response.data;
    },
    onSuccess: (data: any) => {
      setHandleModal(CREATE_VIRTUAL_OR_PHYSICAL_CARD_SUCCESS_MODAL);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Something went wrong", {
        toastId: "error",
      });
    },
  });
};

export const useBlockCardMutation = () => {
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/card/block",
      method: "POST",
      data: data,
    });
    return response.data;
  });
};

export const useUnBlockCardMutation = () => {
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/card/unblock",
      method: "POST",
      data: data,
    });
    return response.data;
  });
};

export const useGetCardDetailsMutation = () => {
  const { setCardDetails } = useCardAction;
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/card",
      method: "GET",
      data: data,
    });
    setCardDetails(response?.data?.data);
    return response.data;
  });
};

export const useCardRequestConsentMutation = () => {
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/card/request-consent",
      method: "POST",
      data: data,
    });
    return response.data;
  });
};

export const useCardConfirmConsentMutation = () => {
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/card/confirm-consent",
      method: "POST",
      data: data,
    });
    return response.data;
  });
};

export const useReportCardMissingMutation = () => {
  const { setHandleModal } = useHandleModalAction;
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/card/report-missing",
        method: "POST",
        data: data,
      });
      return response.data;
    },
    onSuccess: () => {
      setHandleModal(SUCCESSFULLY_TERMINATE_CARD_MODAL);
    },
    onError: () => {
      toast.error("Something went wrong,Please try again !", {
        toastId: "terminate-card-error",
      });
      setHandleModal(TERMINATE_CARD_MODAL);
    },
  });
};

export const useTerminateCardMutation = () => {
  const { setHandleModal } = useHandleModalAction;
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/card/burn",
        method: "POST",
        data: data,
      });

      return response;
    },
    onSuccess: () => {
      setHandleModal(SUCCESSFULLY_TERMINATE_CARD_MODAL);
    },
    onError: () => {
      toast.error("Something went wrong,Please try again !", {
        toastId: "terminate-card-error",
      });
      setHandleModal(TERMINATE_CARD_MODAL);
    },
  });
};

export const useCardTransactionHistoryMutation = ({
  setHasMore,
}: {
  setHasMore: (value: boolean) => void;
}) => {
  const { setCardTransactionHistory } = useTransactionAction;

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/card/statement",
        method: "POST",
        data: data,
      });
      setCardTransactionHistory(response?.data?.data?.transactions);
      setHasMore(response?.data?.data?.transactions.length > 0 ? true : false);
      return response.data;
    },
  });
};

export const useCardActivationMutation = () => {
  const { setHandleModal } = useHandleModalAction;
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/card/activate",
        method: "POST",
        data: data,
      });
      return response.data;
    },
    onSuccess: () => {
      setHandleModal(ACTIVATE_CARD_SUCCESS_MODAL);
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.data?.message || "Something went wrong",
        {
          toastId: "error",
        }
      );
    },
  });
};

export const useSimulateCardStatusMutation = (setCardStatus: any) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/simulate/card/status",
        method: "PATCH",
        data: data,
      });
      return response.data;
    },
    onSuccess: () => {
      setCardStatus("DISPATCHED");
      toast.success("Card Status Change to Dispatch Successfully", {
        toastId: "success",
      });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.data?.message || "Something went wrong",
        {
          toastId: "error",
        }
      );
    },
  });
};

export const useUpdateCardSettingMutation = (
  onUpdateSettingSuccess: () => void
) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/card/security",
        method: "PATCH",
        data: data,
      });
      return response.data;
    },
    onSuccess: () => {
      onUpdateSettingSuccess();
    },
  });
};

export const useUpdateCardCurrencyMutation = (
  onUpdateCardCurrencySuccess: () => void
) => {
  const { setHandleModal } = useHandleModalAction;

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/card/link-account",
        method: "PATCH",
        data: data,
      });
      return response.data;
    },
    onSuccess: () => {
      onUpdateCardCurrencySuccess();
    },
    onError: () => {
      toast.error("Something went wrong,Please try again !", {
        toastId: "change-currency-card-error",
      });
      setHandleModal(CHANGE_CURRENCY_MODAL);
    },
  });
};

export const useSetNew3DsPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sendDataToStriga({
        endpoint: "/card/3ds",
        method: "PATCH",
        data: data,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("3DS Password Change Successfully", {
        toastId: "success",
      });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.data?.message || "Something went wrong",
        {
          toastId: "error",
        }
      );
    },
  });
};
