import { useGetOrderQuery } from "../../../api/endpoints/ordersApiSlice";
import OrderExtent from "./OrderExtent";

const Orders = () => {
  const { orders } = useGetOrderQuery("allOrder", {
    selectFromResult: ({ data }) => ({
      orders: data?.ids.map((id) => id),
    }),
  }); // GET all orders.

  let content;

  content = orders?.length ? (
    orders.map((orderId) => <OrderExtent key={orderId} orderId={orderId} />)
  ) : (
    <p>Không có đơn hàng</p>
  );

  return (
    <div className="p-10 w-full">
      <section className="w-full">
        {orders && orders.length ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-8 py-4">Thông tin người đặt</th>
                <th className="text-left px-8 py-4">Chi tiết sản phẩm</th>
                <th className="text-left px-8 py-4">Chi tiết thanh toán</th>
                <th className="text-left px-8 py-4">Ghi chú</th>
                <th className="text-left px-8 py-4">Ngày tạo</th>
                <th className="text-left px-8 py-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        ) : (
          <div className="text-center m-auto">
            <h1>Không có đơn hàng</h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;
