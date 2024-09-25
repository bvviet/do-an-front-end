import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  placeholder?: string;
  options: Option[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  onChange,
  value,
  name,
  placeholder,
  options,
}) => {
  return (
    <select
      name={name}
      onChange={onChange}
      value={value}
      className="box-border w-full cursor-pointer rounded-md border border-[#C4D1D0] p-3"
    >
      <option value="" selected>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
