// pages/cargo/index.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid2,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Header from "rc/components/shared/Header";
import Footer from "rc/components/shared/Footer";

export default function CargoList() {
  const { data: session } = useSession();
  // const router = useRouter();
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    distance: "",
    size: "",
    reward: "",
    urgency: "",
  });

  useEffect(() => {
    const fetchCargos = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/cargos");
        const data = await response.json();
        setCargos(data);
      } catch (error) {
        console.error("Error fetching cargos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCargos();
  }, []);

  const handleSelectCargo = async (cargoId) => {
    const updatedCargo = await fetch(`/api/cargos/${cargoId}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "IN_TRANSIT",
        assignedToId: session?.user?.id,
      }),
    });
    const updatedData = await updatedCargo.json();
    setCargos((prev) =>
      prev.map((cargo) =>
        cargo.id === updatedData.id ? { ...cargo, status: "IN_TRANSIT" } : cargo
      )
    );
    // router.push(`/cargo/${cargoId}`); // Redirect to the cargo details page
  };

  const handleClearFilters = () => {
    setFilter({
      distance: "",
      size: "",
      reward: "",
      urgency: "",
    });
  };

  return (
    <Box>
      <Header
        title="Cargo List"
        buttons={[{ title: "Dashboard", to: "/driver" }]}
      />
      <Container sx={{ marginTop: 4 }}>
        {/* Add New Cargo Button */}
        <Box
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Available Cargos</Typography>
          <Button variant="contained" color="primary" href="/cargo/create">
            Add New Cargo
          </Button>
        </Box>
        {/* Filter Section */}
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ padding: 2, boxShadow: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Distance</InputLabel>
                <Select
                  value={filter.distance}
                  onChange={(e) =>
                    setFilter({ ...filter, distance: e.target.value })
                  }
                  label="Distance"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="short">Short Distance</MenuItem>
                  <MenuItem value="long">Long Distance</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={filter.size}
                  onChange={(e) =>
                    setFilter({ ...filter, size: e.target.value })
                  }
                  label="Size"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="SMALL">Small</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="LARGE">Large</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Urgency</InputLabel>
                <Select
                  value={filter.urgency}
                  onChange={(e) =>
                    setFilter({ ...filter, urgency: e.target.value })
                  }
                  label="Urgency"
                >
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

          {/* Cargo List */}
          <Grid2 size={{ xs: 12, sm: 6, md: 9 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Divider sx={{ marginBottom: 4 }} />
                <Grid2 container spacing={3}>
                  {cargos
                    .filter(
                      (cargo) =>
                        (filter.distance
                          ? cargo.distance === filter.distance
                          : true) &&
                        (filter.size ? cargo.size === filter.size : true) &&
                        (filter.reward
                          ? cargo.reward === filter.reward
                          : true) &&
                        (filter.urgency
                          ? cargo.urgency === filter.urgency
                          : true)
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
                          <Typography variant="body1">
                            Size: {cargo.size}
                          </Typography>
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
                            onClick={() => handleSelectCargo(cargo.id)}
                            disabled={cargo.status !== "AVAILABLE"}
                          >
                            Pick This Cargo
                          </Button>
                        </Paper>
                      </Grid2>
                    ))}
                </Grid2>
              </>
            )}
          </Grid2>
        </Grid2>
      </Container>
      <Footer />
    </Box>
  );
}
