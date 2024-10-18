// useColorName.ts
import { useMemo } from "react";
import colorName from "color-name";

const useColorName = (colorCode: string): string => {
  return useMemo(() => {
    // Kiểm tra định dạng mã màu
    if (!/^#[0-9A-F]{6}$/i.test(colorCode)) {
      return "Màu không xác định";
    }

    // Chuyển đổi mã màu thành RGB
    const rgb = parseInt(colorCode.replace(/^#/, ""), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Tìm tên màu tương ứng
    const closestColor = colorName.find(([name, value]) => {
      return value[0] === r && value[1] === g && value[2] === b;
    });

    return closestColor ? closestColor[0] : "Màu không xác định";
  }, [colorCode]);
};

export default useColorName;
