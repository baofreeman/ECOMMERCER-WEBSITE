import React from "react";
import { TextareaDesign, TextareaSize } from "./theme";

const Textarea = ({ name, register, ...props }) => {
  const { size, design } = props;

  return (
    <textarea
      className={`${TextareaDesign[design]} ${TextareaSize[size]}`}
      {...(register ? { ...register(name) } : null)}
    />
  );
};

export default Textarea;
