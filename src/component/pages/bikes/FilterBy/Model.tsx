import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";

const fields: TFieldConfig[] = [
  {
    name: "model",
    label: <FilterByHeading title="Model" />,
    type: "checkbox-group",
    options: [
      { value: "yamaha-r1", label: "Yamaha R1" },
      { value: "ducati-panigale", label: "Ducati Panigale" },
    ],
  },
];

export default function FilterByModel({ formMethods }: TFormMethod) {
  return <FormWrapper fields={fields} formMethods={formMethods} />;
}
