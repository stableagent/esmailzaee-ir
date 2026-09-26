import profile from "@/content/canonical/profile.json";
import about from "@/content/canonical/about.json";
import contact from "@/content/canonical/contact.json";
import skills from "@/content/canonical/skills.json";
import activity from "@/content/canonical/activity.json";
import projects from "@/content/canonical/projects.json";

export type Locale = "en" | "fa" | "ar" | "es" | "de";
export const locales: Locale[] = ["en", "fa", "ar", "es", "de"];
export const content = { profile, about, contact, skills, activity, projects };
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }
export function localeDirection(locale: Locale) { return locale === "fa" || locale === "ar" ? "rtl" : "ltr"; }
