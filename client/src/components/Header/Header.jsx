import { memo } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

import Profile from "./Profile";
import Search from "./Search";

import DarkModeSwitch from "../shared/DarkModeSwitch";
import { Button } from "../ui";
import { Logo } from "../../assets/icons";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header
      className={clsx(
        "w-full flex h-[62px] sm:h-[48px] sm:px-[10px] px-[24px] my-0 mx-auto z-10 border-b"
      )}
    >
      <nav className="w-full flex items-center justify-between text-silver my-0 mx-auto sm:gap-2">
        <div className="flex flex-1 space-x-4 sm:space-x-2 items-center justify-start">
          {/* Logo */}
          <Button size="s" to={"/"}>
            <Logo />
          </Button>

          {/* Navigation links */}
          <ul className="flex flex-1 space-x-4 sm:space-x-2 items-center">
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
          </ul>
        </div>

        {/* Search input */}
        <Search />

        {/* Profile and theme toggle */}
        <div className="flex flex-1 space-x-4 sm:space-x-2 justify-end">
          <DarkModeSwitch />
          <Profile />
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
