import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyEmailSchema } from "./schema";
import { useVerifyEmailMutation } from "../../api/endpoints/authApiSlice";
import { Loading, FormField } from "../../components/shared";
import FormContainer from "./FormContainer";

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verifyEmail] = useVerifyEmailMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyEmailSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await verifyEmail(values);
      if (res.data) {
        toast.success(res.data.message);
        reset();
        navigate("/account/login");
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
        title={"Xác minh Email"}
        buttonBackText={"Bạn đã xác minh Email?"}
        buttonHref={"/account/login"}
        buttonText={"Gửi"}
        isLoading={isLoading}
      >
        <FormField
          label="Email"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email?.message}
        />
        <FormField
          label="OTP"
          name="otp"
          placeholder="OTP"
          register={register}
          error={errors.otp?.message}
        />
      </FormContainer>
    </>
  );
};

export default VerifyEmail;
