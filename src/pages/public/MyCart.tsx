import { Link } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import emptyCartImg from "@/assets/emptyCart.png";
import CartItem from "@/component/pages/myCart/CartItem";
import Breadcrumbs from "@/component/shared/breadcrumbs/Breadcrumbs";
import { Input } from "@/components/ui/input";

// Define the Product interface
export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  badge?: boolean;
  color: string;
  des?: string;
}

// Static product data for BikeStore
const defaultImage =
  "https://th.bing.com/th/id/OIP.06brl7ew-klxshEyTbXUPQHaHG?rs=1&pid=ImgDetMain";

const initialProducts: Product[] = [
  {
    _id: "1",
    name: "Mountain Bike",
    image: defaultImage,
    price: 500,
    quantity: 2,
    badge: true,
    color: "Red",
    des: "High performance mountain bike for rugged trails.",
  },
  {
    _id: "2",
    name: "City Commuter",
    image: defaultImage,
    price: 350,
    quantity: 1,
    badge: false,
    color: "Blue",
    des: "Perfect bike for daily commuting in the city.",
  },
  {
    _id: "3",
    name: "City Commuter",
    image: defaultImage,
    price: 350,
    quantity: 1,
    badge: false,
    color: "Blue",
    des: "Perfect bike for daily commuting in the city.",
  },
  {
    _id: "4",
    name: "City Commuter",
    image: defaultImage,
    price: 350,
    quantity: 1,
    badge: false,
    color: "Blue",
    des: "Perfect bike for daily commuting in the city.",
  },
];

// Reusable cart header component
const CartHeader: FC = () => (
  <div className="w-full h-20 bg-neutral-200/65 text-neutral-950 hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold">
    <h2 className="col-span-2">Product</h2>
    <h2>Price</h2>
    <h2>Quantity</h2>
    <h2>Sub Total</h2>
  </div>
);

const MyCart: FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [shippingCharge, setShippingCharge] = useState<number>(0);

  // Calculate the subtotal when products change
  useEffect(() => {
    const price = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmt(price);
  }, [products]);

  // Determine shipping charge based on subtotal
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  // Reset cart by clearing the static products array
  const handleResetCart = () => {
    setProducts([]);
  };

  return (
    <div className="main-wrapper">
      <Breadcrumbs title="Cart" prevLocation="Home" currentLocation="My Cart" />
      {products.length > 0 ? (
        <div className="pb-20 b">
          <CartHeader />
          <div className="my-4 lg:max-h-[485px] overflow-auto space-y-4">
            {products.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <div className="text-right mb-4">
            <Button
              variant={"destructive"}
              onClick={handleResetCart}
              className="ml-auto px-12 rounded-none"
            >
              Reset Cart
            </Button>
          </div>
          {/* Coupon */}
          <div className="flex flex-col md:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <Input
                className="w-44 md:w-52 px-4 border text-neutral-800 text-sm outline-none border-gray-400"
                placeholder="Coupon Number"
                disabled
              />
              <Button className="text-sm md:text-base font-semibold" disabled>
                Apply Coupon
              </Button>
            </div>
            <p className="text-lg font-semibold hidden sm:inline">
              Update Cart
            </p>
          </div>
          {/* Checkout summary */}
          <div className="flex justify-end mt-4">
            <div className="w-72 sm:w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart Totals</h1>
              <div>
                <p className="flex items-center justify-between border border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt + shippingCharge}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/checkout">
                  <Button className="w-52 h-10 rounded-none text-white">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 pb-4 transition-all duration-400">
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCartImg}
              alt="Empty Cart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart Feels Lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your shopping cart is here to serve you. Fill it with the best
              bikes and accessories from BikeStore and make it happy.
            </p>
            <Link to="/bikes">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
