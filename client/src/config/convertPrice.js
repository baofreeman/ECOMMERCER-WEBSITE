export const convertPrice = (price) => {
  if (typeof price !== "number" || isNaN(price)) {
    return "Chưa có giá";
  }

  try {
    const formattedPrice = price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    const formattedPriceWithNarrowSpace = formattedPrice.replace(
      /\s₫/,
      "\u202F₫"
    );
    return formattedPriceWithNarrowSpace;
  } catch (error) {
    console.error("Error formatting price:", error);
    return "Chưa có giá";
  }
};
