import { create } from "zustand";

type handleModalStore = {
  modalOpen: string;
  isFooterModal?: boolean;
  transactionType?: string;
  profileTab: string;
};
const useHandleModalStore = create<handleModalStore>(() => ({
  modalOpen: "",
  isFooterModal: false,
  transactionType: "topUp",
  profileTab: "verification",
}));

const useHandleModalAction = {
  setHandleModal: (payload: string) => {
    useHandleModalStore.setState(() => ({
      modalOpen: payload,
    }));
  },
  setHandleModalState: (payload: boolean) => {
    useHandleModalStore.setState(() => ({
      isFooterModal: payload,
    }));
  },
  setTransactionTypeState: (payload: string) => {
    useHandleModalStore.setState(() => ({
      transactionType: payload,
    }));
  },
  setProfileTab: (payload: string) => {
    useHandleModalStore.setState(() => ({
      profileTab: payload,
    }));
  },
};

export { useHandleModalAction, useHandleModalStore };
