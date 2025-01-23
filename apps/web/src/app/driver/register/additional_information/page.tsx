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
import AdditionalInformationForm from "../../components/AdditionalInformationForm";

export default function AdditionalInformationPage() {
  return (
    <FullPage>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 3 }}>
          Driver Registration - Additional Information
        </Typography>
        <Stack direction="row" justifyContent="center" sx={{ mb: 4 }}>
          <RegisterStepper activeStep={3} />
        </Stack>
        {/* Additional Information Form */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Provide additional details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <AdditionalInformationForm />
        </Paper>
        <Stack direction="row" justifyContent="space-between">
          <Button href="preferences" variant="outlined" color="primary">
            Back
          </Button>
          <Button href="confirmation" variant="contained" color="primary">
            Continue
          </Button>
        </Stack>
      </Container>
    </FullPage>
  );
}
