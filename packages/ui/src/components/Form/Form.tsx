import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodTypeAny } from "zod";
import { ReactNode, Ref, useImperativeHandle } from "react";
import { Alert, Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { z } from "zod";
import { Watch } from "./Watch";

export interface FormRef<T extends FieldValues> {
  methods: UseFormReturn<T>;
}

interface FormProps<T extends FieldValues, Z extends ZodTypeAny> {
  schema?: Z;
  children: ReactNode;
  ref?: Ref<FormRef<T>>;
  defaultValues?: DefaultValues<T>;
  isDisabled?: boolean;
  onValuesChanged?: (values: T) => T;
  onSubmit?: (values: z.infer<Z>) => void;
}

export default function Form<T extends FieldValues, Z extends ZodTypeAny>({
  ref,
  children,
  schema,
  isDisabled,
  defaultValues,
  onValuesChanged,
  onSubmit,
}: FormProps<T, Z>) {
  const methods = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    disabled: isDisabled,
    defaultValues,
  });
  const { formState, handleSubmit } = methods;
  const { errors } = formState;

  useImperativeHandle(ref, () => ({
    methods,
  }));

  return (
    <FormProvider {...methods}>
      {onValuesChanged && <Watch onValuesChanged={onValuesChanged} />}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component="form"
          onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
        >
          {children}
        </Box>
        {!!Object.keys(errors).length && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {Object.entries(errors).map(([key, val], index) => (
              <Typography key={index} variant="body2">
                {`${key}: ${val?.message}`}
              </Typography>
            ))}
          </Alert>
        )}
      </LocalizationProvider>
    </FormProvider>
  );
}
