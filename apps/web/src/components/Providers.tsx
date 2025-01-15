"use client";

import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { lightTheme } from "@ui";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <SessionProvider session={session}>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}
