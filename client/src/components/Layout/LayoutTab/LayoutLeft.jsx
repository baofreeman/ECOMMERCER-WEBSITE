import { LeftSidebar } from "../../SideBar";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSidebarLeft,
  setSidebarLeft,
} from "../../../api/slices/sidebarSlice";
import { useEffect } from "react";

/**
 * LayoutLeft component displays a sidebar on the left side of the layout.
 * The sidebar's visibility is controlled based on the current URL and Redux state.
 */

const LayoutLeft = ({ id }) => {
  const { pathname, search } = useLocation();
  const openSidebarLeft = useSelector(selectSidebarLeft);
  const dispatch = useDispatch();

  // Determines if the sidebar should be visible based on the query parameters
  const shouldShowSidebarLeft = search.includes("productId");

  useEffect(() => {
    // Dispatch action to update sidebar state if necessary
    if (!openSidebarLeft && pathname.includes("/admin")) {
      dispatch(setSidebarLeft(true));
    }
  }, [pathname, openSidebarLeft, dispatch]);

  return (
    <aside
      id={id}
      className={clsx(
        "bg-white dark:bg-black overflow-auto no-scrollbar",
        "sm:flex sm:items-center sm:justify-center",
        "md:flex md:items-center md:justify-center",
        { "sm:hidden md:hidden": shouldShowSidebarLeft },
        { hidden: !openSidebarLeft && "hidden" }
      )}
    >
      <div className="w-full p-6 sm:p-0 md:p-3">
        <LeftSidebar />
      </div>
    </aside>
  );
};

export default LayoutLeft;
