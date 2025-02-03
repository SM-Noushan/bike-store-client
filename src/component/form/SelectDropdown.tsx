import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useController } from "react-hook-form";

interface SelectDropdownProps {
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  control: any;
}

const SelectDropdown = ({
  name,
  options,
  placeholder,
  control,
}: SelectDropdownProps) => {
  const { field } = useController({ name, control });

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
