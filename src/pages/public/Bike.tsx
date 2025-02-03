import { FC } from "react";
import Breadcrumbs from "@/component/shared/breadcrumbs/Breadcrumbs";
import ProductDetails, {
  ProductType,
} from "@/component/product/ProductDetails";

const productInfo: ProductType = {
  _id: "dummy-001",
  img: "https://wallpapercave.com/wp/wp1898333.jpg",
  productName: "Ultimate Mountain Bike",
  price: 1299,
  des: "This ultimate mountain bike is designed for all terrains and adventurous rides. Experience unmatched performance and style with cutting-edge technology built for off-road cycling.",
  color: "Red",
  badge: true,
};

const Bike: FC = () => {
  return (
    <div className="main-wrapper">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs
            title="Product Details"
            prevLocation={"Home/Bikes"}
            currentLocation="Bike"
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          {/* Products On Sale Section */}
          <div className="h-full bg-neutral-200/60 cursor-not-allowed flex justify-center items-center" >
          <span>Advertisement</span>
          </div>
          {/* Product Image */}
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={productInfo.img}
              alt={productInfo.productName || "Product Image"}
            />
          </div>
          {/* Product Information */}
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductDetails productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bike;
