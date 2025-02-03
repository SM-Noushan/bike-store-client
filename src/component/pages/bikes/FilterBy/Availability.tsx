import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";

const fields: TFieldConfig[] = [
  {
    name: "availability",
    label: <FilterByHeading title="Availability" />,
    type: "radio",
    options: [
      { value: "in-stock", label: "In Stock" },
      { value: "out-of-stock", label: "Out of Stock" },
    ],
  },
];

export default function FilterByAvailability({ formMethods }: TFormMethod) {
  return <FormWrapper fields={fields} formMethods={formMethods} />;
}
