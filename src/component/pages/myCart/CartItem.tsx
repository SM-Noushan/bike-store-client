import { FC } from "react";
import { TCart } from "@/types";
import { Button } from "@/components/ui/button";
import { useCartHandler } from "@/hooks/useCartHandler";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";

const CartItemActionButton: FC<{
  Icon: React.ElementType;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}> = ({ Icon, onClick, className = "", disabled = false }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="icon"
      className={`size-6 ${className}`}
      disabled={disabled}
    >
      <Icon />
    </Button>
  );
};

const CartItem = ({ item }: { item: TCart }) => {
  const { updateCartItem, removeFromCart } = useCartHandler();
  return (
    <div className="w-full grid grid-cols-5 border py-2">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
        <CartItemActionButton
          Icon={XIcon}
          className="rounded-full hover:bg-red-400 hover:text-white duration-300"
          onClick={() => removeFromCart(item._id)}
        />
        <img
          className="w-32 h-32 object-cover"
          src={item.image}
          alt={item.name}
        />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div
        className="col-span-5 md:col-span-3 flex items-center justify-between 
                      py-4 md:py-0 px-4 md:px-0 gap-6 md:gap-0"
      >
        <div className="flex w-1/3 items-center text-lg font-semibold">
          Tk {item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <CartItemActionButton
            Icon={MinusIcon}
            onClick={() => updateCartItem(item._id, "decrease")}
            disabled={item.itemQuantity <= 1}
          />
          <p>{item.itemQuantity}</p>
          <CartItemActionButton
            Icon={PlusIcon}
            onClick={() => updateCartItem(item._id, "increase")}
            disabled={item.itemQuantity >= item.quantity}
          />
        </div>
        <div className="w-1/3 flex items-center font-bold text-lg">
          <p>Tk {item.price * item.itemQuantity}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
