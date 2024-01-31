'use client';
import { TableBodySkeleton } from '@/components/Loaders/TableSkeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/UI/Table';
import { ASSETS_DETAILS_MODAL } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { readableNumber } from '@/helper/readableNumber';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import Image from 'next/image';
import AssetsDetailsModal from './modals/AssetsDetailsModal';

type AssetsListingData = {
  value: number;
  tokenAmount: number;
  name: string;
  shortName: string;
};

interface AssetsListingProps {
  data: AssetsListingData[];
  isLoading: boolean;
  isRefetching: boolean;
}
const AssetsListing = ({
  data,
  isLoading,
  isRefetching
}: AssetsListingProps) => {
  const { setHandleModal } = useHandleModalAction;
  const { modalOpen } = useHandleModalStore();
  const HEADERS = ['Asset', 'Token Amount', 'Value'];

  return (
    <>
      <div className="lg:h-[360px] sm:h-[276px] max-h-[296px] sm:max-h-full  overflow-y-scroll ">
        <Table className="mt-6">
          <TableHeader className="hidden sm:table-header-group">
            <TableRow className="border-0 border-none">
              {HEADERS?.map((header, index) => (
                <TableHead
                  key={`tableHead-${index}`}
                  className="text-12 text-gray-300 font-500 h-fit  dark:text-white/30"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-14 sm:text-16 !mt-6 ">
            {isLoading || isRefetching ? (
              <TableBodySkeleton colSpan={3} />
            ) : data?.length > 0 ? (
              data?.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-secondary group dark:border-white/15"
                  onClick={() => {
                    setHandleModal(ASSETS_DETAILS_MODAL);
                  }}
                >
                  <TableCell className="sm:min-w[200px] cursor-pointer md:py-5 sm:min-h-[40px] py-5  px-0 sm:px-4">
                    <div className="flex gap-x-3">
                      <div className="rounded-3xl  relative">
                        <Image
                          width={24}
                          height={24}
                          src={AssetImages[item?.shortName]}
                          alt="image"
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="flex flex-col leading-5 justify-center">
                        <span className="font-700 text-blue-300 dark:text-white">
                          {item?.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="leading-5 md:py-5 sm:min-h-[40px]  sm:min-w-[150px] py-5 ">
                    <p className="text-blue-300 dark:text-white font-500 leading-5 text-16">
                      {Number(item?.tokenAmount?.toFixed(6) || 0)}
                    </p>
                  </TableCell>
                  <TableCell className="leading-5 md:py-5 sm:min-h-[40px]  sm:min-w-[150px] py-5 ">
                    <p className="text-blue-300 dark:text-white font-500 leading-5 text-16">
                      ${readableNumber(Number(item.value?.toFixed(2) || 0))}
                    </p>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={5}>
                  <div className="text-16 font-500 text-blue-300 dark:text-white mt-7">
                    No crypto-assets deposited.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {modalOpen === ASSETS_DETAILS_MODAL && <AssetsDetailsModal />}
    </>
  );
};

export default AssetsListing;
