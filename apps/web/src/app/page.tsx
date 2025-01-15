// apps/web/pages/index.tsx
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import Header from "rc/components/shared/Header";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header
        title="Cargo RC"
        buttons={[
          { title: "Contacts", to: "contacts" },
          { title: "Features", to: "features" },
          { title: "Home", to: "home" },
        ]}
      />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("/path/to/hero-image.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0",
          color: "white",
        }}
      >
        <Container>
          <Grid2 container direction="column" alignItems="center">
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Reliable Cargo Transportation for Your Business
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Efficient, fast, and secure delivery at your fingertips.
            </Typography>
            <Button variant="contained" color="secondary">
              Get Started
            </Button>
          </Grid2>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: "80px 0", backgroundColor: "#f4f4f4" }}>
        <Container>
          <Typography variant="h3" align="center" sx={{ mb: 4 }}>
            Key Features
          </Typography>
          <Grid2 container spacing={4}>
            <Grid2 size={{ md: 4, xs: 12 }}>
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
                  Fast Delivery
                </Typography>
                <Typography variant="body1">
                  Get your cargo delivered in the shortest time possible with
                  our optimized routes.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 4, xs: 12 }}>
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
                  Secure Tracking
                </Typography>
                <Typography variant="body1">
                  Track your cargo in real-time and stay updated on its
                  location.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 4, xs: 12 }}>
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
                  24/7 Support
                </Typography>
                <Typography variant="body1">
                  Our team is available around the clock to assist with any
                  issues or inquiries.
                </Typography>
              </Box>
            </Grid2>
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
              Ready to Ship Your Cargo?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Sign up today and get started with our cargo transportation
              service.
            </Typography>
            <Button variant="contained" color="secondary">
              Sign Up Now
            </Button>
          </Grid2>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: indigo[600],
          color: "white",
          padding: "20px 0",
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Cargo RC. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
