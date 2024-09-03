const OrderModal = require("../models/Order");
const { sendEmailOrder } = require("../utils/order/sendEmaiOrder");

class OrderController {
  // GET /v1/order/all-order
  async getOrder(req, res) {
    const orders = await OrderModal.find().exec();
    if (!orders) {
      return res.status(401).json({ message: "Không có dữ liệu" });
    }
    res.status(200).json(orders);
  }

  // POST /v1/order/create-order
  async createOrder(req, res) {
    try {
      const {
        name,
        phone,
        district,
        province,
        address,
        cart,
        note,
        totalPrice,
        itemsPrice,
        shippingPrice,
        totalQuantity,
        paymentMethod,
        userId,
      } = req.body;

      // Create a new order object
      const saveOrder = await OrderModal.create({
        billingAddress: {
          name,
          phone,
          district,
          province,
          address,
        },
        userId,
        items: cart,
        paymentMethod,
        shippingPrice,
        note,
        itemsPrice,
        totalPrice,
        totalQuantity,
      });

      if (!saveOrder) {
        return res.status(400).json({ message: "Không thể tạo đơn hàng" });
      }

      sendEmailOrder(req, saveOrder);

      res.status(200).json({ url: `/checkout/success` });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  // GET /v1/order/order-detail
  async getOrderDetail(req, res) {
    try {
      const { orderId } = req.body;

      // Validate input
      if (!orderId) {
        return res.status(400).json({ message: "Thiếu thông tin orderId" });
      }

      const order = await OrderModal.findOne({ _id: orderId }).exec();

      // Check if order is found
      if (!order) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order details:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  async updateOrder(req, res) {
    try {
      const { orderId, deliveryStatus, note, shippingPrice, totalPrice } =
        req.body;

      // Check if orderId is provided
      if (!orderId) {
        return res.status(400).json({ message: "Thiếu thông tin orderId" });
      }

      // Find the order based on orderId
      const order = await OrderModal.findById(orderId);

      // Check if the order exists
      if (!order) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại" });
      }

      // Update fields if they are provided in the request
      if (deliveryStatus) {
        order.deliveryStatus = deliveryStatus;
      }

      if (note) {
        order.note = note;
      }

      if (shippingPrice) {
        order.shippingPrice = shippingPrice;
      }

      if (totalPrice) {
        order.totalPrice = totalPrice;
      }

      // Save the changes
      const updatedOrder = await order.save();

      // Return a successful response along with the updated order data
      res.status(200).json({
        message: "Cập nhật đơn hàng thành công",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

module.exports = new OrderController();
