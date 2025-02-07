import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";

const fields: TFieldConfig[] = [
  {
    name: "availability",
    label: <FilterByHeading title="Availability" />,
    type: "radio",
    options: [
      { value: "true", label: "In Stock" },
      { value: "false", label: "Out of Stock" },
    ],
  },
];

export default function FilterByAvailability({ formMethods }: TFormMethod) {
  return (
    <FormWrapper fields={fields} formMethods={formMethods} error={undefined} />
  );
}
