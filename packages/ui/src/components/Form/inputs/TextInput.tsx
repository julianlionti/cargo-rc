import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { CommonInputProps } from "../../../types/input.types";

interface TextInputProps<T extends FieldValues>
  extends CommonInputProps,
    Pick<TextFieldProps, "slotProps"> {
  id: Path<T>;
}

export default function TextInput<T extends FieldValues>({
  id,
  label,
  isDisabled,
  slotProps,
}: TextInputProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field, fieldState, formState }) => (
        <TextField
          {...field}
          disabled={field.disabled || isDisabled || formState.isSubmitting}
          error={!!fieldState.error}
          fullWidth
          label={label}
          slotProps={slotProps}
        />
      )}
    />
  );
}
