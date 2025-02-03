import { z } from "zod";
import { useForm } from "react-hook-form";
import FilterByBrand from "./FilterBy/Brand";
import FilterByModel from "./FilterBy/Model";
import { Button } from "@/components/ui/button";
import FilterByCategory from "./FilterBy/Category";
import { zodResolver } from "@hookform/resolvers/zod";
import FilterByPriceRange from "./FilterBy/PriceRange";
import FilterByAvailability from "./FilterBy/Availability";

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
  const formMethods = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: any) => {
    console.log("Filter Data:", data);
  };
  return (
    <div className="md:w-full min-w-72 mx-auto mx:mx-0 py-6 md:py-0 flex flex-col gap-6 max-h-[calc(100dvh-150px)] md:max-h-max overflow-y-auto">
      {/* Price Range */}
      <FilterByPriceRange formMethods={formMethods} />
      {/* Category */}
      <FilterByCategory formMethods={formMethods} />
      {/* Brand */}
      <FilterByBrand formMethods={formMethods} />
      {/* Model */}
      <FilterByModel formMethods={formMethods} />
      {/* Availability */}
      <FilterByAvailability formMethods={formMethods} />
      <Button
        className="w-24 lg:w-36 ml-auto"
        onClick={formMethods.handleSubmit(onSubmit)}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default SideFilter;
