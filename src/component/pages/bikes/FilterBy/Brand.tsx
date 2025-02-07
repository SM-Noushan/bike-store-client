import { capitalize } from "@/utils";
import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";
import { useProductMetaData } from "@/hooks/useProductMetaData";

export default function FilterByBrand({ formMethods }: TFormMethod) {
  const { productBrands } = useProductMetaData();
  const fields: TFieldConfig[] = [
    {
      name: "brand",
      label: <FilterByHeading title="Brand" />,
      type: "checkbox-group",
      options: productBrands.map((brand) => ({
        value: brand.toLowerCase(),
        label: capitalize(brand),
      })),
    },
  ];
  return (
    <FormWrapper fields={fields} formMethods={formMethods} error={undefined} />
  );
}
