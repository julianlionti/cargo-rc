"use client";

import { Button, Stack, Typography, Box } from "@mui/material";
import { createForm, Form, DefaultValues } from "@ui";
import { driverDetailsSchema, DriverDetailsSchema } from "@utils";
import { useRouter } from "next/navigation";
import { fetchApi } from "rc/utils/fetchApi";
import { startTransition, useActionState } from "react";

interface DriverDetailsFormProps {
  defaultValues: DefaultValues<DriverDetailsSchema> | null;
}

const { TextInput, Dropdown, NumberInput, DateInput, FileUpload } =
  createForm<DriverDetailsSchema>();

export default function DriverDetailsForm({
  defaultValues,
}: DriverDetailsFormProps) {
  const router = useRouter();

  const [, submitDriverDetails, isSubmitting] = useActionState(
    async (_: unknown, values: DriverDetailsSchema) => {
      await fetchApi<DriverDetailsSchema>("/api/driver-details", {
        method: "POST",
        body: values,
      });
      console.log("Driver details submitted successfully!");
      router.refresh();
    },
    null
  );

  return (
    <Form
      defaultValues={defaultValues ?? {}}
      schema={driverDetailsSchema}
      onSubmit={(values) => {
        startTransition(() => {
          submitDriverDetails(values);
        });
      }}
    >
      <Stack spacing={2} padding={3}>
        <Typography variant="h6">Driver Details</Typography>

        {/* Vehicle Information */}
        <Typography variant="subtitle1">Vehicle Information</Typography>
        <Stack spacing={1} direction="row">
          <Dropdown
            id="vehicleType"
            label="Vehicle Type"
            options={[
              { id: "Truck", name: "Truck" },
              { id: "Van", name: "Van" },
              { id: "Car", name: "Car" },
            ]}
          />
          <TextInput
            id="vehicleRegistrationNumber"
            label="Registration Number"
          />
        </Stack>
        <NumberInput id="vehicleCapacity" label="Vehicle Capacity (tons)" />
        <FileUpload id="insuranceDocument" label="Upload Insurance Document" />

        {/* Driver's License Information */}
        <Typography variant="subtitle1">
          {"Driver's License Information"}
        </Typography>
        <Stack spacing={1} direction="row">
          <TextInput id="licenseNumber" label="License Number" />
          <DateInput id="licenseExpiryDate" label="License Expiry Date" />
        </Stack>
        <FileUpload id="licenseImage" label="Upload License Image" />

        <Box alignSelf="self-end">
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Box>
      </Stack>
    </Form>
  );
}
