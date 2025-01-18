"use client";

import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Cargo, CargoSize, CargoUrgency } from "@prisma/client";
import { createForm, Form, FormRef } from "@ui";
import { CargoSchema } from "@utils/dist";
import { useRef, useState } from "react";

interface Filter
  extends Partial<Pick<CargoSchema, "reward" | "size" | "weight" | "urgency">> {
  distance?: string;
}

const { Dropdown } = createForm<Filter>();

interface CargoListProps {
  data: Cargo[];
}

export default function CargoList({ data }: CargoListProps) {
  const formRef = useRef<FormRef<Filter>>(null);
  const [filters, setFilters] = useState<Filter>({});
  return (
    <>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ padding: 2, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <Form
              ref={formRef}
              onValuesChanged={(values) => {
                setFilters(values);
                return values;
              }}
            >
              <Stack spacing={2}>
                <Dropdown
                  id="distance"
                  label="Distance"
                  options={[
                    { id: "short", title: "Short Distance" },
                    { id: "long", title: "Long Distance" },
                  ]}
                />
                <Dropdown
                  id="size"
                  label="Size"
                  options={Object.keys(CargoSize).map((e) => ({ id: e }))}
                />
                <Dropdown
                  id="urgency"
                  label="Urgency"
                  options={Object.keys(CargoUrgency).map((e) => ({ id: e }))}
                />
                <Button
                  variant="outlined"
                  onClick={() => formRef.current?.methods.reset()}
                >
                  Clear Filters
                </Button>
              </Stack>
            </Form>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 9 }}>
          <Divider sx={{ marginBottom: 4 }} />
          <Grid2 container spacing={3}>
            {data
              .filter(
                (cargo) =>
                  (filters.distance
                    ? (cargo.distanceAprox > 0 &&
                        cargo.distanceAprox < 500000 &&
                        filters.distance === "short") ||
                      (cargo.distanceAprox >= 500000 &&
                        filters.distance === "long")
                    : true) &&
                  (filters.size ? cargo.size === filters.size : true) &&
                  (filters.reward ? cargo.reward === filters.reward : true) &&
                  (filters.urgency ? cargo.urgency === filters.urgency : true)
              )
              .map((cargo) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={cargo.id}>
                  <Paper sx={{ padding: 3, boxShadow: 2, overflow: "hidden" }}>
                    <Typography variant="h6">{cargo.title}</Typography>
                    <Typography>
                      Origin: <b>{cargo.origin}</b>
                    </Typography>
                    <Typography>
                      Destination: <b>{cargo.destination}</b>
                    </Typography>
                    <Typography fontWeight="bold">
                      Distance (Aprox):{" "}
                      <b>{`${cargo.distanceAprox / 1000} Km`}</b>
                    </Typography>
                    <Typography>Size: {cargo.size}</Typography>
                    <Typography>
                      Reward: <b>${cargo.reward}</b>
                    </Typography>
                    <Typography>Urgency: {cargo.urgency}</Typography>
                    <Typography
                      color={
                        cargo.status === "AVAILABLE" ? "success" : undefined
                      }
                    >
                      Status: <b>{cargo.status}</b>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      disabled={cargo.status !== "AVAILABLE"}
                    >
                      Pick This Cargo
                    </Button>
                  </Paper>
                </Grid2>
              ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
