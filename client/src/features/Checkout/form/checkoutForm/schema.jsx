import * as yup from "yup";
import { PHONEREG } from "../../../../constants/regex";

export const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ tên"),
  phone: yup.string().matches(PHONEREG, "Vui lòng nhập số điện thoại"),
  province: yup.string().required("Vui lòng chọn tỉnh/thành phố"),
  district: yup.string().required("Vui lòng chọn quận/huyện"),
  address: yup.string().required("Vui lòng ghi địa chỉ cụ thể"),
  paymentMethod: yup.string().required("Vui lòng chọn phương thức thanh toán"),
  shippingPrice: yup.string().required("Vui lòng chọn phương thức vận chuyển"),
  note: yup.string(),
  userId: yup.string(),
});
