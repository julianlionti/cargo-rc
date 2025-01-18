import { DateTimePicker } from "@mui/x-date-pickers";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { dateOnChange, dateValue } from "../../../utils/dateinput.utils";

interface DateTimeInputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
}

export default function DateTimeInput<T extends FieldValues>({
  id,
  label,
}: DateTimeInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={null as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => (
        <DateTimePicker
          {...field}
          onChange={dateOnChange(field)}
          value={dateValue(field)}
          slotProps={{ textField: { error: !!fieldState.error, label } }}
          label={label}
        />
      )}
    />
  );
}
