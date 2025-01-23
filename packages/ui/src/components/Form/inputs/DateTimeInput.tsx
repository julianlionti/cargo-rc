import { DateTimePicker } from "@mui/x-date-pickers";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { dateOnChange, dateValue } from "../../../utils/dateinput.utils";
import { useEffect } from "react";
import dayjs from "dayjs";
import { CommonInputProps } from "../../../types/input.types";

interface DateTimeInputProps<T extends FieldValues> extends CommonInputProps {
  id: Path<T>;
}

export default function DateTimeInput<T extends FieldValues>({
  id,
  label,
  isDisabled,
}: DateTimeInputProps<T>) {
  const { control, getValues, setValue } = useFormContext<T>();

  const values = getValues();
  const filedValue = values[id];

  useEffect(
    function convertValueFromStringToDate() {
      if (typeof filedValue === "string") {
        setValue(id, dayjs(filedValue).toDate() as PathValue<T, Path<T>>);
      }
    },
    [id, filedValue, setValue]
  );

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={null as PathValue<T, Path<T>>}
      render={({ field, fieldState, formState }) => (
        <DateTimePicker
          {...field}
          disabled={field.disabled || isDisabled || formState.isSubmitting}
          onChange={dateOnChange(field)}
          value={dateValue(field)}
          slotProps={{ textField: { error: !!fieldState.error, label } }}
          label={label}
        />
      )}
    />
  );
}
