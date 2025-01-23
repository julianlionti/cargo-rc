import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import FullPage from "rc/components/shared/Layout/FullPage";
import RegisterStepper from "../../components/RegisterStepper";
import DriverDetailsForm from "../../components/DriverDetailsForm";

export default function DriverPage() {
  return (
    <FullPage>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 3 }}>
          Driver Registration - Personal Information
        </Typography>
        <Stack direction="row" justifyContent="center" sx={{ mb: 4 }}>
          <RegisterStepper activeStep={1} />
        </Stack>
        {/* Driver Form */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Fill in your personal details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <DriverDetailsForm />
        </Paper>
        <Stack direction="row" justifyContent="space-between">
          <Button href="basic" variant="outlined" color="primary">
            Back
          </Button>
          <Button href="preferences" variant="contained" color="primary">
            Continue
          </Button>
        </Stack>
      </Container>
    </FullPage>
  );
}
