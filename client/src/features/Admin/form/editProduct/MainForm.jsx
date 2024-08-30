import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useUpdateProductMutation } from "../../../../api/endpoints/productsApiSlice";
import { toast } from "react-toastify";
import { Button, Input, Textarea } from "../../../../components/ui";

const MainForm = ({ product }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [updateProduct] = useUpdateProductMutation();

  const { name, category, description } = product;

  useEffect(() => {
    setValue("name", product.name);
    setValue("category", product.category);
    setValue("description", product.description);
  }, [name, category, description]);

  const onSubmit = async (data) => {
    const newData = {
      id: product?._id,
      ...data,
    };
    try {
      const res = await updateProduct(newData);
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      return toast.success(error.message);
    }
  };

  return (
    <div className="flex flex-col p-4 border rounded-md gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 w-full">
            <label className="basis-1/2">Tên sản phẩm</label>
            <Input
              size={"m"}
              design={"basic"}
              placeholder="Tên sản phẩm"
              name="name"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex gap-2 w-full">
            <label className="basis-1/2">Danh mục</label>
            <Input
              size={"m"}
              design={"basic"}
              placeholder="Danh mục"
              name="category"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex gap-2 w-full">
            <label className="basis-1/2">Mô tả</label>
            <Textarea
              size={"m"}
              design={"basic"}
              name="description"
              register={register}
              error={errors.name?.message}
            />
          </div>
        </section>
        <Button size="l" design="primary" width="120" type={"submit"}>
          sửa sản phẩm
        </Button>
      </form>
    </div>
  );
};

export default MainForm;
