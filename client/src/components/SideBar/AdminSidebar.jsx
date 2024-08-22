import { useLocation } from "react-router-dom";
import {
  OrderSidebarLeftAdmin,
  ProductSidebarLeftAdmin,
} from "../../features/Admin";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  if (pathname.includes("/admin/products")) return <ProductSidebarLeftAdmin />;
  if (pathname.includes("/admin/orders")) return <OrderSidebarLeftAdmin />;
  return null;
};

export default AdminSidebar;
