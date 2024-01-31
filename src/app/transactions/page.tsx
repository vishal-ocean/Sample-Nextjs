"use client";
import Transactions from "@/screens/Transactions";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";

const TransactionsPage = () => {
  const { modalOpen, transactionType } = useHandleModalStore();
  const { setHandleModal, setTransactionTypeState, setHandleModalState } =
    useHandleModalAction;

  return (
    <Transactions
      modalOpen={modalOpen}
      setHandleModal={setHandleModal}
      transactionType={transactionType || "topUp"}
      setTransactionTypeState={setTransactionTypeState}
      setHandleModalState={setHandleModalState}
    />
  );
};

export default TransactionsPage;
