import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";

const fields: TFieldConfig[] = [
  {
    name: "category",
    label: <FilterByHeading title="Category" />,
    type: "checkbox-group",
    options: [
      { value: "sport", label: "Sport" },
      { value: "touring", label: "Touring" },
      { value: "mountain", label: "Mountain" },
      { value: "road", label: "Road" },
      { value: "hybrid", label: "Hybrid" },
      { value: "electric", label: "Electric" },
      { value: "folding", label: "Folding" },
    ],
  },
];

export default function FilterByCategory({ formMethods }: TFormMethod) {
  return <FormWrapper fields={fields} formMethods={formMethods} />;
}
