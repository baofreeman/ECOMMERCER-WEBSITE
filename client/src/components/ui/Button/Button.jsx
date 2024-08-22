import { ButtonDesign, ButtonPosition, ButtonSize, ButtonWidth } from "./theme";
import { Link } from "react-router-dom";

const Button = ({ to, href, children, ...props }) => {
  let Comp = "button";
  const { size, design, width, position } = props;
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  return (
    <div className={`${ButtonWidth[width]} ${ButtonPosition[position]}`}>
      <Comp
        className={`${ButtonSize[size]} ${ButtonDesign[design]} z-10 select-none`}
        {...props}
      >
        {children}
      </Comp>
    </div>
  );
};

export default Button;
