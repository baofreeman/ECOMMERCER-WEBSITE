import { SelectDesign } from "./theme";
import Errors from "../../shared/Errors";

const Select = ({
  children,
  name,
  label,
  register,
  onChange,
  error,
  ...props
}) => {
  const { design } = props;
  return (
    <div className="w-full">
      <select
        className={`${SelectDesign[design]}`}
        {...(register ? { ...register(name) } : null)}
        onChange={onChange}
        {...props}
      >
        <option value={""} className="custom-option">{`${label}`}</option>
        {children}
      </select>
      {error && <Errors>{error}</Errors>}
    </div>
  );
};

export default Select;
