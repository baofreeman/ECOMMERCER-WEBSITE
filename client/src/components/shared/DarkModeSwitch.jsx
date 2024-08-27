import { memo, useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import { DarkIcon, SunIcon } from "../../assets/icons";

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-1 sm:flex-none gap-2 items-center justify-end">
      <div
        onClick={toggleDarkMode}
        className="flex relative items-center justify-center gap-2 rounded-[20px] w-[4.4rem] h-[2.2rem] border border-orange p-1 cursor-pointer hover:opacity-90"
      >
        <DarkIcon isDarkMode={isDarkMode} />
        <div
          className={clsx(
            "absolute bg-orange rounded-[999px] w-[1.8rem] h-[1.8rem] transition-transform duration-500",
            {
              "translate-x-[1.1rem]": isDarkMode,
              "translate-x-[-1.1rem]": !isDarkMode,
            }
          )}
        />
        <SunIcon isDarkMode={!isDarkMode} />
      </div>
    </div>
  );
};

export default memo(DarkModeSwitch);
