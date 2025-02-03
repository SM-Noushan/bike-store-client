import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";

const fields: TFieldConfig[] = [
  {
    name: "priceRange",
    label: <FilterByHeading title="Price Range" />,
    type: "price-range",
    max: 10000,
    min: 0,
  },
];

export default function FilterByPriceRange({ formMethods }: TFormMethod) {
  return <FormWrapper fields={fields} formMethods={formMethods} />;
}
