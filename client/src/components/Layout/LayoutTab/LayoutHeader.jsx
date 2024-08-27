import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectTotalQuantity } from "../../../api/slices/cartSlice";

import { Button } from "../../ui";
import { ShopHeader } from "../../../features/Shop";
import { AdminHeader } from "../../../features/Admin";
import { CheckoutHeader } from "../../../features/Checkout";
import { CartHeader } from "../../../features/Cart";

import { CartIcon } from "../../../assets/icons";
import { memo } from "react";

/**
 * LayoutHeader component renders the header based on the current route.
 * It displays different headers and a cart icon with quantity based on the route.
 */

const LayoutHeader = ({ id }) => {
  // Retrieve the total quantity of items in the cart from Redux store
  const totalQuantity = useSelector(selectTotalQuantity);

  // Retrieve the current pathname from the router
  const { pathname } = useLocation();

  /**
   * Determines which header component to render based on the current pathname.
   */

  const renderHeader = () => {
    if (pathname.includes("/shop")) return <ShopHeader />;
    if (pathname.includes("/cart")) return <CartHeader />;
    if (pathname.includes("/checkout")) return <CheckoutHeader />;
    if (pathname.includes("/admin")) return <AdminHeader />;
    return null; // Default case if no pathname matches
  };

  return (
    <section id={id} className="w-full h-full bg-white dark:bg-black">
      <nav className="w-full h-full flex items-center justify-between px-4 py-2">
        {renderHeader()}

        {/* Render the appropriate header based on the pathname */}
        {pathname.includes("/shop") && (
          <div className="relative">
            <Button size="m" design="link-basic" to="/cart">
              <CartIcon /> {/* Cart icon button */}
            </Button>
            <span className="absolute top-[-6px] right-[0px] text-md text-orange bg-transparent w-5 h-5 rounded-full flex items-center justify-center">
              {totalQuantity} {/* Display the total quantity of items */}
            </span>
          </div>
        )}
      </nav>
    </section>
  );
};

export default memo(LayoutHeader);
