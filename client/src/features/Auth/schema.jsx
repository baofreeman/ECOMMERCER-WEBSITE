import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên đăng nhập"),
  email: yup.string().email().required("Vui lòng nhập Email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  password_confirmation: yup.string().required("Vui lòng nhập mật khẩu"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Vui lòng nhập Email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export const verifyEmailSchema = yup.object().shape({
  email: yup.string().email().required("Vui lòng nhập Email"),
  otp: yup.string().required("Vui lòng nhập OTP"),
});

export const changePasswordSchema = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  password_confirmation: yup.string().required("Vui lòng nhập mật khẩu"),
});

export const resetPasswordLinkSchema = yup.object().shape({
  email: yup.string().email().required("Vui lòng nhập Email"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  password_confirmation: yup.string().required("Vui lòng nhập mật khẩu"),
});
