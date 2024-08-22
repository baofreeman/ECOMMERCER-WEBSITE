import { useFieldArray } from "react-hook-form";
import ModelForm from "./ModelForm";
import { Button, Select } from "../../../../components/ui";
import { SUBCATEGORY } from "../../../../constants";

const SubForm = ({
  register,
  control,
  errors,
  getValues,
  onChange,
  trigger,
  watch,
}) => {
  // Field Array SET subCatagory.
  const { fields, append, remove } = useFieldArray({
    name: "subCategory",
    control,
  });
  const watchCategory = watch("category");

  console.log(watchCategory);

  const filterSub = SUBCATEGORY.filter(
    (item) => item.category === watchCategory
  );

  const optionSub = filterSub[0]?.data?.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <section className="flex flex-col justify-center items-center gap-12 w-full">
      {fields.map((field, index) => {
        return (
          <section
            key={field.id}
            className="flex w-full flex-col gap-12 rounded-md border bg-gray-200 p-[20px]"
          >
            <div className="flex gap-2 w-full">
              <label className="basis-1/2">Loại sản phẩm</label>

              <Select
                size={"m"}
                design={"basic"}
                placeholder="tag"
                control={control}
                name={`subCategory.${index}.tag`}
                label={"kiểu dáng"}
                register={register}
                onChange={onChange}
                error={errors.subCategory?.[index]?.tag?.message}
              >
                {optionSub}
              </Select>
              <button type="button" onClick={() => remove(index)}>
                Xóa
              </button>
            </div>
            <ModelForm
              nestIndex={index}
              {...{ control, register, errors, getValues, onChange, watch }}
            />
          </section>
        );
      })}
      <Button
        type="button"
        size="m"
        design="link-primary"
        width="max"
        onClick={async () => {
          await trigger("category");
          return append({
            tag: "",
          });
        }}
      >
        Thêm nhóm phân loại hàng
      </Button>
    </section>
  );
};

export default SubForm;
