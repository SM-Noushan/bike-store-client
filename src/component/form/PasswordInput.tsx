import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PasswordInput = ({ placeholder, ...props }: { placeholder?: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      <Button
        type="button"
        size={"icon"}
        variant={"outline"}
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-500 hover:text-gray-700 border-none"
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </Button>
    </div>
  );
};

export default PasswordInput;
