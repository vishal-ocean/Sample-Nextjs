import { Button } from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { ACCOUNT_DETAIL_MODAL, ACTION_BUTTON_MODAL } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { UilEllipsisH, UilEuro } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useNeoBankingAction } from "@/store/useNeoBankingStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { useState } from "react";
import { AccountDetailModal } from "./Modal/AccountDetailModal";
import { ActionButtonModal } from "./Modal/ActionButtonModal";
import { useCurrency } from "./useCurrency";
const HEADERS = ["Currency", "Balance", ""];

export const CurrencyListing = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [currency, setCurrency] = useState("");
  const { Action } = useCurrency();
  const { userWalletDetails } = useUserDataStore();
  const { setAccountCurrency } = useNeoBankingAction;

  return (
    <div className="">
      <Table className=" overflow-auto">
        <TableHeader className="hidden sm:table-header-group">
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
        <TableBody>
          {/* {CurrencyData.map((value, index) => ( */}
          <>
            <TableRow
              // key={`currency-${index}`}
              className="border-b border-secondary group"
              onClick={() =>
                setCurrency(userWalletDetails?.accounts?.EUR?.currency)
              }
            >
              <TableCell className="px-0 sm:px-4 flex gap-x-3 items-center py-5 sm:py-6 group-last:pb-0">
                <span className="h-10 w-10 bg-blue-300 text-white dark:bg-white dark:text-blue-300 flex justify-center items-center rounded-full">
                  <UilEuro className="h-4 w-4" />
                </span>
                <span>
                  <p className="text-blue-300 dark:text-white text-16 font-500 leading-5 capitalize sm:whitespace-nowrap w-20 sm:w-auto truncate">
                    Euro
                  </p>
                  <p className="text-gray-300 dark:text-white/30 text-16 font-500 leading-5 uppercase">
                    {userWalletDetails?.accounts?.EUR?.currency}
                  </p>
                </span>
              </TableCell>
              <TableCell className="px-0 sm:px-4 py-5 sm:py-6 group-last:pb-0">
                {/* {userWalletDetails?.accounts?.EUR?.currency === "EUR" ? ( */}
                <p className="text-blue-300 dark:text-white text-16 font-500 leading-5 capitalize">
                  €
                  {readableNumber(
                    Number(
                      userWalletDetails?.accounts?.EUR?.availableBalance
                        ?.amount || 0
                    ) / 100
                  ) || 0}
                </p>
                {/* ) : (
                  <>
                    <p className="text-blue-300 text-16 font-500 leading-5 capitalize">
                      {
                        userWalletDetails?.accounts?.EUR?.availableBalance
                          ?.amount
                      }
                    </p>
                    <p className="text-gray-300 text-16 font-500 leading-5 uppercase">
                      {value.balanceInEuro}
                    </p>
                  </>
                )} */}
              </TableCell>
              <TableCell className="px-0 sm:px-4 flex gap-x-5 justify-end py-5 sm:py-6 group-last:pb-0">
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-10 w-10 lg:hidden hidden sm:flex  justify-center items-center rounded-full data-[state=open]:bg-blue-300 hover:bg-blue-300 data-[state=open]:text-white hover:text-white dark:data-[state=open]:bg-white dark:data-[state=open]:text-blue-300  ">
                    <UilEllipsisH />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-secondary/50 dark:bg-gray-250/10 backdrop-blur-[16px] p-4 rounded-xl">
                    {Action.map((item, actionIndex) => (
                      <>
                        <div
                          className={cn(
                            `flex gap-x-3 text-blue-300 dark:text-white text-14 font-500 leading-4 cursor-pointer items-center mr-2`,
                            item.name === "Account Details" && "hidden",
                            item.name === "Exchange" &&
                              "opacity-50 pointer-events-none"
                          )}
                          key={`action-${actionIndex}`}
                          onClick={() => setHandleModal(item.modalOpen)}
                        >
                          <span className="rounded-full bg-white/40 dark:bg-white/10 p-1.6 h-7 w-7 flex justify-center items-center">
                            {item.icon}
                          </span>
                          {item.name}
                        </div>
                        {actionIndex !== Action.length - 1 &&
                          actionIndex > 0 && (
                            <hr className="border-secondary dark:border-white/15 my-2" />
                          )}
                      </>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="lg:flex gap-x-1 hidden">
                  {Action.map((item, actionIndex) => (
                    <div
                      className={cn(
                        `flex gap-x-2 text-blue-300 dark:text-white px-4 py-3 text-14 font-700 leading-4 cursor-pointer rounded-full`,
                        item.name === "Account Details" && "hidden",
                        item.name === "Exchange" &&
                          "opacity-50 pointer-events-none"
                      )}
                      key={`action-${actionIndex}`}
                      onClick={() => {
                        setHandleModal(item.modalOpen);
                        setAccountCurrency(
                          userWalletDetails?.accounts?.EUR?.currency
                        );
                      }}
                    >
                      {item.icon} {item.name}
                    </div>
                  ))}
                </div>

                <Button
                  className="text-blue-300 px-4 py-3 text-14 font-700 leading-4 dark:bg-white/15 dark:text-white bg-secondary hidden sm:flex"
                  onClick={() => setHandleModal(ACCOUNT_DETAIL_MODAL)}
                >
                  Details
                </Button>
                <div
                  className="h-10 w-10 sm:hidden flex  justify-center items-center rounded-full hover:bg-blue-300 hover:text-white cursor-pointer"
                  onClick={() => setHandleModal(ACTION_BUTTON_MODAL)}
                >
                  <UilEllipsisH />
                </div>
              </TableCell>
            </TableRow>
          </>
          {/* ))} */}
        </TableBody>
      </Table>
      {modalOpen === ACTION_BUTTON_MODAL && (
        <ActionButtonModal currency={currency} />
      )}
      {modalOpen === ACCOUNT_DETAIL_MODAL && (
        <AccountDetailModal currency={currency} />
      )}
    </div>
  );
};
