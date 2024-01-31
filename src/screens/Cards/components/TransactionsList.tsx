import { TableBodySkeleton } from "@/components/Loaders/TableSkeleton";
import { Button } from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/UI/Dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleDown, UilEuro } from "@/icons";
import NoTransactionData from "@/screens/Transactions/components/NoTransactionData";
import { useCardTransactionHistoryMutation } from "@/services/useStrigaCards";
import {
  useTransactionAction,
  useTransactionStore,
} from "@/store/useTransactionStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import InfiniteScroll from "react-infinite-scroll-component";

export const TransactionsList = ({ currentCard }: { currentCard: string }) => {
  const { userCardDetails } = useUserDataStore();
  const { cardTransactionHistory } = useTransactionStore();
  const cardDetails = userCardDetails?.find(
    (item: any) => item?.type === currentCard
  );
  const [openDateDropdown, setOpenDateDropdown] = useState(false);
  const [endDate, setEndDate] = useState<string | number | Date>(
    moment().toDate()
  );
  const [startDate, setStartDate] = useState<string | number | Date>(
    moment().subtract(6, "months").toDate()
  );
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const getCardTransactionHistory = useCardTransactionHistoryMutation({
    setHasMore,
  });
  const { resetCardTransactionHistory } = useTransactionAction;

  useEffect(() => {
    setIndex(2);
    resetCardTransactionHistory();
    getCardTransactionHistory.mutate({
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      cardId: cardDetails?.id,
      page: 1,
      limit: 10,
    });
  }, [cardDetails?.id, startDate, endDate]);

  const formatDate = (timestamp: any) => {
    const month = String(timestamp?.getMonth() + 1).padStart(2, "0"); // Adding 1 to get the correct month (0-indexed)
    const day = String(timestamp?.getDate()).padStart(2, "0");
    const year = timestamp?.getFullYear();
    return `${month}.${day}.${year}`;
  };

  const fetchMoreData = () => {
    getCardTransactionHistory.mutate({
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      cardId: cardDetails?.id,
      page: index,
      limit: 10,
    });
    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="p-5 bg-white rounded-[24px] dark:bg-white/10 mt-2 h-max mx-3 sm:mx-0">
      <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white sm:hidden mb-6">
        Recent transactions
      </p>
      <div defaultValue={currentCard} className="">
        <div className="sm:flex justify-between">
          <div className="flex gap-1 items-center pointer-events-none">
            <div
              className={cn(
                "py-3 px-4 text-14 font-700 leading-4 text-blue-300 dark:text-white bg-secondary dark:bg-transparent  rounded-full w-full sm:w-auto text-center",
                currentCard === "PHYSICAL" &&
                  "text-white bg-blue-300 dark:bg-white/15 dark:text-white"
              )}
            >
              Physical
            </div>
            <div
              className={cn(
                "py-3 px-4 text-14 font-700 leading-4 text-blue-300 dark:text-white bg-secondary  dark:bg-transparent  rounded-full w-full sm:w-auto text-center",
                currentCard === "VIRTUAL" &&
                  "text-white bg-blue-300 dark:bg-white/15 dark:text-white"
              )}
            >
              Virtual
            </div>
          </div>

          <div className="flex gap-2 sm:mt-0 mt-4">
            <DropdownMenu onOpenChange={setOpenDateDropdown}>
              <DropdownMenuTrigger className="bg-secondary dark:bg-white dark:bg-opacity-15 dark:text-white text-blue-300 text-14 font-700 py-0 h-10 px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4">
                <div className="flex items-center gap-x-2 rounded-full">
                  {startDate !== null && endDate !== null
                    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                    : "Date Range"}
                  <UilAngleDown
                    className={cn(
                      "chevron-down h-6 w-6 transition-all dropdown-title",
                      openDateDropdown && "rotate-180"
                    )}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-secondary/90 dark:bg-gray-250/10 p-4 flex flex-col gap-y-3 rounded-[24px] mt-1 w-fit">
                <DropdownMenuLabel className="text-gray-300 text-12 font-500 leading-5 py-0 placeholder:text-secondary">
                  Enter start and end dates
                </DropdownMenuLabel>
                <div className="flex flex-col gap-y-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) =>
                      setStartDate(
                        date ? date : moment().subtract(6, "months").toDate()
                      )
                    }
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-[160px] rounded-[8px] bg-white/80 dark:bg-gray-250/10 py-1 px-3 border-gray-300 text-14 placeholder:text-gray-300 "
                    placeholderText="MM.DD.YYYY"
                    dateFormat="MM.dd.yyyy"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) =>
                      setEndDate(date ? date : moment().toDate())
                    }
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-[160px] rounded-[8px] bg-white/80 dark:bg-gray-250/10 py-1 px-3 border-gray-300 text-14 placeholder:text-gray-300"
                    placeholderText="MM.DD.YYYY"
                    dateFormat="MM.dd.yyyy"
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href={""}>
              <Button className="text-14 font-700 leading-4 px-4 py-3 bg-secondary text-blue-300 hidden sm:flex dark:bg-white/15 dark:text-white">
                All Transactions
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-6">
          {cardTransactionHistory?.length <= 0 &&
          getCardTransactionHistory?.isLoading ? (
            <TableBodySkeleton colSpan={2} />
          ) : cardTransactionHistory?.length > 0 ? (
            <InfiniteScroll
              dataLength={cardTransactionHistory.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <TableRow
                  key={`tableBody-${index}`}
                  className="text-center dark:border-white/15"
                >
                  <TableCell colSpan={2} className="w-full">
                    <div className="flex gap-x-3 sm:gap-x-5 animate-pulse items-center">
                      <div className="h-10 w-10 row-span-full" />
                      <div className="h-6 w-full max-w-[563px] row-span-full" />
                    </div>
                  </TableCell>
                  <TableCell className="animate-pulse items-end flex justify-end">
                    <div className="rounded-full h-10 w-[69px]" />
                  </TableCell>
                </TableRow>
              }
            >
              <Table>
                <TableHeader className="hidden md:table-header-group">
                  <TableRow className="border-none">
                    <TableHead className="text-12 text-gray-300 font-500 h-fit p-0 dark:text-white/30">
                      Transaction
                    </TableHead>
                    <TableHead className="text-12 text-gray-300 font-500 h-fit p-0 dark:text-white/30">
                      Card
                    </TableHead>
                    <TableHead className="text-12 text-gray-300 font-500 h-fit p-0 dark:text-white/30">
                      Date
                    </TableHead>
                    <TableHead className="text-12 text-gray-300 font-500 h-fit text-right p-0 dark:text-white/30">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cardTransactionHistory?.map((val: any, i: any) => (
                    <TableRow
                      className="group cursor-pointer dark:border-white/15"
                      key={`transaction-${i}`}
                    >
                      <TableCell className="flex gap-3 px-0 pt-6 pb-4 group-last:pb-0">
                        <div className="flex h-10 w-10 justify-center items-center rounded-full bg-blue-300 dark:bg-white">
                          <UilEuro className="w-4 h-4 dark:text-blue-300 text-white" />
                        </div>
                        <span>
                          <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                            {val.merchantName}
                          </p>
                          <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                            {val.merchantId}
                          </p>
                        </span>
                      </TableCell>
                      <TableCell className="px-0 pt-6 pb-4 group-last:pb-0 hidden md:table-cell">
                        <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                          {`**** ${cardDetails?.maskedCardNumber?.slice(-4)}`}
                        </p>
                        <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                          {currentCard === "PHYSICAL" ? "Physical" : "Virtual"}
                        </p>
                      </TableCell>
                      <TableCell className="px-0 pt-6 pb-4 group-last:pb-0 hidden md:table-cell">
                        <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                          {moment(val?.createdAt).format("DD.MM.YYYY")}{" "}
                        </p>
                        <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                          {moment(val?.createdAt).format("h:mm A")}{" "}
                        </p>
                      </TableCell>
                      <TableCell
                        className="px-0 pt-6 pb-4 group-last:pb-0"
                        align="right"
                      >
                        <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                          {`–${
                            val?.merchantTransactionCurrency === "EUR"
                              ? "€"
                              : ""
                          }${readableNumber(
                            Number(val?.accountTransactionAmount || 0)
                          )}`}
                        </p>
                        <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30 md:hidden">
                          {moment(val?.createdAt).format("DD.MM.YY, h:mm A")}{" "}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </InfiniteScroll>
          ) : (
            <NoTransactionData />
          )}
        </div>
      </div>
      {cardTransactionHistory?.length > 0 && (
        <Link
          href={""}
          className="text-14 font-700 mt-6 w-full leading-4 px-4 py-3 bg-secondary text-blue-300 sm:hidden flex items-center justify-center dark:bg-white/15 rounded-full dark:text-white"
        >
          All Transactions
        </Link>
      )}
    </div>
  );
};
