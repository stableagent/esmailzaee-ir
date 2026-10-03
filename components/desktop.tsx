import Link from "next/link";
import type { Locale } from "@/lib/content";

const copy = {
  en: {
    hello: "Hello. I'm",
    name: "Saeed Esmailzaee.",
    intro: "I'm a real technology geek who dreams of living in a democracy.",
    work: "I work in web development and I'm the CEO of Taftan Network Developers, a knowledge-based company.",
    education: "I studied Software at Islamic Azad University up to an associate degree.",
    experience: "I have several years of experience as a dental equipment and electronics repair technician. I've also used Linux personally and professionally for years and have experience designing and deploying MikroTik networks. Today, I professionally develop backend systems with Python, and the most enjoyable part of my day is writing business logic and turning it into a web application.",
    services: "Web development.",
    skills: "Network · Linux · Docker · Python · Web frameworks",
    links: "Find me on",
    languages: "Language",
  },
  fa: {
    hello: "سلام. من",
    name: "سعید اسماعیل‌زایی هستم.",
    intro: "من یک عاشق واقعی فناوری هستم که آرزوی زندگی در دموکراسی را دارم.",
    work: "در حوزه توسعه وب فعالیت می‌کنم و مدیرعامل شرکت دانش‌بنیان شبکه گستران تفتان هستم.",
    education: "تا مقطع کاردانی نرم‌افزار در دانشگاه آزاد اسلامی تحصیل کردم.",
    experience: "چند سال تجربه در کار تکنسینی تعمیرات تجهیزات دندانپزشکی و الکترونیک دارم. سال‌ها هم به‌صورت شخصی و هم حرفه‌ای کاربر سیستم‌عامل لینوکس بوده‌ام و در طراحی و استقرار شبکه‌های میکروتیک تجربه دارم. هم‌اکنون نیز به‌صورت حرفه‌ای برنامه‌نویسی بک‌اند با پایتون انجام می‌دهم و لذت‌بخش‌ترین کار روزانه‌ام نوشتن منطق کسب‌وکارها و تبدیل آن به یک برنامه تحت وب است.",
    services: "توسعه وب.",
    skills: "شبکه · لینوکس · داکر · پایتون · وب‌فریم‌ورک",
    links: "من را پیدا کنید در",
    languages: "زبان",
  },
  ar: {
    hello: "مرحباً. أنا",
    name: "سعيد إسماعيل زائي.",
    intro: "أنا شغوف حقيقي بالتقنية وأحلم بالعيش في ديمقراطية.",
    work: "أعمل في مجال تطوير الويب وأنا الرئيس التنفيذي لشركة Taftan Network Developers، وهي شركة قائمة على المعرفة.",
    education: "درست تخصص البرمجيات في الجامعة الإسلامية آزاد حتى مستوى الدبلوم الجامعي.",
    experience: "لدي عدة سنوات من الخبرة في صيانة وإصلاح معدات طب الأسنان والإلكترونيات. كما استخدمت نظام لينكس لسنوات على المستوى الشخصي والمهني، ولدي خبرة في تصميم ونشر شبكات MikroTik. أعمل حالياً بشكل احترافي في تطوير الأنظمة الخلفية باستخدام Python، وأكثر ما أستمتع به يومياً هو كتابة منطق الأعمال وتحويله إلى تطبيق ويب.",
    services: "تطوير الويب.",
    skills: "الشبكات · لينكس · Docker · Python · أطر الويب",
    links: "يمكنك العثور عليّ في",
    languages: "اللغة",
  },
  es: {
    hello: "Hola. Soy",
    name: "Saeed Esmailzaee.",
    intro: "Soy un verdadero apasionado de la tecnología y sueño con vivir en una democracia.",
    work: "Trabajo en desarrollo web y soy director ejecutivo de Taftan Network Developers, una empresa basada en el conocimiento.",
    education: "Estudié Software en la Islamic Azad University hasta obtener un título de asociado.",
    experience: "Tengo varios años de experiencia como técnico de reparación de equipos dentales y electrónicos. También he utilizado Linux durante años tanto a nivel personal como profesional, y tengo experiencia diseñando e implementando redes MikroTik. Actualmente desarrollo sistemas backend profesionalmente con Python, y lo que más disfruto de mi día a día es escribir la lógica de negocio y convertirla en una aplicación web.",
    services: "Desarrollo web.",
    skills: "Redes · Linux · Docker · Python · Frameworks web",
    links: "Encuéntrame en",
    languages: "Idioma",
  },
  de: {
    hello: "Hallo. Ich bin",
    name: "Saeed Esmailzaee.",
    intro: "Ich bin ein echter Technik-Enthusiast und träume davon, in einer Demokratie zu leben.",
    work: "Ich arbeite in der Webentwicklung und bin Geschäftsführer von Taftan Network Developers, einem wissensbasierten Unternehmen.",
    education: "Ich habe Software an der Islamic Azad University bis zum Associate-Abschluss studiert.",
    experience: "Ich habe mehrere Jahre Erfahrung als Techniker für die Reparatur zahnmedizinischer Geräte und Elektronik. Außerdem nutze ich Linux seit vielen Jahren privat und beruflich und habe Erfahrung mit dem Entwurf und der Implementierung von MikroTik-Netzwerken. Heute entwickle ich professionell Backend-Systeme mit Python. Am meisten Freude macht mir dabei, Geschäftslogik zu schreiben und daraus eine Webanwendung zu entwickeln.",
    services: "Webentwicklung.",
    skills: "Netzwerke · Linux · Docker · Python · Web-Frameworks",
    links: "Du findest mich auf",
    languages: "Sprache",
  },
  ko: {
    hello: "안녕하세요. 저는",
    name: "Saeed Esmailzaee입니다.",
    intro: "저는 진정한 기술 덕후이며 민주주의 사회에서 살아가는 것을 꿈꿉니다.",
    work: "웹 개발 분야에서 일하고 있으며 지식기반 기업 Taftan Network Developers의 CEO입니다.",
    education: "Islamic Azad University에서 소프트웨어를 전공하여 전문학사 과정까지 공부했습니다.",
    experience: "치과 장비와 전자기기 수리 기술자로 여러 해 일한 경험이 있습니다. 또한 오랫동안 개인적으로나 업무적으로 Linux를 사용해 왔으며 MikroTik 네트워크 설계 및 구축 경험도 있습니다. 현재는 Python으로 백엔드 시스템을 전문적으로 개발하고 있으며, 매일 가장 즐기는 일은 비즈니스 로직을 작성하고 이를 웹 애플리케이션으로 구현하는 것입니다.",
    services: "웹 개발.",
    skills: "네트워크 · Linux · Docker · Python · 웹 프레임워크",
    links: "저를 찾아보세요",
    languages: "언어",
  },
  ja: {
    hello: "こんにちは。私は",
    name: "Saeed Esmailzaeeです。",
    intro: "私は本物のテクノロジー好きで、民主主義の中で暮らすことを夢見ています。",
    work: "Web開発に携わっており、知識基盤企業 Taftan Network Developers のCEOを務めています。",
    education: "Islamic Azad Universityでソフトウェアを専攻し、準学士課程まで学びました。",
    experience: "歯科医療機器や電子機器の修理技術者として数年間の経験があります。また、個人としても仕事としても長年Linuxを利用しており、MikroTikネットワークの設計・構築経験もあります。現在はPythonでバックエンドシステムを専門的に開発しており、日々もっとも楽しいのは、ビジネスロジックを書いてそれをWebアプリケーションにすることです。",
    services: "Web開発。",
    skills: "ネットワーク · Linux · Docker · Python · Webフレームワーク",
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
          <p>{t.experience}</p>
          <p className="highlight">{t.services}</p>
          <p>{t.skills}</p>

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
