import React from "react";
import { Button } from "../../../components/ui";
import { useLocation } from "react-router-dom";

const SibarLeftOrders = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="flex flex-col gap-8">
      <section className="text-md flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Button
            size="m"
            design={pathname === "/admin/orders" ? "link-active" : "link-basic"}
            to={"/admin/orders"}
          >
            Tất cả đơn hàng
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SibarLeftOrders;
