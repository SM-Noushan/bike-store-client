import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import createActionColumn from "./ActionColumn";
import { firstPage } from "@/constants/Constant";
import { Skeleton } from "@/components/ui/skeleton";
import { TMyDataTable, TQueryParams } from "@/types";
import SelectInput from "../form/inputsWihOutForm/SelectInput";

export type User = {
  id: string;
  name: string;
  email: string;
  isBlocked: boolean;
};

const MyDataTable = <T,>({
  hasSerial,
  data,
  columns,
  actionColumn,
  isFetching,

  showSearch = false,
  searchPlaceholder = "Search...",

  showFilter = false,
  filterOptions = [],
  filterKeys = [],
  filterPlaceholder = "Filter...",

  onAction,
  actionLabel = "New",
  meta,
  setParams,
}: TMyDataTable<T>) => {
  const { page = 0, limit = 0, total = 0 } = meta || {};
  const startIndex = total === 0 ? 0 : (page - 1) * limit + 1;
  const endIndex = limit === 0 ? total : Math.min(page * limit, total);

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeout(() => {
      setParams((prevParams) => {
        return [
          ...prevParams.filter(
            (param) => param.key !== "searchTerm" && param.key !== "page"
          ),
          { key: "searchTerm", value },
          firstPage,
        ];
      });
    }, 300);
  };

  // Handle filter change from FilterSelect component
  const handleFilterChange = (value: string) => {
    const keys = ["isActive", "inStock"];
    const filterParams = filterKeys?.map((key) => {
      const values = ["active", "inStock"];
      if (keys.includes(key))
        return { key, value: values.includes(value) ? "true" : "false" };

      return { key, value: String(value) };
    });
    setParams((prevParams) => {
      return [
        ...prevParams.filter(
          (param) => !keys.includes(param.key) && param.key !== "page"
        ),
        firstPage,
        ...filterParams,
      ];
    });
  };

  const handlePaginate = (type: string) => {
    setParams((prevParams: TQueryParams[]) => {
      return [
        ...prevParams.filter((param) => param.key !== "page"),
        {
          key: "page",
          value: type === "next" ? String(page + 1) : String(page - 1),
        },
      ];
    });
  };

  const finalColumns = actionColumn
    ? [...columns, createActionColumn(actionColumn)]
    : columns;
  if (hasSerial)
    finalColumns.unshift({
      accessorKey: "_id",
      header: "SL",
      cell: ({ row }) => row.index + startIndex,
    });

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full p-4 h-full">
      {/* Header: Search and Filter Controls */}
      <div className="flex items-center justify-between gap-4 py-4">
        {showSearch && (
          <Input
            type="text"
            placeholder={searchPlaceholder}
            onChange={handleSearchChange}
            className="max-w-80 md:max-w-sm"
          />
        )}
        <div className="flex items-center space-x-2">
          {showFilter && filterOptions.length > 0 && (
            <div className="max-w-xs">
              <SelectInput
                onValueChange={handleFilterChange}
                options={filterOptions}
                placeholder={filterPlaceholder}
              />
            </div>
          )}
          {onAction && (
            <div className="max-w -xs">
              <Button className="max-md:hidden" onClick={() => onAction()}>
                {actionLabel}
              </Button>
              <Button
                size={"icon"}
                className="md:hidden"
                onClick={() => onAction()}
              >
                <Plus />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border h-[calc(100%-120px)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFetching ? (
              // Render skeleton rows while fetching
              Array.from({ length: 15 }).map((_, index) => (
                <TableRow key={index}>
                  {finalColumns.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={finalColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 pt-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {startIndex} to {endIndex} of {total} entries
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePaginate("prev")}
            disabled={total === 0 ? true : meta?.page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePaginate("next")}
            disabled={total === 0 ? true : meta?.page === meta?.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyDataTable;
