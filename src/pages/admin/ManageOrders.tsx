import { FC, useState } from "react";
import { capitalize } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import MyDataTable from "@/component/dataTable/MyDataTable";
import { firstPage, itemPerDataTable } from "@/constants/Constant";
import { useGetAllOrderQuery } from "@/app/features/order/orderApi";
import { TDataTableAction, TOrder, TOrderItem, TQueryParams } from "@/types";
import ViewOrderDetailsModal from "@/component/pages/manageOrders/ViewOrderDetails";

const columns: ColumnDef<TOrder>[] = [
  {
    accessorKey: "items",
    header: "Order Details",
    cell: ({ row }) => {
      const items: TOrderItem[] = row.original.items;

      if (!items || items.length === 0) {
        return "No Items";
      }
      let totalPrice = 0;
      return (
        <div
          className="xl:max-h-28 overflow-auto thin-scrollbar space-y-1"
          title={`By ${capitalize(
            row.original.email.split("@")[0]
          )} on ${new Date(row.original.createdAt).toLocaleDateString()}`}
        >
          {items?.map((orderItem) => {
            const { name, brand, model, category, price, image } =
              orderItem.product;

            const subTotalPrice = price * orderItem.quantity;
            totalPrice += subTotalPrice;
            return (
              <div key={orderItem._id} className="flex items-center gap-4 px-6">
                {/* Product Info */}
                <div className="flex-1 flex flex-col xl:flex-row xl:items-center gap-x-4">
                  <img
                    src={image}
                    alt={name}
                    className="h-8 w-12 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {brand} • {model}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">{category}</p>
                </div>

                {/* Price and Quantity */}
                <div className="text-right xl:flex xl:gap-6 xl:items-center">
                  <p className="text-xs font-medium text-gray-500">
                    Unit: ${price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {orderItem.quantity}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Sub: ${subTotalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
          <p className="text-gray-800 font-bold float-right mr-6">
            Total: $ {totalPrice.toFixed(2)}
          </p>
        </div>
      );
    },
  },
];

const filterOptions = [
  { label: "Low to High", value: "totalAmount" },
  { label: "High to Low", value: "-totalAmount" },
];

const ManageOrders: FC = () => {
  const [targetId, setTargetId] = useState("");
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([
    itemPerDataTable,
    firstPage,
  ]);
  const { data: orders, isFetching } = useGetAllOrderQuery(params);
  const userActions: TDataTableAction<TOrder>[] = [
    {
      label: "Details",
      onClick: (order: TOrder) => {
        setTargetId(order._id);
        setViewOrderModal(true);
      },
    },
  ];

  return (
    <>
      <MyDataTable
        hasSerial
        data={orders ? (orders.data as TOrder[]) : []}
        columns={columns}
        actionColumn={userActions}
        showSearch
        searchPlaceholder="Search by email"
        showFilter
        filterOptions={filterOptions}
        filterKeys={["sort"]}
        filterPlaceholder="Sort by"
        isFetching={isFetching}
        setParams={setParams}
        meta={orders?.meta}
      />
      {/* View Order Details Modal */}
      {viewOrderModal && (
        <ViewOrderDetailsModal
          initialValue={targetId}
          resetTargetId={setTargetId}
          open={viewOrderModal}
          setOpen={setViewOrderModal}
        />
      )}
    </>
  );
};

export default ManageOrders;
