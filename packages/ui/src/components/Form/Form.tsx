import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodTypeAny } from "zod";
import { ReactNode } from "react";
import { Alert, Box, Typography } from "@mui/material";

interface FormProps<T extends FieldValues> {
  schema: ZodTypeAny;
  children: ReactNode;
  onSubmit: (values: T) => void;
}

export default function Form<T extends FieldValues>({
  children,
  schema,
  onSubmit,
}: FormProps<T>) {
  const methods = useForm<T>({ resolver: zodResolver(schema) });
  const { formState, handleSubmit } = methods;
  const { errors } = formState;
  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2, // Adds space between form fields
          maxWidth: 600, // Limits the form width to make it look less stretched out
          margin: "0 auto", // Centers the form
          padding: 3,
        }}
      >
        {children}

        {!!Object.keys(errors).length && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {Object.entries(errors).map(([key, val], index) => (
              <Typography key={index} variant="body2">
                {`${key}: ${val?.message}`}
              </Typography>
            ))}
          </Alert>
        )}
      </Box>
    </FormProvider>
  );
}
