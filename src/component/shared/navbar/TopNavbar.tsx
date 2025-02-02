import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";

// Define navigation item type
interface NavigationItem {
  name: string;
  href: string;
}

// Navigation items array (DRY)
const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Bikes", href: "/bikes" },
  { name: "About us", href: "/about-us" },
];

// These style constants remain for desktop styling only.
const baseLinkClasses =
  "my-2 text-zinc-800 transition-colors duration-300 transform md:px-6 md:my-0";
const activeLinkClasses = "font-medium text-zinc-900";

// -------------------------
// Header Component (Desktop Header & Mobile Menu Button)
// -------------------------
interface HeaderProps {
  open: boolean;
}
const Header: React.FC<HeaderProps> = ({ open }) => (
  <header className="fixed bg-white w-full z-20">
    <div className="flex items-center justify-between flex-wrap container max-w-screen-2xl px-4 py-4 lg:px-12">
      {/* Logo */}
      <NavLink to="/" className="flex items-center">
        <h1 className="font-black text-2xl">BikeStore</h1>
      </NavLink>

      {/* Mobile menu button */}
      <div className="flex md:hidden">
        <DisclosureButton className="text-zinc-800 hover:text-zinc-950 focus:outline-none focus:text-zinc-950">
          {open || <MenuIcon className="w-6 h-6" aria-hidden="true" />}
        </DisclosureButton>
      </div>

      {/* Desktop menu */}
      <menu className="hidden md:flex lg:items-center">
        {navigation.map((item, idx) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                idx !== navigation.length - 1
                  ? "border-r-2 border-zinc-300"
                  : ""
              } ${
                isActive
                  ? `${activeLinkClasses} *:border-b-2 *:border-zinc-900`
                  : "hover:font-medium hover:text-zinc-900 hover:*:border-b-2 hover:*:border-zinc-900"
              }`
            }
          >
            <li className="list-none inline-block">{item.name}</li>
          </NavLink>
        ))}
      </menu>
    </div>
  </header>
);

// -------------------------
// Mobile Overlay Component
// -------------------------
const MobileOverlay: React.FC = () => (
  <div className="bg-zinc-600/60 h-screen w-full fixed md:hidden z-20" />
);

// -------------------------
// Mobile Menu (Sidebar) Component
// -------------------------
interface MobileMenuProps {
  open: boolean;
  close: () => void;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ open, close }) => (
  <Transition
    show={open}
    enter="transition duration-300 ease-out"
    enterFrom="transform opacity-0 -translate-x-full"
    enterTo="transform opacity-100 translate-x-0"
    leave="transition duration-300 ease-in"
    leaveFrom="transform opacity-100 translate-x-0"
    leaveTo="transform opacity-0 -translate-x-full"
  >
    <DisclosurePanel
      className="md:hidden h-screen fixed w-full z-20"
      onClick={close}
    >
      <header
        onClick={close}
        className="px-6 pt-4 pb-4 flex flex-col bg-zinc-900 h-full w-2/3 relative"
      >
        {/* Close button */}
        <button className="hover:text-zinc-950 focus:outline-none focus:text-zinc-950 absolute -right-12 text-white">
          <span className="block border bg-zinc-800/60 p-1">
            <XIcon className="w-6 h-6" aria-hidden="true" />
          </span>
        </button>

        {/* Mobile Logo */}
        <NavLink to="/" className="flex items-center">
          <h1 className="font-black text-2xl text-white mb-4">BikeStore</h1>
        </NavLink>

        {/* Mobile Navigation Links */}
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `${baseLinkClasses} !text-white w-fit ${
                isActive
                  ? `${activeLinkClasses} *:border-b-2 *:border-white`
                  : "hover:font-medium hover:text-zinc-900 hover:*:border-b-2 hover:*:border-zinc-900"
              }`
            }
          >
            <li className="list-none">{item.name}</li>
          </NavLink>
        ))}
      </header>
    </DisclosurePanel>
  </Transition>
);

// -------------------------
// Navbar Component
// -------------------------
const TopNavbar: React.FC = () => {
  return (
    <Disclosure as="nav">
      {({ open, close }) => (
        <>
          <Header open={open} />
          {open && <MobileOverlay />}
          <MobileMenu open={open} close={close} />
        </>
      )}
    </Disclosure>
  );
};

export default TopNavbar;
