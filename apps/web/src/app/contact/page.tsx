import { Box, Button, Container, TextField, Typography } from "@mui/material";
import FullPage from "rc/components/shared/Layout/FullPage";

export default function ContactPage() {
  return (
    <FullPage>
      <Container>
        <Typography variant="h1" align="center" sx={{ mt: 2, mb: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          {`Have questions or need help? Fill out the form below, and we'll get
            back to you as soon as possible.`}
        </Typography>
        <Box
          component="form"
          sx={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField label="Name" variant="outlined" required fullWidth />
          <TextField label="Email" variant="outlined" required fullWidth />
          <TextField
            label="Message"
            variant="outlined"
            required
            fullWidth
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
        </Box>
      </Container>
    </FullPage>
  );
}
