import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { CommonInputProps } from "../../../types/input.types";

interface FileInputProps<T extends FieldValues>
  extends CommonInputProps,
    Pick<TextFieldProps, "slotProps"> {
  id: Path<T>;
  accept?: string; // Accepted file types (e.g., ".png,.jpg,.pdf")
}

export default function FileUpload<T extends FieldValues>({
  id,
  label,
  isDisabled,
  slotProps,
  accept,
}: FileInputProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        field: { value, onChange, ...rest },
        fieldState,
        formState,
      }) => (
        <TextField
          {...rest}
          type="file"
          disabled={rest.disabled || isDisabled || formState.isSubmitting}
          error={!!fieldState.error}
          fullWidth
          label={label}
          slotProps={{
            ...slotProps,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            input: { ...slotProps?.input, accept } as any,
            inputLabel: { shrink: true },
          }}
          onChange={(e) => {
            const target = e.target as { files?: File[] };
            const file = target.files ? target.files[0] : "";
            onChange(file);
          }}
        />
      )}
    />
  );
}
