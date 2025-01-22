// apps/web/pages/index.tsx

import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { fetchApi } from "rc/utils/fetchApi";
import { Feature } from "./api/features/route";
import FullPage from "rc/components/shared/Layout/FullPage";

export default async function Home() {
  const t = await getTranslations();
  const features = await fetchApi<Feature[]>("api/features");

  return (
    <FullPage>
      {/* Hero Section */}
      <Box height="100%">
        <Box
          sx={{
            backgroundImage: 'url("/hero-truck.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "100px 0",
            color: "white",
            flex: 1,
            position: "relative", // Needed to position the overlay
            overflow: "hidden", // Ensures no child elements extend beyond this box
            display: "flex",
            height: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
              zIndex: 1,
            }}
          />
          <Box
            position="relative"
            top={0}
            right={0}
            bottom={0}
            left={0}
            zIndex={2}
            flex={1}
            display="flex"
          >
            <Container sx={{ display: "flex" }}>
              <Grid2
                size={12}
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                flex={1}
                mb={`${56}px`}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 700, mb: 2 }}
                  align="center"
                >
                  {t("hero.title")}
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }} align="center">
                  {t("hero.subtitle")}
                </Typography>
                <Button variant="contained" color="secondary">
                  {t("hero.cta")}
                </Button>
              </Grid2>
            </Container>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box height="100%">
        <Container
          sx={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          <Grid2 container spacing={4}>
            <Grid2 size={12}>
              <Typography variant="h3" align="center" sx={{ mb: 4 }}>
                {t("features.title")}
              </Typography>
            </Grid2>
            {features.map((feature) => (
              <Grid2 key={feature.title} size={{ md: 4, xs: 12 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    padding: 2,
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
      </Box>

      {/* CTA Section */}
      <Box height="100%" bgcolor="primary.main">
        <Container sx={{ height: "100%" }}>
          <Grid2
            height="100%"
            size={12}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            color="common.white"
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              {t("cta.title")}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }} align="center">
              {t("cta.subtitle")}
            </Typography>
            <Button variant="contained" color="secondary">
              {t("cta.cta")}
            </Button>
          </Grid2>
        </Container>
      </Box>
    </FullPage>
  );
}
