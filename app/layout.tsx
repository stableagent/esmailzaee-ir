import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saeed Esmailzaee — Personal Desktop",
  description: "A Linux-style personal workspace for Saeed Esmailzaee.",
  metadataBase: new URL("https://esmailzaee.ir"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
