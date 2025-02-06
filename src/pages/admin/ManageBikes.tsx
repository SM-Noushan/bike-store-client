import { FC, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import MyDataTable from "@/component/dataTable/MyDataTable";
import { TBike, TDataTableAction, TQueryParams } from "@/types";
import { firstPage, itemPerDataTable } from "@/constants/Constant";
import { useGetAllProductQuery } from "@/app/features/product/productApi";
import DeleteBikeModal from "@/component/pages/manageBikes/DeleteBikeModal";

const columns: ColumnDef<TBike>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <img
        src={row?.original?.image}
        alt={row?.original?.name}
        className="img-fluid rounded-md size-16 object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="line-clamp-2 max-w-52">{row?.original?.description}</p>
    ),
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];

// Filter options for the select
const filterOptions = [
  { label: "In stock", value: "inStock" },
  { label: "Out of stock", value: "outOfStock" },
];

const ManageBikes: FC = () => {
  const [params, setParams] = useState<TQueryParams[]>([
    itemPerDataTable,
    firstPage,
  ]);
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState("");
  const { data: bikes, isFetching } = useGetAllProductQuery(params);

  const userActions: TDataTableAction<TBike>[] = [
    {
      label: "Update",
      onClick: (bike: TBike) => {
        // setTargetId(bike._id);
        // setOpen(true);
      },
    },
    {
      label: "Delete",
      variant: "danger",
      onClick: (bike: TBike) => {
        setTargetId(bike._id);
        setOpen(true);
      },
    },
  ];

  const handleAction = () => {
    console.log("Add new bike");
  };

  return (
    <>
      <MyDataTable
        data={bikes ? (bikes.data as TBike[]) : []}
        columns={columns}
        actionColumn={userActions}
        isFetching={isFetching}
        showSearch={true}
        searchPlaceholder="Search by name or brand or category..."
        showFilter={true}
        filterOptions={filterOptions}
        filterKeys={["inStock"]}
        filterPlaceholder="Stock"
        setParams={setParams}
        meta={bikes?.meta}
        onAction={handleAction}
        actionLabel="New Bike"
      />
      {/* Delete Bike Modal */}
      {open && targetId && (
        <DeleteBikeModal
          initialValue={targetId}
          open
          setOpen={setOpen}
          resetTargetId={setTargetId}
        />
      )}
    </>
  );
};

export default ManageBikes;
