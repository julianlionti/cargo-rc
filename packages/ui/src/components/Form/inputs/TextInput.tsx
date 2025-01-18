import { TextField } from "@mui/material";
import { Controller, FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { CommonInputProps } from "../../../types/input.types";

interface TextInputProps<T extends FieldValues> extends CommonInputProps {
  id: Path<T>;
}

export default function TextInput<T extends FieldValues>({
  id,
  label,
  isDisabled,
}: TextInputProps<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          disabled={field.disabled || isDisabled}
          error={!!fieldState.error}
          fullWidth
          label={label}
        />
      )}
    />
  );
}
