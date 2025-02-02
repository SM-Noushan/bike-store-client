import { FC } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NextArrowProps {
  onClick?: () => void;
}

const NextArrow: FC<NextArrowProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center z-10 absolute top-[35%] right-0">
      <Button
        onClick={onClick}
        variant="outline"
        className=" text-white/80 hover:text-white rounded-full !p-0 !size-10 !bg-neutral-800/80 hover:!bg-neutral-800 duration-300 cursor-pointer "
      >
        <ArrowRight size={24} />
      </Button>
    </div>
  );
};

export default NextArrow;
