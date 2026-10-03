"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/content";

type WindowId = "about" | "profile" | "projects" | "skills" | "activity" | "contact" | null;

const files = [
  ["about", "about.toon", "A"],
  ["profile", "profile.toon", "P"],
  ["projects", "projects/", "D"],
  ["skills", "skills.toon", "S"],
  ["activity", "activity.toon", "⌁"],
  ["contact", "contact.toon", "@"],
] as const;

const copy = {
  en: {
    system: "Applications", workspace: "Personal Workspace", terminal: "Terminal",
    about: "About", profile: "Profile", projects: "Projects", skills: "Skills", activity: "Activity", contact: "Contact",
    help: "help  ls  pwd  whoami  cd projects  cat about.toon  open projects  clear",
    aboutText: "I build web systems with a backend-first mindset, with a strong focus on Django, modular architecture, ecommerce and ERP workflows.",
    profileText: "Saeed Esmailzaee — web developer and builder of modular web products.",
    skillsText: "Python, Django, HTML, CSS, Bootstrap, Git, Cloudflare and API-oriented backend development.",
    activityText: "Current work is centered on reusable web systems, developer tooling and structured content workflows.",
    contactText: "For project inquiries, use the contact channels configured in the canonical content model.",
  },
  fa: {
    system: "برنامه‌ها", workspace: "فضای کاری شخصی", terminal: "ترمینال",
    about: "درباره من", profile: "پروفایل", projects: "پروژه‌ها", skills: "مهارت‌ها", activity: "فعالیت‌ها", contact: "تماس",
    help: "help  ls  pwd  whoami  cd projects  cat about.toon  open projects  clear",
    aboutText: "روی ساخت سیستم‌های وب با رویکرد backend-first کار می‌کنم؛ با تمرکز ویژه بر Django، معماری ماژولار، فروشگاه اینترنتی و جریان‌های ERP.",
    profileText: "سعید اسماعیل‌زایی — توسعه‌دهنده وب و سازنده محصولات وب ماژولار.",
    skillsText: "Python، Django، HTML، CSS، Bootstrap، Git، Cloudflare و توسعه backend مبتنی بر API.",
    activityText: "تمرکز فعلی روی ساخت سیستم‌های وب قابل توسعه، ابزارهای توسعه و جریان‌های محتوایی ساختاریافته است.",
    contactText: "برای همکاری و سفارش پروژه، کانال‌های تماس در مدل محتوای اصلی سایت قرار می‌گیرند.",
  },
  ar: {
    system: "التطبيقات", workspace: "مساحة العمل الشخصية", terminal: "المحطة الطرفية",
    about: "حول", profile: "الملف الشخصي", projects: "المشاريع", skills: "المهارات", activity: "النشاط", contact: "اتصل",
    help: "help  ls  pwd  whoami  cd projects  cat about.toon  open projects  clear",
    aboutText: "أبني أنظمة الويب بعقلية موجهة للخادم الخلفي، مع التركيز القوي على Django والعمارة المعيارية وسير عمل التجارة الإلكترونية والمؤسسات.",
    profileText: "سعيد إسماعيل زائي — مطور ويب وبناء منتجات الويب المعيارية.",
    skillsText: "Python و Django و HTML و CSS و Bootstrap و Git و Cloudflare وتطوير الخادم الخلفي الموجه نحو API.",
    activityText: "ينصب العمل الحالي على أنظمة الويب القابلة لإعادة الاستخدام وأدوات المطورين وسير العمل المحتوى المنظم.",
    contactText: "لاستفسارات المشروع، استخدم قنوات الاتصال المكونة في نموذج المحتوى الأساسي.",
  },
  es: {
    system: "Aplicaciones", workspace: "Espacio de Trabajo Personal", terminal: "Terminal",
    about: "Acerca de", profile: "Perfil", projects: "Proyectos", skills: "Habilidades", activity: "Actividad", contact: "Contacto",
    help: "help  ls  pwd  whoami  cd projects  cat about.toon  open projects  clear",
    aboutText: "Construyo sistemas web con una mentalidad orientada al backend, con un fuerte enfoque en Django, arquitectura modular y flujos de trabajo de comercio electrónico y ERP.",
    profileText: "Saeed Esmailzaee — desarrollador web y constructor de productos web modulares.",
    skillsText: "Python, Django, HTML, CSS, Bootstrap, Git, Cloudflare y desarrollo backend orientado a API.",
    activityText: "El trabajo actual se centra en sistemas web reutilizables, herramientas para desarrolladores y flujos de contenido estructurado.",
    contactText: "Para consultas de proyectos, utilice los canales de contacto configurados en el modelo de contenido canónico.",
  },
  de: {
    system: "Anwendungen", workspace: "Persönlicher Arbeitsbereich", terminal: "Terminal",
    about: "Über", profile: "Profil", projects: "Projekte", skills: "Fähigkeiten", activity: "Aktivität", contact: "Kontakt",
    help: "help  ls  pwd  whoami  cd projects  cat about.toon  open projects  clear",
    aboutText: "Ich baue Web-Systeme mit einer Backend-first-Mentalität, mit starkem Fokus auf Django, modulare Architektur, E-Commerce- und ERP-Workflows.",
    profileText: "Saeed Esmailzaee — Webentwickler und Erbauer modularer Webprodukte.",
    skillsText: "Python, Django, HTML, CSS, Bootstrap, Git, Cloudflare und API-orientierte Backend-Entwicklung.",
    activityText: "Die aktuelle Arbeit konzentriert sich auf wiederverwendbare Web-Systeme, Entwicklertools und strukturierte Content-Workflows.",
    contactText: "Für Projektanfragen nutzen Sie bitte die im kanonischen Inhaltsmodell konfigurierten Kontaktkanäle.",
  },
  ko: {
    system: "애플리케이션", workspace: "개인 작업 공간", terminal: "터미널",
    about: "소개", profile: "프로필", projects: "프로젝트", skills: "기술", activity: "활동", contact: "연락처",
    help: "help  ls  pwd  whoami  cd projects  cat about.toon  open projects  clear",
    aboutText: "Django, 모듈형 아키텍처, 전자상거래 및 ERP 워크플로에 중점을 두고 백엔드 중심의 웹 시스템을 구축합니다.",
    profileText: "Saeed Esmailzaee — 웹 개발자이자 모듈형 웹 제품 개발자입니다.",
    skillsText: "Python, Django, HTML, CSS, Bootstrap, Git, Cloudflare 및 API 중심 백엔드 개발.",
    activityText: "현재 재사용 가능한 웹 시스템, 개발 도구 및 구조화된 콘텐츠 워크플로를 구축하고 있습니다.",
    contactText: "프로젝트 문의는 표준 콘텐츠 모델에 구성된 연락처 채널을 이용해 주세요.",
  },
  ja: {
    system: "アプリケーション", workspace: "パーソナルワークスペース", terminal: "ターミナル",
    about: "概要", profile: "プロフィール", projects: "プロジェクト", skills: "スキル", activity: "活動", contact: "連絡先",
    help: "help  ls  pwd  whoami  cd projects  cat about.toon  open projects  clear",
    aboutText: "Django、モジュール型アーキテクチャ、ECおよびERPワークフローを中心に、バックエンド重視のWebシステムを構築しています。",
    profileText: "Saeed Esmailzaee — Web開発者、モジュール型Webプロダクトの開発者。",
    skillsText: "Python、Django、HTML、CSS、Bootstrap、Git、Cloudflare、API指向のバックエンド開発。",
    activityText: "現在は再利用可能なWebシステム、開発者向けツール、構造化されたコンテンツワークフローに取り組んでいます。",
    contactText: "プロジェクトに関するお問い合わせは、標準コンテンツモデルに設定された連絡先をご利用ください。",
  },
} as const;

