import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FilterByBrand from "./FilterBy/Brand";
import FilterByModel from "./FilterBy/Model";
import { Button } from "@/components/ui/button";
import FilterByCategory from "./FilterBy/Category";
import { useBikeParams } from "@/hooks/useBikeParams";
import { zodResolver } from "@hookform/resolvers/zod";
import FilterByPriceRange from "./FilterBy/PriceRange";
import FilterByAvailability from "./FilterBy/Availability";
import { useLocation, useNavigate } from "react-router-dom";

const schema = z.object({
  priceRange: z
    .object({ min: z.number().optional(), max: z.number().optional() })
    .optional(),
  model: z.array(z.string()).optional(),
  brand: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
  availability: z.string().optional(),
});

const SideFilter = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { handleFilter, handleReset } = useBikeParams();
  const hasCategory = search.split("category=")[1];
  const formMethods = useForm({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (hasCategory) {
      formMethods.setValue("category", [hasCategory]);
      handleFilter({ category: hasCategory });
    }
  }, [hasCategory]);

  const onSubmit = (data: any) => {
    const formattedFilter: Record<string, string> = {};
    Object.keys(data).forEach((key) => {
      if (data[key])
        if (Array.isArray(data[key]) && data[key].length > 0)
          if (key === "category" && hasCategory)
            formattedFilter[key] = hasCategory;
          else formattedFilter[key] = data[key].join(",");
        else if (typeof data[key] === "string" && key === "availability")
          formattedFilter["inStock"] = data[key];
        else if (key === "priceRange") {
          const { min, max } = data[key];
          if (min && min !== 0) formattedFilter["minPrice"] = String(min);
          if ((max && !min) || (max && min && max >= min))
            formattedFilter["maxPrice"] = String(max);
        }
    });
    // console.log("Formatted Filter:", formattedFilter);
    handleFilter(formattedFilter);
  };
  const handleLocalReset = () => {
    formMethods.reset();
    handleReset();
    navigate("/bikes");
  };
  return (
    <div className="md:w-full max-md:min-w-72 mx-auto mx:mx-0 py-6 md:py-0 flex flex-col gap-6 max-h-[calc(100dvh-150px)] md:max-h-max overflow-y-auto">
      {/* Price Range */}
      <FilterByPriceRange formMethods={formMethods} />
      {/* Category */}
      <FilterByCategory formMethods={formMethods} />
      {/* Brand */}
      {/* <FilterByBrand formMethods={formMethods} /> */}
      {/* Model */}
      <FilterByModel formMethods={formMethods} />
      {/* Availability */}
      <FilterByAvailability formMethods={formMethods} />
      <div className="flex items-center justify-end gap-4 md:gap-2 lg:gap-4">
        <Button
          type="button"
          variant={"destructive"}
          onClick={handleLocalReset}
        >
          Reset
        </Button>
        <Button onClick={formMethods.handleSubmit(onSubmit)}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SideFilter;
