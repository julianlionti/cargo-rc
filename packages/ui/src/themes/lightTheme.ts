// apps/web/theme.ts
import { indigo, grey, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a light theme for the app
export const lightTheme = createTheme({
  palette: {
    mode: "light", // Light mode theme
    primary: indigo,
    secondary: teal,
    background: {
      default: grey[100], // Light grey background
      paper: grey[50], // Lighter grey for cards/paper elements
    },
    text: {
      primary: grey[900], // Dark text on light background
      secondary: grey[700], // Secondary text
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "2.25rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.875rem",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
  components: {
    MuiInputBase: { defaultProps: { size: "small" } },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Round corners for cards
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
        },
      },
    },
  },
});
