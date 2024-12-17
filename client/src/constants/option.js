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

export const OPTION_CATEGORIES = [
  { name: "tất cả", slug: "tat-ca" },
  { name: "áo", slug: "ao" },
  { name: "quần", slug: "quan" },
  { name: "thắt lưng", slug: "that-lung" },
  { name: "giày", slug: "giay" },
];

export const COLOR = [
  { name: "xanh", slug: "xanh" },
  { name: "nâu", slug: "nau" },
  { name: "đen", slug: "den" },
  { name: "trắng", slug: "trang" },
  { name: "kem", slug: "kem" },
  { name: "đỏ", slug: "do" },
  { name: "tím", slug: "tim" },
  { name: "vàng", slug: "vang" },
  { name: "xám", slug: "xam" },
  { name: "hồng", slug: "hong" },
  { name: "xanh lá", slug: "xanh-la" },
  { name: "cam", slug: "cam" },
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
  {
    category: "áo",
    categorySlug: "ao",
    data: [
      { name: "áo thun", slug: "ao-thun" },
      { name: "áo sơ mi", slug: "ao-so-mi" },
      { name: "áo tay dài", slug: "ao-tay-dai" },
      { name: "áo khoác", slug: "ao-khoac" },
    ],
  },
  {
    category: "quần",
    categorySlug: "quan",
    data: [
      { name: "quần tây", slug: "quan-tay" },
      { name: "quần jean", slug: "quan-jean" },
      { name: "quần short", slug: "quan-short" },
      { name: "quần lót", slug: "quan-lot" },
    ],
  },
  {
    category: "giày",
    categorySlug: "giay",
    data: [
      { name: "giày thể thao", slug: "giay-the-thao" },
      { name: "xăng đan", slug: "xang-dan" },
      { name: "giày da", slug: "giay-da" },
    ],
  },
  {
    category: "thắt lưng",
    categorySlug: "that-lung",
    data: [
      { name: "cổ điển", slug: "co-dien" },
      { name: "hiện đại", slug: "hien-dai" },
    ],
  },
];

export const IMAGE_CATEGORIES = [
  { category: "áo", image: image1, link: "/shop/ao" },
  { category: "quần", image: image2, link: "/shop/quan" },
  { category: "nón", image: image3, link: "/shop/non" },
];

export const IMAGE_LIST = [
  { category: "áo", image: ao, link: "/shop/ao" },
  { category: "quần", image: quan, link: "/shop/quan" },
  { category: "thắt lưng", image: thatlung, link: "/shop/that-lung" },
  { category: "giày", image: giay, link: "/shop/giay" },
  { category: "nón", image: non, link: "/shop/non" },
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
