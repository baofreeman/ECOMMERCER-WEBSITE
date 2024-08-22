import { useFieldArray } from "react-hook-form";

import { SIZE, SIZENUMBER } from "../../../../constants";
import { randomId } from "../../../../config";
import { Button, Select, Input } from "../../../../components/ui";

const SkuForm = ({
  nestIndex,
  modelIndex,
  control,
  register,
  errors,
  watch,
  onChange,
}) => {
  // Field Array SET skus.
  const { fields, append, remove } = useFieldArray({
    name: `subCategory.${nestIndex}.model.${modelIndex}.skus`,
    control,
  });

  const optionSize = SIZE.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const optionSizeNumber = SIZENUMBER.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const category = watch("category");
  const randomSku = randomId(5);
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full">
      {fields.map((field, j) => {
        return (
          <section
            key={field.id}
            className="flex gap-1 justify-center items-center bg-gray-500"
          >
            <div className="flex gap-2 w-full">
              <label>Sku</label>
              <Input
                size="m"
                design="basic"
                placeholder="sku"
                name={`subCategory.${nestIndex}.model.${modelIndex}.skus.${j}.sku`}
                register={register}
                error={
                  errors.subCategory?.[nestIndex]?.model?.[modelIndex]?.skus?.[
                    j
                  ]?.sku?.message
                }
              />
            </div>
            <div className="flex gap-2 w-full">
              <label>Size</label>
              <Select
                size={"m"}
                design={"basic"}
                label={"kích cỡ"}
                control={control}
                name={`subCategory.${nestIndex}.model.${modelIndex}.skus.${j}.size`}
                register={register}
                onChange={onChange}
                error={
                  errors.subCategory?.[nestIndex]?.model?.[modelIndex]?.skus?.[
                    j
                  ]?.size?.message
                }
              >
                {category === "giày" ? optionSizeNumber : optionSize}
              </Select>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2">
                <label>Giá</label>
                <Input
                  size="m"
                  design="basic"
                  placeholder="price"
                  name={`subCategory.${nestIndex}.model.${modelIndex}.skus.${j}.price`}
                  register={register}
                  error={
                    errors.subCategory?.[nestIndex]?.model?.[modelIndex]
                      ?.skus?.[j]?.price?.message
                  }
                />
              </div>
            </div>
            <button type="button" onClick={() => remove(j)}>
              Xóa
            </button>
          </section>
        );
      })}

      <Button
        type="button"
        size="m"
        design="link-primary"
        width="max"
        onClick={() =>
          append({
            sku: randomSku,
            size: "XS",
            price: 0,
          })
        }
      >
        Thêm thuộc tính
      </Button>
    </div>
  );
};

export default SkuForm;
