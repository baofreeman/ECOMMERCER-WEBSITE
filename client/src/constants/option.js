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
export const PRODUCT_SIZES = {
  shirt: [
    { name: "Cổ", S: 20, M: 21, L: 22, XL: 23, XXL: 24 },
    { name: "Vai", S: 35, M: 36, L: 37, XL: 38, XXL: 39 },
    { name: "Ngực", S: 40, M: 41, L: 42, XL: 43, XXL: 44 },
  ],
  pants: [
    { name: "Eo", S: 30, M: 32, L: 34, XL: 36, XXL: 38 },
    { name: "Hông", S: 40, M: 42, L: 44, XL: 46, XXL: 48 },
    { name: "Chiều dài", S: 100, M: 102, L: 104, XL: 106, XXL: 108 },
  ],
  belt: [
    { name: "Chiều dài", S: 90, M: 95, L: 100, XL: 105, XXL: 110 },
    { name: "Chiều rộng", S: 2, M: 2.5, L: 3, XL: 3.5, XXL: 4 },
  ],
  hat: [{ name: "Vòng đầu", S: 56, M: 57, L: 58, XL: 59, XXL: 60 }],
  shoes: [{ name: "Chiều dài chân", S: 24, M: 25, L: 26, XL: 27, XXL: 28 }],
};

export const DELIVERY_STATUS = ["pending", "shipped", "delivered", "cancelled"];
