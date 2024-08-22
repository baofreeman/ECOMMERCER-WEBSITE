import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectSidebarLeft,
  selectSidebarRight,
  setSidebarLeft,
  setSidebarRight,
} from "../../../api/slices/sidebarSlice";

import { ArrowIcon } from "../../../assets/icons";

/**
 * ButtonSidebar component toggles the visibility of left or right sidebars
 * and adjusts its styling based on the current state of the sidebar.
 */

const ButtonSidebar = ({ design }) => {
  const openSidebarLeft = useSelector(selectSidebarLeft); // Check if left sidebar is open
  const openSidebarRight = useSelector(selectSidebarRight); // Check if right sidebar is open
  const dispatch = useDispatch();

  // Function to toggle sidebar visibility
  const handleOpenOrCloseSidebar = () => {
    if (design === "left") {
      dispatch(setSidebarLeft(!openSidebarLeft));
    } else if (design === "right") {
      dispatch(setSidebarRight(!openSidebarRight));
    }
  };

  // Determine styling and arrow direction based on sidebar state
  const sidebarStyles = {
    left: openSidebarLeft
      ? "left-[-16px] border-r-0 rounded-tr-[0px] rounded-br-[0px]"
      : "left-[0px] border-l-0 rounded-tl-[0px] rounded-bl-[0px]",
    right: openSidebarRight
      ? "right-[-16px] border-l-0 rounded-tl-[0px] rounded-bl-[0px]"
      : "right-[0px] border-r-0 rounded-tr-[0px] rounded-br-[0px]",
  };

  const arrowRotation = {
    left: openSidebarLeft ? "90deg" : "-90deg",
    right: openSidebarRight ? "-90deg" : "90deg",
  };

  const sidebarClass = sidebarStyles[design];
  const arrowDirection = arrowRotation[design];

  return (
    <button
      className={`${sidebarClass} md:hidden sm:hidden hover:scale-105 flex absolute items-center border rounded-md justify-center top-[16px] w-[16px] h-[48px] bg-white dark:bg-black z-50 cursor-pointer transition-all duration-500 ease-out`}
      onClick={handleOpenOrCloseSidebar}
    >
      <div className="bg-white dark:bg-black">
        <ArrowIcon width={12} height={7} rotate={arrowDirection} />
      </div>
    </button>
  );
};

export default memo(ButtonSidebar);
