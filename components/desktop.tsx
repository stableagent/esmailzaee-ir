"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/content";

type WindowId = "about" | "profile" | "projects" | "skills" | "activity" | "contact" | "terminal";

type WindowState = {
  id: WindowId;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  z: number;
};

const copy = {
  en: {
    applications: "Applications", workspace: "Saeed's Linux Workspace", terminal: "Terminal",
    about: "About", profile: "Profile", projects: "Projects", skills: "Skills", activity: "Activity", contact: "Contact",
    catStatus: "network / code / build", welcome: "Welcome to my workspace.",
    aboutText: "I build web systems with a backend-first mindset, with a strong focus on Django, modular architecture, ecommerce and ERP workflows.",
    profileText: "Saeed Esmailzaee — web developer and builder of modular web products.",
    skillsText: "Python, Django, HTML, CSS, Bootstrap, Git, Cloudflare and API-oriented backend development.",
    activityText: "Current work is centered on reusable web systems, developer tooling and structured content workflows.",
    contactText: "For project inquiries, use the contact channels configured in the canonical content model.",
    terminalHint: "Try: help, ls, pwd, whoami, open projects, cat about.toon",
    close: "Close", minimize: "Minimize", maximize: "Maximize",
  },
  fa: {
    applications: "برنامه‌ها", workspace: "فضای کاری سعید", terminal: "ترمینال",
    about: "درباره من", profile: "پروفایل", projects: "پروژه‌ها", skills: "مهارت‌ها", activity: "فعالیت‌ها", contact: "تماس",
    catStatus: "شبکه / کدنویسی / ساخت", welcome: "به فضای کاری من خوش آمدید.",
    aboutText: "روی ساخت سیستم‌های وب با رویکرد backend-first کار می‌کنم؛ با تمرکز ویژه بر Django، معماری ماژولار، فروشگاه اینترنتی و جریان‌های ERP.",
    profileText: "سعید اسماعیل‌زایی — توسعه‌دهنده وب و سازنده محصولات وب ماژولار.",
    skillsText: "Python، Django، HTML، CSS، Bootstrap، Git، Cloudflare و توسعه backend مبتنی بر API.",
    activityText: "تمرکز فعلی روی ساخت سیستم‌های وب قابل توسعه، ابزارهای توسعه و جریان‌های محتوایی ساختاریافته است.",
    contactText: "برای همکاری و سفارش پروژه، کانال‌های تماس در مدل محتوای اصلی سایت قرار می‌گیرند.",
    terminalHint: "امتحان کنید: help، ls، pwd، whoami، open projects، cat about.toon",
    close: "بستن", minimize: "کمینه", maximize: "بیشینه",
  },
  ar: {
    applications: "التطبيقات", workspace: "مساحة عمل سعيد", terminal: "المحطة الطرفية",
    about: "حول", profile: "الملف الشخصي", projects: "المشاريع", skills: "المهارات", activity: "النشاط", contact: "اتصل",
    catStatus: "شبكة / برمجة / بناء", welcome: "مرحباً بك في مساحة عملي.",
    aboutText: "أبني أنظمة الويب بعقلية موجهة للخادم الخلفي، مع التركيز على Django والعمارة المعيارية وسير عمل التجارة الإلكترونية والمؤسسات.",
    profileText: "سعيد إسماعيل زائي — مطور ويب وبناء منتجات ويب معيارية.",
    skillsText: "Python و Django و HTML و CSS و Bootstrap و Git و Cloudflare وتطوير الخادم الخلفي الموجه نحو API.",
    activityText: "ينصب العمل الحالي على أنظمة الويب القابلة لإعادة الاستخدام وأدوات المطورين وسير العمل المحتوى المنظم.",
    contactText: "لاستفسارات المشروع، استخدم قنوات الاتصال المكونة في نموذج المحتوى الأساسي.",
    terminalHint: "جرّب: help، ls، pwd، whoami، open projects، cat about.toon",
    close: "إغلاق", minimize: "تصغير", maximize: "تكبير",
  },
  es: {
    applications: "Aplicaciones", workspace: "Espacio de Saeed", terminal: "Terminal",
    about: "Acerca de", profile: "Perfil", projects: "Proyectos", skills: "Habilidades", activity: "Actividad", contact: "Contacto",
    catStatus: "red / código / construcción", welcome: "Bienvenido a mi espacio de trabajo.",
    aboutText: "Construyo sistemas web con una mentalidad orientada al backend, con un fuerte enfoque en Django, arquitectura modular y flujos de trabajo de comercio electrónico y ERP.",
    profileText: "Saeed Esmailzaee — desarrollador web y constructor de productos web modulares.",
    skillsText: "Python, Django, HTML, CSS, Bootstrap, Git, Cloudflare y desarrollo backend orientado a API.",
    activityText: "El trabajo actual se centra en sistemas web reutilizables, herramientas para desarrolladores y flujos de contenido estructurado.",
    contactText: "Para consultas de proyectos, utilice los canales de contacto configurados en el modelo de contenido canónico.",
    terminalHint: "Prueba: help, ls, pwd, whoami, open projects, cat about.toon",
    close: "Cerrar", minimize: "Minimizar", maximize: "Maximizar",
  },
  de: {
    applications: "Anwendungen", workspace: "Saids Arbeitsbereich", terminal: "Terminal",
    about: "Über", profile: "Profil", projects: "Projekte", skills: "Fähigkeiten", activity: "Aktivität", contact: "Kontakt",
    catStatus: "Netzwerk / Code / Build", welcome: "Willkommen in meinem Arbeitsbereich.",
    aboutText: "Ich baue Web-Systeme mit einer Backend-first-Mentalität, mit starkem Fokus auf Django, modulare Architektur sowie E-Commerce- und ERP-Workflows.",
    profileText: "Saeed Esmailzaee — Webentwickler und Erbauer modularer Webprodukte.",
    skillsText: "Python, Django, HTML, CSS, Bootstrap, Git, Cloudflare und API-orientierte Backend-Entwicklung.",
    activityText: "Die aktuelle Arbeit konzentriert sich auf wiederverwendbare Web-Systeme, Entwicklertools und strukturierte Content-Workflows.",
    contactText: "Für Projektanfragen nutzen Sie bitte die im kanonischen Inhaltsmodell konfigurierten Kontaktkanäle.",
    terminalHint: "Versuch: help, ls, pwd, whoami, open projects, cat about.toon",
    close: "Schließen", minimize: "Minimieren", maximize: "Maximieren",
  },
  ko: {
    applications: "애플리케이션", workspace: "Saeed의 작업 공간", terminal: "터미널",
    about: "소개", profile: "프로필", projects: "프로젝트", skills: "기술", activity: "활동", contact: "연락처",
    catStatus: "네트워크 / 코드 / 빌드", welcome: "작업 공간에 오신 것을 환영합니다.",
    aboutText: "Django, 모듈형 아키텍처, 전자상거래 및 ERP 워크플로에 중점을 두고 백엔드 중심의 웹 시스템을 구축합니다.",
    profileText: "Saeed Esmailzaee — 웹 개발자이자 모듈형 웹 제품 개발자입니다.",
    skillsText: "Python, Django, HTML, CSS, Bootstrap, Git, Cloudflare 및 API 중심 백엔드 개발.",
    activityText: "현재 재사용 가능한 웹 시스템, 개발 도구 및 구조화된 콘텐츠 워크플로를 구축하고 있습니다.",
    contactText: "프로젝트 문의는 표준 콘텐츠 모델에 구성된 연락처 채널을 이용해 주세요.",
    terminalHint: "사용해 보세요: help, ls, pwd, whoami, open projects, cat about.toon",
    close: "닫기", minimize: "최소화", maximize: "최대화",
  },
  ja: {
    applications: "アプリケーション", workspace: "Saeed のワークスペース", terminal: "ターミナル",
    about: "概要", profile: "プロフィール", projects: "プロジェクト", skills: "スキル", activity: "活動", contact: "連絡先",
    catStatus: "ネットワーク / コード / ビルド", welcome: "ワークスペースへようこそ。",
    aboutText: "Django、モジュール型アーキテクチャ、ECおよびERPワークフローを中心に、バックエンド重視のWebシステムを構築しています。",
    profileText: "Saeed Esmailzaee — Web開発者、モジュール型Webプロダクトの開発者。",
    skillsText: "Python、Django、HTML、CSS、Bootstrap、Git、Cloudflare、API指向のバックエンド開発。",
    activityText: "現在は再利用可能なWebシステム、開発者向けツール、構造化されたコンテンツワークフローに取り組んでいます。",
    contactText: "プロジェクトに関するお問い合わせは、標準コンテンツモデルに設定された連絡先をご利用ください。",
    terminalHint: "試す: help, ls, pwd, whoami, open projects, cat about.toon",
    close: "閉じる", minimize: "最小化", maximize: "最大化",
  },
} as const;

