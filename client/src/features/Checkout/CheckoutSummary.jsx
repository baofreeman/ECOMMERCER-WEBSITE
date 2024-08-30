import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItem,
  selectTotalAmount,
  selectTotalQuantity,
} from "../../api/slices/cartSlice";

import useAuth from "../../hooks/useAuth";
import { convertPrice } from "../../config";
import { Loading } from "../../components/shared";
import { SHIPPINGFEE } from "../../constants";

const CheckoutSummary = () => {
  const cart = useSelector(selectCartItem); // Get the cart items from the Redux store.
  const itemsPrice = useSelector(selectTotalAmount); // Get the total amount of items in the cart.
  const totalQuantity = useSelector(selectTotalQuantity); // Get the total quantity of items in the cart.
  const [shipping, setShipping] = useState(SHIPPINGFEE[1]); // Default shipping fee.

  const { userId } = useAuth(); // Get the user ID to determine shipping fee.

  // Calculate total price including shipping fee.
  const totalPrice = useMemo(() => {
    const fee = userId ? SHIPPINGFEE[0] : SHIPPINGFEE[1]; // Determine shipping fee based on user ID.
    return itemsPrice + fee;
  }, [userId, itemsPrice]);

  // Update shipping fee when user ID changes.
  useEffect(() => {
    setShipping(userId ? SHIPPINGFEE[0] : SHIPPINGFEE[1]);
  }, [userId]);

  return (
    <div className="overflow-y-scroll no-scrollbar w-full">
      <section className="w-full">
        <table className="w-full mt-4 p-[20px] sm:p-[0px] uppercase">
          <thead>
            <tr>
              <th scope="col" className="text-center px-2 py-4 sm:p-1">
                Sản phẩm
              </th>
              <th scope="col" className="text-center px-2 py-4 sm:p-1">
                Chi tiết
              </th>
              <th scope="col" className="text-center px-2 py-4 sm:p-1">
                Số lượng
              </th>
              <th scope="col" className="text-center px-2 py-4 sm:p-1">
                Giá
              </th>
            </tr>
          </thead>

          <tbody>
            {cart?.map((item) => (
              <tr className="w-full" key={item.subCategory.model.skus._id}>
                <td
                  className="border text-center h-full px-2"
                  style={{ height: "100%" }}
                >
                  <img
                    src={item?.productImg[0].url}
                    height={"100%"}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    className="w-[60px] sm:w-[20px]"
                    alt={"product"}
                  />
                </td>
                <td className="border text-center px-2 py-4 sm:p-1">
                  <h1 className="uppercase text-ellipsis line-clamp-2">
                    {item.name}
                  </h1>
                  <h1 className="text-silver">
                    {item.subCategory.model.color}
                  </h1>
                  <h1 className="text-silver">
                    {item.subCategory.model.skus.size}
                  </h1>
                </td>
                <td className="border text-center px-2 py-4 sm:p-1">
                  {item.qty}
                </td>
                <td className="border text-center px-2 py-4 sm:p-1">
                  {item.subCategory.model.skus.price * item.qty ? (
                    convertPrice(item.subCategory.model.skus.price * item.qty) // Convert price to formatted string.
                  ) : (
                    <Loading /> // Show loading spinner if price is not available.
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="border rounded p-[10px] mt-[20px] sm:my-[10px] sm:p-[6px] sm:text-sm">
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng sản phẩm: </h1>
          <span className="text-orange">{totalQuantity}</span>{" "}
          {/* Display total quantity of items. */}
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng tiền sản phẩm: </h1>
          <span className="text-orange">{convertPrice(itemsPrice)}</span>{" "}
          {/* Display total price of items. */}
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Phí giao hàng: </h1>
          <span className="text-orange">
            {cart.length && convertPrice(shipping)}{" "}
            {/* Display shipping fee if there are items in the cart. */}
          </span>
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng tiền thanh toán: </h1>
          <span className="text-orange">
            {cart.length && convertPrice(totalPrice)}{" "}
            {/* Display total payment amount including shipping fee. */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
