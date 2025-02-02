import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  UserCircleIcon,
} from "lucide-react";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

const bikeCategories = [
  { name: "Mountain Bikes", href: "/bikes?category=mountain" },
  { name: "Road Bikes", href: "/bikes?category=road" },
  { name: "Hybrid Bikes", href: "/bikes?category=hybrid" },
  { name: "Electric Bikes", href: "/bikes?category=electric" },
  { name: "BMX Bikes", href: "/bikes?category=bmx" },
  { name: "Gravel Bikes", href: "/bikes?category=gravel" },
  { name: "Touring Bikes", href: "/bikes?category=touring" },
];

const publicUserCategories = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export const MyMenubar = ({
  categories,
  label,
}: {
  label: ReactNode;
  categories: { name: string; href: string }[];
}) => {
  return (
    <Menubar className="bg-neutral shadow-none border-none p-0">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer px-0">{label}</MenubarTrigger>
        <MenubarContent className="bg-zinc-950 text-white px-6 py-2">
          {categories.map((category, index) => (
            <MenubarItem key={index} className="p-0">
              <Link
                to={category.href}
                className="text-white/60 hover:text-white hover:bg-zinc-950 w-full p-2 border-b border-b-white/60 hover:border-b-white"
              >
                {category.name}
              </Link>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

const BottomNavbar = () => {
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
        <div className="container max-w-screen-2xl px-4 lg:px-12 py-4 flex justify-between items-center mx-auto flex-wrap gap-y-4">
          <MyMenubar
            categories={bikeCategories}
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
              categories={publicUserCategories}
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
