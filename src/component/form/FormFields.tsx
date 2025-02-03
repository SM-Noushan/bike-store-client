import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TFormFields } from "@/types";
import PasswordInput from "./PasswordInput";
import CheckboxGroup from "./CheckboxGroup";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import SelectDropdown from "./SelectDropdown";
import FormRadioGroup from "./FormRadioGroup";
import PriceRangeInput from "./PriceRangeInput";

const FormFields = ({ methods, fields }: TFormFields) => (
  <div className="space-y-6">
    {fields.map((field) => (
      <FormField
        key={field.name}
        control={methods.control}
        name={field.name as any}
        render={({ field: controllerField }) => (
          <FormItem>
            <FormLabel>
              {field.label}{" "}
              {field.description && (
                <Badge variant="outline" className="ml-2 text-gray-500">
                  Optional
                </Badge>
              )}
            </FormLabel>
            <FormControl>
              {
                {
                  text: (
                    <Input
                      type="text"
                      placeholder={field.placeholder}
                      {...controllerField}
                    />
                  ),
                  email: (
                    <Input
                      type="email"
                      placeholder={field.placeholder}
                      {...controllerField}
                    />
                  ),
                  password: (
                    <PasswordInput
                      placeholder={field.placeholder}
                      {...controllerField}
                    />
                  ),
                  "price-range":
                    "min" in field ? (
                      <PriceRangeInput
                        name={field.name}
                        min={field.min}
                        max={field.max}
                        control={methods.control}
                      />
                    ) : null,
                  select:
                    "options" in field ? (
                      <SelectDropdown
                        name={field.name}
                        options={field.options}
                        placeholder={field.placeholder}
                        control={methods.control}
                      />
                    ) : null,
                  "checkbox-group":
                    "options" in field ? (
                      <CheckboxGroup
                        name={field.name}
                        options={field.options}
                        control={methods.control}
                      />
                    ) : null,
                  radio:
                    "options" in field ? (
                      <FormRadioGroup
                        controllerField={controllerField}
                        options={field.options}
                      />
                    ) : null,
                }[field.type]
              }
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
  </div>
);

export default FormFields;
