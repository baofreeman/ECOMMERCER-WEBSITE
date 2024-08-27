const Users = require("../models/User");
const UserRefreshToken = require("../models/UserRefreshToken");

class UserController {
  // GET path: /v1/user
  async getUsers(req, res, next) {
    const users = await Users.find().select("-password").lean();
    if (!users.length) {
      return res.status(400).json({ message: "Không tìm thấy dữ liệu" });
    }
    res.status(200).json(users);
  }

  async updateUser(req, res) {
    try {
      const { userId, roles } = req.body; // Extract userId and roles from the request body

      if (!userId) {
        return res.status(400).json({ message: "Thiếu UserId" }); // Check if userId is provided
      }

      const user = await Users.findById(userId).exec(); // Find the user by userId

      if (!user) {
        return res.status(400).json({ message: "Không tìm thấy người dùng" }); // If user is not found, return an error
      }

      // Update roles if new roles are provided
      if (roles) {
        user.roles = roles; // Set the user's roles to the new roles
      }

      await user.save(); // Save the user after updating

      res.json({
        message: `Username ${user.username} với Id ${user._id} đã cập nhật vai trò`, // Return success message
      });
    } catch (error) {
      // Handle any errors that occur during the process and return an error message
      res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
  }

  // DELETE path: /v1/user
  async deleteUser(req, res, next) {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId bắt buộc" });
    }
    const user = await Users.findById({ _id: userId }).exec();
    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" });
    }

    await UserRefreshToken.findOneAndDelete({ userId });

    // Delete User
    await user.deleteOne();
    res.json({
      message: `Username ${user.username} với Id ${user._id} đã được xóa`,
    });
  }
}

module.exports = new UserController();
