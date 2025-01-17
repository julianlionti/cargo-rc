"use client";
import { Button, Grid2 } from "@mui/material";
import { Form, Dropdown, NumberInput, TextInput } from "@ui";
import { cargoSchema, CargoSchema } from "@utils";
import { useActionState } from "react";

const CargoTextInput = TextInput<CargoSchema>;
const CargoNumberInput = NumberInput<CargoSchema>;
const CargoDropdown = Dropdown<CargoSchema>;

export function CargoForm() {
  const [, createCargo] = useActionState(
    (prev: unknown, formData: CargoSchema) => {
      console.log(formData);
    },
    null
  );

  return (
    <Form onSubmit={createCargo} schema={cargoSchema}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoTextInput id="title" label="Title" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoTextInput id="origin" label="Origin" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoTextInput id="company" label="Company" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoNumberInput id="originLat" label="Origin lat" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoNumberInput id="originLng" label="Origin Lng" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoTextInput id="destination" label="Destination" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoNumberInput id="destinationLat" label="Destination Lat" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoNumberInput id="destinationLng" label="Destination Lng" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoNumberInput id="weight" label="Weight" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoNumberInput id="reward" label="Reward" prefix="$" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoDropdown
            id="size"
            options={[{ id: "SMALL" }, { id: "MEDIUM" }, { id: "LARGE" }]}
            label="Size"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CargoDropdown
            id="urgency"
            options={[{ id: "LOW" }, { id: "MEDIUM" }, { id: "HIGH" }]}
            label="Urgency"
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </Grid2>
      </Grid2>
    </Form>
  );
}
