"use client";

import {
  Box,
  Button,
  Container,
  Grid2,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

interface ButtonProps {
  title: string;
  to: string;
}
interface HeaderProps {
  buttons?: ButtonProps[];
  title?: string;
}

export default function Header({ buttons = [], title }: HeaderProps) {
  const { data } = useSession();
  const { user } = data || {};
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box
      sx={{
        backgroundColor: indigo[500],
        padding: "20px 0",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <Grid2 container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="white" fontWeight={700}>
            {title}
          </Typography>
          <Grid2>
            {/* Display all buttons always */}
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
            {/* Display username if logged in */}
            {user && (
              <Box sx={{ display: "inline", marginRight: 2 }}>
                <Typography
                  variant="body1"
                  color="white"
                  sx={{ display: "inline", marginRight: 2 }}
                >
                  {user.name || user.email}
                </Typography>
                <Button
                  variant="text"
                  sx={{ color: "white", textTransform: "none" }}
                  onClick={handleMenuOpen}
                >
                  Menu
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  keepMounted
                >
                  <MenuItem onClick={handleMenuClose}>Preferences</MenuItem>
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </Box>
            )}
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
