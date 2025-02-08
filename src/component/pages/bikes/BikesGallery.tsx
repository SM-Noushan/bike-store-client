import { TQueryParams } from "@/types";
import MyPagination from "./Pagination";
import { useEffect, useState } from "react";
import { firstPage } from "@/constants/Constant";
import { Product } from "@/component/product/Product";
import { useBikeParams } from "@/hooks/useBikeParams";
import Loading from "@/component/shared/loader/Loader";
import { useGetAllProductQuery } from "@/app/features/product/productApi";

const itemsPerPage = 6;
const BikeGallery = () => {
  const { filterParams } = useBikeParams();
  // console.log(filterParams);
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<TQueryParams[]>([
    { key: "limit", value: itemsPerPage.toString() },
    firstPage,
  ]);

  const { data: bikes, isFetching, isLoading } = useGetAllProductQuery(params);
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

  useEffect(() => {
    setParams([
      { key: "limit", value: itemsPerPage.toString() },
      firstPage,
      ...filterParams,
    ]);
  }, [filterParams]);
  return isFetching || isLoading ? (
    <Loading />
  ) : (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-4 lg:gap-10 min-h-[65vh]">
        {(bikes?.data?.length ?? 0) > 0 ? (
          bikes?.data?.map((bike) => (
            <div key={bike._id} className="w-full">
              <Product bike={bike} />
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 xl:col-span-3">
            <span className="bg-yellow-200 w-full h-20 rounded-md text-neutral-800 font-semibold text-xl flex items-center justify-center">
              No Bikes Found
            </span>
          </div>
        )}
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
