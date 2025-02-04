import { TNavbar } from "@/types";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/app/hook";
import AuthTabs from "@/component/auth/Auth";
import { logout } from "@/app/features/api/authSlice";

const MyMenubar: FC<TNavbar> = ({ navItems, label, button = false }) => {
  const dispatch = useAppDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const navItemCss =
    "text-white/60 hover:text-white hover:bg-zinc-950 w-full p-2 border-b border-b-white/60 hover:border-b-white text-start";

  return (
    <Menubar className="bg-neutral shadow-none border-none p-0">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer px-0">{label}</MenubarTrigger>
        <MenubarContent className="bg-zinc-950 text-white px-6 py-2">
          {navItems?.length
            ? navItems.map((navItem, index) => (
                <MenubarItem key={index} className="p-0">
                  {button ? (
                    button === "hybrid" ? (
                      navItem.name === "Logout" ? (
                        <button
                          onClick={() => dispatch(logout())}
                          className={navItemCss}
                        >
                          {navItem.name}
                        </button>
                      ) : (
                        <Link to={navItem?.to} className={navItemCss}>
                          {navItem.name}
                        </Link>
                      )
                    ) : (
                      <button
                        onClick={() => {
                          if (navItem.name === "Login") {
                            setLoginModal(true);
                          } else {
                            setRegisterModal(true);
                          }
                        }}
                        className={navItemCss}
                      >
                        {navItem.name}
                      </button>
                    )
                  ) : (
                    <Link to={navItem?.to} className={navItemCss}>
                      {navItem.name}
                    </Link>
                  )}
                </MenubarItem>
              ))
            : ""}
        </MenubarContent>
      </MenubarMenu>
      {/* Auth Modal */}
      {(loginModal || registerModal) && (
        <AuthTabs
          initialTab={loginModal ? "login" : "register"}
          open
          setOpen={loginModal ? setLoginModal : setRegisterModal}
        />
      )}
    </Menubar>
  );
};

export default MyMenubar;
