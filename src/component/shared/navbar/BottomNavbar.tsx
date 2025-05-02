import {
  User2,
  Search,
  UserCheck2,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import MyMenubar from "./MyMenubar";
import { splitString } from "@/utils";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBikeParams } from "@/hooks/useBikeParams";
import { useCartHandler } from "@/hooks/useCartHandler";
import { MenubarShortcut } from "@/components/ui/menubar";
import { useProductMetaData } from "@/hooks/useProductMetaData";
import { Link, useLocation, useNavigate } from "react-router-dom";

const unsignedUserOptions = [
  { name: "Login", to: "login" },
  { name: "Register", to: "register" },
];

const signedInUserOptions = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Logout", to: "logout" },
];

const BottomNavbar = () => {
  const { productCategories } = useProductMetaData();
  const { search } = useLocation();
  const { currentUser } = useAuth();
  const { cartItem } = useCartHandler();
  const { searchTerm, handleSearch: setSearch } = useBikeParams();
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchTerm.trim())
      navigate("/bikes" + search, {
        state: { replace: true },
      });
  };

  return (
    <section className="pt-16">
      <div className="bg-neutral-200/65">
        <div className="main-wrapper flex justify-between items-center flex-wrap gap-y-4">
          <MyMenubar
            navItems={productCategories.map((category) => ({
              name: splitString(category),
              to: `/bikes?category=${category.toLowerCase()}`,
            }))}
            label={
              <>
                <MenubarShortcut className="mr-1 mt-0.5">⌘</MenubarShortcut>
                Categories
              </>
            }
          />
          <div className="flex w-full max-w-sm items-center space-x-2 order-3 md:order-2">
            <Input
              type="text"
              placeholder="Search Bikes"
              className="focus:!ring-0 bg-white"
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Button onClick={handleSearch}>
              <Search />
            </Button>
          </div>
          <div className="flex items-center mr-6 gap-x-2 order-2 md:order-3">
            <MyMenubar
              button={currentUser ? "hybrid" : true}
              navItems={currentUser ? signedInUserOptions : unsignedUserOptions}
              label={
                <>
                  {currentUser ? <UserCheck2 /> : <User2 />}
                  <MenubarShortcut className="mr-1 mt-0.5">
                    <ChevronDown size={16} />
                  </MenubarShortcut>
                </>
              }
            />
            <Link to="/my-cart" className="relative">
              <span className="absolute right-0 -top-3.5 text-sm font-semibold">
                {cartItem}
              </span>
              <ShoppingCart size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomNavbar;
