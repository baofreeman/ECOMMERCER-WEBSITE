import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { OPTION_CATEGORIES } from "../../constants/option";
import { Button } from "../../components/ui";
import { useCallback } from "react";

const ShopHeader = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to reset search parameters
  const resetSearch = () => {
    searchParams.delete("tag");
    searchParams.delete("color");
    searchParams.delete("size");
    setSearchParams(searchParams);
  };

  // Handler for category change
  const handleCategoryChange = useCallback((value) => {
    resetSearch();
    navigate(value === "tat-ca" || "" ? "/shop" : `/shop/${value}`);
  }, []);

  return (
    <ul className="flex w-full dark:text-silver">
      {OPTION_CATEGORIES.map((item) => (
        <li key={item.slug}>
          <Button
            size="m"
            design={categorySlug === item.slug ? "link-active" : "link-basic"}
            value={item.slug}
            onClick={() => handleCategoryChange(item.slug)}
          >
            {item.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ShopHeader;
