import { useController } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxGroupProps {
  name: string;
  options: { value: string; label: string }[];
  control: any;
}

const CheckboxGroup = ({ name, options, control }: CheckboxGroupProps) => {
  const { field } = useController({ name, control });

  const handleChange = (checked: boolean, value: string) => {
    field.onChange(
      checked
        ? [...(Array.isArray(field.value) ? field.value : []), value]
        : Array.isArray(field.value)
        ? field.value.filter((v: string) => v !== value)
        : []
    );
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            checked={
              Array.isArray(field.value) && field.value.includes(option.value)
            }
            onCheckedChange={(checked) =>
              handleChange(checked as boolean, option.value)
            }
          />
          <label>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
