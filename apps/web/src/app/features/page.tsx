import { Box, Container, Grid2, Typography } from "@mui/material";
import FullBody from "rc/components/shared/FullBody";
import FullPage from "rc/components/shared/FullPage";
import { fetchApi } from "rc/utils/fetchApi";
import { Feature } from "../api/features/route";

export default async function FeaturesPage() {
  const features = await fetchApi<Feature[]>("api/features");

  return (
    <FullPage>
      <FullBody>
        <Container>
          <Typography variant="h3" align="center" sx={{ mb: 4 }}>
            Features
          </Typography>
          <Grid2 container spacing={4}>
            {features.map((feature) => (
              <Grid2 key={feature.title} size={{ md: 4, xs: 12 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    padding: 3,
                    backgroundColor: "white",
                    boxShadow: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">{feature.description}</Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </FullBody>
    </FullPage>
  );
}
