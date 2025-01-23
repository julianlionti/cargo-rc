import { TimePicker } from "@mui/x-date-pickers";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { dateOnChange, dateValue } from "../../../utils/dateinput.utils";
import { CommonInputProps } from "../../../types/input.types";

interface TimeInputProps<T extends FieldValues> extends CommonInputProps {
  id: Path<T>;
}

export default function TimeInput<T extends FieldValues>({
  id,
  label,
  isDisabled,
}: TimeInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={null as PathValue<T, Path<T>>}
      render={({ field, fieldState, formState }) => (
        <TimePicker
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
