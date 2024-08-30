import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useLazySearchProductQuery } from "../../api/endpoints/productsApiSlice";

import { Input } from "../../components/ui";
import { SearchIcon, DeleteIcon } from "../../assets/icons";
import { useModal } from "../../context/ModalContext";
import SearchResults from "./SearchResults";

const Search = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const {
    register,
    resetField,
    formState: { errors },
  } = useForm();
  const [trigger, { data, isLoading, isError, error }] =
    useLazySearchProductQuery();

  const handleSearch = (e) => {
    const key = e.target.value;
    trigger(key); // Trigger the search
    openModal(
      <SearchResults
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onLinkClick={handleLink}
        onClose={closeModal}
      />
    );
  };

  const handleLink = (item) => {
    const { _id: productId } = item;
    if (productId) {
      navigate({
        pathname: "/shop",
        search: createSearchParams({ productId }).toString(),
      });
    }
    resetField("search");
    closeModal();
  };

  return (
    <div className="relative flex flex-1 items-center h-[36px] w-full sm:hidden">
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-full w-full">
        <div className="absolute top-0 left-[12px] flex items-center justify-center h-full">
          <div className="w-[36px] sm:w-[24px]">
            <SearchIcon />
          </div>
        </div>
        <Input
          placeholder="Tìm kiếm (Nhập tên sản phẩm...)"
          size="m"
          design="basic"
          style={{ paddingLeft: "50px", width: "100%" }}
          name="search"
          register={register}
          onChange={handleSearch}
          error={errors.search?.message}
        />
        <div
          className="absolute top-2.5 right-1 px-2 py-2 text-center select-none cursor-pointer"
          onClick={closeModal}
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
