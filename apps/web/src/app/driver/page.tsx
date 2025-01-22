"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid2,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import Header from "rc/components/shared/Layout/Header";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Cargo } from "@prisma/client";

export default function DriverDashboard() {
  const { data: session } = useSession();
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const [filter, setFilter] = useState({
    distance: "",
    size: "",
    reward: "",
    urgency: "",
  });
  const [enums, setEnums] = useState({
    CargoSize: [],
    CargoUrgency: [],
    CargoReward: [],
  });

  useEffect(() => {
    // Fetch cargos from the backend
    const fetchCargos = async () => {
      try {
        const response = await fetch("/api/cargos");
        const data = await response.json();
        setCargos(data);
      } catch (error) {
        console.error("Error fetching cargos:", error);
      }
    };

    // Fetch enums from the backend
    const fetchEnums = async () => {
      try {
        const response = await fetch("/api/cargos/enums");
        const data = await response.json();
        setEnums(data);
      } catch (error) {
        console.error("Error fetching enums:", error);
      }
    };

    fetchCargos();
    fetchEnums();
  }, []);

  const handleSelectCargo = async (cargoId) => {
    const updatedCargo = await fetch(`/api/cargos/${cargoId}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "In Transit",
        assignedToId: session.user.id,
      }),
    });
    setSelectedCargo(updatedCargo);
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
        title="Driver Dashboard"
        buttons={[
          { title: "Dashboard", to: "/driver" },
          { title: "Profile", to: "/driver/profile" },
        ]}
      />
      {/* Main Content */}
      <Container sx={{ marginTop: 4 }}>
        <Grid2 container spacing={4} size={12}>
          {/* Sidebar */}
          <Grid2 size={{ md: 3, xs: 12 }}>
            <Paper sx={{ padding: 2, boxShadow: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Filter Cargos
              </Typography>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Size/Weight</InputLabel>
                <Select
                  value={filter.size}
                  onChange={(e) =>
                    setFilter({ ...filter, size: e.target.value })
                  }
                  label="Size/Weight"
                >
                  {enums.CargoSize.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
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
                  {enums.CargoUrgency.map((urgency) => (
                    <MenuItem key={urgency} value={urgency}>
                      {urgency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Reward</InputLabel>
                <Select
                  value={filter.reward}
                  onChange={(e) =>
                    setFilter({ ...filter, reward: e.target.value })
                  }
                  label="Reward"
                >
                  {enums.CargoReward.map((reward) => (
                    <MenuItem key={reward} value={reward}>
                      {reward}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Clear Filters Button */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClearFilters}
                sx={{ marginTop: 2 }}
                fullWidth
              >
                Clear Filters
              </Button>
            </Paper>
          </Grid2>

          {/* Main Content Area */}
          <Grid2 size={{ md: 9, xs: 12 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Available Cargos
            </Typography>
            <Divider sx={{ marginBottom: 4 }} />
            <Grid2 container spacing={4}>
              {cargos
                .filter(
                  (cargo) =>
                    (filter.size ? cargo.size === filter.size : true) &&
                    (filter.reward ? cargo.reward === filter.reward : true) &&
                    (filter.urgency ? cargo.urgency === filter.urgency : true)
                )
                .map((cargo) => (
                  <Grid2 key={cargo.id} size={{ md: 4, xs: 12 }}>
                    <Paper sx={{ padding: 3, boxShadow: 2 }}>
                      <Typography variant="h6">{cargo.title}</Typography>
                      <Typography variant="body1">
                        Distance: {cargo.distance}
                      </Typography>
                      <Typography variant="body1">
                        Weight: {cargo.size}
                      </Typography>
                      <Typography variant="body1">
                        Reward: {cargo.reward}
                      </Typography>
                      <Typography variant="body1">
                        Urgency: {cargo.urgency}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() => handleSelectCargo(cargo.id)}
                      >
                        Pick this Cargo
                      </Button>
                    </Paper>
                  </Grid2>
                ))}
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
      {/* Footer */}
      <Box
        sx={{
          backgroundColor: indigo[500],
          padding: "20px 0",
          color: "white",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">Cargo RC - All Rights Reserved</Typography>
      </Box>
    </Box>
  );
}
