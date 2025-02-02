import React from "react";
import { LucideBus, RotateCw } from "lucide-react";

interface BannerItem {
  key: string;
  icon: React.ReactNode;
  text: string;
}

const bannerItems: BannerItem[] = [
  {
    key: "warranty",
    icon: <span className="font-bold w-6 text-center">3</span>,
    text: "Three years warranty",
  },
  {
    key: "shipping",
    icon: (
      <span className="text-xl text-center w-6 ml-1">
        <LucideBus />
      </span>
    ),
    text: "Free shipping",
  },
  {
    key: "return",
    icon: (
      <span className="text-2xl text-center w-6">
        <RotateCw />
      </span>
    ),
    text: "Return policy in 30 days",
  },
];

const BannerBottom: React.FC = () => {
  return (
    <div className="w-full bg-neutral-200/65 border-b border-b-gray-400 py-4 px-4 relative -mt-1.5 cursor-default">
      <div className="container max-w-screen-2xl px-4 lg:px-12 py-4 mx-auto md:h-20 flex flex-col md:flex-row justify-between items-center">
        {bannerItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-2 shadow-sm hover:shadow-md duration-300"
          >
            {item.icon}
            <p className="font-light">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerBottom;
