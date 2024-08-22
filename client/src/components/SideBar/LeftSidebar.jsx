import { memo } from "react";
import { useLocation } from "react-router-dom";

import { AdminSidebar } from "./index";
import { CartFilter } from "../../features/Cart";
import { FilterProducts } from "../../features/Shop";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  if (pathname.includes("/shop")) return <FilterProducts />;
  if (pathname.includes("/admin")) return <AdminSidebar />;
  if (pathname.includes("/cart")) return <CartFilter />;
  if (pathname.includes("/checkout")) return <CartFilter />;
  return null;
};

export default memo(LeftSidebar);
