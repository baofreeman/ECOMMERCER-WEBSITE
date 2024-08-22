import React from "react";
import Button from "../../components/ui/Button/Button";
import useAuth from "../../hooks/useAuth";

const CartFilter = () => {
  const { userId } = useAuth();

  return (
    <div className="w-full">
      {!userId ? (
        <span className="text-silver text-center md:flex md:flex-col md:w-full sm:flex sm:flex-col sm:w-full sm:gap-1 md:gap-1">
          Đăng ký tài khoản để nhận nhiều ưu đãi hơn.{" "}
          <Button size="s-link" design="link-primary" to={"/account/register"}>
            Đăng ký ngay
          </Button>
        </span>
      ) : (
        <span className="text-silver text-center md:flex md:flex-col md:w-full sm:flex sm:flex-col sm:w-full sm:gap-1 md:gap-1">
          Bạn đã là thành viên và được{" "}
          <span className="text-orange">miễn phí vận chuyển</span>
        </span>
      )}
    </div>
  );
};

export default CartFilter;
