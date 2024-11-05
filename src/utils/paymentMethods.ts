const paymentMethods = (method: string | undefined) => {
  switch (method) {
    case "unpaid":
      return "Chưa thanh toán";
    case "paid":
      return "Đã thanh toán";
    case "failed":
      return "Thất bại";
    default:
      break;
  }
};

export default paymentMethods;
