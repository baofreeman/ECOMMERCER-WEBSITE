import { memo, useState, useEffect } from "react";
import {
  useGetOrderQuery,
  useUpdateOrderMutation,
} from "../../../api/endpoints/ordersApiSlice";
import { DELIVERY_STATUS } from "../../../constants";
import { Button, Errors } from "../../../components/ui";
import { convertDate } from "../../../config";

const OrderExtent = ({ orderId }) => {
  const { order } = useGetOrderQuery("allOrder", {
    selectFromResult: ({ data }) => ({
      order: data?.entities[orderId],
    }),
  });

  const [orderDetails, setOrderDetails] = useState({
    status: order?.deliveryStatus || "pending",
    shippingPrice: order?.shippingPrice || 0,
    totalPrice: order?.totalPrice || 0,
    note: order?.note || "",
  });

  const [updateOrder, { isLoading, isError }] = useUpdateOrderMutation();

  useEffect(() => {
    if (order) {
      setOrderDetails({
        deliveryStatus: order.deliveryStatus,
        shippingPrice: order.shippingPrice,
        note: order.note,
        totalPrice: order.totalPrice,
      });
    }
  }, [order]);

  useEffect(() => {
    if (
      orderDetails.shippingPrice !== undefined &&
      order?.itemsPrice !== undefined
    ) {
      const newTotalPrice = order?.itemsPrice + orderDetails.shippingPrice;
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        totalPrice: newTotalPrice,
      }));
    }
  }, [orderDetails.shippingPrice, order?.itemsPrice]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "shippingPrice" ? parseFloat(value) || 0 : value,
    }));
  };

  const updateOrderStatus = async () => {
    try {
      await updateOrder({
        ...orderDetails,
        orderId,
      }).unwrap();
      alert("Cập nhật đơn hàng thành công!");
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Cập nhật đơn hàng thất bại");
    }
  };

  return (
    <tr className="bg-white dark:bg-black border-b">
      <td className="border px-4 py-2">
        <div>
          <strong>Id:</strong> {order?._id}
        </div>
        <div>
          <strong>Name:</strong> {order?.billingAddress.name}
        </div>
        <div>
          <strong>Address:</strong> {order?.billingAddress.address}
        </div>
        <div>
          <strong>District:</strong> {order?.billingAddress.district}
        </div>
        <div>
          <strong>Province:</strong> {order?.billingAddress.province}
        </div>
        <div>
          <strong>Phone:</strong> {order?.billingAddress.phone}
        </div>
      </td>
      <td className="border px-4 py-2">
        <div className="text-sm">
          {order?.items.map((item, index) => (
            <div key={index} className="mb-1">
              <div>
                <strong>Sản phẩm:</strong> {item.name} -{" "}
                {item.subCategory.model.color} -{" "}
                {item.subCategory.model.skus.size} - {item.qty}
              </div>
            </div>
          ))}
        </div>
        <div>
          <strong>Tổng số lượng:</strong> {order?.totalQuantity}
        </div>
      </td>
      <td className="border px-4 py-2">
        <div>
          <strong>Tổng tiền sản phẩm:</strong> {order?.itemsPrice}
        </div>
        <div className="flex gap-2">
          <strong>Phí giao hàng:</strong>
          <input
            type="number"
            name="shippingPrice"
            value={orderDetails.shippingPrice}
            onChange={handleChange}
            className="bg-transparent border-none text-right"
          />
        </div>
        <div className="flex gap-2">
          <strong>Tổng tiền thanh toán:</strong> {orderDetails?.totalPrice}
        </div>
      </td>

      <td className="border px-4 py-2">
        <textarea
          name="note"
          value={orderDetails.note}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </td>
      <td className="border px-4 py-2 text-center">
        {convertDate(order?.createdAt)}
      </td>
      <td className="border px-4 py-2">
        <select
          name="deliveryStatus"
          value={orderDetails.deliveryStatus}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          {DELIVERY_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td className="border px-4 py-2 text-center">
        <Button
          size="m"
          design="primary"
          onClick={updateOrderStatus}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </td>
      {isError && (
        <Errors>
          <span>Cập nhật thất bại</span>
        </Errors>
      )}
    </tr>
  );
};

export default memo(OrderExtent);
