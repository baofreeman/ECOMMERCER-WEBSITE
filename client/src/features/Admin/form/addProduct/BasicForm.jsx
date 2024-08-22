import SubForm from "./SubForm";
import { Input, Button, Select, Textarea } from "../../../../components/ui";
import { convertCategies } from "../../../../config";

const BasicForm = ({
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
  getValues,
  setValue,
  onChange,
  trigger,
  watch,
}) => {
  // Select category.
  const handleCategory = (e) => {
    setValue("category", e.target.value);
  };

  return (
    <form
      className="flex flex-col gap-8 sm:gap-4 w-full justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col gap-6 sm:gap-2 w-full justify-center items-start">
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
          <label className="basis-1/2">Mô tả sản phẩm</label>
          <Textarea
            size="m"
            design="basic"
            name="description"
            register={register}
            error={errors.description?.message}
          />
        </div>

        <div className="flex gap-2 w-full">
          <label className="basis-1/2">Danh Mục</label>
          <Select
            size={"m"}
            design={"basic"}
            placeholder="category"
            name="category"
            register={register}
            label={"danh mục"}
            onChange={(e) => {
              handleCategory(e);
            }}
            error={errors.category?.message}
          >
            {convertCategies()}
          </Select>
        </div>

        <div className="flex gap-2 w-full">
          <label className="basis-1/2">Hình ảnh</label>
          <Input
            size={"m"}
            design={"basic"}
            type="file"
            name="productImg"
            multiple
            placeholder="productImg"
            register={register}
            error={errors.productImg?.message}
            accept="image/png, image/jpeg"
          />
        </div>
      </section>
      <SubForm
        register={register}
        control={control}
        errors={errors}
        getValues={getValues}
        onChange={onChange}
        trigger={trigger}
        watch={watch}
      />
      <Button size="l" design="primary" width="120" type={"submit"}>
        tạo sản phẩm
      </Button>
    </form>
  );
};

export default BasicForm;
