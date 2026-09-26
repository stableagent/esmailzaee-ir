import type { Metadata } from "next";
import { isLocale, locales, localeDirection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Saeed Esmailzaee — Personal Desktop",
  description: "A Linux-style personal workspace for Saeed Esmailzaee.",
  metadataBase: new URL("https://esmailzaee.ir"),
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const langNames: Record<string, string> = {
  en: "en",
  fa: "fa",
  ar: "ar",
  es: "es",
  de: "de",
  ko: "ko",
  ja: "ja",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? locale : "en";
  const dir = localeDirection(validLocale);

  return (
    <html lang={langNames[validLocale] || "en"} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
