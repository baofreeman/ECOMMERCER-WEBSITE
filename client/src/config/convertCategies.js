import { OPTION_CATEGORIES } from "../constants/option";

export const convertCategies = () => {
  let optionAll = ["tất cả"];
  const optionCatCustom = OPTION_CATEGORIES.filter(
    (item) => !optionAll.includes(item)
  );
  return optionCatCustom.map((item) => (
    <option key={item} value={item} className="custom-option">
      {item}
    </option>
  ));
};
