const OrderModal = require("../models/Order");

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
    const newOrder = new OrderModal({
      billingAddress: {
        name: name,
        phone: phone,
        district: district,
        province: province,
        address: address,
      },
      userId: userId,
      items: cart,
      paymentMethod,
      shippingPrice,
      note,
      itemsPrice,
      totalPrice,
      totalQuantity,
    });
    const saveOrder = await OrderModal.create(newOrder);
    if (!saveOrder) {
      return res.status(401).json({ message: "Không có dữ liệu" });
    }
    res.send({ url: `/checkout/success` });
  }

  // GET /v1/order/order-detail
  async getOrderDetail(req, res) {
    const { orderId } = req.body;
    const order = await OrderModal.findOne({ _id: orderId }).exec();
    if (!order) {
      return res.status(401).json({ message: "Không có dữ liệu" });
    }
    res.status(200).json(order);
  }
}

module.exports = new OrderController();
