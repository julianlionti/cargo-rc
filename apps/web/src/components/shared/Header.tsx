"use client";

import { Box, Button, Container, Grid, Grid2, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface ButtonProps {
  title: string;
  to: string;
}
interface HeaderProps {
  buttons: ButtonProps[];
  title: string;
}

export default function Header({ buttons, title }: HeaderProps) {
  return (
    <Box
      sx={{
        backgroundColor: indigo[500],
        padding: "20px 0",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="white" fontWeight={700}>
            {title}
          </Typography>
          <Grid2>
            {buttons.map((button) => (
              <Button
                key={button.title}
                variant="text"
                sx={{ color: "white", textTransform: "none" }}
                component="button"
                href={button.to}
              >
                {button.title}
              </Button>
            ))}
          </Grid2>
        </Grid>
      </Container>
    </Box>
  );
}
