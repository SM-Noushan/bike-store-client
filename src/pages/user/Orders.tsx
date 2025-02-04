"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ----------------------------------------------------------------------
// Dummy Order Data and Type
// ----------------------------------------------------------------------

export type Order = {
  id: string;
  orderDate: string;
  customer: string;
  total: number;
  status: "pending" | "completed" | "shipping" | "cancelled";
};

const orders: Order[] = [
  { id: "ORD-001", orderDate: "2023-01-15", customer: "Alice", total: 120, status: "pending" },
  { id: "ORD-002", orderDate: "2023-01-16", customer: "Bob", total: 250, status: "completed" },
  { id: "ORD-003", orderDate: "2023-01-17", customer: "Charlie", total: 300, status: "shipping" },
  { id: "ORD-004", orderDate: "2023-01-18", customer: "Diana", total: 150, status: "cancelled" },
  { id: "ORD-005", orderDate: "2023-01-19", customer: "Eve", total: 400, status: "pending" },
  // ... add more orders as needed
];

// ----------------------------------------------------------------------
// Order History Table Columns
// ----------------------------------------------------------------------

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = row.getValue<number>("total");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                // Dummy action: delete order
                // dispatch(deleteOrder(order.id));
                console.log("Delete order", order.id);
              }}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Dummy action: cancel order
                // dispatch(cancelOrder(order.id));
                console.log("Cancel order", order.id);
              }}
            >
              Cancel
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Dummy action: view order details
                // dispatch(viewOrderDetails(order.id));
                console.log("View order details", order.id);
              }}
            >
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ----------------------------------------------------------------------
// Order Status Filter Dropdown
// ----------------------------------------------------------------------

type StatusFilter = {
  pending: boolean;
  completed: boolean;
  shipping: boolean;
  cancelled: boolean;
};

const defaultStatusFilter: StatusFilter = {
  pending: true,
  completed: true,
  shipping: true,
  cancelled: true,
};

// ----------------------------------------------------------------------
// Main OrderHistory Component
// ----------------------------------------------------------------------

export default function MyOrders() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    defaultStatusFilter
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust number of orders per page

  // Filter orders based on statusFilter
  const filteredOrders = orders.filter(
    (order) => statusFilter[order.status]
  );

  const itemOffset = (currentPage - 1) * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredOrders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);

  const table = useReactTable({
    data: filteredOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="w-full p-4">
      {/* Order Status Filter Dropdown */}
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter Status <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Status Filter</DropdownMenuLabel>
            {(["pending", "completed", "shipping", "cancelled"] as (keyof StatusFilter)[]).map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter[status]}
                onCheckedChange={(value) => {
                  setStatusFilter((prev) => ({
                    ...prev,
                    [status]: !!value,
                  }));
                  // Dummy dispatch action:
                  // dispatch(setOrderStatusFilter({ status, value: !!value }));
                  console.log(`Set ${status} to ${!!value}`);
                }}
                className="capitalize"
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Data Table */}
      <div className="rounded-md border">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {filteredOrders.length} orders found.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < pageCount ? prev + 1 : prev
              )
            }
            disabled={currentPage === pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
