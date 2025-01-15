import { appConfig } from "@config";
import { CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Roboto } from "next/font/google";
import Providers from "rc/components/Providers";
import authOptions from "rc/utils/auth.utils";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: appConfig.appName,
  description: appConfig.version,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <body className={`${roboto.variable}`}>
        <Providers session={session}>
          <CssBaseline />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
