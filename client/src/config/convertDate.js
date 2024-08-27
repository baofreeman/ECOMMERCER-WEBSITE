export const convertDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options = {
    weekday: "long", // Thứ trong tuần
    year: "numeric", // Năm
    month: "long", // Tháng
    day: "numeric", // Ngày
    hour: "2-digit", // Giờ
    minute: "2-digit", // Phút
    second: "2-digit", // Giây
  };

  return date.toLocaleString("vi-VN", options);
};
