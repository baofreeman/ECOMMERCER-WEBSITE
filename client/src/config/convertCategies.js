import { OPTION_CATEGORIES } from "../constants/option";

export const convertCategies = () => {
  let optionAll = ["tat-ca"];
  const optionCatCustom = OPTION_CATEGORIES.filter(
    (item) => !optionAll.includes(item.slug)
  );
  return optionCatCustom.map((item) => (
    <option key={item.slug} value={item.slug} className="custom-option">
      {item.name}
    </option>
  ));
};
