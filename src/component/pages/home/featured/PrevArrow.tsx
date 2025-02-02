import { FC } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrevArrowProps {
  onClick?: () => void;
}

const PrevArrow: FC<PrevArrowProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center z-10 absolute top-[35%] -left-1">
      <Button
        onClick={onClick}
        variant="outline"
        className="text-white/80 hover:text-white rounded-full !p-0 !size-10 !bg-neutral-800/80 hover:!bg-neutral-800 duration-300 cursor-pointer "
      >
        <ArrowLeft size={24} />
      </Button>
    </div>
  );
};

export default PrevArrow;
