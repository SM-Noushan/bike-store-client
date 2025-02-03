import React, { FC } from "react";

interface FilterByHeadingProps {
  title: string;
  icon?: React.ComponentType;
}

const FilterByHeading: FC<FilterByHeadingProps> = ({ title, icon: Icon }) => {
  return (
    <div className="flex items-center gap-x-1.5">
      {Icon && <Icon />}
      <h3 className="font-bold lg:text-xl">{title}</h3>
    </div>
  );
};

export default FilterByHeading;
