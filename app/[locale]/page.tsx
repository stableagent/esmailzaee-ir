import { Desktop } from "@/components/desktop";
import { isLocale, locales, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type RouteParams = { locale: Locale };

export function generateStaticParams(): RouteParams[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "fa"
      ? "Saeed Esmailzaee — دسکتاپ شخصی"
      : "Saeed Esmailzaee — Personal Desktop",
  };
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <Desktop locale={raw as Locale} initialWindow="about" />;
}
