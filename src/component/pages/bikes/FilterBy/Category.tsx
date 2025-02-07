import { capitalize } from "@/utils";
import { useLocation } from "react-router-dom";
import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";
import { useProductMetaData } from "@/hooks/useProductMetaData";

export default function FilterByCategory({ formMethods }: TFormMethod) {
  const { productCategories } = useProductMetaData();
  const { search } = useLocation();
  const hasCategory = search.split("category=")[1];

  const fields: TFieldConfig[] = [
    {
      name: "category",
      label: <FilterByHeading title="Category" />,
      type: "checkbox-group",
      defaultValue: hasCategory || "",
      options: hasCategory
        ? [
            {
              value: hasCategory,
              label: capitalize(hasCategory),
            },
          ]
        : productCategories.map((category) => ({
            value: category.toLowerCase(),
            label: capitalize(category),
          })),
    },
  ];

  return (
    <FormWrapper fields={fields} formMethods={formMethods} error={undefined} />
  );
}
