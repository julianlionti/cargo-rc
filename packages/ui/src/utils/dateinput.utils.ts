import dayjs, { Dayjs } from "dayjs";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export const dateOnChange =
  <T extends FieldValues>(field: ControllerRenderProps<T, Path<T>>) =>
  (next: Dayjs | null) => {
    field.onChange(next ? next.toDate() : null);
  };

export const dateValue = <T extends FieldValues>(
  field: ControllerRenderProps<T, Path<T>>
) => (field.value ? dayjs(field.value as Date) : null);
