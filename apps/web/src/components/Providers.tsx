"use client";

import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { lightTheme } from "@ui";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
  messages: AbstractIntlMessages;
  locale: string;
}

export default function Providers({
  children,
  session,
  messages,
  locale,
}: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <SessionProvider session={session}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}
