"use client";
import { Box, Button, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createForm, Form } from "@ui";
import { cargoSchema, CargoSchema } from "@utils";
import { useActionState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const { TextInput, NumberInput, Dropdown, DateTimeInput } = createForm();

export function CargoForm() {
  const [, createCargo] = useActionState(
    (prev: unknown, formData: CargoSchema) => {
      console.log(formData);
    },
    null
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Form onSubmit={createCargo} schema={cargoSchema}>
        <Stack spacing={2}>
          <Stack spacing={1} direction="row">
            <TextInput id="title" label="Title" />
            <TextInput id="company" label="Company" />
          </Stack>
          <Stack spacing={1} direction="row">
            <TextInput id="origin" label="Origin" />
            <NumberInput id="originLat" label="Origin Lat" />
            <NumberInput id="originLng" label="Origin Lng" />
          </Stack>
          <Stack spacing={1} direction="row">
            <TextInput id="destination" label="Destination" />
            <NumberInput id="destinationLat" label="Destination Lat" />
            <NumberInput id="destinationLng" label="Destination Lng" />
          </Stack>
          <Stack spacing={1} direction="row">
            <NumberInput id="weight" label="Weight" />
            <NumberInput id="reward" label="Reward" prefix="$" />
          </Stack>
          <Stack spacing={1} direction="row">
            <Dropdown
              id="size"
              options={[{ id: "SMALL" }, { id: "MEDIUM" }, { id: "LARGE" }]}
              label="Size"
            />
            <Dropdown
              id="urgency"
              options={[{ id: "LOW" }, { id: "MEDIUM" }, { id: "HIGH" }]}
              label="Urgency"
            />
          </Stack>

          <DateTimeInput id="deliverBefore" />

          <Box alignSelf="self-end">
            <Button type="submit">Submit</Button>
          </Box>
        </Stack>
      </Form>
    </LocalizationProvider>
  );
}
