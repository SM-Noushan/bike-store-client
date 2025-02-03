import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  controllerField: {
    value: string;
    onChange: (value: string) => void;
  };
  options: Option[];
}

const FormRadioGroup = ({ controllerField, options }: FormRadioGroupProps) => {
  return (
    <RadioGroup
      defaultValue={controllerField.value || ""}
      onValueChange={controllerField.onChange}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <RadioGroupItem id={option.value} value={option.value} />
          <Label className="ml-2" htmlFor={option.value}>
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default FormRadioGroup;
