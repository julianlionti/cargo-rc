import {
  CircularProgress,
  debounce,
  Autocomplete as MuiAutocomplete,
  TextField,
} from "@mui/material";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { CommonInputProps, Option } from "../../../types/input.types";
import { useRef, useState } from "react";

interface AutocompleteProps<T extends FieldValues, O extends Option>
  extends CommonInputProps {
  id: Path<T>;
  options: O[];
  isLoading?: boolean;
  onTextChanged?: (debounced: string) => void;
  onOptionSelected?: (option: O | null) => void;
}

export default function Autocomplete<T extends FieldValues, O extends Option>({
  id,
  label,
  isDisabled,
  isLoading,
  options,
  onOptionSelected,
  onTextChanged,
}: AutocompleteProps<T, O>) {
  const { control } = useFormContext<T>();

  const [inputValue, setInputValue] = useState("");

  const debouncedOnTextChanged = useRef(
    debounce((input: string) => {
      if (onTextChanged) onTextChanged(input);
    }, 500)
  );

  const handleInputChange = (next: string) => {
    setInputValue(next);
    debouncedOnTextChanged.current(next);
  };

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={null as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => (
        <MuiAutocomplete
          {...field}
          autoComplete
          value={
            field.value
              ? options.find((e) => e.id === field.value) || null
              : null
          }
          onChange={(_, newValue) => {
            field.onChange({ target: { value: newValue?.id || null } });
            if (onOptionSelected) onOptionSelected(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            handleInputChange(newInputValue);
          }}
          isOptionEqualToValue={(option) => option.id === field.value}
          fullWidth
          disabled={field.disabled || isDisabled}
          options={options}
          getOptionLabel={(option) => option.title || option.id}
          renderInput={(textFieldProps) => (
            <TextField
              {...textFieldProps}
              error={!!fieldState.error}
              label={label}
              slotProps={{
                input: {
                  ...textFieldProps.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {textFieldProps.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
        />
      )}
    />
  );
}
