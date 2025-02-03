import { FC } from "react";
import { Button } from "@/components/ui/button";

export interface ProductType {
  _id: string;
  img: string;
  productName: string;
  price: number;
  des?: string;
  color: string;
  badge?: boolean;
}

// Define props for the ProductDetails component.
interface ProductDetailsProps {
  productInfo: ProductType;
  onAddToCart?: (product: ProductType, quantity?: number) => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({
  productInfo,
  onAddToCart,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-neutral-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <Button
      // onClick={() => onAddToCart(productInfo, 1)}
      >
        Add to Cart
      </Button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium">Categories:</span> BikeStore
        Exclusive, Best Sellers, New Arrivals
      </p>
    </div>
  );
};

export default ProductDetails;
