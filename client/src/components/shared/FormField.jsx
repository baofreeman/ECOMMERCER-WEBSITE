import React from "react";
import PropTypes from "prop-types";
import { Input } from "../ui/index";

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label htmlFor={name} className="w-[130px]">
        {label}
      </label>
      <Input
        size={"m"}
        design={"basic"}
        type={type}
        name={name}
        placeholder={placeholder}
        register={register}
        error={error}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FormField;
