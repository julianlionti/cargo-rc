// apps/web/pages/index.tsx

import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Header from "rc/components/shared/Header";
import { appConfig } from "@config";
import FullPage from "rc/components/shared/FullPage";
import FullBody from "rc/components/shared/FullBody";
import { fetchApi } from "rc/utils/fetchApi";
import { Feature } from "./api/features/route";

export default async function Home() {
  const t = await getTranslations();
  const features = await fetchApi<Feature[]>("api/features");

  return (
    <FullPage>
      {/* Header */}
      <Header
        title={appConfig.appName}
        buttons={[
          { title: "About Us", to: "/about" },
          { title: "Features", to: "/features" },
          { title: "Pricing", to: "/pricing" },
          { title: "FAQ", to: "/faq" },
          { title: "Contact Us", to: "/contact" },
        ]}
      />

      {/* Hero Section */}
      <FullBody>
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
      </FullBody>

      {/* Features Section */}
      <FullBody
      // sx={{padding: "80px 0",backgroundColor: "#f4f4f4",}}
      >
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
      </FullBody>

      {/* CTA Section */}
      <FullBody bgColor="primary.main">
        <Container sx={{ flex: 1, display: "flex" }}>
          <Grid2
            size={12}
            container
            direction="column"
            alignItems="center"
            flex={1}
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
      </FullBody>
    </FullPage>
  );
}
