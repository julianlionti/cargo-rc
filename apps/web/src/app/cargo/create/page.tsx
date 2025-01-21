import { Container, Typography, Grid2 } from "@mui/material";
import Header from "rc/components/shared/Header";
import { CargoForm } from "../components/CargoForm";
import { fetchApi } from "rc/utils/fetchApi";
import { Company } from "@prisma/client";

export default async function CreateCargo() {
  const companiesData = await fetchApi<Company[]>("api/companies");

  return (
    <>
      <Header title="" buttons={[]} />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Cargo
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12 }}>
            <CargoForm companies={companiesData || []} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
