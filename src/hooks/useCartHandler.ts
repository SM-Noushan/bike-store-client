import { TBike } from "@/types";
import { useCallback } from "react";
import {
  addToCart,
  removeCart,
  resetCart,
  selectMyCart,
  updateCart,
} from "@/app/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";

export const useCartHandler = (bike: TBike | void) => {
  const dispatch = useAppDispatch();
  const myCart = useAppSelector(selectMyCart);

  const alreadyInCart = myCart.some((item) => item._id === bike?._id);
  const handleCart = () => {
    if (alreadyInCart) dispatch(removeCart(bike?._id));
    else dispatch(addToCart(bike));
  };

  const removeFromCart = (id: string) => dispatch(removeCart(id));

  const updateCartItem = (id: string, type: string) =>
    dispatch(updateCart({ id, type }));

  const resetCartItems = useCallback(() => {
    dispatch(resetCart());
  }, [dispatch]);

  const cartItemTotalPrice = myCart.reduce(
    (acc, curr) => acc + curr.price * curr.itemQuantity,
    0
  );

  const shippingFee = 5000;

  return {
    handleCart,
    alreadyInCart,
    myCart,
    cartItem: myCart.length,
    removeFromCart,
    updateCartItem,
    resetCartItems,
    cartItemTotalPrice,
    shippingFee,
  };
};
