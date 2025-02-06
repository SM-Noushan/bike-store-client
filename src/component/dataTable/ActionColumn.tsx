import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { TDataTableAction } from "@/types";
import { MoreVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

const createActionColumn = <T,>(
  actions: TDataTableAction<T>[]
): ColumnDef<T> => {
  return {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open action menu</span>
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {actions.map((action, index) => {
              const label =
                typeof action.label === "function"
                  ? action.label(data)
                  : action.label;
              const variant =
                typeof action.variant === "function"
                  ? action.variant(data)
                  : action.variant;
              return (
                <DropdownMenuItem
                  key={index}
                  onClick={() => action.onClick(data)}
                  className={
                    variant === "danger"
                      ? "text-red-600 hover:!text-red-600"
                      : variant === "success"
                      ? "text-green-600 hover:!text-green-600"
                      : ""
                  }
                >
                  {label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
};

export default createActionColumn;
