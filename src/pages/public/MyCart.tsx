import { FC } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import emptyCartImg from "@/assets/emptyCart.png";
import { STRIPE_CONFIG } from "@/constants/Constant";
import { useCartHandler } from "@/hooks/useCartHandler";
import CartItem from "@/component/pages/myCart/CartItem";
import { useCheckoutMutation } from "@/app/features/order/orderApi";
import Breadcrumbs from "@/component/shared/breadcrumbs/Breadcrumbs";

const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

// Cart header component
const CartHeader: FC = () => (
  <div className="w-full h-20 bg-neutral-200/65 text-neutral-950 hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold">
    <h2 className="col-span-2">Product</h2>
    <h2>Price</h2>
    <h2>Quantity</h2>
    <h2>Sub Total</h2>
  </div>
);

const MyCart: FC = () => {
  const { myCart, resetCartItems, cartItemTotalPrice, shippingFee } =
    useCartHandler();
  const [checkout, { isLoading }] = useCheckoutMutation();
  const handleCheckout = async () => {
    const toastId = toast.loading("Processing your order...");
    const products = myCart.map((item) => ({
      id: item._id,
      quantity: item.itemQuantity,
    }));
    try {
      const data = await checkout(products);
      // console.log(data);
      // console.log((data?.error as TCustomError)?.data?.message);
      if (data.error)
        return toast.error("Gateway issue, try later", { id: toastId });
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: data.data as string,
      });
    } catch (err) {
      // console.log({ error });
    }
  };
  return (
    <div className="main-wrapper">
      <Breadcrumbs title="Cart" prevLocation="Home" currentLocation="My Cart" />
      {myCart.length > 0 ? (
        <div className="pb-20 b">
          <CartHeader />
          <div className="my-4 lg:max-h-[485px] overflow-auto space-y-4">
            {myCart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <div className="text-right mb-4">
            <Button
              variant={"destructive"}
              onClick={resetCartItems}
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
                    ${cartItemTotalPrice}
                  </span>
                </p>
                <p className="flex items-center justify-between border border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingFee}
                  </span>
                </p>
                <p className="flex items-center justify-between border border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${cartItemTotalPrice + shippingFee}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleCheckout}
                  className="w-52 h-10 rounded-none text-white"
                  disabled={isLoading}
                >
                  Proceed to Checkout
                </Button>
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
