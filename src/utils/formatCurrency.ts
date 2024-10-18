// utils/formatCurrency.ts

export const formatCurrency = (value: number | string): string => {
  const priceNumber = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(priceNumber);
};
