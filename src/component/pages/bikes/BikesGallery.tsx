import { useState } from "react";
import MyPagination from "./Pagination";
import { TQueryParams } from "@/types";
import { firstPage } from "@/constants/Constant";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/component/product/Product";
import { useGetAllProductQuery } from "@/app/features/product/productApi";

const itemsPerPage = 6;
const BikeGallery = () => {
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<TQueryParams[]>([
    { key: "limit", value: itemsPerPage.toString() },
    firstPage
  ]);
  const { data: bikes, isFetching } = useGetAllProductQuery(params);
  const {
    page: currentPage = 0,
    limit = 0,
    total = 0,
    totalPages = 0,
  } = bikes?.meta || {};
  const startIndex = total === 0 ? 0 : (page - 1) * limit + 1;
  const endIndex = limit === 0 ? total : Math.min(page * limit, total);
  const onPageChange = (value: number) => {
    setPage(page);
    setParams([
      ...params.filter((param) => param.key !== "page"),
      { key: "page", value: value.toString() },
    ]);
  };

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-4 lg:gap-10 min-h-[65vh]">
        {isFetching
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <Skeleton key={index} className="h-80" />
            ))
          : bikes?.data?.map((bike) => (
              <div key={bike._id} className="w-full">
                <Product bike={bike} />
              </div>
            ))}
      </div>
      {/* Pagination and Summary */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-6 gap-y-2">
        <span className="text-base font-normal text-neutral-500">
          Showing {startIndex} to {endIndex} of {total} bikes
        </span>
        <div>
          <MyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BikeGallery;
