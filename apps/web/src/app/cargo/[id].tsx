// pages/cargo/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { indigo } from "@mui/material/colors";
import Header from "rc/components/shared/Header";
import { Cargo } from "@prisma/client";

export default function CargoPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [cargo, setCargo] = useState<Cargo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCargo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/cargos/${id}`);
        const data = await response.json();
        setCargo(data);
      } catch (error) {
        console.error("Error fetching cargo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCargo();
  }, [id]);

  const handleAssignCargo = async () => {
    if (!session?.user?.id || !cargo) return;

    const updatedCargo = await fetch(`/api/cargos/${cargo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "IN_TRANSIT",
        assignedToId: session.user.id,
      }),
    });

    if (updatedCargo.ok) {
      setCargo((prev) => ({
        ...prev,
        status: "IN_TRANSIT",
        assignedToId: session.user.id,
      }));
    }
  };

  const handleCancelCargo = async () => {
    if (!cargo) return;

    const updatedCargo = await fetch(`/api/cargos/${cargo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "CANCELLED",
      }),
    });

    if (updatedCargo.ok) {
      setCargo((prev) => ({ ...prev, status: "CANCELLED" }));
    }
  };

  return (
    <Box>
      <Header
        title="Cargo Details"
        buttons={[{ title: "Dashboard", to: "/driver" }]}
      />
      <Container sx={{ marginTop: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : cargo ? (
          <Grid2 container spacing={4} size={12}>
            {/* Cargo Details */}
            <Grid2 size={{ md: 12, xs: 12 }}>
              <Paper sx={{ padding: 3, boxShadow: 2 }}>
                <Typography variant="h4" gutterBottom>
                  {cargo.title}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="h6">Origin</Typography>
                <Typography variant="body1">{cargo.origin}</Typography>
                <Typography variant="body1">
                  Coordinates: ({cargo.originLat}, {cargo.originLng})
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Destination
                </Typography>
                <Typography variant="body1">{cargo.destination}</Typography>
                <Typography variant="body1">
                  Coordinates: ({cargo.destinationLat}, {cargo.destinationLng})
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Cargo Size: {cargo.size}
                </Typography>
                <Typography variant="h6">Reward: ${cargo.reward}</Typography>
                <Typography variant="h6">Urgency: {cargo.urgency}</Typography>
                <Typography variant="h6">Status: {cargo.status}</Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Assigned To:{" "}
                  {cargo.assignedTo ? cargo.assignedTo.name : "Unassigned"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={handleAssignCargo}
                  disabled={cargo.status !== "AVAILABLE" || cargo.assignedToId}
                >
                  Assign to Me
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginTop: 2, marginLeft: 2 }}
                  onClick={handleCancelCargo}
                  disabled={cargo.status === "CANCELLED"}
                >
                  Cancel Cargo
                </Button>
              </Paper>
            </Grid2>
          </Grid2>
        ) : (
          <Typography variant="h6" color="error">
            Cargo not found
          </Typography>
        )}
      </Container>
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
