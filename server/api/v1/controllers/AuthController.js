const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendEmailVerificationOTP,
} = require("../utils/auth/sendEmailVerificationOTP");
const EmailVerification = require("../models/EmailVerification");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/auth/generateToken");
const { setTokenCookies } = require("../utils/auth/setTokenCookies");
const { refreshAccessToken } = require("../utils/auth/refreshAccessToken");
const UserRefreshToken = require("../models/UserRefreshToken");
const transporter = require("../config/emailConfig");

class AuthController {
  // POST /v1/auth/register
  async register(req, res, next) {
    try {
      const { username, email, password, password_confirmation } = req.body;
      if (!username || !email || !password || !password_confirmation) {
        return res.status(400).json({ message: "Không có dữ liệu" });
      }

      if (password !== password_confirmation) {
        return res.status(400).json({
          status: "failed",
          message: "Mật khẩu không khớp",
        });
      }

      const duplicate = await UserModel.findOne({ email })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();
      if (duplicate) {
        return res.status(400).json({ message: "Tên đăng nhập đã có" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await new UserModel({
        username,
        email,
        password: hashedPassword,
      }).save();
      sendEmailVerificationOTP(req, newUser);

      if (newUser) {
        return res.status(201).json({ message: `${email} tạo thành công` });
      } else {
        return res.status(400).json({ message: "Lỗi dữ liệu" });
      }
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Không thể đăng ký, xin thử lại sau",
      });
    }
  }

  // POST /v1/auth/verify-email
  async verifyEmail(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res
          .status(400)
          .json({ status: "failed", message: "Cần nhập tất cả ô" });
      }
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        return res
          .status(404)
          .json({ status: "failed", message: "Không tìm thấy email" });
      }

      if (existingUser.is_verified) {
        return res
          .status(400)
          .json({ status: "failed", message: "Email đã được xác minh" });
      }

      const emailVerification = await EmailVerification.findOne({
        userId: existingUser._id,
        otp,
      });
      if (!emailVerification) {
        if (!existingUser.is_verified) {
          await sendEmailVerificationOTP(req, existingUser);
          return res.status(400).json({
            status: "failed",
            message: "OTP lỗi, mã OTP mới đã gửi đến email của bạn",
          });
        }

        return res.status(400).json({ status: "failed", message: "Lỗi OTP" });
      }

      // If OTP is epirexed
      const currentTime = new Date();
      const expirationTime = new Date(
        emailVerification.createAt.getTime() + 15 * 60 * 1000
      );
      if (currentTime > expirationTime) {
        await sendEmailVerificationOTP(req, existingUser);
        return res.status(400).json({
          status: "failed",
          message: "OTP expired, new OTP send to your email",
        });
      }

      // OTP not valid and not expired, mark as email verified
      existingUser.is_verified = true;
      await existingUser.save();

