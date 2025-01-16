"use client";

// pages/cargo/create.tsx
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";
import Header from "rc/components/shared/Header";

export default function CreateCargo() {
  const [cargoDetails, setCargoDetails] = useState({
    title: "",
    origin: "",
    destination: "",
    weight: 0,
    reward: 0,
    size: "SMALL",
    urgency: "LOW",
  });

  const handleChange = (e) => {
    setCargoDetails({
      ...cargoDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cargos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cargoDetails),
      });

      if (response.ok) {
        // router.push("/cargo"); // Redirect to the Cargo List page
      } else {
        console.error("Failed to create cargo");
      }
    } catch (error) {
      console.error("Error creating cargo:", error);
    }
  };

  return (
    <>
      <Header title="" buttons={[]} />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Cargo
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12 }}>
            <Paper sx={{ padding: 3 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Cargo Title"
                  name="title"
                  value={cargoDetails.title}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Origin"
                  name="origin"
                  value={cargoDetails.origin}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Destination"
                  name="destination"
                  value={cargoDetails.destination}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Weight"
                  name="weight"
                  value={cargoDetails.weight}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Reward"
                  name="reward"
                  value={cargoDetails.reward}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                {/* You can add select fields for size, urgency here */}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginTop: 2 }}
                >
                  Create Cargo
                </Button>
              </form>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
