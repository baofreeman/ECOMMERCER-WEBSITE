import { Button } from "../../../components/ui";
import { useLocation } from "react-router-dom";

const NavbarAdmin = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex flex-col gap-8">
      <section className="text-md flex flex-col sm:flex-row sm:items-center sm:justify-center md:flex-row md:items-center md:justify-center gap-8">
        <div className="flex flex-col gap-3">
          <Button
            size="m"
            design={
              pathname === "/admin/products" ? "link-active" : "link-basic"
            }
            to={"/admin/products"}
          >
            Tất cả sản phẩm
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            size="m"
            design={
              pathname === "/admin/products/create-product"
                ? "link-active"
                : "link-basic"
            }
            to={"/admin/products/create-product"}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </section>
    </div>
  );
};

export default NavbarAdmin;
