import { DatePicker } from "@mui/x-date-pickers";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { dateOnChange, dateValue } from "../../../utils/dateinput.utils";
import { CommonInputProps } from "../../../types/input.types";

interface DateInputProps<T extends FieldValues> extends CommonInputProps {
  id: Path<T>;
}

export default function DateInput<T extends FieldValues>({
  id,
  label,
  isDisabled,
}: DateInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={id}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={null as any}
      render={({ field, fieldState, formState }) => (
        <DatePicker
          {...field}
          disabled={field.disabled || isDisabled || formState.isSubmitting}
          onChange={dateOnChange(field)}
          value={dateValue(field)}
          slotProps={{
            textField: { error: !!fieldState.error, label, fullWidth: true },
          }}
          label={label}
        />
      )}
    />
  );
}
