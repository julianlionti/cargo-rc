import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { CommonInputProps, Option } from "../../../types/input.types";

interface DropdownProps<T extends FieldValues> extends CommonInputProps {
  id: Path<T>;
  options: Option[];
  onOptionSelected?: (option: string, values: T) => void;
}

export default function Dropdown<T extends FieldValues>({
  id,
  label,
  isDisabled,
  options,
  onOptionSelected,
}: DropdownProps<T>) {
  const { control, getValues } = useFormContext<T>();
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e);
              if (onOptionSelected)
                onOptionSelected(
                  (e.target as { value: string }).value,
                  getValues()
                );
            }}
            labelId={`${id}-label`}
            label={label}
            disabled={field.disabled || isDisabled}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title || option.id}
              </MenuItem>
            ))}
          </Select>
          {/* {  <FormHelperText>Disabled</FormHelperText>} */}
        </FormControl>
      )}
    />
  );
}
