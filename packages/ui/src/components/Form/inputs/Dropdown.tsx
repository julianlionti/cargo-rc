import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface Option {
  id: string;
  title?: string;
}

interface DropdownProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  options: Option[];
}

export default function Dropdown<T extends FieldValues>({
  id,
  label,
  options,
}: DropdownProps<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={id}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={"" as any}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
          <Select labelId={`${id}-label`} label={label} {...field}>
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
