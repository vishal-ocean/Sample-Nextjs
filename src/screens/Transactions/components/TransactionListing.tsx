import { TableBodySkeleton } from "@/components/Loaders/TableSkeleton";
import { Button } from "@/components/UI/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleRightB } from "@/icons";
import { useTransactionsData } from "@/services/useTransactions";
import { useCryptoStore } from "@/store/useCryptoStore";
import { cn } from "@/utils";
import { UseMutationResult } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import NoTransactionData from "./NoTransactionData";
import { useTransfer } from "./hooks/useTransfer";

type TransactionListing = {
  tab: string;
  setHandleModal: (payload: string) => void;
  setTransactionTypeState: (payload: string) => void;
  filterOption: {
    type: string;
    startDate: string | number | Date | null;
    endDate: string | number | Date | null;
    asset: string;
  };
  setFilterOption: React.Dispatch<
    React.SetStateAction<{
      type: string;
      startDate: string | number | Date | null;
      endDate: string | number | Date | null;
      asset: string;
    }>
  >;
  transactionDetailsMutation: UseMutationResult<any, unknown, string, unknown>;
};

const TransactionListing = ({
  tab,
  setHandleModal,
  setTransactionTypeState,
  filterOption,
  setFilterOption,
  transactionDetailsMutation,
}: TransactionListing) => {
  const HEADERS = ["Transaction", "Amount", "Date", ""];
  const { getCryptoIcon, getWealthIcon, getModalType } = useTransfer();
  const { assets } = useCryptoStore();

  const {
    data: TransactionData,
    isLoading,
    refetch,
    isRefetching,
  } = useTransactionsData({
    params: {
      TransactionType: filterOption.type,
      AfterDate: filterOption?.startDate
        ? moment(new Date(filterOption?.startDate))?.toISOString()
        : "",
      BeforeDate: filterOption?.endDate
        ? moment(new Date(filterOption?.endDate))?.toISOString()
        : "",
      assets:
        filterOption.asset !== "all"
          ? assets.find((x) => x.name === filterOption.asset)?.id
          : [],
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOption]);
  return (
    <>
      {isLoading || isRefetching ? (
        <Table className="mt-7">
          <TableHeader>
            <TableRow className="border-0 border-none">
              {HEADERS?.map((header, index) => (
                <TableHead
                  key={`tableHead-${index}`}
                  className="text-12 text-gray-300 font-500 h-fit"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-14 sm:text-16">
            <TableBodySkeleton colSpan={4} />
          </TableBody>
        </Table>
      ) : ["all", "crypto"]?.includes(tab) && TransactionData?.length > 0 ? (
        <Table className="mt-7">
          <TableHeader>
            <TableRow className="border-0 border-none">
              {HEADERS?.map((header, index) => (
                <TableHead
                  key={`tableHead-${index}`}
                  className="text-12 text-gray-300 font-500 h-fit"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-14 sm:text-16">
            {TransactionData?.map((item: any, index: number) => (
              <TableRow key={index} className="dark:border-white/15">
                <TableCell className="flex gap-x-3 cursor-pointer md:py-6 py-4 min-h-[40px] w-fit">
                  <span
                    className={cn(
                      "h-10 w-10 flex justify-center items-center bg-primary/10 rounded-3xl text-primary",
                      item?.type === "wealth" &&
                        "bg-orange-300/10 text-orange-300",
                      item?.status === "FAILED" &&
                        "bg-danger-100/10 !text-danger-100"
                    )}
                  >
                    {item?.type === "wealth"
                      ? getWealthIcon[item?.type?.toLowerCase()]
                      : getCryptoIcon[item?.type?.toLowerCase()]}
                  </span>
                  <div className="flex flex-col leading-5">
                    <span
                      className={cn("font-700 text-blue-300 dark:text-white")}
                    >
                      {item.type} {item?.status === "FAILED" ? "(FAILED)" : ""}
                    </span>
                    <span className="font-500 text-gray-300 dark:text-white/30">
                      {item?.type === "wealth"
                        ? item?.destinationAddress
                        : `${
                            ["received", "sell"].includes(item?.type)
                              ? "from"
                              : "to"
                          } ${item.destinationAddress.slice(
                            0,
                            5
                          )}...${item.destinationAddress.slice(-4)}`}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="leading-5 md:py-6 py-4 min-h-[40px]">
                  <div
                    className={cn(
                      "text-blue-300 font-500 dark:text-white",
                      item.type === "earnings" && "hidden"
                    )}
                  >
                    {`${
                      !["transfer", "withdrawal"].includes(
                        item?.type?.toLowerCase()
                      )
                        ? "+"
                        : "-"
                    } ${Number(item.amount.toFixed(6))} ${item.shortName}`}
                  </div>
                  <div
                    className={cn(
                      "text-gray-300 dark:text-white/30 font-500",
                      item.type === "earnings" &&
                        "text-blue-300 dark:text-white"
                    )}
                  >
                    {`${item.type === "earnings" ? "+ " : ""}€${readableNumber(
                      Number(item.amountFiat.toFixed(2) || 0)
                    )}`}
                  </div>
                </TableCell>
                <TableCell className="leading-5 md:py-6 py-4 min-h-[40px]">
                  <div className="text-blue-300  dark:text-white font-500">
                    {moment(item?.createdAt).format("MMM D, YYYY")}
                  </div>
                  <div className="text-gray-300 dark:text-white/30 font-500">
                    {moment(item?.createdAt).format("h:mm A")}
                  </div>
                </TableCell>
                <TableCell className="leading-5 md:py-6 py-4 min-h-[40px] flex justify-end">
                  <Button
                    variant="secondary"
                    className="text-14 font-700 h-10 w-10 rounded-3xl flex justify-center items-center dark:bg-white/15 leading-4 !p-0"
                    onClick={() => {
                      transactionDetailsMutation.mutate(item?.id);
                      setTransactionTypeState(item?.type.toLowerCase());
                      setHandleModal(getModalType["crypto"]);
                    }}
                  >
                    <UilAngleRightB className="w-4 h-4 text-blue-300 dark:text-white" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoTransactionData />
      )}
    </>
  );
};

export default TransactionListing;
