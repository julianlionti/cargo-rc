import { Box, Typography } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Safe to use here as this is a server component
  return (
    <Box
      sx={{
        backgroundColor: "#3f51b5",
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
        &copy; {currentYear} Cargo RC. All rights reserved.
      </Typography>
    </Box>
  );
}
