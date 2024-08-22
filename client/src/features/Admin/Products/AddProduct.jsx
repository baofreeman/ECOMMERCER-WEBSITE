import MainForm from "../form/addProduct/MainForm";

const AddProduct = () => {
  return (
    <div className="flex flex-col justify-center item-center gap-6">
      <h1 className="text-xl">Tạo sản phẩm</h1>
      <MainForm />
    </div>
  );
};

export default AddProduct;
