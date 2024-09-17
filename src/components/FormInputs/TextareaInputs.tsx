import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import React from "react";

interface TextareaInputProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  name: string;
  placeholder?: string;
}

const TextareaInputs: React.FC<TextareaInputProps> = ({
  onChange,
  value='',
  name,
  placeholder,
}) => {
  return (
    <TextareaAutosize
      minRows={6}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "15px",
        border: "1px solid #C4D1D0",
        borderRadius: "4px",
        resize: "none",
        boxSizing: "border-box",
      }}
    />
  );
};

export default TextareaInputs;
