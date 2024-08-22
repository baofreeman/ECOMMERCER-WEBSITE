import { Button } from "../../components/ui";

const CheckoutSuccess = () => {
  const message = `Nếu có thay đổi về đơn hàng vui lòng liên hệ
  Hotline: 0935791884 hoặc email: freeman.dev10@gmail.com
  để được nhân viên hỗ trợ. Xin cám ơn.`;

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <h1 className="text-base text-active">Đơn hàng đã được đặt thành công</h1>
      <span className="whitespace-pre-line text-center pb-[20px]">
        {message}
      </span>
      <Button size="m" design="primary" to="/shop">
        Tiếp tục mua sắm
      </Button>
    </div>
  );
};

export default CheckoutSuccess;
