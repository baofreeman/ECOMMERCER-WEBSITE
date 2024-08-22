import {
  ao,
  giay,
  image1,
  image2,
  image3,
  non,
  quan,
  thatlung,
} from "../assets/img";

export const OPTION_CATEGORIES = ["tất cả", "áo", "quần", "thắt lưng", "giày"];
export const COLOR = [
  "xanh",
  "nâu",
  "đen",
  "trắng",
  "kem",
  "đỏ",
  "tím",
  "vàng",
  "xám",
  "hồng",
  "xanh lá",
  "cam",
];
export const SIZE = ["XS", "S", "M", "L", "XL", "XXL"];
export const SIZENUMBER = [
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
];
export const SHIPPINGFEE = [0, 30000];
export const SUBCATEGORY = [
  { category: "áo", data: ["áo thun", "áo sơ mi", "áo tay dài", "áo khoác"] },
  {
    category: "quần",
    data: ["quần tây", "quần jean", "quần short", "quần lót"],
  },
  { category: "giày", data: ["giày thể thao", "xăng đan", "giày da"] },
  { category: "thắt lưng", data: ["cổ điển", "hiện đại"] },
];

export const IMAGE_CATEGORIES = [
  { category: "áo", image: image1, link: "/shop/áo" },
  { category: "quần", image: image2, link: "/shop/quần" },
  { category: "nón", image: image3, link: "/shop/nón" },
];

export const IMAGE_LIST = [
  { category: "áo", image: ao, link: "/shop/áo" },
  { category: "quần", image: quan, link: "/shop/quần" },
  { category: "thắt lưng", image: thatlung, link: "/shop/thắt%20lưng" },
  { category: "giày", image: giay, link: "/shop/giày" },
  { category: "nón", image: non, link: "/shop/nón" },
];

export const FOOTER_LINK = [
  { name: "clothes Official Web Site", path: "/" },
  { name: "Contact Us", path: "/" },
  { name: "Order Status", path: "/" },
  { name: "Website Terms and Conditions", path: "/" },
];
