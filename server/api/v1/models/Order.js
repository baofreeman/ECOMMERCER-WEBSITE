const mongoose = require("mongoose");

const defaultUserId = process.env.DEFAULT_USER_ID
  ? new mongoose.Types.ObjectId(process.env.DEFAULT_USER_ID)
  : null;

const OrderItem = mongoose.Schema(
  {
    billingAddress: {
      name: { type: String, required: true },
      district: { type: String, required: true },
      province: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: defaultUserId,
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "cash_on_delivery",
    },
    items: { type: Array, required: true },
    note: { type: String, default: "Nothing" },
    totalQuantity: { type: Number, required: true },
    shippingPrice: { type: Number },
    itemsPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderItem);
