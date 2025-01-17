"use client";
import { TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface NumberInputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  prefix?: string;
}

export default function NumberInput<T extends FieldValues>({
  id,
  label,
  prefix,
}: NumberInputProps<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={id}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={null as any}
      render={({ field: { onChange, ...restField }, fieldState }) => (
        <NumericFormat
          {...restField}
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
