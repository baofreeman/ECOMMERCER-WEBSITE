import { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { COLOR, SIZE, SUBCATEGORY } from "../../constants";
import { convertCategies } from "../../config";
import { Button, Select } from "../../components/ui";

const FilterProducts = () => {
  const navigate = useNavigate();

  const initialValues = {
    tag: "",
    color: "",
    size: "",
  };

  // Set query params.
  const [state, setState] = useState(initialValues);
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  // Filter category.
  const subCategoryOption = SUBCATEGORY.find(
    (item) => item.category === category
  );

  const optionCategies = convertCategies;

  // Filter tag.
  const optionSub = subCategoryOption?.data?.map((item) => (
    <option key={item} value={item} className="custom-option">
      {item}
    </option>
  ));

  // Filter color.
  const colorOption = COLOR.map((item) => (
    <option key={item} value={item} className="custom-option">
      {item}
    </option>
  ));

  // Filter size.
  const sizeOption = SIZE.map((item) => (
    <option key={item} value={item} className="custom-option">
      {item}
    </option>
  ));

  const handleCategory = (e) => {
    const value = e.target.value;
    value ? navigate(`/shop/${value}`) : navigate("/shop");
  };

  const handleTag = (e) => {
    const value = e.target.value;
    setState({ ...state, tag: value });
  };

  const handleColor = (e) => {
    const value = e.target.value;
    setState({ ...state, color: value });
  };

  const handleSize = (e) => {
    const value = e.target.value;
    setState({ ...state, size: value });
  };

  const handleReset = () => {
    setState({ tag: "", color: "", size: "" });
    searchParams.delete("tag");
    searchParams.delete("color");
    searchParams.delete("size");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    handleReset();
  }, [category]);

  useEffect(() => {
    const fn = (state) =>
      Object.fromEntries(Object.entries(state).filter(([, v]) => v !== ""));
    const result = fn(state);
    if (Object.keys(result).length > 0) {
      navigate({
        pathname: `/shop/${category}`,
        search: createSearchParams({ ...result }).toString(),
      });
    }
  }, [state]);

  // Css selected query.
  const catCss = category
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  const tagCss = state.tag
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  const sizeCss = state.size
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  const colorCss = state.color
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";

  return (
    <div className="w-full h-max flex flex-col gap-4 relative md:flex-row sm:flex-row md:justify-between sm:justify-between sm:px-4">
      <h1 className="text-base sm:hidden md:hidden">Lọc</h1>
      <section className="text-md w-full flex flex-col gap-8 md:flex-row md:justify-between sm:flex-row md:gap-4 sm:gap-2 sm:justify-between sm:items-center">
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${catCss}`}>Danh mục</h1>
          <Select
            design="basic"
            value={category || ""}
            onChange={(e) => handleCategory(e)}
            label={"Danh mục"}
          >
            {optionCategies()}
          </Select>
        </div>
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${tagCss}`}>
            Kiểu dáng
          </h1>
          <Select
            design="basic"
            value={state.tag}
            onChange={(e) => handleTag(e)}
            disabled={!category}
            label={"Kiểu dáng"}
          >
            {optionSub}
          </Select>
        </div>
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${colorCss}`}>
            Màu sắc
          </h1>
          <Select
            design="basic"
            value={state.color}
            disabled={!category}
            onChange={(e) => handleColor(e)}
            label={"Màu sắc"}
          >
            {colorOption}
          </Select>
        </div>
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${sizeCss}`}>Size</h1>
          <Select
            design="basic"
            value={state.size}
            disabled={!category}
            onChange={(e) => handleSize(e)}
            label={"Kích cỡ"}
          >
            {sizeOption}
          </Select>
        </div>

        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <Button
            design={
              Object.values(state).every((value) => value.length > 0)
                ? "basic"
                : "disable"
            }
            onClick={handleReset}
            size="s"
            disabled={Object.values(state).every((value) => value.length === 0)}
          >
            reset
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FilterProducts;
