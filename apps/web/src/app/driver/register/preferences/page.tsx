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
import PreferencesForm from "../../components/PreferencesForm";

export default function PreferencesPage() {
  return (
    <FullPage>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 3 }}>
          Driver Registration - Preferences
        </Typography>
        <Stack direction="row" justifyContent="center" sx={{ mb: 4 }}>
          <RegisterStepper activeStep={2} />
        </Stack>
        {/* Preferences Form */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Let us know your preferences
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <PreferencesForm />
        </Paper>
        <Stack direction="row" justifyContent="space-between">
          <Button href="driver" variant="outlined" color="primary">
            Back
          </Button>
          <Button
            href="additional_information"
            variant="contained"
            color="primary"
          >
            Continue
          </Button>
        </Stack>
      </Container>
    </FullPage>
  );
}
