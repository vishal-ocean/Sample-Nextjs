import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/Table";

export const FullTableSkeleton = () => (
  <div className="w-full flex flex-col gap-y-10">
    <div className="flex justify-between w-full px-4 animate-pulse items-center">
      <div className="h-5 w-[70px]" />
      <div className="rounded-full h-10 w-[69px]" />
    </div>
    <Table>
      <TableHeader className="sm:block hidden">
        <TableRow className="border-0 border-none w-full grid grid-cols-4 ">
          {[...Array(4)]?.map((_, index) => (
            <TableHead
              key={`tableHead-${index}`}
              className="text-12 text-gray-300 font-500 h-fit animate-pulse"
            >
              <div className="h-[10px] rounded-[15px]" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)]?.map((_, index) => (
          <TableRow
            key={`tableBody-${index}`}
            className="text-center dark:border-white/15"
          >
            <TableCell colSpan={3} className="w-full">
              <div className="flex gap-x-3 sm:gap-x-5 animate-pulse items-center">
                <div className="h-10 w-10 row-span-full" />
                <div className="h-6 w-full max-w-[563px] row-span-full" />
              </div>
            </TableCell>
            <TableCell className="animate-pulse items-end flex justify-end">
              <div className="rounded-full h-10 w-[69px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

type TableBodySkeletonProps = {
  colSpan?: number;
};

export const TableBodySkeleton = ({ colSpan }: TableBodySkeletonProps) => (
  <>
    {[...Array(3)]?.map((_, index) => (
      <TableRow
        key={`tableBody-${index}`}
        className="text-center dark:border-white/15"
      >
        <TableCell colSpan={colSpan} className="w-full">
          <div className="flex gap-x-3 sm:gap-x-5 animate-pulse items-center">
            <div className="h-10 w-10 row-span-full" />
            <div className="h-6 w-full max-w-[563px] row-span-full" />
          </div>
        </TableCell>
        <TableCell className="animate-pulse items-end flex justify-end">
          <div className="rounded-full h-10 w-[69px]" />
        </TableCell>
      </TableRow>
    ))}
  </>
);
