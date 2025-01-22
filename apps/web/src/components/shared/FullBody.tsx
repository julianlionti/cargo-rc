"use client";
import { Box, BoxProps, useTheme } from "@mui/material";
import { ReactNode } from "react";
interface FullBodyProps {
  children: ReactNode;
  bgColor?: BoxProps["bgcolor"];
}

export default function FullBody({
  children,
  bgColor = "#f4f4f4",
}: FullBodyProps) {
  const { mixins } = useTheme();
  const { toolbar } = mixins;
  const { minHeight: toolbarHeight = 0 } = toolbar;

  return (
    <Box
      bgcolor={bgColor}
      mt={`${toolbarHeight}px`}
      height={`calc(100dvh - ${toolbarHeight}px)`}
      display="flex"
      flexDirection="column"
      pt={2}
    >
      {children}
    </Box>
  );
}
