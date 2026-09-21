import { Desktop } from "@/components/desktop";
import projects from "@/content/canonical/projects.json";
import { isLocale, locales, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const items = projects.items as Array<{ slug: string; title: string; summary: string; status: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => items.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = items.find((item) => item.slug === slug);
  return { title: project ? "Saeed Esmailzaee — " + project.title : "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const project = items.find((item) => item.slug === slug);
  if (!project) notFound();
  return <Desktop locale={raw as Locale} initialWindow="projects" />;
}
