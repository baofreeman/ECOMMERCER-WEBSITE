import { memo, useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

import Profile from "./Profile";
import Search from "./Search";

import DarkModeSwitch from "../shared/DarkModeSwitch";
import { Button } from "../ui";
import { Logo } from "../../assets/icons";

const Header = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { pathname } = useLocation();
  // Toggle display of the logo based on the current path
  const displayLogo = pathname !== "/" ? `sm:hidden` : `sm:flex`;

  return (
    <header
      className={clsx(
        "w-full flex h-[62px] sm:h-[48px] sm:px-[10px] px-[24px] my-0 mx-auto z-10 border-b"
      )}
    >
      <nav className="w-full flex items-center justify-between text-silver my-0 mx-auto sm:gap-2">
        <div
          className={`flex gap-16 sm:gap-1 items-center flex-1 sm:flex-none`}
        >
          {/* Logo */}
          <div className={displayLogo}>
            <Button size="m" to={"/"}>
              <Logo />
            </Button>
          </div>

          {/* Navigation links */}
          <ul className="flex gap-2 items-center">
            <li>
              <Button
                size="l"
                design={
                  pathname.includes("/shop") ? "link-primary" : "link-basic"
                }
                width="max"
                to={`/shop`}
              >
                Shop
              </Button>
            </li>
            {/* Admin link (conditionally rendered) */}
            {false && (
              <li>
                <Button
                  size="l"
                  design={
                    pathname.includes("/admin") ? "link-primary" : "link-basic"
                  }
                  width="max"
                  to={`/admin`}
                >
                  Admin
                </Button>
              </li>
            )}
          </ul>
        </div>

        {/* Search input */}
        <Search
          toggleModal={isSearchModalOpen}
          setToggleModal={setIsSearchModalOpen}
        />

        {/* Profile and theme toggle */}
        <DarkModeSwitch />
        <Profile />
      </nav>
    </header>
  );
};

export default memo(Header);
