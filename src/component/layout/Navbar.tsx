import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { MenuIcon, XIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

// Navigation items array (DRY)
const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About us", href: "/about-us" },
];

// Base styling for links using the Zinc palette
const baseLinkClasses =
  "my-2 text-zinc-800 border-b-2 border-transparent transition-colors duration-300 transform hover:text-zinc-950 md:mx-4 md:my-0";

// Additional classes when the link is active
const activeLinkClasses = "font-bold text-zinc-900 border-b-2 !border-zinc-900";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-100">
      {({ open }) => (
        <>
          <div className="container max-w-screen-2xl px-12 py-4 mx-auto flex items-center justify-between flex-wrap">
            {/* Logo */}
            <NavLink to="/" className="flex items-center">
              <h1 className="font-black text-2xl">BikeStore</h1>
            </NavLink>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <DisclosureButton className="text-zinc-400 hover:text-zinc-300 focus:outline-none focus:text-zinc-300">
                {open ? (
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="w-6 h-6" aria-hidden="true" />
                )}
              </DisclosureButton>
            </div>

            {/* Desktop menu */}
            <div className="hidden lg:flex lg:items-center">
              {navigation.map((item, idx) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${isActive ? activeLinkClasses : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile menu panel */}
          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="transform opacity-0 -translate-x-full"
            enterTo="transform opacity-100 translate-x-0"
            leave="transition duration-300 ease-in"
            leaveFrom="transform opacity-100 translate-x-0"
            leaveTo="transform opacity-0 -translate-x-full"
          >
            <DisclosurePanel className="lg:hidden">
              <div className="px-6 pt-4 pb-4 flex flex-col">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `${baseLinkClasses} ${isActive ? activeLinkClasses : ""}`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <NavLink
                  to="/cart"
                  className="relative inline-block text-zinc-200 transition-colors duration-300 transform hover:text-zinc-100"
                >
                  <svg
                    className="w-5 h-5 inline-block"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute top-0 left-0 p-1 text-xs text-zinc-50 bg-zinc-700 rounded-full" />
                </NavLink>
              </div>
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
