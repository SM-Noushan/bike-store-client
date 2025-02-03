import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";

const fields: TFieldConfig[] = [
  {
    name: "brand",
    label: <FilterByHeading title="Brand" />,
    type: "checkbox-group",
    options: [
      { value: "yamaha", label: "Yamaha" },
      { value: "ducati", label: "Ducati" },
    ],
  },
];

export default function FilterByBrand({ formMethods }: TFormMethod) {
  return <FormWrapper fields={fields} formMethods={formMethods} />;
}
