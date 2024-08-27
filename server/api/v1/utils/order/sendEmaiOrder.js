const { convertPrice } = require("../../config/convertPrice");
const transporter = require("../../config/emailConfig");
const OrderModal = require("../../models/Order");

const sendEmailOrder = async (req, order) => {
  try {
    const user = await OrderModal.findOne({ _id: order._id }).populate(
      "userId"
    );
    // Validate input parameters
    if (!order || !order.billingAddress || !order.billingAddress.name) {
      throw new Error("Thiếu thông tin cần thiết để gửi email.");
    }

    // Construct dynamic email content
    const emailContent = `
      <p>Dear ${order.billingAddress.name},</p>
      <p>Cảm ơn bạn đã tin tưởng và đặt hàng tại cửa hàng chúng tôi.</p>
      <p>Thông tin đơn hàng của bạn:</p>
      <ol>
        ${order.items
          .map(
            (item) => `
            <li>${item.name} - Số lượng: ${item.qty} - Giá: ${convertPrice(
              item.subCategory.model.skus.price
            )}</li>
        `
          )
          .join("")}
      </ol>
      <p>Tổng số lượng: ${order.totalQuantity}</p>
      <p>Phí vận chuyển: ${convertPrice(order.shippingPrice)}</p>
      <p>Tổng giá trị đơn hàng: ${convertPrice(order.totalPrice)}</p>
      <p>Ghi chú: ${order.note}</p>
      <p>Chúng tôi sẽ liên hệ bạn để xác nhận đơn hàng trong thời gian sớm nhất.</p>
      <p>Trân trọng,</p>
      <p>Clothes Store Team</p>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.userId.email,
      subject: "Clothes - Xác nhận đơn hàng",
      html: emailContent,
    });

    return { success: true, message: "Email đã được gửi thành công." };
  } catch (error) {
    console.error("Error sending order confirmation email:", error.message);
    throw new Error(
      "Không thể gửi email xác nhận đơn hàng. Vui lòng thử lại sau."
    );
  }
};

module.exports = { sendEmailOrder };
