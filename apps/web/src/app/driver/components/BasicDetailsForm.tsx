"use client";

import { Button, Stack, Typography, Box } from "@mui/material";
import { createForm, Form, DefaultValues } from "@ui";
import { basicDriverSchema, DriverSchema } from "@utils";
import { useRouter } from "next/navigation";
import { fetchApi } from "rc/utils/fetchApi";
import { startTransition, useActionState } from "react";

interface BasicDetailsFormProps {
  defaultValues: DefaultValues<DriverSchema> | null;
}

const { TextInput, MaskInput, NumberInput, DateInput } =
  createForm<DriverSchema>();

export default function BasicDetailsForm({
  defaultValues,
}: BasicDetailsFormProps) {
  const router = useRouter();

  const [, submitDriverInfo, isSubmitting] = useActionState(
    async (_: unknown, values: DriverSchema) => {
      await fetchApi<DriverSchema>("/api/drivers", {
        method: "POST",
        body: values,
      });
      console.log("Driver information submitted successfully!");
      router.refresh();
    },
    null
  );

  return (
    <Form
      defaultValues={defaultValues ?? {}}
      schema={basicDriverSchema}
      onSubmit={(values) => {
        startTransition(() => {
          submitDriverInfo(values);
        });
      }}
    >
      <Stack spacing={2} padding={3}>
        <Typography variant="h6">Driver Information</Typography>

        <Stack spacing={1} direction="row">
          <TextInput id="firstName" label="First Name" />
          <TextInput id="lastName" label="Last Name" />
        </Stack>
        <Stack spacing={1} direction="row">
          <TextInput id="email" label="Email Address" />
          <MaskInput
            id="phoneNumber"
            label="Phone Number"
            placeholder="(+54) 11 1234-6789"
            mask="(+##) ## ####-####"
          />
        </Stack>
        <Stack spacing={1} direction="row">
          <TextInput id="licenseNumber" label="License Number" />
          <DateInput id="bornDate" label="Age" />
        </Stack>
        <NumberInput id="experienceYears" label="Years of Experience" />

        <Box alignSelf="self-end">
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Box>
      </Stack>
    </Form>
  );
}
