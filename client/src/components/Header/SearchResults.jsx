import { Loading } from "../shared";
import { Button, Errors } from "../ui";

const SearchResults = ({ data, isLoading, isError, error, onLinkClick }) => {
  return (
    <div className="relative w-full bg-white dark:bg-black h-[150px] border rounded">
      <div className="px-[20px] py-[10px] h-full overflow-scroll no-scrollbar">
        {isLoading && <Loading />}
        {data?.length ? (
          data.map((item) => (
            <Button
              key={item._id}
              size="s-link"
              design="link-basic"
              onClick={() => onLinkClick(item)}
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
  );
};

export default SearchResults;
