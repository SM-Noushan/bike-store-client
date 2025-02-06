import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TSelectInput } from "@/types";

const SelectInput: FC<TSelectInput> = ({
  onValueChange,
  options,
  placeholder = "Select one",
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="max--[180px] border rounded px-2 py-1">
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

export default SelectInput;
