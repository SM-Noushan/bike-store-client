import { FC } from "react";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Item {
  _id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface ItemCardProps {
  item: Item;
  //   onDelete?: (id: string) => void;
  //   onDecrease?: (id: string) => void;
  //   onIncrease?: (id: string) => void;
}

/**
 * A reusable button component for quantity adjustments.
 */
const CartItemActionButton: FC<{
  Icon: React.ElementType;
  className?: string;
  onClick: () => void;
}> = ({ Icon, onClick, className = "" }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="icon"
      className={`size-6 ${className}`}
    >
      <Icon />
    </Button>
  );
};

/**
 * CartItem component displays a product's details in the cart.
 */
const CartItem: FC<ItemCardProps> = ({
  item,
  //   onDelete,
  //   onDecrease,
  //   onIncrease,
}) => {
  return (
    <div className="w-full grid grid-cols-5 border py-2">
      {/* Product Information */}
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
        <CartItemActionButton
          Icon={XIcon}
          className="rounded-full hover:bg-red-400 hover:text-white duration-300"
          //   onClick={() => onDelete(item._id)}
          onClick={() => console.log("Delete")}
        />
        <img
          className="w-32 h-32 object-cover"
          src={item.image}
          alt={item.name}
        />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      {/* Price, Quantity, and Subtotal */}
      <div
        className="col-span-5 md:col-span-3 flex items-center justify-between 
                      py-4 md:py-0 px-4 md:px-0 gap-6 md:gap-0"
      >
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <CartItemActionButton
            Icon={MinusIcon}
            //   onClick={() => onDecrease(item._id)}
            onClick={() => console.log("Decrease")}
          />
          <p>{item.quantity}</p>
          <CartItemActionButton
            Icon={PlusIcon}
            //   onClick={() => onIncrease(item._id)}
            onClick={() => console.log("Increase")}
          />
        </div>
        <div className="w-1/3 flex items-center font-bold text-lg">
          <p>${item.price * item.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
