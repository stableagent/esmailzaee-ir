import { Desktop } from "@/components/desktop";
import { isLocale, locales, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const sections = ["about", "profile", "projects", "skills", "activity", "contact"] as const;
type Section = (typeof sections)[number];
type RouteParams = { locale: Locale; section: Section };

export function generateStaticParams(): RouteParams[] {
  return locales.flatMap((locale) =>
    sections.map((section) => ({ locale, section })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}): Promise<Metadata> {
  const { locale, section } = await params;
  const names: Record<Section, [string, string]> = {
    about: ["درباره من", "About"],
    profile: ["پروفایل", "Profile"],
    projects: ["پروژه‌ها", "Projects"],
    skills: ["مهارت‌ها", "Skills"],
    activity: ["فعالیت‌ها", "Activity"],
    contact: ["تماس", "Contact"],
  };
  if (!isLocale(locale) || !(section in names)) return {};
  return {
    title: "Saeed Esmailzaee — " + names[section as Section][locale === "fa" ? 0 : 1],
  };
}

export default async function LocaleSection({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale: raw, section } = await params;
  if (!isLocale(raw) || !sections.includes(section as Section)) notFound();
  return <Desktop locale={raw as Locale} initialWindow={section as Section} />;
}
