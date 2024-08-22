import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCartItem,
  selectTotalAmount,
  selectTotalQuantity,
} from "../../api/slices/cartSlice";
import {
  selectSidebarRight,
  setSidebarRight,
} from "../../api/slices/sidebarSlice";

import { Button } from "../../components/ui/index";
import { convertPrice } from "../../config/convertPrice";

const CartSummary = () => {
  const totalPrice = useSelector(selectTotalAmount); // GET total price
  const totalQuantity = useSelector(selectTotalQuantity); // GET total quantity
  const cart = useSelector(selectCartItem); // GET cart
  const openSidebarRight = useSelector(selectSidebarRight);
  const dispatch = useDispatch();

  useEffect(() => {
    if (openSidebarRight === false) {
      dispatch(setSidebarRight(true)); // Open sidebar if it's closed
    }
  }, [openSidebarRight, dispatch]);

  return (
    <div
      className="w-full flex flex-col sm:justify-center gap-6 sm:gap-0 p-[20px] sm:p-[0px]"
      style={{ height: "100%" }}
    >
      <div className="border rounded p-[10px] sm:px-[4px] sm:py-[2px]">
        <div className="rounded w-full px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng sản phẩm: </h1>
          <span className="text-orange">{totalQuantity}</span>
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng thanh toán tạm tính: </h1>
          <span className="text-orange">{convertPrice(totalPrice)}</span>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-between sm:h-[100%]">
        <Button
          size="m"
          design={cart.length ? "link-basic" : "link-primary"}
          width="max"
          to={"/shop"}
        >
          Tiếp tục mua sắm
        </Button>
        <Button
          size="m"
          design={!cart.length ? "link-disable" : "primary"}
          width="max"
          to={cart.length ? "/checkout" : "#"}
        >
          Thanh Toán
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