function Window({ title, children, close }: { title: string; children: React.ReactNode; close: () => void }) {
  return (
    <section className="window" aria-label={title}>
      <header className="window-header">
        <span className="window-title">{title}</span>
        <div className="window-controls">
          <button className="window-control" aria-label="minimize" onClick={close} />
          <button className="window-control" aria-label="close" onClick={close} />
        </div>
      </header>
      <div className="window-body">{children}</div>
    </section>
  );
}

function FileContent({ id, locale }: { id: Exclude<WindowId, null>; locale: Locale }) {
  const t = copy[locale];
  if (id === "projects") {
    const items = [
      ["berasan.toon", locale === "fa" ? "پلتفرم ERP و تجارت الکترونیک Django" : "Django ERP and ecommerce platform"],
      ["currency-monitor.toon", locale === "fa" ? "مانیتورینگ نرخ ارز و جریان‌های زمان‌بندی‌شده" : "Currency monitoring and scheduled workflows"],
      ["globaldental.toon", locale === "fa" ? "ایده بازار قطعات تجهیزات دندان‌پزشکی" : "Dental equipment spare-parts marketplace concept"],
      ["mentor-framework.toon", locale === "fa" ? "چارچوب ساختاریافته مهارت‌ها و منتورها" : "Structured skills and mentor framework"],
    ];
    return (
      <>
        <span className="eyebrow">directory</span>
        <h2>~/projects</h2>
        <div className="folder-grid">
          {items.map((item) => (
            <Link className="folder-item" href={"/" + locale + "/projects"} key={item[0]}>
              <div><strong>{item[0]}</strong></div><div className="status">{item[1]}</div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  const titleMap = {
    about: t.about, profile: t.profile, skills: t.skills, activity: t.activity, contact: t.contact,
  } as Record<string, string>;
  const textMap = {
    about: t.aboutText, profile: t.profileText, skills: t.skillsText, activity: t.activityText, contact: t.contactText,
  } as Record<string, string>;

  return (
    <>
      <span className="eyebrow">~/home/saeed</span>
      <h2>{titleMap[id]}</h2>
      <p>{textMap[id]}</p>
      {id === "skills" && (
        <div className="tag-list">
          {["Python", "Django", "REST API", "HTML", "CSS", "Bootstrap", "Git", "Cloudflare"].map((x) => <span className="tag" key={x}>{x}</span>)}
        </div>
      )}
      {id === "contact" && <div className="code">contact.toon{"\n"}status: ready{"\n"}source: canonical/contact.json</div>}
    </>
  );
}

export function Desktop({ locale, initialWindow = "about" }: { locale: Locale; initialWindow?: WindowId }) {
  const t = copy[locale];
  const [windowId, setWindowId] = useState<WindowId>(initialWindow);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [history, setHistory] = useState<string[]>(["Linux-like Personal Desktop", t.help]);
  const [command, setCommand] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);

  function runCommand() {
    const value = command.trim();
    if (!value) return;
    if (value === "clear") { setHistory([]); setCommand(""); return; }
    const outputs: Record<string, string> = {
      help: t.help,
      ls: "about.toon  profile.toon  skills.toon  activity.toon  contact.toon  projects/",
      pwd: "/home/saeed",
      whoami: "saeed",
      "cd projects": "/home/saeed/projects",
      "open projects": "opening projects/",
      "cat about.toon": t.aboutText,
    };
    setHistory((items) => items.concat(["$ " + value, outputs[value] || "command not found: " + value]));
    if (value === "open projects") setWindowId("projects");
    if (value === "cat about.toon") setWindowId("about");
    setCommand("");
  }

  const isRTL = locale === "fa" || locale === "ar";
  const languages: Array<{ code: Locale; short: string; native: string; dir: "ltr" | "rtl" }> = [
    { code: "en", short: "EN", native: "English", dir: "ltr" },
    { code: "fa", short: "FA", native: "فارسی", dir: "rtl" },
    { code: "ar", short: "AR", native: "العربية", dir: "rtl" },
    { code: "es", short: "ES", native: "Español", dir: "ltr" },
    { code: "de", short: "DE", native: "Deutsch", dir: "ltr" },
    { code: "ko", short: "KO", native: "한국어", dir: "ltr" },
    { code: "ja", short: "JA", native: "日本語", dir: "ltr" },
  ];
  const currentLanguage = languages.find((language) => language.code === locale)!;

  return (
    <main className="desktop" dir={isRTL ? "rtl" : "ltr"}>
      <div className="desktop-grid" />
      <header className="topbar">
        <div className="topbar-left"><span className="brand">◉ {t.system}</span><span className="status">{t.workspace}</span></div>
        <div className="topbar-right">
          <div className="language-switcher">
            <button
              className="language-button"
              type="button"
              aria-haspopup="menu"
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((open) => !open)}
              title="Change language"
            >
              <span>{currentLanguage.native}</span>
              <span className="language-code">{currentLanguage.short}</span>
              <span aria-hidden="true">▾</span>
            </button>
            {languageOpen && (
              <div className="language-menu" role="menu" dir="ltr">
                {languages.map((language) => (
                  <Link
                    key={language.code}
                    href={"/" + language.code}
                    className={"language-option" + (language.code === locale ? " active" : "")}
                    role="menuitem"
                    hrefLang={language.code}
                    onClick={() => setLanguageOpen(false)}
                  >
                    <span className="language-native" dir={language.dir}>{language.native}</span>
                    <span className="language-code">{language.short}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <span className="status">esmailzaee.ir</span>
        </div>
      </header>

      <section className="workspace">
        <nav className="desktop-icons" aria-label="Desktop files">
          {files.map((file) => (
            <button className="icon-button" key={file[0]} onClick={() => setWindowId(file[0])}>
              <span className="icon-glyph">{file[2]}</span><span className="icon-label">{file[1]}</span>
            </button>
          ))}
        </nav>

        {windowId && <Window title={windowId + ".toon"} close={() => setWindowId(null)}><FileContent id={windowId} locale={locale} /></Window>}

        {terminalOpen && (
          <section className="terminal" aria-label={t.terminal}>
            <div className="terminal-header">{t.terminal} — safe simulation</div>
            <div className="terminal-output">{history.map((line, i) => <div key={i}>{line}</div>)}</div>
            <form className="terminal-form" onSubmit={(e) => { e.preventDefault(); runCommand(); }}>
              <span className="terminal-prompt">$</span>
              <input className="terminal-input" aria-label="terminal command" value={command} onChange={(e) => setCommand(e.target.value)} autoComplete="off" spellCheck={false} />
            </form>
          </section>
        )}
      </section>

      <nav className="dock" aria-label="Dock">
        <button onClick={() => setWindowId("about")} title={t.about}>A</button>
        <button onClick={() => setWindowId("projects")} title={t.projects}>D</button>
        <button onClick={() => setWindowId("skills")} title={t.skills}>S</button>
        <button onClick={() => setWindowId("contact")} title={t.contact}>@</button>
        <button onClick={() => setTerminalOpen((v) => !v)} title={t.terminal}>⌘</button>
        <Link href={"/" + locale} title="Home">⌂</Link>
      </nav>
    </main>
  );
}
