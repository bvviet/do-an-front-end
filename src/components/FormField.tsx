import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>;
  type?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: Record<string, any>;
  error?: { message?: string };
  options?: Option[];
}

const FormField = <T extends FieldValues>({
  control,
  label,
  name,
  Component,
  type,
  placeholder,
  rules,
  error,
  options,
}: FormFieldProps<T>) => {
  return (
    <div>
      <p className="text-[2rem] font-bold leading-[150%]">{label}</p>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, name } }) => (
          <>
            <Component
              onChange={onChange}
              value={value}
              name={name}
              type={type}
              placeholder={placeholder}
              error={error}
              options={options}
            />
            {error?.message && (
              <div className="mt-2 flex items-center gap-2 text-[1.6rem] text-red-600">
                <FormHelperText error={true} sx={{ fontSize: "1.65rem" }}>
                  <ErrorOutlineIcon /> {error.message}
                </FormHelperText>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FormField;
