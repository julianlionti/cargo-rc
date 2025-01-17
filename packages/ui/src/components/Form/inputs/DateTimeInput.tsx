import { DateTimePicker } from "@mui/x-date-pickers";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={null as any}
      render={({ field, fieldState }) => (
        <DateTimePicker
          {...field}
          onChange={dateOnChange(field)}
          value={dateValue(field)}
          slotProps={{ textField: { error: !!fieldState.error } }}
          label={label}
        />
      )}
    />
  );
}
