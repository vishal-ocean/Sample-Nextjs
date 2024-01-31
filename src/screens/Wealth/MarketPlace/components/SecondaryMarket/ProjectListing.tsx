import { UilAngleRightB, UilBoltAlt, UilCheck } from "@/icons";
import Image from "next/image";

import { Button } from "@/components/UI/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";
import CustomToolTip from "@/components/UI/Tooltip";
import { OFFER_ACCEPTANCE_MODAL } from "@/constants";
import { useHandleModalAction } from "@/store/handleModal";
import { cn } from "@/utils";
interface ProjectItem {
  name: string;
  fullName: string;
  sent: {
    token: number;
    usd: number;
    tokenSymbol: string;
  };
  receive: {
    token: number;
    usd: number;
    tokenSymbol: string;
  };
  price: string;
  expirationDate: string;
  expirationTime: string;
}

// Define the type for the props
interface ProjectListingProps {
  data: ProjectItem[];
}
const ProjectListing = ({ data }: ProjectListingProps) => {
  const HEADERS = [
    "Project",
    "You Sent",
    "You Receive",
    "Price",
    "Expiration",
    "",
  ];
  const { setHandleModal } = useHandleModalAction;

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
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit">
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
                    {item.name}
                  </span>
                  <span className="text-12 text-gray-300 font-500 lea">
                    {item?.fullName}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit">
              <div className="flex flex-col">
                <span className="text-blue-300 font-500 leading-5">
                  {`${item.sent.token} ${item.sent.tokenSymbol}`}
                </span>
                <span className="text-gray-300 font-500 leading-5">
                  {`€${item.sent.usd}`}
                </span>
              </div>
            </TableCell>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit">
              <div className="flex flex-col">
                <span className="text-blue-300 font-500 leading-5">
                  {`${item.receive.token} ${item.receive.tokenSymbol}`}
                </span>
                <span className="text-gray-300 font-500 leading-5">
                  {`€${item.receive.usd}`}
                </span>
              </div>
            </TableCell>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit">
              <span className="text-16 text-blue-300 font-500 leading-5">
                {item.price}
              </span>
            </TableCell>
            <TableCell className="md:py-6 py-4 min-h-[40px] w-fit">
              <div className="flex flex-col">
                <span className="text-blue-300 font-500 leading-5">
                  {item.expirationDate}
                </span>
                <span className="text-gray-300 font-500 leading-5">
                  {item.expirationTime}
                </span>
              </div>
            </TableCell>
            <TableCell className="leading-5 md:py-6 py-4 min-h-[40px] flex justify-end">
              <div className="flex gap-x-1">
                {index % 2 === 0 ? (
                  <CustomToolTip content={"Active"}>
                    <div
                      className={cn(
                        "rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer !p-0"
                      )}
                    >
                      <UilBoltAlt className={cn("w-4 h-4 text-blue-300")} />
                    </div>
                  </CustomToolTip>
                ) : (
                  <CustomToolTip content={"Completed"}>
                    <div
                      className={cn(
                        "rounded-3xl bg-success-100 w-10 h-10 flex justify-center items-center cursor-pointer !p-0"
                      )}
                    >
                      <UilCheck className={cn("w-4 h-4 text-white")} />
                    </div>
                  </CustomToolTip>
                )}
                <Button
                  variant="secondary"
                  className="text-14 font-700 h-10 w-10 rounded-3xl flex justify-center items-center leading-4 !p-0"
                  onClick={() => setHandleModal(OFFER_ACCEPTANCE_MODAL)}
                >
                  <UilAngleRightB className="w-4 h-4 text-blue-300" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProjectListing;
