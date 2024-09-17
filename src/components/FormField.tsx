import { Controller, Control, FieldValues, Path } from "react-hook-form";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>;
  type?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: Record<string, any>; // Để truyền các quy tắc validation
  message?: string; // Thông báo lỗi tùy chỉnh
}

const FormField = <T extends FieldValues>({
  control,
  label,
  name,
  Component,
  type,
  placeholder,
  rules,
  message,
}: FormFieldProps<T>) => {
  return (
    <div>
      <p className="text-[2rem] font-bold leading-[150%]">{label}</p>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, name }, fieldState: { error } }) => (
          <div>
            <Component
              onChange={onChange}
              value={value}
              name={name}
              type={type}
              placeholder={placeholder}
            />
            {error && (
              <div className="flex items-center gap-2 text-[1.6rem] text-red-600 mt-2">
                <ErrorOutlineIcon />
                <p>{message || error.message}</p>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FormField;
