import { TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
}

export default function TextInput<T extends FieldValues>({
  id,
  label,
}: TextInputProps<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={id}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={"" as any}
      render={({ field, fieldState }) => (
        <TextField
          error={!!fieldState.error}
          fullWidth
          {...field}
          label={label}
        />
      )}
    />
  );
}
