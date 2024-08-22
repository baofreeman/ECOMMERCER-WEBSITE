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
  const cart = useSelector(selectCartItem); // Lấy giỏ hàng.
  const itemsPrice = useSelector(selectTotalAmount); // Lấy tổng giá.
  const totalQuantity = useSelector(selectTotalQuantity); // Lấy tổng số lượng.
  const [shipping, setShipping] = useState(SHIPPINGFEE[1]); // Giá phí giao hàng mặc định
  const { userId } = useAuth();

  // Tổng giá = tổng giá giỏ hàng + phí giao hàng.
  const totalPrice = useMemo(() => {
    const fee = userId ? SHIPPINGFEE[0] : SHIPPINGFEE[1];
    return itemsPrice + fee;
  }, [userId, itemsPrice]);

  // Kiểm tra userId để xác định phí giao hàng.
  useEffect(() => {
    setShipping(userId ? SHIPPINGFEE[0] : SHIPPINGFEE[1]);
  }, [userId]);

  return (
    <div className="overflow-y-scroll no-scrollbar w-full">
      <section className="w-full">
        <table className="w-full p-[20px] sm:p-[0px] uppercase">
          <thead className="sm:text-xs">
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

          <tbody className="sm:text-sm">
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
                    alt={`Image of ${item.name}`} // Thêm thuộc tính alt
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
                    convertPrice(item.subCategory.model.skus.price * item.qty)
                  ) : (
                    <Loading />
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
          <span className="text-orange">{totalQuantity}</span>
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng cộng: </h1>
          <span className="text-orange">{convertPrice(itemsPrice)}</span>
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Phí giao hàng: </h1>
          <span className="text-orange">
            {cart.length && convertPrice(shipping)}
          </span>
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng cộng thanh toán: </h1>
          <span className="text-orange">
            {cart.length && convertPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
