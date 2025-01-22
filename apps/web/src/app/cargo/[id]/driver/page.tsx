import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Grid2,
} from "@mui/material";
import { Cargo } from "@prisma/client";
import Header from "rc/components/shared/Layout/Header";
import { DriverWithUser } from "rc/types/driver";
import { fetchApi } from "rc/utils/fetchApi";
import StatusAlert from "../../components/shared/StatusAlert";
import { currencyFormatter, numberFormatter } from "rc/utils/number.utils";
import DriverMap from "rc/components/shared/DriverMap";
import { dateFormatter } from "rc/utils/date.utils";

interface CargoDriverPageProps {
  params: Promise<{ id: string }>;
}

export default async function CargoDriverPage({
  params,
}: CargoDriverPageProps) {
  const { id } = await params;
  const cargo = await fetchApi<Cargo>(`api/cargos/${id}`);
  const driver = await fetchApi<DriverWithUser>(
    `api/drivers/${cargo.assignedToId}`
  );

  return (
    <Box>
      <Header title="Driver & Cargo Details" buttons={[]} />
      <Container sx={{ mt: 3 }}>
        <Grid2 container spacing={3}>
          {/* Driver Details Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Driver Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>
                <strong>Name:</strong> {driver.user.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {driver.user.email}
              </Typography>
              <Typography>
                <strong>License Number:</strong> {driver.licenseNumber}
              </Typography>
              <Typography>
                <strong>Vehicle Details:</strong>{" "}
                {driver.vehicleDetails || "N/A"}
              </Typography>
              <Typography>
                <strong>Certifications:</strong>{" "}
                {driver.certifications?.join(", ") || "N/A"}
              </Typography>
              <Typography>
                <strong>Last Known Location:</strong>{" "}
                {driver.lastKnownLat && driver.lastKnownLng
                  ? `${driver.lastKnownLat}, ${driver.lastKnownLng}`
                  : "N/A"}
              </Typography>
              <Typography>
                <strong>Last Known Location Time:</strong>{" "}
                {driver.lastLocationTime
                  ? dateFormatter.format(new Date(driver.lastLocationTime))
                  : "N/A"}
              </Typography>
            </Paper>
          </Grid2>

          {/* Driver Map Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Driver Location
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box alignSelf="center">
                <DriverMap
                  position={{
                    lat: driver.lastKnownLat,
                    lng: driver.lastKnownLng,
                  }}
                  width={400}
                  height={300}
                />
              </Box>
            </Paper>
          </Grid2>

          {/* Cargo Details Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Cargo Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>
                <strong>Title:</strong> {cargo.title}
              </Typography>
              <Typography>
                <strong>Origin:</strong> {cargo.origin}
              </Typography>
              <Typography>
                <strong>Destination:</strong> {cargo.destination}
              </Typography>
              <Typography>
                <strong>Weight:</strong> {numberFormatter.format(cargo.weight)}{" "}
                kg
              </Typography>
              <Typography>
                <strong>Reward:</strong>{" "}
                {currencyFormatter.format(cargo.reward)}
              </Typography>
              <Typography>
                <strong>Delivery Date:</strong>{" "}
                {new Date(cargo.deliveryDateTime).toLocaleString()}
              </Typography>
            </Paper>
          </Grid2>

          {/* Cargo Status Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              sx={{ p: 3, textAlign: "center", height: "100%" }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Cargo Status
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <StatusAlert status={cargo.status} />
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
