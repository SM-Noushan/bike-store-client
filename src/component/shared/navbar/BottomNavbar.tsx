import {
  ChevronDown,
  Search,
  ShoppingCart,
  UserCircleIcon,
} from "lucide-react";
import { useState } from "react";
import MyMenubar from "./MyMenubar";
import { useAppSelector } from "@/app/hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MenubarShortcut } from "@/components/ui/menubar";
import { selectCurrentUser } from "@/app/features/api/authSlice";

const bikeCategories = [
  { name: "Mountain Bikes", to: "/bikes?category=mountain" },
  { name: "Road Bikes", to: "/bikes?category=road" },
  { name: "Hybrid Bikes", to: "/bikes?category=hybrid" },
  { name: "Electric Bikes", to: "/bikes?category=electric" },
  { name: "BMX Bikes", to: "/bikes?category=bmx" },
  { name: "Gravel Bikes", to: "/bikes?category=gravel" },
  { name: "Touring Bikes", to: "/bikes?category=touring" },
];

const unsignedUserOptions = [
  { name: "Login", to: "login" },
  { name: "Register", to: "register" },
];

const signedInUserOptions = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Logout", to: "logout" },
];

const BottomNavbar = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/bikes?search=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <section className="pt-16">
      <div className="bg-neutral-200/65">
        <div className="main-wrapper flex justify-between items-center flex-wrap gap-y-4">
          <MyMenubar
            navItems={bikeCategories}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
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
                  <UserCircleIcon size={20} />
                  <MenubarShortcut className="mr-1 mt-0.5">
                    <ChevronDown size={16} />
                  </MenubarShortcut>
                </>
              }
            />
            <Link to="/my-cart" className="relative">
              <span className="absolute right-0 -top-3.5 text-sm font-semibold">
                0
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
