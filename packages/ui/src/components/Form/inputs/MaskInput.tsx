import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { CommonInputProps } from "../../../types/input.types";
import { IMaskInput } from "react-imask";
import { forwardRef } from "react";

interface MaskInputProps<T extends FieldValues> extends CommonInputProps {
  id: Path<T>;
  mask: CustomProps["mask"];
  definitions?: CustomProps["definitions"];
  placeholder?: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
  definitions: Record<string, RegExp>;
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const {
      onChange,
      mask,
      definitions = {
        "#": /[0-9]/,
      },
      ...other
    } = props;

    return (
      <IMaskInput
        {...other}
        mask={mask}
        definitions={definitions}
        inputRef={ref}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default function MaskInput<T extends FieldValues>({
  id,
  label,
  isDisabled,
  placeholder,
  mask,
  definitions,
}: MaskInputProps<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field, fieldState, formState }) => (
        <FormControl
          fullWidth
          variant="outlined"
          error={!!fieldState.error}
          disabled={field.disabled || isDisabled || formState.isSubmitting}
        >
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <OutlinedInput
            {...field}
            placeholder={placeholder}
            label={label}
            name={id}
            id={id}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            inputComponent={TextMaskCustom as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            slotProps={{ input: { mask, definitions } as any }}
          />
        </FormControl>
      )}
    />
  );
}
