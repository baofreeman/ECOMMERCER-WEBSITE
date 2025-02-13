import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  resetCart,
  selectCartItem,
  selectTotalAmount,
  selectTotalQuantity,
} from "../../../../api/slices/cartSlice";
import {
  fetchDistrict,
  fetchProvince,
  getDistrict,
  getProvince,
} from "../../../../api/slices/countrySlice";
import { useAddOrderMutation } from "../../../../api/endpoints/ordersApiSlice";

import useAuth from "../../../../hooks/useAuth";
import { schema } from "./schema";

import { SHIPPINGFEE } from "../../../../constants";
import { convertPrice } from "../../../../config";
import {
  Input,
  Select,
  Button,
  Textarea,
  Errors,
} from "../../../../components/ui";
import { FormField } from "../../../../components/shared";

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [shipping, setShipping] = useState();
  const [payment, setPayment] = useState();
  const provinces = useSelector(getProvince);
  const districts = useSelector(getDistrict);

  const { username, userId } = useAuth();
  const cart = useSelector(selectCartItem);

  const itemsPrice = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);

  const fetchMyAPI = useCallback(async () => {
    await dispatch(fetchProvince());
  }, [dispatch]);

  const fetchDistrictApi = useCallback(async () => {
    await dispatch(fetchDistrict(province));
  }, [province, dispatch]);

  useEffect(() => {
    fetchMyAPI();
  }, []);

  useEffect(() => {
    fetchDistrictApi();
  }, [province]);

  const handleProvince = (e) => {
    setProvince(e.target.value);
    clearErrors("province");
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
    clearErrors("district");
  };

  const handleChangeShipping = (e) => {
    setShipping(Number(e.target.value));
    clearErrors("shipping");
  };

  const handleChangePaymentMethod = (e) => {
    setPayment(e.target.value);
    clearErrors("paymentMethod");
  };
  const [addOrder, { isLoading, isError, error }] = useAddOrderMutation();

  const onSubmit = async (data) => {
    const {
      name,
      phone,
      province,
      district,
      address,
      note,
      paymentMethod,
      shippingPrice,
    } = data;
    const valueProvince = provinces.find(
      ({ code }) => Number(code) === Number(province)
    );
    const valueDistrict = districts.find(
      ({ code }) => Number(code) === Number(district)
    );
    let totalPrice = Number(itemsPrice) + Number(shippingPrice);
    const newData = {
      cart,
      name,
      phone,
      province: valueProvince.name,
      district: valueDistrict.name,
      userId: userId,
      address,
      note,
      totalQuantity,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
    };
    if (cart.length) {
      if (paymentMethod) {
        try {
          const res = await addOrder(newData);
          if (res.data) {
            navigate(res.data?.url);
            toast.success("Đặt hàng thành công");
            dispatch(resetCart());
          }
        } catch {
          if (isError) toast(error.message);
        }
      }
    }
  };

  return (
    <section className="flex flex-col p-8 sm:p-0 justify-center items-center w-full rounded gap-4">
      {cart.length ? (
        <form
          className="w-full flex flex-col gap-4 px-32 md:px-10 sm:px-4 py-4 sm:pb-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            label="Tên người nhận"
            name="name"
            placeholder="Vd: Cindy..."
            type="text"
            register={register}
            error={errors.name?.message}
          />
          <FormField
            label="Số điện thoại"
            name="phone"
            placeholder="Vd: 090xxx"
            type="text"
            register={register}
            error={errors.phone?.message}
          />
          <FormField
            label="Địa chỉ"
            name="address"
            placeholder="Địa chỉ cụ thể"
            type="text"
            register={register}
            error={errors.address?.message}
          />
          <label htmlFor="province">Tỉnh thành</label>
          <Select
            size={"m"}
            design={"basic"}
            placeholder="Thành phố/Tỉnh"
            id="province"
            name="province"
            label={"Tỉnh/Thành"}
            register={register}
            onChange={(e) => handleProvince(e)}
            error={errors.province && errors.province?.message}
          >
            {provinces?.map((item) => (
              <option value={item.code} key={item.code}>
                {item.name}
              </option>
            ))}
          </Select>
          <label htmlFor="district">Quận huyện</label>
          <Select
            size={"m"}
            design={"basic"}
            placeholder="Quận/Huyện"
            name="district"
            id="district"
            register={register}
            label={"Quận/Huyện"}
            onChange={(e) => handleDistrict(e)}
            error={errors.district && errors.district?.message}
          >
            {districts?.map((item) => (
              <option value={item.code} key={item.code}>
                {item.name}
              </option>
            ))}
          </Select>

          <div className="flex sm:flex-col flex-1 flex-col gap-2">
            <h1 className="sm:basis-1/2">Phương thức vận chuyển</h1>
            <div className="flex flex-col gap-3 justify-center border p-[10px]">
              <div className="flex gap-2">
                <Input
                  size={"m"}
                  type="radio"
                  design={"basic"}
                  value={SHIPPINGFEE[0]}
                  name="shippingPrice"
                  id="field-freeship"
                  onChange={(e) => handleChangeShipping(e)}
                  register={register}
                  checked={username}
                  disabled={!username}
                />
                <label
                  htmlFor="field-freeship"
                  className={
                    shipping === SHIPPINGFEE[0] || username
                      ? "text-active cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  <span className={!username ? "opacity-30 mr-2" : "mr-2"}>
                    Miễn phí vận chuyển
                  </span>
                  <span className="text-silver">
                    (Thành viên đã đăng ký tài khoản)
                  </span>
                </label>
              </div>
              <div className="flex gap-2">
                <Input
                  size={"m"}
                  type="radio"
                  design={"basic"}
                  value={SHIPPINGFEE[1]}
                  name="shippingPrice"
                  id="field-fast"
                  onChange={(e) => handleChangeShipping(e)}
                  register={register}
                  checked={!username}
                  disabled={username}
                />
                <label
                  htmlFor="field-fast"
                  className={
                    shipping === SHIPPINGFEE[1] || !username
                      ? "text-active cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  <span className={username ? "opacity-30 mr-2" : "mr-2"}>
                    Giao hàng đồng giá
                  </span>
                  <span className={username ? "opacity-30" : "text-orange"}>
                    {`(${convertPrice(SHIPPINGFEE[1])})`}
                  </span>
                </label>
              </div>
              {errors.shipping && <Errors>{errors.shipping?.message}</Errors>}
            </div>

            <div className="flex sm:flex-col flex-1 flex-col gap-2">
              <h1 className="sm:basis-1/2">Phương thức thanh toán</h1>
              <div className="flex flex-col gap-3 justify-center border p-[10px]">
                <div className="flex gap-2">
                  <Input
                    size={"m"}
                    type="radio"
                    design={"basic"}
                    value="payment-cod"
                    name="paymentMethod"
                    id="field-payment-cod"
                    onChange={(e) => handleChangePaymentMethod(e)}
                    register={register}
                  />
                  <label
                    htmlFor="field-payment-cod"
                    className={
                      payment === "payment-cod"
                        ? "text-active cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <div className="flex gap-2">
                  <Input
                    size={"m"}
                    type="radio"
                    design={"basic"}
                    value="payment-card"
                    name="paymentMethod"
                    id="field-payment-card"
                    onChange={(e) => setPayment(e.target.value)}
                    register={register}
                    disabled={true}
                  />
                  <label
                    htmlFor="field-payment-card"
                    className={
                      payment === "payment-card"
                        ? "text-active cursor-pointer"
                        : "text-silver cursor-pointer"
                    }
                  >
                    Thanh toán bằng thẻ ngân hàng (Tạm ngưng)
                  </label>
                </div>
                {errors.paymentMethod && (
                  <Errors>{errors.paymentMethod?.message}</Errors>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-[20px] sm:pb-[10px]">
            <label>Ghi chú</label>
            <Textarea size="m" design="basic" name="note" register={register} />
          </div>

          <div className="self-center">
            <Button
              size="l"
              design={"primary"}
              width="120"
              type={"submit"}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "đặt hàng"}
            </Button>
          </div>
        </form>
      ) : (
        <h1>Bạn không có sản phẩm nào để thanh toán</h1>
      )}
    </section>
  );
};

export default CheckoutForm;
