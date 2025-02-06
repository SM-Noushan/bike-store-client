import { FC } from "react";
import Breadcrumbs from "@/component/shared/breadcrumbs/Breadcrumbs";
import ProductDetails from "@/component/product/ProductDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "@/app/features/product/productApi";
import { TBike } from "@/types";

const Bike: FC = () => {
  const { id } = useParams();
  const { data: product, isFetching } = useGetProductQuery(id);
  return (
    <div className="main-wrapper min-h-[calc(100dvh-505px)]">
      <div className="xl:-mt-10 -mt-7">
        <Breadcrumbs
          title="Product Details"
          prevLocation={"Home/Bikes"}
          currentLocation="Bike"
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
        {/* Products On Sale Section */}
        <div className="h-full bg-neutral-200/60 cursor-not-allowed flex justify-center items-center">
          <span>Advertisement</span>
        </div>
        {/* Product Image */}
        <div className="h-full xl:col-span-2">
          {isFetching ? (
            <Skeleton className="h-28 md:h-40 xl:size-full" />
          ) : (
            <img
              className="w-full h-full object-cover"
              src={product?.data?.image}
              alt={product?.data?.name || "Product Image"}
            />
          )}
        </div>
        {/* Product Information */}
        <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
          {isFetching ? (
            <Skeleton className="w-full h-64" />
          ) : (
            <ProductDetails bike={product?.data as TBike} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bike;
