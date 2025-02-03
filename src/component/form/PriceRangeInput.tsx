import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";

interface PriceRangeInputProps {
  name: string;
  min: number;
  max: number;
  control: any;
}

const PriceRangeInput = ({ name, min, max, control }: PriceRangeInputProps) => {
  const { field } = useController({ name, control });

  const handleChange = (key: "min" | "max", value: number) => {
    field.onChange({
      ...field.value,
      [key]: Math.max(min, Math.min(max, value)),
    });
  };

  return (
    <div className="flex space-x-4">
      {["min", "max"].map((key) => (
        <Input
          key={key}
          type="number"
          min={min}
          max={max}
          value={field.value?.[key] || (key === "min" ? min : max)}
          onChange={(e) =>
            handleChange(key as "min" | "max", Number(e.target.value))
          }
          placeholder={`${key === "min" ? "Min" : "Max"} ${
            key === "min" ? min : max
          }`}
        />
      ))}
    </div>
  );
};

export default PriceRangeInput;