      // Delete email verification document
      await EmailVerification.deleteMany({ userId: existingUser._id });
      return res
        .status(200)
        .json({ status: "success", message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Không thể xác minh Email, Vui lòng thử lại sau",
      });
    }
  }

  // POST /v1/auth/login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Nhập tài khoản và mật khẩu" });
      }

      // Check if user exists
      const user = await UserModel.findOne({ email }).exec();
      if (!user) {
        return res.status(401).json({ message: "Không tìm thấy tài khoản" });
      }

      // Check if user is verified
      if (!user.is_verified) {
        return res.status(401).json({
          status: "failed",
          message: "Tài khoản chưa xác minh, vui lòng kiểm tra email",
        });
      }

      // Compare password with hashed password in the database
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(401)
          .json({ message: "Tài khoản hoặc mật khẩu không đúng" });
      }

      // Generate access and refresh tokens
      const accessToken = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      // Set tokens as HTTP-only cookies to secure them
      setTokenCookies(res, "accessToken", accessToken, {
        maxAge: 60 * 30 * 1000,
      });
      setTokenCookies(res, "refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
      });
      setTokenCookies(res, "is_auth_clothes", true, {
        maxAge: 60 * 60 * 24 * 1000,
      });

      // Send success response with user details
      res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          roles: user.roles[0],
        },
        status: "success",
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      console.error("Error during login:", error); // Log error for debugging
      res.status(500).json({
        status: "failed",
        message: "Không thể đăng nhập, vui lòng thử lại sau",
      });
    }
  }

  // POST /v1/auth/refresh-token
  // async getNewAccessToken(req, res) {
  //   try {
  //     const { newAccessToken, newRefreshToken } = await refreshAccessToken(
  //       req,
  //       res
  //     );

  //     // Set New tokens to Cookie
  //     setTokenCookies(res, newAccessToken, newRefreshToken);

  //     res.status(200).send({
  //       status: "success",
  //       message: "Token mới đã được tạo",
  //       access_token: newAccessToken,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ status: "failed", message: "Lỗi máy chủ" });
  //   }
  // }

  // GET /v1/auth/me
  async userProfile(req, res) {
    const user = req.user;
    return res.status(200).json(user);
  }

  // POST /v1/auth/change-password
  async changePassword(req, res) {
    try {
      const { password, password_confirmation } = req.body;
      if (!password || !password_confirmation) {
        return res
          .status(400)
          .json({ status: "failed", message: "Cần nhập mật khẩu" });
      }

      if (password !== password_confirmation) {
        return res.status(400).json({
          status: "failed",
          message: "Mật khẩu không khớp, vui lòng thử lại",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      await UserModel.findOneAndUpdate(req.user._id, {
        $set: {
          password: newPassword,
        },
      });

      return res
        .status(200)
        .json({ status: "success", message: "Mật khẩu đã đổi thành công" });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Không thể đổi mật khẩu, vui lòng thử lại",
      });
    }
  }

  // POST /v1/auth/reset-password-link
  async sendUserPasswordResetEmail(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res
          .status(400)
          .json({ status: "failed", message: "Cần nhập Email" });
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "Không tìm thấy Email" });
      }

      // Generate token for password reset
      const secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "15m",
      });

      // reset Link
      const resetLink = `${process.env.CLIENT_URL}/account/reset-password-confirm/${user._id}/${token}`;
      await transporter.sendMail({
        form: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Thay đổi mật khẩu mới",
        html: `<p>Xin chào ${user.username}</p><p>Vui lòng <a href="${resetLink}">nhấn vào đây</a>để thay đổi mật khẩu.</p>`,
      });

      return res.status(200).json({
        status: "success",
        message: "Đường dẫn đã được gửi đến Email, vui lòng kiểm tra",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Không thể gửi đường dẫn đến Email, vui lòng thử lại sau",
      });
    }
  }

  // POST /v1/auth/reset-password-confirm
  async userPasswordReset(req, res) {
    try {
      const { password, password_confirmation } = req.body;
      const { id, token } = req.params;

      // Find user by ID
      const user = await UserModel.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "Không tìm thấy người dùng" });
      }

      // Validate token
      const new_secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
      jwt.verify(token, new_secret);

      // Check password
      if (!password || !password_confirmation) {
        return res
          .status(400)
          .json({ status: "failed", message: "Cần nhập mật khẩu" });
      }

      // Check if password and confirm password match
      if (password !== password_confirmation) {
        return res.status(400).json({
          status: "failed",
          message: "Mật khẩu không khớp, vui lòng kiểm tra",
        });
      }

      // Generate salt and hash new password
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      await UserModel.findByIdAndUpdate(user._id, {
        $set: { password: newPassword },
      });

      return res.status(200).json({
        status: "success",
        message: "Mật khẩu đã được đổi thành công",
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          status: "failed",
          message: "Đường dẫn hết hạn, xin yêu cầu đường dẫn mới",
        });
      }
      return res.status(500).json({
        status: "failed",
        message: "Không thể đổi mật khẩu, vui lòng thử lại sau",
      });
    }
  }

  // POST /v1/auth/logout
  async logout(req, res) {
    try {
      // Optionally you can blacklist the refresh token in the database
      const refreshToken = req.cookies.refreshToken;
      await UserRefreshToken.findOneAndUpdate(
        {
          token: refreshToken,
        },
        { $set: { blacklisted: true } }
      );
      // Clear access token and refresh token cookies
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("is_auth");

      res
        .status(200)
        .json({ status: "success", message: "Đăng xuất thành công" });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Không thể đăng xuất, vui lòng thử lại sau",
      });
    }
  }
}

module.exports = new AuthController();
