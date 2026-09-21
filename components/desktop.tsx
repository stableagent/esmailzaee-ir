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

  return (
    <main className="desktop" dir={locale === "fa" ? "rtl" : "ltr"}>
      <div className="desktop-grid" />
      <header className="topbar">
        <div className="topbar-left"><span className="brand">◉ {t.system}</span><span className="status">{t.workspace}</span></div>
        <div className="topbar-right"><Link href={locale === "fa" ? "/en" : "/fa"}>{locale === "fa" ? "EN" : "FA"}</Link><span className="status">esmailzaee.ir</span></div>
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
