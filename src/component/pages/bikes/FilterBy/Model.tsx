import { capitalize } from "@/utils";
import FilterByHeading from "./FilterByHeading";
import { TFieldConfig, TFormMethod } from "@/types";
import FormWrapper from "@/component/form/FormWrapper";
import { useProductMetaData } from "@/hooks/useProductMetaData";

export default function FilterByModel({ formMethods }: TFormMethod) {
  const { productModels } = useProductMetaData();
  const fields: TFieldConfig[] = [
    {
      name: "model",
      label: <FilterByHeading title="Year" />,
      type: "checkbox-group",
      options: productModels.map((model) => ({
        value: model.toLowerCase(),
        label: `${capitalize(model)}`,
      })),
    },
  ];
  return (
    <FormWrapper fields={fields} formMethods={formMethods} error={undefined} />
  );
}
