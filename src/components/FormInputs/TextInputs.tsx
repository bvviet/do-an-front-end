import { TextField } from "@mui/material";
import React from "react";

interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const TextInputs: React.FC<TextFieldProps> = ({
  onChange,
  value='',
  name,
  type = "text",
  placeholder,
}) => {
  return (
    <TextField
      fullWidth
      inputProps={{
        className: "py-[15px] pl-[15px] pr-[20%]",
      }}
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default TextInputs;
