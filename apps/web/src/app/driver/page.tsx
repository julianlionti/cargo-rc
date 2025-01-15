"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
  Grid2,
  Stack,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Header from "rc/components/shared/Header"; // Assuming you have a similar header component
import { Cargo, Driver } from "@prisma/client";

export default function DriverPage() {
  const { status } = useSession();
  const [drivers, setDrivers] = useState<
    (Driver & { assignedCargos: Cargo[] })[]
  >([]);
  const [activeTab, setActiveTab] = useState("driverList");
  const [loading, setLoading] = useState(true);

  // Fetch driver data when the user is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/drivers")
        .then((response) => response.json())
        .then((data) => {
          setDrivers(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching drivers:", error);
          setLoading(false);
        });
    }
  }, [status]);

  // Show loading state or redirect if unauthenticated
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6">Loading driver data...</Typography>
      </Box>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6">
          You need to be logged in to access this page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Header
        title="Driver Dashboard"
        buttons={[
          { title: "Driver List", to: "/driver" },
          { title: "Settings", to: "/driver/settings" },
        ]}
      />
      {/* Main Content */}
      <Container sx={{ marginTop: 4 }}>
        <Grid2 container spacing={4} size={12}>
          {/* Sidebar */}
          <Grid2 size={{ md: 3, xs: 12 }}>
            <Paper sx={{ padding: 2, boxShadow: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Navigation
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBottom: 2 }}
                onClick={() => setActiveTab("driverList")}
              >
                Driver List
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBottom: 2 }}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </Button>
            </Paper>
          </Grid2>

          {/* Main Content Area */}
          <Grid2 size={{ md: 9, xs: 12 }}>
            {activeTab === "driverList" && (
              <Box>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  Drivers
                </Typography>
                <Grid2 container spacing={4}>
                  {drivers.map((driver) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={driver.id}>
                      <Paper sx={{ padding: 2, boxShadow: 2 }}>
                        <Typography variant="h6">{driver.name}</Typography>
                        <Typography color="textSecondary">
                          {driver.email}
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="body2">
                          <strong>Assigned Cargos:</strong>
                        </Typography>
                        <ul>
                          {driver.assignedCargos?.length ? (
                            driver.assignedCargos.map((cargo) => (
                              <li key={cargo.id}>
                                <Typography>{cargo.title}</Typography>
                              </li>
                            ))
                          ) : (
                            <Typography>No cargos assigned</Typography>
                          )}
                        </ul>
                      </Paper>
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
            )}

            {activeTab === "settings" && (
              <Box>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  Settings
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Update your preferences or profile settings.
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                  >
                    Change Profile Info
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                  >
                    Update Notification Preferences
                  </Button>
                </Stack>
              </Box>
            )}
          </Grid2>
        </Grid2>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "indigo",
          padding: "20px 0",
          color: "white",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          Driver Dashboard - All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}
