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
import { indigo } from "@mui/material/colors";
import Header from "rc/components/shared/Header";
import { useState } from "react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Box>
      <Header
        title="Cargo RC - Admin"
        buttons={[
          { title: "Dashboard", to: "admin/dashboard" },
          { title: "Users", to: "admin/users" },
          { title: "Settings", to: "admin/settings" },
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
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBottom: 2 }}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBottom: 2 }}
                onClick={() => setActiveTab("users")}
              >
                Users
              </Button>
            </Paper>
          </Grid2>

          {/* Main Content Area */}
          <Grid2 size={{ md: 9, xs: 12 }}>
            {activeTab === "dashboard" && (
              <Box>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  Dashboard
                </Typography>
                <Grid2 container spacing={4}>
                  <Grid2 size={{ md: 4, xs: 12 }}>
                    <Paper sx={{ padding: 3, boxShadow: 2 }}>
                      <Typography variant="h6">Total Shipments</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        1,200
                      </Typography>
                    </Paper>
                  </Grid2>
                  <Grid2 size={{ md: 4, xs: 12 }}>
                    <Paper sx={{ padding: 3, boxShadow: 2 }}>
                      <Typography variant="h6">Ongoing Shipments</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        320
                      </Typography>
                    </Paper>
                  </Grid2>
                  <Grid2 size={{ md: 4, xs: 12 }}>
                    <Paper sx={{ padding: 3, boxShadow: 2 }}>
                      <Typography variant="h6">Delivered Shipments</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        900
                      </Typography>
                    </Paper>
                  </Grid2>
                </Grid2>
              </Box>
            )}

            {activeTab === "settings" && (
              <Box>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  Settings
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Update your settings here.
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                  >
                    Change Company Info
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

            {activeTab === "users" && (
              <Box>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  User Management
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Manage users, roles, and permissions.
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                  >
                    Add New User
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                  >
                    View Users
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
