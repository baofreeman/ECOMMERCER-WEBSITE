const ArrowIcon = ({ rotate, width, height }) => {
  return (
    <svg
      className="fill-silver hover:fill-black dark:hover:fill-orange"
      width={width}
      height={height}
      viewBox="0 0 12 7"
      xmlns="https://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${rotate})`,
        transition: "transform 0.3s ease",
      }}
    >
      <path d="M1.71429 0H0V1.71429H1.71429V3.42857H3.42857V5.14286H5.14286V6.85714H6.85714V5.14286H8.57143V3.42857H10.2857V1.71429H12V0H10.2857V1.71429H8.57143V3.42857H6.85714V5.14286H5.14286V3.42857H3.42857V1.71429H1.71429V0Z"></path>
    </svg>
  );
};

export default ArrowIcon;
