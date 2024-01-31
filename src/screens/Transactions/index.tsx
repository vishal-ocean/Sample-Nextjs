"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import {
  CRYPTO_TRANSACTION_DETAILS_MODAL,
  WEALTH_TRANSACTION_DETAILS_MODAL,
} from "@/constants";
import { useAssetsData } from "@/services/useCrypto";
import { useTransactionDetails } from "@/services/useTransactions";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTransfer } from "./components/hooks/useTransfer";

const FilterSection = dynamic(() => import("./components/FilterSection"));
const HeaderCard = dynamic(() => import("./components/HeaderCard"));
const CryptoTransactionDetailsModal = dynamic(
  () => import("./components/Modals/CryptoTransactionDetailsModal")
);
const WealthTransactionDetailsModal = dynamic(
  () => import("./components/Modals/WealthTransactionDetails")
);
const TransactionListing = dynamic(
  () => import("./components/TransactionListing")
);

export type TransactionData = {
  type: string;
  transactionType: string;
  name: string;
  walletAddress?: string;
  amount: {
    usd: number;
    token: number;
  };
  tokenSymbol: string;
  subText?: string;
};

type TransactionsProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
  transactionType: string;
  setTransactionTypeState: (payload: string) => void;
  setHandleModalState: (payload: boolean) => void;
};
type FilterOption = {
  type: string;
  startDate: string | number | Date | null;
  endDate: string | number | Date | null;
  asset: string;
};
const Transactions = ({
  modalOpen,
  setHandleModal,
  transactionType,
  setHandleModalState,
  setTransactionTypeState,
}: TransactionsProps) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterOption, setFilterOption] = useState<FilterOption>({
    type: "All",
    startDate: null,
    endDate: null,
    asset: "All",
  });
  const { tabItems } = useTransfer();
  const transactionDetailsMutation = useTransactionDetails();
  const { data: AssetsList, isLoading } = useAssetsData({});

  return (
    <>
      <div className="">
        <HeaderCard />
        <div className="mt-6 rounded-[24px] bg-white dark:bg-opacity-10 p-5 flex flex-col sm:gap-y-8 gap-y-4 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
          <Tabs
            defaultValue="all"
            className="sm:w-auto w-full whitespace-nowrap pb-3 md:pb-0"
          >
            <TabsList className="block sm:flex lg:justify-between lg:flex-row flex-col gap-y-2 md:gap-x-2 h-fit items-start lg:items-center">
              <div className="flex gap-x-2 overflow-x-auto justify-self-end mb-2 sm:mb-0">
                {tabItems.map((item, index) => (
                  <TabsTrigger
                    value={item.tab}
                    key={`tabs-${index}`}
                    onClick={() => setSelectedTab(item.tab)}
                    className={cn(
                      "flex gap-x-2 justify-center items-center hover:bg-white dark:hover:bg-white/10 text-blue-300 dark:text-white py-2 px-3 sm:py-3 sm:px-4 rounded-full data-[state=active]:text-white ",
                      item?.activeTabBg,
                      item?.tab === "all" &&
                        "dark:data-[state=active]:text-blue-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-[10px] h-[10px] rounded-full",
                        item?.tabName === "All" && "hidden",
                        item?.tab !== "all" ? item?.bg : item?.activeTabBg,
                        item?.tab === selectedTab && "hidden"
                      )}
                    />
                    <p className=" font-700 text-14 font-body">
                      {item?.tabName}
                    </p>
                  </TabsTrigger>
                ))}
              </div>
              <FilterSection
                modalOpen={modalOpen}
                setHandleModal={setHandleModal}
                setHandleModalState={setHandleModalState}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
              />
            </TabsList>
            {tabItems.map((item, index) => (
              <TabsContent
                value={item?.tab}
                className=""
                key={`tabContent-${index}`}
              >
                <TransactionListing
                  tab={item.tab}
                  // transactionData={TransactionData}
                  setHandleModal={setHandleModal}
                  setTransactionTypeState={setTransactionTypeState}
                  filterOption={filterOption}
                  setFilterOption={setFilterOption}
                  transactionDetailsMutation={transactionDetailsMutation}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      {modalOpen === CRYPTO_TRANSACTION_DETAILS_MODAL && (
        <CryptoTransactionDetailsModal
          modalOpen={modalOpen}
          transactionType={transactionType}
          setHandleModal={setHandleModal}
          transactionDetailsMutation={transactionDetailsMutation}
        />
      )}
      {modalOpen === WEALTH_TRANSACTION_DETAILS_MODAL && (
        <WealthTransactionDetailsModal
          modalOpen={modalOpen}
          transactionType={transactionType}
          setHandleModal={setHandleModal}
        />
      )}
    </>
  );
};

export default Transactions;
