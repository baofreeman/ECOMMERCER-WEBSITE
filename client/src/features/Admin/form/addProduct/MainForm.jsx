/**
 * Use React hook form.
 * Use Field Array set subCategoy, model, skus
 *
 */

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import BasicForm from "./BasicForm";
import { schema } from "./ValidateForm";
import { useAddProductMutation } from "../../../../api/endpoints/productsApiSlice";
import { Errors, Loading } from "../../../../components/shared";
import { useNavigate } from "react-router-dom";

const MainForm = () => {
  const [subErr, setSubErr] = useState("");
  const {
    register,
    control,
    handleSubmit,
    getValues,
    onChange,
    trigger,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [addProduct, { isLoading, isSuccess }] = useAddProductMutation();
  const onSubmit = async (data) => {
    const { name, description, category, subCategory, productImg } = data;
    if (!subCategory.length > 0) {
      setSubErr("Vui lòng chọn phân loại sản phẩm");
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      formData.append("subCategory", JSON.stringify(subCategory));
      for (let i = 0; i < productImg.length; i++) {
        formData.append("productImg", productImg[i]);
      }
      const res = await addProduct(formData);
      if (isLoading) return <Loading />;
      if (isSuccess) return <p>{res.data.message}</p>;
      if (res.data) {
        reset();
        navigate("/admin/products");
      }
    } catch (error) {
      return error.message;
    }
  };

  return (
    <section className="flex flex-col p-[50px] sm:p-[10px] border justify-center items-center w-full rounded gap-4">
      <BasicForm
        {...{
          register,
          control,
          errors,
          setValue,
          handleSubmit,
          onSubmit,
          getValues,
          onChange,
          reset,
          trigger,
          watch,
        }}
      />
      <Errors>{subErr}</Errors>
    </section>
  );
};

export default MainForm;
