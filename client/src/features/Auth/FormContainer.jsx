import { Button } from "../../components/ui";

const FormContainer = ({
  onSubmit,
  title,
  buttonText,
  buttonHref,
  buttonBackText,
  isLoading,
  children,
}) => {
  return (
    <section className="flex w-full h-full justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-[400px] gap-8 justify-center items-center sm:w-full px-20"
      >
        <span className="text-base uppercase flex gap-2">
          / <h1 className="text-active">{title}</h1> /
        </span>
        {children}
        <Button size="s" design="link-primary" to={buttonHref}>
          {buttonBackText}
        </Button>
        <Button
          size="l"
          design="primary"
          width="120"
          type="submit"
          disabled={isLoading}
        >
          {buttonText}
        </Button>
      </form>
    </section>
  );
};

export default FormContainer;
