import { useLocation } from "react-router-dom";
import { Button } from "../../components/ui";

const AdminHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const getButtonDesign = (path) =>
    pathname.includes(path) ? "link-active" : "link-basic";

  return (
    <nav>
      <ul className="flex">
        <li>
          <Button
            size="m"
            design={getButtonDesign("/products")}
            to="/admin/products"
            aria-current={pathname.includes("/products") ? "page" : undefined}
          >
            Products
          </Button>
        </li>
        <li>
          <Button
            size="m"
            design={getButtonDesign("/users")}
            to="/admin/users"
            aria-current={pathname.includes("/users") ? "page" : undefined}
          >
            Users
          </Button>
        </li>
        <li>
          <Button
            size="m"
            design={getButtonDesign("/orders")}
            to="/admin/orders"
            aria-current={pathname.includes("/orders") ? "page" : undefined}
          >
            Orders
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminHeader;
