import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../api/endpoints/productsApiSlice";

import { Modal } from "../../../components/shared";
import { EditIcon, DeleteIcon } from "../../../assets/icons";
import { useModal } from "../../../context/ModalContext";

const ProductExtent = ({ productId }) => {
  const { product } = useGetProductsQuery("getProducts", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
    refetchOnMountOrArgChange: true,
  }); // GET product based on productId.

  const { openModal } = useModal();

  const [deleteProduct] = useDeleteProductMutation(); // Delete mutation.

  // Delete product based on productId.
  const handleDelete = async (productId) => {
    try {
      const res = await deleteProduct({ productId });
      if (res.data) {
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };

  const showDeleteModal = (productId) => {
    openModal(
      <Modal
        callback={() => handleDelete(productId)}
        data={productId}
        title={"Bạn có muốn xóa sản phẩm khỏi giỏ hàng?"}
      />
    );
  };

  return (
    <>
      <tr>
        <td className="border px-8 py-4">
          <img src={product?.productImg[0].url} width={"60px"} />
        </td>
        <td className="border px-8 py-4">{product?.name}</td>
        <td className="border px-8 py-4">
          <p className="line-clamp-3">{product?.description}</p>
        </td>
        <td className="border px-8 py-4">{product?.category}</td>
        <td className="border px-8 py-4">
          <Link to={`/admin/products/edit-product/${productId}`}>
            <EditIcon />
          </Link>
        </td>
        <td
          className="border px-8 py-4"
          onClick={() => showDeleteModal(productId)}
        >
          <DeleteIcon />
        </td>
      </tr>
    </>
  );
};
const memoizedProduct = memo(ProductExtent);
export default memoizedProduct;
