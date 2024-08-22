import { useParams } from "react-router-dom";
import { getSelectors } from "../../../api/endpoints/productsApiSlice";
import EditForm from "../form/editProduct/EditForm";
import { Loading } from "../../../components/shared";
import { useSelector } from "react-redux";

const EditProduct = () => {
  const { productId } = useParams(); // GET param productId.

  const { selectById } = getSelectors({});
  const product = useSelector(selectById(productId));

  if (!product) return <Loading />;

  return (
    <div>
      <EditForm product={product} />
    </div>
  );
};

export default EditProduct;
