import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useLazySearchProductQuery } from "../../api/endpoints/productsApiSlice";

import { Input, Button } from "../../components/ui";
import { Loading, Errors } from "../../components/shared";
import { SearchIcon, DeleteIcon } from "../../assets/icons";

/**
 * Search component provides a search functionality with live product suggestions.
 */

const Search = ({ toggleModal, setToggleModal }) => {
  const navigate = useNavigate();
  const {
    register,
    resetField,
    formState: { errors },
  } = useForm();
  const [trigger, { data, isLoading, isError, error }] =
    useLazySearchProductQuery();

  /**
   * Handle search input change.
   */
  const handleSearch = (e) => {
    const key = e.target.value;
    setToggleModal(true);
    trigger(key);
  };

  /**
   * Navigate to the product page and close the modal.
   */
  const handleLink = (item) => {
    const { _id: productId } = item;
    if (productId) {
      navigate({
        pathname: "/shop",
        search: createSearchParams({ productId }).toString(),
      });
    }
    resetField("search");
    setToggleModal(false);
  };

  /**
   * Close the modal and reset the search field.
   */
  const turnOffModal = () => {
    resetField("search");
    setToggleModal(false);
  };

  return (
    <div className="relative flex flex-1 items-center sm:hidden h-[36px]">
      <div className="absolute top-0 left-[12px] flex items-center justify-center h-full">
        <div className="w-[36px] sm:w-[24px]">
          <SearchIcon />
        </div>
      </div>
      <Input
        placeholder="Tìm kiếm (Nhập tên sản phẩm...)"
        size="m"
        design="basic"
        name="search"
        register={register}
        style={{ paddingLeft: "50px" }}
        onChange={handleSearch}
        error={errors.search?.message}
      />
      {toggleModal && (
        <div className="absolute top-2.5 right-1 px-2 py-2 text-center select-none">
          <DeleteIcon handleToggleModal={turnOffModal} />
        </div>
      )}
      {toggleModal && (
        <div className="absolute top-[35px] left-0 w-full h-[150px] bg-black border rounded z-50 overflow-hidden">
          <div className="px-[20px] py-[10px] h-full overflow-scroll no-scrollbar">
            {isLoading && <Loading />}
            {data?.length ? (
              data.map((item) => (
                <Button
                  key={item._id}
                  size="s-link"
                  design="link-basic"
                  onClick={() => handleLink(item)}
                >
                  <div className="flex items-center w-full h-full border-b mb-2">
                    <div className="w-[20%] flex justify-center items-center">
                      <img
                        src={item.productImg[0]?.url}
                        width="60%"
                        height="auto"
                        alt={item.name || "Product Image"}
                        className="mb-4"
                      />
                    </div>
                    <h1 className="w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.name}
                    </h1>
                  </div>
                </Button>
              ))
            ) : (
              <h1 className="w-full text-center cursor-pointer overflow-hidden text-ellipsis">
                Không có sản phẩm tìm kiếm
              </h1>
            )}
          </div>
          {isError && <Errors>{error.message}</Errors>}
        </div>
      )}
    </div>
  );
};

export default Search;
