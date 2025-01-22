import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { fetchApi } from "rc/utils/fetchApi";
import { PricingPlans } from "../api/pricing/route";
import FullPage from "rc/components/shared/Layout/FullPage";

export default async function Pricing() {
  const pricingPlans = await fetchApi<PricingPlans[]>("api/pricing");

  return (
    <FullPage>
      <Container>
        <Typography variant="h1" align="center" sx={{ mt: 2, mb: 4 }}>
          Pricing
        </Typography>
        <Grid2 container spacing={4}>
          {pricingPlans.map((plan) => (
            <Grid2 key={plan.name} size={{ md: 4, xs: 12 }}>
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
                  {plan.name}
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {plan.price}
                </Typography>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Typography variant="body1">{feature}</Typography>
                    </li>
                  ))}
                </ul>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Choose {plan.name}
                </Button>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </FullPage>
  );
}
