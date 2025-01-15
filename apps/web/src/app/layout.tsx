import { appConfig } from "@config";
import { CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "rc/components/Providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: appConfig.appName,
  description: "Rosendin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <Providers>
          <CssBaseline />
          {children}
        </Providers>
      </body>
    </html>
  );
}
