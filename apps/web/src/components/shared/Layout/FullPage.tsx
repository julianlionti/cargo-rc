"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";
import { appConfig } from "@config";
import Header, { HeaderProps } from "./Header";
import Footer from "./Footer";

interface FullPageProps {
  children: ReactNode;
  title?: string;
  buttons?: HeaderProps["buttons"];
}

export default function FullPage({
  children,
  title = appConfig.appName,
}: FullPageProps) {
  return (
    <Box
      display="grid"
      gridTemplateRows="auto 1fr auto"
      gridTemplateColumns="1fr"
      height="100dvh"
      overflow="hidden"
    >
      <Header title={title} />
      {/* <Box component="aside" bgcolor="#333">
        <span>Drawer</span>
      </Box> */}
      <Box component="main" sx={{ overflowY: "scroll" }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
