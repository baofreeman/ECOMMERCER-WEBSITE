import { useFieldArray } from "react-hook-form";

import SkuForm from "./SkuForm";
import { Button, Select } from "../../../../components/ui";

import { COLOR } from "../../../../constants";

const ModelForm = ({
  nestIndex,
  control,
  register,
  errors,
  getValues,
  onChange,
  watch,
}) => {
  // Field Array SET model.
  const { fields, append, remove } = useFieldArray({
    name: `subCategory.${nestIndex}.model`,
    control,
  });

  const optionColor = COLOR.map((item) => (
    <option key={item.slug} value={item.slug}>
      {item.name}
    </option>
  ));
  return (
    <section className="flex flex-col justify-center items-center w-full gap-8">
      {fields.map((field, k) => {
        return (
          <section key={field.id} className="flex w-full flex-col gap-8">
            <div className="flex gap-2 w-full">
              <label className="basis-1/2">Màu sắc</label>
              <Select
                size={"m"}
                design={"basic"}
                placeholder="màu sắc"
                label={"màu sắc"}
                control={control}
                name={`subCategory.${nestIndex}.model.${k}.color`}
                register={register}
                onChange={onChange}
                error={
                  errors.subCategory?.[nestIndex]?.model?.[k]?.color?.message
                }
              >
                {optionColor}
              </Select>
              <button type="button" onClick={() => remove()}>
                Xoá
              </button>
            </div>
            <SkuForm
              nestIndex={nestIndex}
              modelIndex={k}
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
        onClick={() =>
          append({
            color: "",
          })
        }
      >
        Thêm màu sắc
      </Button>
      {/* <button type="button" onClick={() => prepend()}>
        prepend
      </button> */}
    </section>
  );
};

export default ModelForm;
