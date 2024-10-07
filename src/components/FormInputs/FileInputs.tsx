import React from "react";

interface FileInputsProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error: boolean;
}

const FileInputs: React.FC<FileInputsProps> = ({ onChange, name, error }) => {
  return (
    <div>
      <input
        type="file"
        name={name}
        onChange={onChange}
        style={{ display: "none" }} // Ẩn input file mặc định
        id={name}
      />
      <label htmlFor={name} style={{ cursor: "pointer" }}>
        <span>{error ? "File không hợp lệ" : "Chọn file"}</span>
      </label>
      {error && <span className="text-red-600">Có lỗi xảy ra.</span>}
    </div>
  );
};

export default FileInputs;
