import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  description: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
  category: yup.string().required("Vui lòng chọn danh mục cho sản phẩm"),
  productImg: yup
    .mixed()
    .test(
      "Vui lòng chọn hình ảnh",
      "Chọn ít nhất 1 hình ảnh",
      (files) => files?.length > 0
    ),
  subCategory: yup.array().of(
    yup.object().shape({
      tag: yup.string().required("Vui lòng chọn kiểu dáng sản phẩm"),
      model: yup.array().of(
        yup.object().shape({
          color: yup.string().required("Vui lòng chọn màu sắc sản phẩm"),
          skus: yup.array().of(
            yup.object().shape({
              sku: yup.string().required("Vui lòng nhập SKU cho sản phẩm"),
              size: yup.string().required("Vui lòng chọn size cho sản phẩm"),
              price: yup
                .number()
                .required("Vui lòng nhập giá tiền")
                .typeError("Vui lòng nhập số"),
            })
          ),
        })
      ),
    })
  ),
});