const languageList: Array<{ code: Locale; short: string; native: string; dir: "ltr" | "rtl" }> = [
  { code: "en", short: "EN", native: "English", dir: "ltr" },
  { code: "fa", short: "FA", native: "فارسی", dir: "rtl" },
  { code: "ar", short: "AR", native: "العربية", dir: "rtl" },
  { code: "es", short: "ES", native: "Español", dir: "ltr" },
  { code: "de", short: "DE", native: "Deutsch", dir: "ltr" },
  { code: "ko", short: "KO", native: "한국어", dir: "ltr" },
  { code: "ja", short: "JA", native: "日本語", dir: "ltr" },
];

const apps: Array<{ id: WindowId; icon: string; tone: string }> = [
  { id: "about", icon: "about", tone: "coral" },
  { id: "profile", icon: "user", tone: "mint" },
  { id: "projects", icon: "folder", tone: "yellow" },
  { id: "skills", icon: "code", tone: "blue" },
  { id: "activity", icon: "chart", tone: "lavender" },
  { id: "contact", icon: "mail", tone: "peach" },
  { id: "terminal", icon: "terminal", tone: "ink" },
];

function CatIllustration({ variant = "desk" }: { variant?: "desk" | "network" | "terminal" }) {
  const accent = variant === "network" ? "#80c7c0" : variant === "terminal" ? "#c3a6e9" : "#f5a77b";
  return (
    <svg className="cat-art" viewBox="0 0 520 340" role="img" aria-label="Cartoon cat coding and working with a network">
      <g stroke="#263238" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M345 76 C400 50 456 75 468 122 C477 159 458 190 423 204" fill="none" stroke={accent} strokeWidth="13" />
        <circle cx="459" cy="119" r="11" fill="#ffd86f" />
        <circle cx="420" cy="201" r="10" fill="#8fd4a6" />
        <path d="M458 119 L420 201" fill="none" stroke="#5f7479" strokeWidth="4" />
        <path d="M82 278 C102 233 147 218 197 222 L315 222 C358 222 392 242 411 278 Z" fill="#d6a7cf" />
        <path d="M92 278 L92 311 M401 278 L401 311" fill="none" />
        <path d="M144 213 L157 180 L184 203 L214 180 L226 215" fill="#e9a96f" />
        <path d="M157 203 C130 225 128 260 145 277 C166 298 214 296 238 272 C257 252 253 214 226 202 C207 193 174 193 157 203 Z" fill="#efb27b" />
        <path d="M171 224 C180 215 189 215 197 224 M209 224 C218 215 227 216 235 224" fill="none" />
        <circle cx="188" cy="226" r="5" fill="#263238" stroke="none" />
        <circle cx="218" cy="226" r="5" fill="#263238" stroke="none" />
        <path d="M201 239 Q207 245 213 239" fill="none" />
        <path d="M165 239 L136 232 M165 248 L133 249 M236 239 L264 232 M236 248 L268 249" fill="none" strokeWidth="3" />
        <path d="M238 259 C258 273 274 271 286 257" fill="none" />
        <path d="M252 235 C276 225 303 230 321 247 L337 263 L313 281 L284 265" fill="#efb27b" />
        <path d="M287 256 L326 269" fill="none" />
        <path d="M322 246 C333 235 350 237 360 247 L375 262 L353 280 L332 265" fill="#efb27b" />
        <rect x="277" y="197" width="120" height="76" rx="10" fill="#283943" />
        <rect x="290" y="208" width="94" height="51" rx="6" fill="#9bd6c6" stroke="#263238" strokeWidth="4" />
        <path d="M305 224 L319 234 L305 245 M328 245 H353" fill="none" stroke="#30484a" strokeWidth="5" />
        <path d="M267 280 H409 L394 296 H282 Z" fill="#51626a" />
        <path d="M307 296 H369" fill="none" />
        <path d="M393 150 C409 139 430 143 439 158 C448 173 441 192 424 199" fill="#80c7c0" />
        <path d="M408 158 Q418 150 428 159" fill="none" stroke="#263238" strokeWidth="4" />
        <path d="M409 172 H431 M414 184 H426" fill="none" stroke="#263238" strokeWidth="3" />
      </g>
    </svg>
  );
}

