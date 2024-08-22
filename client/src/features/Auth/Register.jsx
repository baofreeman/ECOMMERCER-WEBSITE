import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../../api/endpoints/authApiSlice";
import { registerSchema } from "./schema";
import { Loading, FormField } from "../../components/shared";
import FormContainer from "./FormContainer";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await registerUser(values);
      if (res.data) {
        toast.success(res.data.message);
        reset();
        navigate("/account/verify-email");
      } else if (res.error) {
        toast.error(res.error.data.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        title="Đăng ký"
        buttonBackText="Bạn đã có tài khoản?"
        buttonHref={"/account/login"}
        buttonText={"Đăng ký"}
        isLoading={isLoading}
      >
        <FormField
          label="Tên đăng nhập"
          name="username"
          placeholder="username"
          register={register}
          error={errors.username?.message}
        />
        <FormField
          label="Email"
          name="email"
          placeholder="Email"
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
        <FormField
          label="Xác nhận mật khẩu"
          name="password_confirmation"
          placeholder="password"
          type="password"
          register={register}
          error={errors.password_confirmation?.message}
        />
      </FormContainer>
    </>
  );
};

export default Register;
