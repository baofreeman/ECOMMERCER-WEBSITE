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
