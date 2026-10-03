"use client";

import Link from "next/link";
import type { Locale } from "@/lib/content";

const copy = {
  en: {
    hello: "Hello. I'm",
    name: "Saeed Esmailzaee.",
    intro: "I'm a real technology geek.",
    work: "I work in web development and I'm associated with Taftan Network Knowledge Base Company.",
    education: "I'm studying for a BSc at Islamic Azad University.",
    services: "Web development.",
    links: "Find me on",
    languages: "Language",
  },
  fa: {
    hello: "سلام. من",
    name: "سعید اسماعیل‌زایی هستم.",
    intro: "من یک عاشق واقعی فناوری هستم.",
    work: "در حوزه توسعه وب فعالیت می‌کنم و با شرکت دانش‌بنیان شبکه دانش طفتان همکاری دارم.",
    education: "در مقطع کارشناسی در دانشگاه آزاد اسلامی تحصیل می‌کنم.",
    services: "توسعه وب.",
    links: "من را پیدا کنید در",
    languages: "زبان",
  },
  ar: {
    hello: "مرحباً. أنا",
    name: "سعيد إسماعيل زائي.",
    intro: "أنا شغوف حقيقي بالتقنية.",
    work: "أعمل في تطوير الويب ومرتبط بشركة Taftan Network Knowledge Base Company.",
    education: "أدرس للحصول على درجة البكالوريوس في الجامعة الإسلامية آزاد.",
    services: "تطوير الويب.",
    links: "يمكنك العثور عليّ في",
    languages: "اللغة",
  },
  es: {
    hello: "Hola. Soy",
    name: "Saeed Esmailzaee.",
    intro: "Soy un verdadero apasionado de la tecnología.",
    work: "Trabajo en desarrollo web y estoy asociado con Taftan Network Knowledge Base Company.",
    education: "Estoy estudiando una licenciatura en Islamic Azad University.",
    services: "Desarrollo web.",
    links: "Encuéntrame en",
    languages: "Idioma",
  },
  de: {
    hello: "Hallo. Ich bin",
    name: "Saeed Esmailzaee.",
    intro: "Ich bin ein echter Technik-Enthusiast.",
    work: "Ich arbeite in der Webentwicklung und bin mit der Taftan Network Knowledge Base Company verbunden.",
    education: "Ich studiere für einen Bachelor an der Islamic Azad University.",
    services: "Webentwicklung.",
    links: "Du findest mich auf",
    languages: "Sprache",
  },
  ko: {
    hello: "안녕하세요. 저는",
    name: "Saeed Esmailzaee입니다.",
    intro: "저는 진정한 기술 덕후입니다.",
    work: "웹 개발 분야에서 일하며 Taftan Network Knowledge Base Company와 함께하고 있습니다.",
    education: "Islamic Azad University에서 학사 과정을 공부하고 있습니다.",
    services: "웹 개발.",
    links: "저를 찾아보세요",
    languages: "언어",
  },
  ja: {
    hello: "こんにちは。私は",
    name: "Saeed Esmailzaeeです。",
    intro: "私は本物のテクノロジー好きです。",
    work: "Web開発に携わり、Taftan Network Knowledge Base Companyと関わっています。",
    education: "Islamic Azad Universityで学士課程を学んでいます。",
    services: "Web開発。",
    links: "こちらからどうぞ",
    languages: "言語",
  },
} as const;

const languages: Array<{ code: Locale; label: string; dir: "ltr" | "rtl" }> = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "fa", label: "فارسی", dir: "rtl" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "ko", label: "한국어", dir: "ltr" },
  { code: "ja", label: "日本語", dir: "ltr" },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.2 8.4H1.7V22h3.5V8.4ZM3.45 2A2.05 2.05 0 1 0 3.4 6.1 2.05 2.05 0 0 0 3.45 2ZM22.3 13.75c0-4.1-2.18-6-5.1-6-2.35 0-3.4 1.3-4 2.2V8.4H9.7V22h3.5v-6.74c0-1.78.34-3.5 2.54-3.5 2.17 0 2.2 2.03 2.2 3.62V22h3.5l.86-8.25Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .7A11.3 11.3 0 0 0 8.43 22.92c.57.1.78-.25.78-.55v-2.16c-3.18.7-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.72.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.54-.29-5.2-1.27-5.2-5.65 0-1.25.45-2.27 1.18-3.07-.12-.3-.51-1.45.11-3.03 0 0 .96-.31 3.13 1.17a10.9 10.9 0 0 1 5.7 0c2.17-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.73.12 3.03.73.8 1.17 1.82 1.17 3.07 0 4.39-2.67 5.35-5.22 5.64.41.35.78 1.05.78 2.12v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

export function Desktop({ locale }: { locale: Locale; initialWindow?: string }) {
  const t = copy[locale];
  const isRTL = locale === "fa" || locale === "ar";

  return (
    <main className="personal-page" dir={isRTL ? "rtl" : "ltr"}>
      <div className="paper-grid" aria-hidden="true" />
      <div className="paper-content">
        <article className="intro">
          <h1>{t.hello} <strong>{t.name}</strong></h1>
          <p>{t.intro}</p>
          <p>{t.work}</p>
          <p>{t.education}</p>
          <p className="highlight">{t.services}</p>

          <div className="social-row" aria-label={t.links}>
            <Link className="social-link" href="https://www.linkedin.com/in/esmailzaee/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </Link>
            <Link className="social-link" href="https://github.com/stableagent" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </Link>
          </div>

          <div className="language-row" aria-label={t.languages}>
            <span className="language-label">{t.languages}:</span>
            {languages.map((language, index) => (
              <span className="language-item" key={language.code}>
                {index > 0 && <span className="language-separator"> / </span>}
                <Link
                  href={"/" + language.code}
                  hrefLang={language.code}
                  className={language.code === locale ? "language-current" : ""}
                  dir={language.dir}
                >
                  {language.label}
                </Link>
              </span>
            ))}
          </div>
        </article>

        <svg className="sketch-arrow" viewBox="0 0 170 110" aria-hidden="true">
          <path d="M4 55 C34 54, 62 52, 91 54 C116 55, 133 57, 154 57" />
          <path d="M133 38 C143 47, 151 52, 162 56 C151 63, 143 71, 135 80" />
          <path d="M137 43 C147 49, 153 54, 160 57" />
        </svg>
      </div>
    </main>
  );
}
