import { FC } from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  prevLocation: string;
  currentLocation: string;
  title: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  prevLocation,
  currentLocation,
  title,
}) => {
  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>
      <p className="text-sm  font-light capitalize flex items-center">
        <span>{prevLocation === "" ? "Home" : prevLocation}</span>
        <span className="px-1">
          <ChevronRight size={16} />
        </span>
        <span className="capitalize font-semibold text-primeColor">
          {currentLocation}
        </span>
      </p>
    </div>
  );
};

export default Breadcrumbs;
