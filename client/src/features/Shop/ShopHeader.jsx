import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { OPTION_CATEGORIES } from "../../constants/option";
import { Button } from "../../components/ui";

const ShopHeader = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to reset search parameters
  const resetSearch = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("tag");
      newParams.delete("color");
      newParams.delete("size");
      return newParams;
    });
  };

  // Handler for category change
  const handleCategoryChange = (value) => {
    resetSearch();
    navigate(value === "tất cả" || "" ? "/shop" : `/shop/${value}`);
  };

  return (
    <ul className="flex w-full dark:text-silver">
      {OPTION_CATEGORIES.map((item) => (
        <li key={item}>
          <Button
            size="m"
            design={category === item ? "link-active" : "link-basic"}
            value={item}
            onClick={() => handleCategoryChange(item)}
          >
            {item}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ShopHeader;
