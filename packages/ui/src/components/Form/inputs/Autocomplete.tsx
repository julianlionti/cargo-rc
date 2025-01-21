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
import { getFinalOptionList } from "../../../utils/listInput.utils";

interface AutocompleteProps<T extends FieldValues, O extends Option>
  extends CommonInputProps {
  id: Path<T>;
  labelId?: Path<T>;
  options: O[];
  isLoading?: boolean;
  onTextChanged?: (debounced: string) => void;
  onOptionSelected?: (option: O | null) => void;
}

export default function Autocomplete<T extends FieldValues, O extends Option>({
  id,
  labelId,
  label,
  isDisabled,
  isLoading,
  options,
  onOptionSelected,
  onTextChanged,
}: AutocompleteProps<T, O>) {
  const { control, getValues } = useFormContext<T>();

  const [inputValue, setInputValue] = useState("");

  const values = getValues();
  const fieldValue = values[id];
  const labelValue = labelId ? values[labelId] : "";

  const debouncedOnTextChanged = useRef(
    debounce((input: string) => {
      if (onTextChanged) onTextChanged(input);
    }, 500)
  );

  const handleInputChange = (next: string) => {
    setInputValue(next);
    debouncedOnTextChanged.current(next);
  };

  const finalOptions = getFinalOptionList<O>(options, fieldValue, labelValue);
  console.log(finalOptions);
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={null as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => (
        <MuiAutocomplete
          {...field}
          filterOptions={(e) => e}
          autoComplete
          value={
            field.value
              ? finalOptions.find((e) => e.id === field.value) || null
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
          options={finalOptions}
          getOptionLabel={(option) => option.name || option.id}
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
