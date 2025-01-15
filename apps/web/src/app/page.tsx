// apps/web/pages/index.tsx

import { Box, Container, Grid2, Typography, Button } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { getTranslations } from "next-intl/server";
import Header from "rc/components/shared/Header";
import { appConfig } from "@config";
import Footer from "rc/components/shared/Footer";

export default async function Home() {
  const t = await getTranslations();

  const features = [
    {
      title: t("features.delivery.title"),
      description: t("features.delivery.description"),
    },
    {
      title: t("features.tracking.title"),
      description: t("features.tracking.description"),
    },
    {
      title: t("features.support.title"),
      description: t("features.support.description"),
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header
        title={appConfig.appName}
        buttons={[
          { title: "Contacts", to: "contacts" },
          { title: "Features", to: "features" },
          { title: "Home", to: "home" },
        ]}
      />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("/hero-truck.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0",
          color: "white",
          position: "relative", // Needed to position the overlay
          overflow: "hidden", // Ensures no child elements extend beyond this box
        }}
      >
        {/* Overlay */}
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
        {/* Content */}
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Grid2 container direction="column" alignItems="center">
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              {t("hero.title")}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              {t("hero.subtitle")}
            </Typography>
            <Button variant="contained" color="secondary">
              {t("hero.cta")}
            </Button>
          </Grid2>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: "80px 0", backgroundColor: "#f4f4f4" }}>
        <Container>
          <Typography variant="h3" align="center" sx={{ mb: 4 }}>
            {t("features.title")}
          </Typography>
          <Grid2 container spacing={4}>
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
      <Box
        sx={{ backgroundColor: indigo[500], color: "white", padding: "50px 0" }}
      >
        <Container>
          <Grid2 container direction="column" alignItems="center">
            <Typography variant="h4" sx={{ mb: 2 }}>
              {t("cta.title")}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              {t("cta.subtitle")}
            </Typography>
            <Button variant="contained" color="secondary">
              {t("cta.cta")}
            </Button>
          </Grid2>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
