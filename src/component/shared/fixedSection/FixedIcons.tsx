import React, { useState } from "react";
import { useAppSelector } from "@/app/hook";
import AuthTabs from "@/component/auth/Auth";
import { useNavigate } from "react-router-dom";
import { User, ShoppingCart } from "lucide-react";
import { selectCurrentUser } from "@/app/features/api/authSlice";

interface FixedIconItem {
  id: string;
  route: string;
  text: string;
  Icon: React.ElementType;
  count?: number;
}

const products = [];
const items: FixedIconItem[] = [
  {
    id: "profile",
    route: "/dashboard",
    text: "Profile",
    Icon: User,
  },
  {
    id: "cart",
    route: "/my-cart",
    text: "Buy Now",
    Icon: ShoppingCart,
    count: products.length,
  },
];

const FixedIcons: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [authModal, setAuthModal] = useState(false);

  const onClick = (id: string, route: string) => {
    if (id === "profile")
      if (currentUser) navigate(route);
      else setAuthModal(true);
    else navigate(route);
  };

  return (
    <div className="fixed top-72 right-2 z-20 hidden md:flex flex-col gap-2">
      {items.map((item) => (
        <button key={item.id} onClick={() => onClick(item.id, item.route)}>
          <div className="bg-neutral-100 size-16 rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
            <div className="flex justify-center items-center">
              <item.Icon className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
              <item.Icon className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
            </div>
            <p className="text-xs font-semibold">{item.text}</p>
            {item?.id === "cart" && (
              <p className="absolute top-1 right-2 bg-neutral-600 text-white text-xs size-4 rounded-full flex items-center justify-center font-semibold">
                {item.count || 0}
              </p>
            )}
          </div>
        </button>
      ))}
      {/* Auth Modal */}
      {authModal && <AuthTabs initialTab="login" open setOpen={setAuthModal} />}
    </div>
  );
};

export default FixedIcons;
