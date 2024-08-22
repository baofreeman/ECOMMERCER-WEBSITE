import { memo } from "react";
import { useLocation } from "react-router-dom";

import { CartSummary } from "../../features/Cart";
import { CheckoutSummary } from "../../features/Checkout";
import { DetailProduct } from "../../features/Shop";

const RightSidebar = () => {
  const { pathname } = useLocation();
  if (pathname.includes("/shop")) return <DetailProduct />;
  if (pathname.includes("/cart")) return <CartSummary />;
  if (pathname.includes("/checkout")) return <CheckoutSummary />;
  return null;
};

export default memo(RightSidebar);
