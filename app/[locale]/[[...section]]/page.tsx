import { Desktop } from "@/components/desktop";
import { isLocale, locales, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const sections = ["about", "profile", "projects", "skills", "activity", "contact"];

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    { locale },
    ...sections.map((section) => ({ locale, section: [section] })),
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section?: string[] }>;
}): Promise<Metadata> {
  const { locale, section } = await params;
  const fa = locale === "fa";
  const key = section?.[0];
  const names: Record<string, [string, string]> = {
    about: ["درباره من", "About"],
    profile: ["پروفایل", "Profile"],
    projects: ["پروژه‌ها", "Projects"],
    skills: ["مهارت‌ها", "Skills"],
    activity: ["فعالیت‌ها", "Activity"],
    contact: ["تماس", "Contact"],
  };
  const title = key && names[key] ? names[key][fa ? 0 : 1] : (fa ? "دسکتاپ شخصی" : "Personal Desktop");
  return { title: "Saeed Esmailzaee — " + title };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string; section?: string[] }>;
}) {
  const { locale: raw, section } = await params;
  if (!isLocale(raw)) notFound();

  const allowed = ["about", "profile", "projects", "skills", "activity", "contact"];
  const key = section?.[0];
  if (section && (!key || !allowed.includes(key))) notFound();

  return <Desktop locale={raw as Locale} initialWindow={(key as "about" | "profile" | "projects" | "skills" | "activity" | "contact" | undefined) || "about"} />;
}
