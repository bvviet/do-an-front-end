import { TextField } from "@mui/material";
import React from "react";

interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  type?: string;
  placeholder?: string;
  error: boolean;
}

const TextInputs: React.FC<TextFieldProps> = ({
  onChange,
  value = "",
  name,
  type = "text",
  placeholder,
  error,
}) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: { className: "h-[40px] px-3 py-2" },
        htmlInput: { className: "!p-0" },
      }}
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      error={error}
    />
  );
};

export default TextInputs;
