import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginSchema } from "./schema";
import { useLoginUserMutation } from "../../api/endpoints/authApiSlice";

import FormContainer from "./FormContainer";
import { Loading, FormField } from "../../components/shared";

const Login = () => {
  const [loginUser] = useLoginUserMutation(); // Login mutation.
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await loginUser(values);
      if (res.data) {
        toast.success(res.data.message);
        reset();
        navigate("/shop");
      } else if (res.error) {
        toast.error(res.error.data.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsLoading(false); // Đảm bảo trạng thái tải được cập nhật cuối cùng
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        title="Đăng nhập"
        buttonText="Đăng nhập"
        buttonBackText="Quên mật khẩu"
        buttonHref="/account/reset-password-link"
        isLoading={isLoading}
      >
        <FormField
          label="Email"
          name="email"
          placeholder="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />
        <FormField
          label="Mật khẩu"
          name="password"
          placeholder="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
      </FormContainer>
    </>
  );
};

export default Login;
