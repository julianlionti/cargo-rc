"use client";

import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Cargo } from "@prisma/client";
import { useState } from "react";

interface Filter {
  distance?: string;
  size?: string;
  reward?: string;
  urgency?: string;
}

interface CargoListProps {
  data: Cargo[];
}

export default function CargoList({ data }: CargoListProps) {
  const [filter, setFilter] = useState<Filter>({
    distance: "",
    size: "",
    reward: "",
    urgency: "",
  });

  const handleClearFilters = () => {
    setFilter({
      distance: "",
      size: "",
      reward: "",
      urgency: "",
    });
  };

  return (
    <>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ padding: 2, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Distance</InputLabel>
              <Select label="Distance">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="short">Short Distance</MenuItem>
                <MenuItem value="long">Long Distance</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Size</InputLabel>
              <Select label="Size">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="SMALL">Small</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="LARGE">Large</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Urgency</InputLabel>
              <Select label="Urgency">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 9 }}>
          <Divider sx={{ marginBottom: 4 }} />
          <Grid2 container spacing={3}>
            {data
              .filter(
                (cargo) =>
                  (filter.distance
                    ? cargo.distance === filter.distance
                    : true) &&
                  (filter.size ? cargo.size === filter.size : true) &&
                  (filter.reward ? cargo.reward === filter.reward : true) &&
                  (filter.urgency ? cargo.urgency === filter.urgency : true)
              )
              .map((cargo) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={cargo.id}>
                  <Paper sx={{ padding: 3, boxShadow: 2 }}>
                    <Typography variant="h6">{cargo.title}</Typography>
                    <Typography variant="body1">
                      Origin: {cargo.origin}
                    </Typography>
                    <Typography variant="body1">
                      Destination: {cargo.destination}
                    </Typography>
                    <Typography variant="body1">Size: {cargo.size}</Typography>
                    <Typography variant="body1">
                      Reward: ${cargo.reward}
                    </Typography>
                    <Typography variant="body1">
                      Urgency: {cargo.urgency}
                    </Typography>
                    <Typography variant="body1">
                      Status: {cargo.status}
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
