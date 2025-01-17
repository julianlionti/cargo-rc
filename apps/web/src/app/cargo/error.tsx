"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error caught in error.tsx:", error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "error.main", fontWeight: "bold", marginBottom: 2 }}
      >
        Oops! Something went wrong.
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", marginBottom: 4 }}
      >
        {error.message ||
          "An unexpected error occurred. Please try again later."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => reset()}
        sx={{ paddingX: 4 }}
      >
        Try Again
      </Button>
    </Box>
  );
}
