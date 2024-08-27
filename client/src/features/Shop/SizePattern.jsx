import React, { Fragment, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { Button } from "../../components/ui";
import { DeleteIcon } from "../../assets/icons";
import {
  IMAGE_LIST,
  PRODUCT_SIZES,
  SIZE,
  SIZE_PATTERN_SHIRT,
} from "../../constants";
import { useParams } from "react-router-dom";

const SizePattern = () => {
  const { closeModal } = useModal();
  const { category } = useParams();
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("shirt");
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className="w-full h-full bg-black opacity-20"
        onClick={closeModal}
        aria-label="Close modal"
      ></div>
      <div className="bg-white dark:bg-black border rounded-md absolute z-10 p-10">
        <div
          className="absolute top-3 right-3 cursor-pointer"
          onClick={closeModal}
        >
          <DeleteIcon />
        </div>
        <div className="flex mb-4">
          {Object.keys(PRODUCT_SIZES).map((category) => (
            <Button
              size="s"
              design="basic"
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="w-full h-full">
          <table className="w-full text-center border">
            <thead>
              <tr>
                <th></th>
                {sizes.map((size) => (
                  <th key={size} className="p-4">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCT_SIZES[selectedCategory].map((variant) => (
                <tr key={variant.name}>
                  <td>{variant.name}</td>
                  {sizes.map((size) => (
                    <td key={size} className="p-4">
                      {variant[size]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizePattern;
