import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  Link,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  Email,
  Facebook,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Safe to use here as this is a server component

  return (
    <AppBar position="fixed" sx={{ bottom: 0, top: "auto", py: 2 }}>
      <Toolbar>
        <Box flex={1}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOn fontSize="small" />
              <Typography variant="body2">
                1234 Cargo Avenue, Suite 100, Logistics City, 56789
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Email fontSize="small" />
              <Link
                href="mailto:support@cargo-rc.com"
                color="inherit"
                underline="hover"
              >
                support@cargo-rc.com
              </Link>
            </Stack>
          </Stack>
        </Box>

        <Stack direction="row" spacing={2}>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <Twitter />
          </IconButton>
          <IconButton
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <LinkedIn />
          </IconButton>
        </Stack>

        <Typography variant="body2" align="right" flex={1}>
          &copy; {currentYear} Cargo RC. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
