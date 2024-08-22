import { InputSize, InputStyle } from "./theme";
import Errors from "../../shared/Errors";

const Input = ({ register, type, name, error, ...props }) => {
  const { size, design } = props;
  return (
    <div
      className={
        type === "radio" || type === "checkbox"
          ? "w-fit flex items-center justify-center"
          : "w-full"
      }
    >
      <input
        className={`${InputSize[size]} ${InputStyle[design]}`}
        {...register(name)}
        {...props}
        type={type}
      />
      {error ? <Errors>{error}</Errors> : null}
    </div>
  );
};

export default Input;
