import { useMemo } from "react";

const useFormatCurrency = (amount: number) => {
  const formattedAmount = useMemo(() => {
    if (amount === undefined || amount === null) return "";

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Số thập phân (có thể thay đổi nếu cần)
      maximumFractionDigits: 0,
    }).format(amount);
  }, [amount]);

  return formattedAmount;
};

export default useFormatCurrency;
