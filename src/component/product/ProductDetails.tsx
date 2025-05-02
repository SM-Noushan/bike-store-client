import { TBike } from "@/types";
import { splitString } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartHandler } from "@/hooks/useCartHandler";

const ProductDetails = ({ bike }: { bike: TBike }) => {
  const { handleCart, alreadyInCart } = useCartHandler(bike);
  const hasStock = bike.inStock;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <h2 className="text-4xl font-semibold">{bike.name}</h2>
        <Badge>{bike.inStock ? "In stock" : "Out of stock"}</Badge>
      </div>
      <p className="text-xl font-semibold">Tk {bike.price}</p>
      <p className="text-base text-neutral-600">Q: {bike.quantity}</p>
      <p className="text-base text-neutral-600">{bike.description}</p>
      <p className="text-sm">Be the first to review this product.</p>
      <p className="font-medium text-lg">
        <span className="">Brand:</span> {bike.brand}
      </p>
      <Button onClick={handleCart} disabled={!hasStock}>
        {hasStock
          ? alreadyInCart
            ? "Remove from cart"
            : "Add to Cart"
          : "Restocking soon"}
      </Button>
      <div className="font-normal text-sm flex items-center gap-2">
        <p>
          <span className="text-base font-medium">Category: </span>
          {splitString(bike.category)}
        </p>
        <p>
          <span className="text-base font-medium">Model: </span>
          {bike.model}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