function AppGlyph({ type }: { type: string }) {
  if (type === "folder") return <span className="glyph-shape glyph-folder" />;
  if (type === "terminal") return <span className="glyph-shape glyph-terminal">&gt;_</span>;
  if (type === "code") return <span className="glyph-shape glyph-code">&lt;/&gt;</span>;
  if (type === "mail") return <span className="glyph-shape glyph-mail">✉</span>;
  if (type === "chart") return <span className="glyph-shape glyph-chart">⌁</span>;
  if (type === "user") return <span className="glyph-shape glyph-user">●</span>;
  return <span className="glyph-shape glyph-about">●</span>;
}

function FileContent({ id, locale }: { id: Exclude<WindowId, "terminal">; locale: Locale }) {
  const t = copy[locale];
  if (id === "projects") {
    const items = [
      ["berasan.toon", locale === "fa" ? "پلتفرم ERP و تجارت الکترونیک Django" : "Django ERP and ecommerce platform"],
      ["currency-monitor.toon", locale === "fa" ? "مانیتورینگ نرخ ارز و جریان‌های زمان‌بندی‌شده" : "Currency monitoring and scheduled workflows"],
      ["globaldental.toon", locale === "fa" ? "ایده بازار قطعات تجهیزات دندان‌پزشکی" : "Dental equipment spare-parts marketplace concept"],
      ["mentor-framework.toon", locale === "fa" ? "چارچوب ساختاریافته مهارت‌ها و منتورها" : "Structured skills and mentor framework"],
    ];
    return (
      <div className="file-view">
        <div className="file-kicker">~/projects</div>
        <h2>{t.projects}</h2>
        <div className="project-grid">
          {items.map(([name, description]) => (
            <Link className="project-card" href={"/" + locale + "/projects"} key={name}>
              <div className="project-card-icon"><AppGlyph type="folder" /></div>
              <div><strong>{name}</strong><span>{description}</span></div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const titleMap = { about: t.about, profile: t.profile, skills: t.skills, activity: t.activity, contact: t.contact };
  const textMap = { about: t.aboutText, profile: t.profileText, skills: t.skillsText, activity: t.activityText, contact: t.contactText };
  return (
    <div className="file-view">
      <div className="file-kicker">~/home/saeed</div>
      <h2>{titleMap[id]}</h2>
      <p>{textMap[id]}</p>
      {id === "about" && <CatIllustration variant="desk" />}
      {id === "profile" && <div className="profile-figure"><CatIllustration variant="network" /><span>{t.catStatus}</span></div>}
      {id === "skills" && <div className="tag-list">{["Python", "Django", "REST API", "HTML", "CSS", "Bootstrap", "Git", "Cloudflare"].map((x) => <span className="tag" key={x}>{x}</span>)}</div>}
      {id === "activity" && <div className="activity-board"><span>01</span><span>backend systems</span><span>02</span><span>network tooling</span><span>03</span><span>structured content</span></div>}
      {id === "contact" && <div className="code">contact.toon{"\n"}status: ready{"\n"}source: canonical/contact.json</div>}
    </div>
  );
}

function makeWindows(): WindowState[] {
  return [
    { id: "about", x: 290, y: 72, width: 760, height: 540, minimized: false, maximized: false, z: 3 },
    { id: "terminal", x: 560, y: 260, width: 560, height: 300, minimized: false, maximized: false, z: 4 },
  ];
}

export function Desktop({ locale, initialWindow = "about" }: { locale: Locale; initialWindow?: WindowId }) {
  const t = copy[locale];
  const isRTL = locale === "fa" || locale === "ar";
  const [windows, setWindows] = useState<WindowState[]>(() => {
    const base = makeWindows();
    return initialWindow === "about" ? base : base.map((w) => ({ ...w, minimized: w.id === "about" }));
  });
  const [nextZ, setNextZ] = useState(10);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([t.welcome, t.terminalHint]);
  const [drag, setDrag] = useState<{ id: WindowId; dx: number; dy: number } | null>(null);

  const currentLanguage = languageList.find((language) => language.code === locale)!;
  const visibleWindows = useMemo(() => windows.filter((w) => !w.minimized), [windows]);

  useEffect(() => {
    if (!drag) return;
    const move = (event: MouseEvent) => {
      setWindows((items) => items.map((w) => w.id === drag.id && !w.maximized ? { ...w, x: event.clientX - drag.dx, y: event.clientY - drag.dy } : w));
    };
    const up = () => setDrag(null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [drag]);

  function focus(id: WindowId) {
    if (!id) return;
    setNextZ((z) => z + 1);
    setWindows((items) => items.map((w) => w.id === id ? { ...w, minimized: false, z: nextZ } : w));
  }

  function openApp(id: WindowId) {
    setWindows((items) => {
      const exists = items.some((w) => w.id === id);
      if (exists) return items.map((w) => w.id === id ? { ...w, minimized: false, z: nextZ } : w);
      const offset = (items.length % 4) * 24;
      return items.concat({ id, x: 250 + offset, y: 70 + offset, width: id === "terminal" ? 560 : 760, height: id === "terminal" ? 300 : 540, minimized: false, maximized: false, z: nextZ });
    });
    setNextZ((z) => z + 1);
    setLauncherOpen(false);
  }

  function closeApp(id: WindowId) {
    setWindows((items) => items.filter((w) => w.id !== id));
  }

  function minimizeApp(id: WindowId) {
    setWindows((items) => items.map((w) => w.id === id ? { ...w, minimized: true } : w));
  }

  function toggleMaximize(id: WindowId) {
    setWindows((items) => items.map((w) => w.id === id ? { ...w, maximized: !w.maximized, minimized: false } : w));
    focus(id);
  }

  function runCommand() {
    const value = command.trim();
    if (!value) return;
    if (value === "clear") { setHistory([]); setCommand(""); return; }
    const outputs: Record<string, string> = {
      help: "help  ls  pwd  whoami  open projects  cat about.toon  clear",
      ls: "about.toon  profile.toon  skills.toon  activity.toon  contact.toon  projects/  terminal",
      pwd: "/home/saeed",
      whoami: "saeed",
      "open projects": "opening projects/",
      "cat about.toon": t.aboutText,
    };
    setHistory((items) => items.concat(["$ " + value, outputs[value] || "command not found: " + value]));
    if (value === "open projects") openApp("projects");
    if (value === "cat about.toon") openApp("about");
    setCommand("");
  }

  return (
    <main className="desktop" dir={isRTL ? "rtl" : "ltr"} onClick={() => languageOpen && setLanguageOpen(false)}>
      <div className="wallpaper-pattern" />
      <div className="wallpaper-shape wallpaper-shape-a" />
      <div className="wallpaper-shape wallpaper-shape-b" />

      <header className="topbar">
        <div className="topbar-left">
          <button className="topbar-launcher" onClick={(e) => { e.stopPropagation(); setLauncherOpen((v) => !v); }}>
            <span className="topbar-dot" /> {t.applications}
          </button>
          <span className="topbar-divider" />
          <span className="topbar-title">{t.workspace}</span>
        </div>
        <div className="topbar-right">
          <span className="topbar-pill">● ONLINE</span>
          <div className="language-switcher" onClick={(e) => e.stopPropagation()}>
            <button className="language-button" type="button" aria-haspopup="menu" aria-expanded={languageOpen} onClick={() => setLanguageOpen((open) => !open)}>
              <span>{currentLanguage.native}</span><span className="language-code">{currentLanguage.short}</span><span aria-hidden="true">▾</span>
            </button>
            {languageOpen && (
              <div className="language-menu" role="menu" dir="ltr">
                {languageList.map((language) => (
                  <Link key={language.code} href={"/" + language.code} className={"language-option" + (language.code === locale ? " active" : "")} role="menuitem" hrefLang={language.code} onClick={() => setLanguageOpen(false)}>
                    <span className="language-native" dir={language.dir}>{language.native}</span><span className="language-code">{language.short}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <span className="topbar-clock">09:42</span>
        </div>
      </header>

      {launcherOpen && (
        <aside className="launcher" onClick={(e) => e.stopPropagation()}>
          <div className="launcher-heading"><span>apps</span><span>~/home/saeed</span></div>
          <div className="launcher-grid">
            {apps.map((app) => (
              <button key={app.id} className="launcher-app" onClick={() => openApp(app.id)}>
                <span className={"app-icon " + app.tone}><AppGlyph type={app.icon} /></span>
                <span>{app.id === "terminal" ? t.terminal : t[app.id as Exclude<WindowId, "terminal">]}</span>
              </button>
            ))}
          </div>
        </aside>
      )}

      <section className="workspace">
        <div className="desktop-cat-card">
          <CatIllustration variant="desk" />
          <div className="cat-caption"><strong>Saeed's dev cat</strong><span>{t.catStatus}</span></div>
        </div>

        <nav className="desktop-icons" aria-label="Desktop applications">
          {apps.filter((app) => app.id !== "terminal").map((app) => (
            <button className="desktop-icon" key={app.id} onDoubleClick={() => openApp(app.id)}>
              <span className={"app-icon " + app.tone}><AppGlyph type={app.icon} /></span>
              <span>{t[app.id as Exclude<WindowId, "terminal">]}</span>
            </button>
          ))}
          <button className="desktop-icon" onDoubleClick={() => openApp("terminal")}>
            <span className="app-icon ink"><AppGlyph type="terminal" /></span><span>{t.terminal}</span>
          </button>
        </nav>

        {windows.map((win) => {
          const title = win.id === "terminal" ? t.terminal : t[win.id];
          return (
            <section
              key={win.id}
              className={"app-window" + (win.maximized ? " maximized" : "")}
              style={{ left: win.maximized ? 0 : win.x, top: win.maximized ? 42 : win.y, width: win.maximized ? "100%" : win.width, height: win.maximized ? "calc(100vh - 94px)" : win.height, zIndex: win.z, display: win.minimized ? "none" : "flex" }}
              onMouseDown={() => focus(win.id)}
              aria-label={title}
            >
              <header
                className="app-window-header"
                onMouseDown={(e) => {
                  if (win.maximized) return;
                  setDrag({ id: win.id, dx: e.clientX - win.x, dy: e.clientY - win.y });
                }}
              >
                <div className="window-app-name"><span className={"window-app-mark " + (win.id === "terminal" ? "ink" : "coral")}><AppGlyph type={win.id === "terminal" ? "terminal" : apps.find((a) => a.id === win.id)?.icon || "about"} /></span>{title}</div>
                <div className="window-controls">
                  <button title={t.minimize} aria-label={t.minimize} onMouseDown={(e) => e.stopPropagation()} onClick={() => minimizeApp(win.id)}>—</button>
                  <button title={t.maximize} aria-label={t.maximize} onMouseDown={(e) => e.stopPropagation()} onClick={() => toggleMaximize(win.id)}>□</button>
                  <button title={t.close} aria-label={t.close} onMouseDown={(e) => e.stopPropagation()} onClick={() => closeApp(win.id)}>×</button>
                </div>
              </header>
              <div className="app-window-body">
                {win.id === "terminal" ? (
                  <div className="terminal-shell">
                    <div className="terminal-output">{history.map((line, i) => <div key={i}>{line}</div>)}</div>
                    <form className="terminal-form" onSubmit={(e) => { e.preventDefault(); runCommand(); }}>
                      <span className="terminal-prompt">saeed@esmailzaee:~$</span>
                      <input className="terminal-input" aria-label="terminal command" value={command} onChange={(e) => setCommand(e.target.value)} autoComplete="off" spellCheck={false} />
                    </form>
                  </div>
                ) : <FileContent id={win.id} locale={locale} />}
              </div>
            </section>
          );
        })}
      </section>

      <nav className="dock" aria-label="Application dock">
        <button className="dock-home" onClick={() => setLauncherOpen((v) => !v)} title={t.applications}><span className="topbar-dot" /></button>
        {apps.slice(0, 6).map((app) => (
          <button key={app.id} className={"dock-app" + (visibleWindows.some((w) => w.id === app.id) ? " running" : "")} onClick={() => openApp(app.id)} title={app.id === "terminal" ? t.terminal : t[app.id as Exclude<WindowId, "terminal">]}>
            <span className={"app-icon " + app.tone}><AppGlyph type={app.icon} /></span>
          </button>
        ))}
        <button className="dock-app" onClick={() => openApp("terminal")} title={t.terminal}><span className="app-icon ink"><AppGlyph type="terminal" /></span></button>
      </nav>

      <div className="desktop-footer"><span>esmailzaee.ir</span><span>linux-inspired personal desktop</span></div>
    </main>
  );
}
