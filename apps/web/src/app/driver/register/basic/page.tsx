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
import BasicDetailsForm from "../../components/BasicDetailsForm";
import { getDriverFromServerSession } from "rc/utils/api.utils";

export default async function BasicPage() {
  const { driver, user } = await getDriverFromServerSession();

  return (
    <FullPage>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 3 }}>
          Driver Registration - Basic Information
        </Typography>
        <Stack direction="row" justifyContent="center" sx={{ mb: 4 }}>
          <RegisterStepper activeStep={0} />
        </Stack>
        {/* Basic Information Form */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Provide your basic details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <BasicDetailsForm defaultValues={{ ...(driver || {}), ...user }} />
        </Paper>
        <Stack direction="row" justifyContent="flex-end">
          {/* <Button href="driver" variant="outlined" color="primary">
            Back
          </Button> */}
          <Button href="driver" variant="contained" color="primary">
            Continue
          </Button>
        </Stack>
      </Container>
    </FullPage>
  );
}
