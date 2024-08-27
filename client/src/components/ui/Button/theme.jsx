export const ButtonDesign = {
  primary:
    "uppercase bg-orange text-white dark:text-black hover:bg-black dark:hover:bg-white dark:hover:text-black font-bold rounded shadow-md shadow-gray-300 active:bg-white focus:text-black disabled:opacity-30 disabled:cursor-not-allowed",
  basic:
    "uppercase bg-white hover:bg-note text-black dark:bg-black dark:text-white hover:text-silver font-bold rounded shadow-md shadow-gray-400 focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black disabled:opacity-30 disabled:cursor-not-allowed",
  delete: "uppercase bg-red hover:bg-red-300 text-white font-bold rounded",
  disable: "uppercase border disabled:opacity-30 disabled:cursor-not-allowed",
  "trans-primary":
    "uppercase bg-transparent text-orange hover:text-text font-bold rounded border disabled:opacity-30 disabled:cursor-not-allowed",
  "trans-basic":
    "uppercase bg-transparent text-note hover:text-white font-bold rounded border disabled:opacity-30 disabled:cursor-not-allowed",
  "link-primary":
    "uppercase bg-transparent text-orange hover:text-black dark:hover:text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed",
  "link-basic":
    "uppercase bg-transparent text-silver hover:text-black dark:hover:text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed",
  "link-active":
    "uppercase bg-transparent text-active drop-shadow-md font-bold disabled:opacity-30 disabled:cursor-not-allowed",
  "link-disable": "uppercase text-silver cursor-not-allowed",
};
export const ButtonSize = {
  s: "w-full py-2 px-4 flex items-center justify-center sm:py-1 sm:px-2 md:py-2 md:px-4",
  "s-link": "flex items-center justify-center",
  m: "w-full py-3 px-4 flex items-center justify-center sm:py-2 sm:px-3 md:py-3 md:px-4",
  l: "w-full py-3 px-4 flex items-center justify-center sm:py-2 sm:px-3 md:py-3 md:px-4",
};
export const ButtonWidth = {
  full: "w-full flex items-center justify-center",
  120: "w-[120px] h-full flex items-center justify-center",
  max: "w-max h-max flex items-center justify-center",
};
export const ButtonPosition = {
  absolute: "absolute",
};
