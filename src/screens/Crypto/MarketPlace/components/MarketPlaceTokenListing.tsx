import { Button } from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  BUY_MODAL,
  MARKET_PLACE_ASSETS_ACTIONS,
  SELL_MODAL,
  SWAP_CRYPTO_MODAL,
} from "@/constants";
import MarketPlaceTokensData from "@/constants/MarketPlaceTokensData.json";
import { readableNumber } from "@/helper/readableNumber";
import {
  UilAngleRightB,
  UilEllipsisH,
  UilExchange,
  UilFire,
  UilMinusCircle,
  UilPlusCircle,
} from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LineCharts = dynamic(() => import("@/components/LineChart"));

interface MarketPlaceTokenListingProps {
  trendingAssets: boolean;
}
const MarketPlaceTokenListing = ({
  trendingAssets,
}: MarketPlaceTokenListingProps) => {
  const [tableData, setTableData] = useState(MarketPlaceTokensData);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  useEffect(() => {
    if (isOpenDropdown) {
      document.body.classList.add("!m-0");
      document.body.classList.add("!overflow-y-auto");
    }
  }, [isOpenDropdown]);

  useEffect(() => {
    if (trendingAssets) {
      setTableData(
        MarketPlaceTokensData.filter((x) => x.isInTrending === true)
      );
    } else {
      setTableData(MarketPlaceTokensData);
    }
  }, [trendingAssets]);
  const HEADERS = [
    "Asset",
    "Market Price",
    "Dynamic",
    "Chart",
    "24h Volume",
    "Market Cap",
    "",
  ];
  const { setHandleModal } = useHandleModalAction;

  return (
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
        {tableData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="w-[20%] cursor-pointer py-6 min-h-[40px]">
              <div className="flex gap-x-3">
                <div className="rounded-3xl h-10 w-10 relative">
                  <Image width={40} height={40} src={item.img} alt="image" />
                  {item.isInTrending && (
                    <div className="bg-blue-300 w-5 h-5 flex justify-center items-center rounded-full absolute top-[-4px] right-[-4px] border-2 border-white">
                      <UilFire className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col leading-5">
                  <span className="font-500 text-blue-300">{item.name}</span>
                  <span className="font-500 text-gray-300">
                    {item.subText?.length > 18
                      ? `${item.subText?.substring(0, 18)}...`
                      : item.subText}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="leading-5 py-6 min-h-[40px] cursor-pointer w-[10%]">
              <div className="text-blue-300 font-500">
                €{readableNumber(Number(item.marketPrice?.toFixed(2) || 0))}
              </div>
            </TableCell>
            <TableCell className="leading-5 py-6 min-h-[40px] w-[10%]">
              <div
                className={cn(
                  "font-500",
                  item.dynamicStats === "increase"
                    ? "text-success-200"
                    : "text-danger-100"
                )}
              >
                {item.dynamicStats === "increase" ? "+" : "-"}{" "}
                {Number(item.dynamic).toFixed(2)} %
              </div>
            </TableCell>
            <TableCell className="leading-5 py-6 h-10 w-[10%]">
              <LineCharts
                color={item.dynamicStats === "increase" ? "#00C113" : "#F31919"}
                chartData={[]}
              />
            </TableCell>
            <TableCell className="leading-5 py-6 min-h-[40px] w-[15%] cursor-pointer">
              <div className="text-blue-300 font-500">
                €{readableNumber(Number(item.volume24H?.toFixed(2) || 0))}
              </div>
            </TableCell>
            <TableCell className="leading-5 py-6 min-h-[40px] w-[15%] cursor-pointer">
              <div className="text-blue-300 font-500">
                €{readableNumber(Number(item.marketCap?.toFixed(2) || 0))}
              </div>
            </TableCell>
            <TableCell className="leading-5 py-6 min-h-[40px] w-full hidden md:block">
              <div className="flex justify-end gap-x-1 text-right">
                <DropdownMenu onOpenChange={setIsOpenDropdown}>
                  <DropdownMenuTrigger className="bg-secondary text-blue-300 text-14 font-700 py-0 px-4 h-10 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4">
                    Trade
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white p-5 rounded-[16px]">
                    <DropdownMenuItem
                      className="flex gap-x-4 items-center py-0 cursor-pointer"
                      onClick={() => setHandleModal(BUY_MODAL)}
                    >
                      <UilPlusCircle className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-300 font-700 text-14 leading-4">
                        Buy
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-blue-300/60 my-3" />
                    <DropdownMenuItem
                      className="flex gap-x-4 items-center py-0 cursor-pointer"
                      onClick={() => setHandleModal(SELL_MODAL)}
                    >
                      <UilMinusCircle className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-300 font-700 text-14 leading-4">
                        Sell
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-blue-300/60 my-3" />
                    <DropdownMenuItem
                      className="flex gap-x-4 items-center py-0 cursor-pointer"
                      onClick={() => setHandleModal(SWAP_CRYPTO_MODAL)}
                    >
                      <UilExchange className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-300 font-700 text-14 leading-4">
                        Swap
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/crypto/token-details">
                  <Button
                    variant="secondary"
                    className="!p-0 h-10 w-10 rounded-3xl"
                  >
                    <UilAngleRightB className="w-4 h-4 text-blue-300" />
                  </Button>
                </Link>
              </div>
            </TableCell>
            <TableCell className="leading-5 py-6 min-h-[40px] w-full md:hidden block">
              <div className="flex justify-end gap-x-1 text-right">
                <Button
                  variant="outline"
                  className="!p-0 h-10 w-10 text-blue-300 flex items-center justify-center"
                  onClick={() => setHandleModal(MARKET_PLACE_ASSETS_ACTIONS)}
                >
                  <UilEllipsisH className="h-4 w-4 text-blue-300" />
                </Button>
                <Link href="/crypto/token-details">
                  <Button
                    variant="secondary"
                    className="!p-0 h-10 w-10 rounded-3xl"
                  >
                    <UilAngleRightB className="w-4 h-4 text-blue-300" />
                  </Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MarketPlaceTokenListing;
