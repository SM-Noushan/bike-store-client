import { FC } from "react";
import Modal from "@/component/modal/Modal";
import { IModalPropsWithTargetId } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useGetSingleOrderQuery } from "@/app/features/order/orderApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Reusable component for displaying information in a row format
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex justify-between text-sm text-gray-600">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

const ViewOrderDetailsModal: FC<IModalPropsWithTargetId> = ({
  open,
  setOpen,
  initialValue,
  resetTargetId,
}) => {
  const { data: order, isFetching } = useGetSingleOrderQuery(initialValue);
  const handleClose = () => {
    resetTargetId("");
    setOpen(false);
  };

  const { orderId, createdAt, userDetails, totalAmount, paymentStatus, items } =
    order || {};
  const { email, name } = userDetails || {};

  return (
    <Modal
      open={open}
      title="Order Details"
      onClose={handleClose}
      onCloseLabel="Close"
    >
      {isFetching ? (
        <Skeleton className="h-96" />
      ) : (
        <Card className="w-[calc(100vw-8rem)] sm:w-96 mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold overflow-auto uppercase hide-scrollbar">
              Order #{orderId?.slice(0, 20)}...
            </CardTitle>
            <p className="text-sm text-gray-500">
              Order Date: {new Date(createdAt as string).toLocaleDateString()}
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">
              {/* User Info */}
              <div className="flex flex-col">
                <p className="font-semibold">Customer Information</p>
                <InfoRow label="Name" value={name || ""} />
                <InfoRow label="Email" value={email || ""} />
              </div>

              {/* Payment Status */}
              <div>
                <p className="font-semibold">Payment Status:</p>
                <p
                  className={`text-sm uppercase ${
                    paymentStatus === "paid" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {paymentStatus}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <p className="font-semibold">Order Items:</p>
                <div className="space-y-2">
                  {items?.map((orderItem) => {
                    const { product, quantity } = orderItem;
                    return (
                      <div
                        key={product._id}
                        className="border-b pb-2 mb-2 flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {product.category} • {product.brand}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Qty: {quantity}
                          </p>
                          <p className="text-sm font-semibold">
                            ${(product.price * quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator className="my-2" />

              {/* Totals */}
              <InfoRow label="Subtotal" value={`$${totalAmount?.toFixed(2)}`} />
              <InfoRow label="Shipping Fee" value="$5000.00" />

              <div className="flex justify-between text-lg font-bold mt-2">
                <span>Total Amount:</span>
                <span>${((totalAmount || 0) + 5000).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Modal>
  );
};

export default ViewOrderDetailsModal;
