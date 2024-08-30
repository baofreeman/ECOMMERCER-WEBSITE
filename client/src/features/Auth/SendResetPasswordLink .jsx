import { useState } from "react";
import { useResetPasswordLinkMutation } from "../../api/endpoints/authApiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordLinkSchema } from "./schema";
import { toast } from "react-toastify";
import { Loading, FormField } from "../../components/shared";
import FormContainer from "./FormContainer";

const SendResetPasswordLink = () => {
  const [resetPasswordLink] = useResetPasswordLinkMutation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordLinkSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await resetPasswordLink(values);
      if (res.data) {
        toast.success(res.data.message);
      }

      if (res.error) {
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
        title={"Quên mật khẩu"}
        buttonText={"Xác nhận"}
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
      </FormContainer>
    </>
  );
};

export default SendResetPasswordLink;
