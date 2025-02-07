import {
  setFilters,
  clearParams,
  setSearchTerm,
  selectSearchTerm,
  selectFilterParams,
} from "@/app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";

export const useBikeParams = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);

  const handleSearch = (searchQuery: string) =>
    dispatch(setSearchTerm(searchQuery));

  const filterParams = useAppSelector(selectFilterParams);

  const handleFilter = (filters: Record<string, string>) =>
    dispatch(setFilters(filters));

  const handleReset = () => dispatch(clearParams());

  return { searchTerm, handleSearch, handleFilter, handleReset, filterParams };
};
