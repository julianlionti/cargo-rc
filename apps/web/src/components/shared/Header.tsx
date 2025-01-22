"use client";

import {
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  AppBar,
  Toolbar,
  Stack,
  Container,
  Divider,
  Box,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useState } from "react";
import useUser from "rc/hooks/useUser";

interface ButtonProps {
  title: string;
  to: string;
}
export interface HeaderProps {
  buttons?: ButtonProps[];
  title?: string;
}

export default function Header({ buttons = [], title }: HeaderProps) {
  const { user } = useUser();
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
    <>
      <AppBar>
        <Toolbar>
          <Container>
            <Stack
              flex={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              px={4}
            >
              <Typography variant="h6" color="white" fontWeight={700} flex={1}>
                {title}
              </Typography>
              {/* Display all buttons always */}
              <Stack
                direction="row"
                alignItems="center"
                display={{ xs: "none", md: "block" }}
              >
                {buttons.map((button) => (
                  <Button
                    key={button.title}
                    variant="text"
                    sx={{
                      color: "white",
                      textTransform: "none",
                    }}
                    href={button.to}
                  >
                    {button.title}
                  </Button>
                ))}
              </Stack>
              {/* Display username if logged in */}
              <IconButton onClick={handleMenuOpen}>
                <Tooltip title="Menu">
                  <MenuIcon sx={{ color: "common.white" }} />
                </Tooltip>
              </IconButton>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        {/* User Info Section */}
        {user && (
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        )}
        <Divider />
        <MenuItem onClick={handleMenuClose}>Preferences</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
}
