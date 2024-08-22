import Button from "../components/ui/Button/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 h-[100%] w-full items-center justify-center">
      <h1>Oops!</h1>
      <p>Rất tiếc trang này không tồn tại</p>
      <Button size="m" design="primary" to={"/"}>
        Trang chủ
      </Button>
    </div>
  );
};

export default NotFound;
