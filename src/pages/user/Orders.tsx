import { FC, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TOrder, TOrderItem, TQueryParams } from "@/types";
import MyDataTable from "@/component/dataTable/MyDataTable";
import { firstPage, itemPerDataTable } from "@/constants/Constant";
import { useGetMyOrdersQuery } from "@/app/features/order/orderApi";

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
          title={`Ordered on ${new Date(
            row.original.createdAt
          ).toLocaleDateString()}`}
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

const MyOrders: FC = () => {
  const [params, setParams] = useState<TQueryParams[]>([
    itemPerDataTable,
    firstPage,
  ]);
  const { data: orders, isFetching } = useGetMyOrdersQuery(params);
  return (
    <>
      <MyDataTable
        hasSerial
        data={orders ? (orders.data as TOrder[]) : []}
        columns={columns}
        isFetching={isFetching}
        setParams={setParams}
        meta={orders?.meta}
      />
    </>
  );
};

export default MyOrders;
