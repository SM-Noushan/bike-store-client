import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Tag } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces & Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductProps {
  _id: string;
  productName: string;
  img: string;
  badge?: boolean;
  price: number | string;
  color: string;
}

export interface HeadingProps {
  heading: string;
}

export interface BadgeProps {
  text: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

// Heading Component
export const Heading: FC<HeadingProps> = ({ heading }) => (
  <h1 className="text-3xl font-semibold pb-6">{heading}</h1>
);

// Product Component
export const Product: FC<ProductProps> = (props) => {
  const navigate = useNavigate();

  const handleProductDetails = () => {
    navigate(`/bike/${"rootId"}`, {
      state: { item: props },
    });
  };

  // Shared classes for each action item.
  const actionItemClasses =
    "text-[#767676] hover:text-gray-800 text-sm font-normal border-b border-gray-200 hover:border-b-gray-400 flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full";

  return (
    <div className="w-full relative group">
      {/* Image Section */}
      <div className="max-w-80 max-h-80 relative overflow-y-hidden mx-auto">
        <img className="w-full h-full object-cover" src={props.img} />
        <div className="absolute top-6 left-8">
          {props.badge && <Badge>New</Badge>}
        </div>
        {/* Actions Overlay */}
        <div className="w-full h-32 absolute bg-white bottom-0 md:-bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-bold px-2 border-l border-r">
            <li
              onClick={() => console.log("Add to Cart Clicked")}
              className={actionItemClasses}
            >
              Add to Cart
              <span>
                <ShoppingCart />
              </span>
            </li>
            <li onClick={handleProductDetails} className={actionItemClasses}>
              View Details
              <span className="text-lg">
                <Tag />
              </span>
            </li>
            <li className={`${actionItemClasses} !cursor-not-allowed`}>
              Add to Wish List
              <span>
                <Heart />
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Details Section */}
      <div className="max-w-80 py-6 flex flex-col gap-1 border border-t-0 px-4 mx-auto">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold line-clamp-1">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};
