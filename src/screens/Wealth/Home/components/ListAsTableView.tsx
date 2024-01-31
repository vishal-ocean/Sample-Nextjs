import { Button } from "@/components/UI/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";
import { MyInvestmentDataProps } from "@/constants/MyInvestmentData";
import { UilAngleRightB } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface ListAsTableViewProps {
  data: MyInvestmentDataProps[];
}
const ListAsTableView = ({ data }: ListAsTableViewProps) => {
  const HEADERS = [
    "Project",
    "Amount",
    "Project Status",
    "Total Earnings",
    "Interest Rate",
    "",
  ];

  return (
    <Table>
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
        {data.map((item, index) => (
          <TableRow key={`listView-${index}`}>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit min-w-[235px]">
              <div className="flex gap-x-4 items-center">
                <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
                  <Image
                    src="/images/svg/icon-BTC.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-300 font-500 leading-5">
                    PHR23
                  </span>
                  <span className="text-12 text-gray-300 font-500 ">
                    {item?.estateName}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit min-w-[110px]">
              <div className="flex flex-col">
                <span className="text-blue-300 font-500 leading-5">
                  {item?.minimumInvestment}
                </span>
                <span className="text-gray-300 font-500 leading-5">
                  5 PHR23
                </span>
              </div>
            </TableCell>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit min-w-[120px]">
              {item.status === "inBusiness" ? (
                <span className="text-success-200 font-500 leading-5">
                  In business
                </span>
              ) : (
                <div className="flex flex-col">
                  <span className="text-blue-300 font-500 leading-5">
                    Fund Raising
                  </span>
                  <span className="text-gray-300 font-500 leading-5">
                    {item.raisedPercent} raised
                  </span>
                </div>
              )}
            </TableCell>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit min-w-[120px]">
              <span
                className={cn(
                  "font-500 leading-5",
                  item.earnings ? "text-success-200" : "text-gray-300"
                )}
              >
                €{item.earnings ? Number(item.earnings).toFixed(2) : "0.00"}
              </span>
            </TableCell>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit min-w-[100px]">
              <span
                className={cn(
                  "font-500 leading-5",
                  item.earnings ? "text-success-200" : "text-gray-300"
                )}
              >
                {item?.interestRate} APR
              </span>
            </TableCell>
            <TableCell className="leading-5 md:py-6 py-4 min-h-[40px] flex justify-end">
              <Link href="/wealth/project-details/1">
                <Button
                  variant="secondary"
                  className="text-14 font-700 h-10 w-10 rounded-3xl flex justify-center items-center leading-4 !p-0"
                >
                  <UilAngleRightB className="w-4 h-4 text-blue-300" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListAsTableView;
