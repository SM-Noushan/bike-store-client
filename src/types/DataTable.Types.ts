import { ColumnDef } from "@tanstack/react-table";
import { TMeta, TQueryParams } from "./Global.Types";

export type TDataTableAction<T> = {
  label: string | ((rowData: T) => string);
  onClick: (rowData: T) => void;
  variant?: string | ((rowData: T) => string);
};

export type TMyDataTable<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  actionColumn?: TDataTableAction<T>[];
  isFetching: boolean;

  showSearch?: boolean;
  searchPlaceholder?: string;

  showFilter?: boolean;
  filterOptions?: { label: string; value: string }[];
  filterKeys?: string[];
  filterPlaceholder?: string;

  onAction?: () => void;
  setParams: React.Dispatch<React.SetStateAction<TQueryParams[]>>;
  meta: TMeta | undefined;
};
