import { Container, Grid2, Typography } from "@mui/material";
import { Company } from "@prisma/client";
import Header from "rc/components/shared/Header";
import { fetchApi } from "rc/utils/fetchApi";
import { CargoForm } from "../../components/CargoForm";
import { CargoSchema } from "@utils/dist";

interface EditCargoProps {
  params: Promise<{ id: string }>;
}

export default async function EditCargoPage(props: EditCargoProps) {
  const { params } = props;
  const { id } = await params;
  const cargoData = await fetchApi<CargoSchema>(`api/cargos/${id}`);
  const companiesData = await fetchApi<Company[]>(`api/companies`);

  return (
    <>
      <Header title="" buttons={[]} />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {`Edit Cargo ${cargoData.title ? `- ${cargoData.title}` : ""}`}
        </Typography>
        <Grid2 container>
          <Grid2 size={{ xs: 12 }}>
            <CargoForm defaultValues={cargoData} companies={companiesData} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
