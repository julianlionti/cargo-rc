import { Button, Container, Typography, Box } from "@mui/material";
import Header from "rc/components/shared/Header";
import Footer from "rc/components/shared/Footer";
import CargoList from "./components/CargoList";
import { Cargo } from "@prisma/client";
import { fetchApi } from "rc/utils/fetchApi";

export default async function CargoPage() {
  const cargoData = await fetchApi<Cargo[]>("api/cargos");

  return (
    <Box>
      <Header
        title="Cargo List"
        buttons={[{ title: "Dashboard", to: "/driver" }]}
      />
      <Container sx={{ marginTop: 4, marginBottom: 10 }}>
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
        <CargoList data={cargoData} />
      </Container>
      <Footer />
    </Box>
  );
}
