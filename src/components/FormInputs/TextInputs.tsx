import { TextField } from "@mui/material";
import React from "react";

interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  error?: boolean; // Thay đổi thành optional (tuỳ chọn)
  helperText?: string; // Thêm thông báo trợ giúp (tuỳ chọn)
}

const TextInputs: React.FC<TextFieldProps> = ({
  onChange,
  value = "",
  name,
  type = "text",
  placeholder,
  error = false, // Đặt giá trị mặc định cho error
  helperText,
}) => {
  return (
    <TextField
      fullWidth
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      error={error}
      helperText={error ? helperText : undefined} // Hiển thị helperText nếu có lỗi
      inputProps={{
        className: "h-[40px] px-3 py-2", // Thay đổi lớp cho input
      }}
      InputProps={{
        className: "!p-0", // Thay đổi lớp cho input
      }}
    />
  );
};

export default TextInputs;
