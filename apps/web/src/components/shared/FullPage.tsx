import { Box } from "@mui/material";
import { ReactNode } from "react";
import Header, { HeaderProps } from "./Header";
import Footer from "./Footer";

interface FullPageProps {
  children: ReactNode;
  title?: string;
  buttons?: HeaderProps["buttons"];
}

export default function FullPage({
  children,
  title = "Cargo RC",
}: FullPageProps) {
  return (
    <Box sx={{ height: "100dvh" }}>
      <Header title={title} />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
}
