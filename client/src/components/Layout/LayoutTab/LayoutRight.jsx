import { useLocation } from "react-router-dom";
import { RightSidebar } from "../../SideBar";
import { useSelector } from "react-redux";
import { selectSidebarRight } from "../../../api/slices/sidebarSlice";
import clsx from "clsx";

/**
 * LayoutRight component displays a sidebar on the right side of the layout.
 * The sidebar's visibility is controlled based on the current URL and the
 * Redux state.
 */

const LayoutRight = ({ id }) => {
  const { pathname, search } = useLocation();
  const isSidebarRightOpen = useSelector(selectSidebarRight);

  // Determines if the sidebar should be visible based on the current path and query parameters
  const shouldShowSidebarRight =
    pathname.includes("/cart") ||
    pathname.includes("/checkout") ||
    search.includes("productId");

  // If the current path is '/admin', do not display the sidebar
  if (pathname.includes("/admin")) {
    return null;
  }

  return (
    <aside
      id={id}
      className={clsx("bg-white dark:bg-black overflow-auto no-scrollbar", {
        "sm:block md:block": shouldShowSidebarRight,
        "sm:hidden md:hidden": !shouldShowSidebarRight,
        hidden: !isSidebarRightOpen,
      })}
    >
      <div className="h-full p-4 sm:p-1 sm:relative">
        <RightSidebar />
      </div>
    </aside>
  );
};

export default LayoutRight;
