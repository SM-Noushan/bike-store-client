import { TQueryParams } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const updateFilterParams = (
  filterParams: TQueryParams[],
  filters: Record<string, string>
) => {
  // Keep only the searchTerm if it exists
  const searchFilter = filterParams.find(
    (filter) => filter.key === "searchTerm"
  );

  // Replace filters with new ones
  const newFilterParams = Object.entries(filters).map(([key, value]) => ({
    key,
    value: String(value).trim(),
  }));

  // Re-add the searchTerm if it exists
  if (searchFilter) {
    newFilterParams.push(searchFilter);
  }

  return newFilterParams;
};

const initialState = {
  searchTerm: "",
  filterParams: [] as TQueryParams[],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    /** ✅ Sets the search term & ensures it's in filterParams */
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.trim();

      // Remove old searchTerm from filterParams if it exists
      state.filterParams = state.filterParams.filter(
        (filter) => filter.key !== "searchTerm"
      );

      // Add searchTerm if it's not empty
      if (state.searchTerm) {
        state.filterParams.push({ key: "searchTerm", value: state.searchTerm });
      }
    },

    /** ✅ Replaces all filters but keeps searchTerm if it exists */
    setFilters: (state, action) => {
      const filters = action.payload;

      // Update filterParams while keeping searchTerm if it exists
      state.filterParams = updateFilterParams(state.filterParams, filters);
    },

    /** ✅ Clears all filters & search term */
    clearParams: (state) => {
      state.searchTerm = "";
      state.filterParams = [];
    },
  },

  selectors: {
    selectSearchTerm: ({ searchTerm }) => searchTerm,
    selectFilterParams: ({ filterParams }) => filterParams,
  },
});

export const { selectSearchTerm, selectFilterParams } = productSlice.selectors;

export const { setSearchTerm, setFilters, clearParams } = productSlice.actions;
