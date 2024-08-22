import { useState } from "react";
import { useChangePasswordMutation } from "../../api/endpoints/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "./schema";
import { toast } from "react-toastify";

import FormContainer from "./FormContainer";
import { Loading, FormField } from "../../components/shared";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await changePassword(values);
      if (res.data) {
        toast.success(res.data.message);
        reset();
        navigate("/");
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
        title={"Đổi mật khẩu"}
        buttonText={"Xác nhận"}
        isLoading={isLoading}
      >
        <FormField
          label="Mật khẩu mới"
          name="password"
          placeholder="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <FormField
          label="Nhập lại mật khẩu"
          name="password_confirmation"
          placeholder="confirm password"
          type="password"
          register={register}
          error={errors.password_confirmation?.message}
        />
      </FormContainer>
    </>
  );
};

export default ChangePassword;
