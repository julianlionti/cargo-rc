import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { CommonInputProps, Option } from "../../../types/input.types";
import { useMemo } from "react";

interface DropdownProps<T extends FieldValues> extends CommonInputProps {
  id: Path<T>;
  labelId?: Path<T>;
  options: Option[];
  onOptionSelected?: (option: string, values: T) => void;
}

export default function Dropdown<T extends FieldValues>({
  id,
  labelId,
  label,
  isDisabled,
  options,
  onOptionSelected,
}: DropdownProps<T>) {
  const { control, getValues } = useFormContext<T>();

  const values = getValues();
  const fieldValue = values[id];
  const labelValue = labelId ? values[labelId] : "";

  const finalOptions = useMemo(() => {
    if (options && options.length > 0) return options;
    if (!options && !fieldValue) return [];

    if (!options && fieldValue) return [{ id: labelValue, name: fieldValue }];
    return [];
  }, [options, fieldValue, labelValue]);

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field, fieldState, formState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
          <Select
            {...field}
            value={field.value || ""}
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
            disabled={field.disabled || isDisabled || formState.isSubmitting}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {finalOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name || option.id}
              </MenuItem>
            ))}
          </Select>
          {/* {  <FormHelperText>Disabled</FormHelperText>} */}
        </FormControl>
      )}
    />
  );
}
