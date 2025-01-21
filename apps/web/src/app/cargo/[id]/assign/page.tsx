import { Box, Container, Grid2 } from "@mui/material";

import Header from "rc/components/shared/Header";
import { Cargo } from "@prisma/client";
import Footer from "rc/components/shared/Footer";
import { fetchApi } from "rc/utils/fetchApi";
import CargoInformation from "../../components/CargoInformation";

interface AssignCargoPageProps {
  params: Promise<{ id: string }>;
}

export default async function AssignCargoPage(props: AssignCargoPageProps) {
  const { params } = props;
  const { id } = await params;

  
  const cargo = await fetchApi<Cargo>(`/api/cargos/${id}`);

  return (
    <Box>
      <Header
        title="Cargo Details"
        buttons={[{ title: "Dashboard", to: "/driver" }]}
      />
      <Container sx={{ marginTop: 4, marginBottom: 10 }}>
        <Grid2 container spacing={4} size={12}>
          {/* Cargo Details */}
          <Grid2 size={{ md: 12, xs: 12 }}>
            <CargoInformation data={cargo} />
          </Grid2>
        </Grid2>
      </Container>
      <Footer />
    </Box>
  );
}
