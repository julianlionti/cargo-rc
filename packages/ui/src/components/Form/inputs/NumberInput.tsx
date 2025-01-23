import { TextField } from "@mui/material";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { CommonInputProps } from "../../../types/input.types";

interface NumberInputProps<T extends FieldValues> extends CommonInputProps {
  id: Path<T>;
  prefix?: string;
}

export default function NumberInput<T extends FieldValues>({
  id,
  label,
  isDisabled,
  prefix,
}: NumberInputProps<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={null as PathValue<T, Path<T>>}
      render={({
        field: { onChange, ...restField },
        fieldState,
        formState,
      }) => (
        <NumericFormat
          {...restField}
          disabled={restField.disabled || isDisabled || formState.isSubmitting}
          fullWidth
          error={!!fieldState.error}
          onValueChange={({ floatValue }) => {
            onChange(floatValue);
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          label={label}
          prefix={prefix}
        />
      )}
    />
  );
}
