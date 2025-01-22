import { Container, Typography } from "@mui/material";
import FullBody from "rc/components/shared/FullBody";
import FullPage from "rc/components/shared/FullPage";

export default function AboutPage() {
  return (
    <FullPage>
      <FullBody>
        <Container>
          <Typography variant="h3" align="center" sx={{ mb: 4 }}>
            About Us
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Welcome to Cargo RC, your trusted partner for seamless cargo
            delivery solutions. We are dedicated to connecting cargo companies
            with reliable truck drivers, providing real-time tracking, and
            ensuring on-time deliveries. With years of experience in logistics
            and transportation, we aim to revolutionize the industry by
            leveraging cutting-edge technology and unparalleled customer
            support.
          </Typography>
          <Typography variant="body1" align="center">
            Join us in our mission to make cargo delivery faster, safer, and
            more efficient. Let’s move forward together!
          </Typography>
        </Container>
      </FullBody>
    </FullPage>
  );
}
