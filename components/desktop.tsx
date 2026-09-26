"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/content";

type WindowId = "about"|"profile"|"projects"|"skills"|"activity"|"contact"|"terminal";
type Win={id:WindowId;minimized:boolean;maximized:boolean;z:number};

const text={
 en:{apps:"Applications",workspace:"Saeed's Workspace",about:"About",profile:"Profile",projects:"Projects",skills:"Skills",activity:"Activity",contact:"Contact",terminal:"Terminal",online:"ONLINE"},
 fa:{apps:"برنامه‌ها",workspace:"فضای کاری سعید",about:"درباره من",profile:"پروفایل",projects:"پروژه‌ها",skills:"مهارت‌ها",activity:"فعالیت‌ها",contact:"تماس",terminal:"ترمینال",online:"آنلاین"},
 ar:{apps:"التطبيقات",workspace:"مساحة عمل سعيد",about:"حول",profile:"الملف الشخصي",projects:"المشاريع",skills:"المهارات",activity:"النشاط",contact:"اتصل",terminal:"المحطة",online:"متصل"},
 es:{apps:"Aplicaciones",workspace:"Espacio de Saeed",about:"Acerca de",profile:"Perfil",projects:"Proyectos",skills:"Habilidades",activity:"Actividad",contact:"Contacto",terminal:"Terminal",online:"ONLINE"},
 de:{apps:"Anwendungen",workspace:"Saids Arbeitsbereich",about:"Über",profile:"Profil",projects:"Projekte",skills:"Fähigkeiten",activity:"Aktivität",contact:"Kontakt",terminal:"Terminal",online:"ONLINE"},
 ko:{apps:"애플리케이션",workspace:"Saeed의 작업 공간",about:"소개",profile:"프로필",projects:"프로젝트",skills:"기술",activity:"활동",contact:"연락처",terminal:"터미널",online:"온라인"},
 ja:{apps:"アプリケーション",workspace:"Saeed のワークスペース",about:"概要",profile:"プロフィール",projects:"プロジェクト",skills:"スキル",activity:"活動",contact:"連絡先",terminal:"ターミナル",online:"オンライン"},
} as const;

const langs=[["en","EN","English","ltr"],["fa","FA","فارسی","rtl"],["ar","AR","العربية","rtl"],["es","ES","Español","ltr"],["de","DE","Deutsch","ltr"],["ko","KO","한국어","ltr"],["ja","JA","日本語","ltr"]] as const;
const appIds:WindowId[]=["about","profile","projects","skills","activity","contact","terminal"];

function Cat(){
 return <svg className="cat-art" viewBox="0 0 520 340" role="img" aria-label="Cartoon cat programming">
  <g stroke="#26383c" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
   <path d="M350 75c60-30 112 5 112 52 0 37-25 65-59 74" fill="none" stroke="#ef9b72" strokeWidth="14"/><circle cx="461" cy="126" r="10" fill="#f2cd67"/><circle cx="421" cy="200" r="10" fill="#8fc9bd"/>
   <path d="M82 280c25-54 72-70 132-56h104c51 0 81 23 103 56Z" fill="#bda9df"/>
   <path d="M145 210l13-34 27 25 30-25 12 34" fill="#efb27b"/>
   <path d="M158 205c-28 20-30 59-8 79 24 22 73 18 91-8 17-25 8-60-18-73-19-10-48-10-65 2Z" fill="#efb27b"/>
   <circle cx="188" cy="226" r="5" fill="#26383c" stroke="none"/><circle cx="218" cy="226" r="5" fill="#26383c" stroke="none"/><path d="M201 239q6 6 12 0M165 239l-30-7m30 16-32 2m103-11 28-7m-28 16 32 2" fill="none" strokeWidth="3"/>
   <path d="M252 235c25-12 54-4 75 13l16 15-25 18-30-17" fill="#efb27b"/><path d="M322 247c11-10 28-9 38 1l16 15-22 18-22-16" fill="#efb27b"/>
   <rect x="276" y="196" width="121" height="77" rx="10" fill="#2d4045"/><rect x="289" y="208" width="95" height="51" rx="6" fill="#9bd6c6" strokeWidth="4"/><path d="m305 224 14 10-14 11m24 0h25" fill="none" stroke="#30484a" strokeWidth="5"/>
   <path d="M266 280h143l-15 17H281Z" fill="#52666b"/><path d="M308 297h61" fill="none"/>
   <path d="M393 150c16-12 37-7 45 8 9 16 2 35-15 41" fill="#80c7c0"/><path d="M409 158q10-8 20 1m-20 13h22m-17 12h12" fill="none" strokeWidth="4"/>
  </g>
 </svg>
}

function Glyph({id}:{id:WindowId}){
 const glyph=id==="projects"?"folder":id==="skills"?"</>":id==="terminal"?">_":id==="contact"?"✉":id==="activity"?"⌁":id==="profile"?"●":"●";
 return <span className="glyph">{glyph}</span>
}

function Content({id,locale}:{id:Exclude<WindowId,"terminal">;locale:Locale}){
 const t=text[locale];
 const body:{[K in Exclude<WindowId,"terminal">]:string}={
  about:locale==="fa"?"روی ساخت سیستم‌های وب با تمرکز بر Django، معماری ماژولار، فروشگاه اینترنتی و ERP کار می‌کنم.":"I build web systems with a strong focus on Django, modular architecture, ecommerce and ERP workflows.",
  profile:locale==="fa"?"سعید اسماعیل‌زایی — توسعه‌دهنده وب و سازنده محصولات ماژولار.":"Saeed Esmailzaee — web developer and builder of modular web products.",
  skills:"Python · Django · REST API · HTML · CSS · Bootstrap · Git · Cloudflare",
  activity:locale==="fa"?"سیستم‌های وب قابل توسعه، ابزارهای توسعه و محتوای ساختاریافته.":"Reusable web systems, developer tooling and structured content workflows.",
  contact:locale==="fa"?"برای همکاری و سفارش پروژه از کانال‌های تماس سایت استفاده کنید.":"Use the contact channels configured on the site for project inquiries.",
  projects:"Berasan · Currency Monitor · GlobalDental · Mentor Framework"
 };
 return <div className="file-view"><span className="file-kicker">~/home/saeed</span><h2>{t[id]}</h2><p>{body[id]}</p>{id==="about"&&<Cat/>}{id==="profile"&&<div className="profile-cat"><Cat/></div>}{id==="skills"&&<div className="tag-list">{body.skills.split(" · ").map(x=><span className="tag" key={x}>{x}</span>)}</div>}{id==="projects"&&<div className="project-grid">{body.projects.split(" · ").map(x=><Link className="project-card" href={"/"+locale+"/projects"} key={x}><strong>{x}</strong><span>open directory →</span></Link>)}</div>}{id==="activity"&&<div className="activity-board"><b>01</b><span>backend systems</span><b>02</b><span>developer tooling</span><b>03</b><span>structured content</span></div>}</div>
}

export function Desktop({locale,initialWindow="about"}:{locale:Locale;initialWindow?:WindowId}){
 const t=text[locale]; const rtl=locale==="fa"||locale==="ar";
 const [windows,setWindows]=useState<Win[]>([{id:initialWindow,minimized:false,maximized:false,z:5}]);
 const [launcher,setLauncher]=useState(false); const [lang,setLang]=useState(false);
 const [z,setZ]=useState(10);
 const open=(id:WindowId)=>{setWindows(ws=>{const old=ws.find(w=>w.id===id);return old?ws.map(w=>w.id===id?{...w,minimized:false,z}:w):ws.concat({id,minimized:false,maximized:false,z})});setZ(v=>v+1);setLauncher(false)};
 const close=(id:WindowId)=>setWindows(ws=>ws.filter(w=>w.id!==id));
 const min=(id:WindowId)=>setWindows(ws=>ws.map(w=>w.id===id?{...w,minimized:true}:w));
 const max=(id:WindowId)=>setWindows(ws=>ws.map(w=>w.id===id?{...w,maximized:!w.maximized,minimized:false}:w));
 return <main className="desktop" dir={rtl?"rtl":"ltr"} onClick={()=>lang&&setLang(false)}>
  <div className="wallpaper"/>
  <header className="topbar"><div className="topbar-left"><button className="topbar-launcher" onClick={e=>{e.stopPropagation();setLauncher(v=>!v)}}><span className="topbar-dot"/> {t.apps}</button><span className="topbar-divider"/><span className="topbar-title">{t.workspace}</span></div><div className="topbar-right"><span className="topbar-pill">● {t.online}</span><div className="language-switcher" onClick={e=>e.stopPropagation()}><button className="language-button" onClick={()=>setLang(v=>!v)}>{langs.find(x=>x[0]===locale)?.[2]} <span className="language-code">{langs.find(x=>x[0]===locale)?.[1]}</span> ▾</button>{lang&&<div className="language-menu">{langs.map(l=><Link key={l[0]} className={"language-option "+(l[0]===locale?"active":"")} href={"/"+l[0]} hrefLang={l[0]} onClick={()=>setLang(false)}><span dir={l[3]}>{l[2]}</span><span className="language-code">{l[1]}</span></Link>)}</div>}</div><span className="topbar-clock">09:42</span></div></header>
  {launcher&&<aside className="launcher" onClick={e=>e.stopPropagation()}><div className="launcher-grid">{appIds.map(id=><button className="launcher-app" key={id} onClick={()=>open(id)}><span className={"app-icon "+(id==="terminal"?"ink":"coral")}><Glyph id={id}/></span>{t[id]}</button>)}</div></aside>}
  <section className="workspace">
   <div className="desktop-cat-card"><Cat/><div className="cat-caption"><strong>Saeed's dev cat</strong><span>code · systems · build</span></div></div>
   <nav className="desktop-icons">{appIds.map(id=><button className="desktop-icon" key={id} onDoubleClick={()=>open(id)}><span className={"app-icon "+(id==="terminal"?"ink":"coral")}><Glyph id={id}/></span><span>{t[id]}</span></button>)}</nav>
   {windows.map(w=><section key={w.id} className={"app-window "+(w.maximized?"maximized":"")} style={{zIndex:w.z,display:w.minimized?"none":"flex"}} onMouseDown={()=>{setZ(v=>v+1);setWindows(ws=>ws.map(x=>x.id===w.id?{...x,z}:x))}}>
    <header className="app-window-header"><div className="window-app-name"><span className="window-app-mark"><Glyph id={w.id}/></span>{t[w.id]}</div><div className="window-controls"><button onClick={()=>min(w.id)}>—</button><button onClick={()=>max(w.id)}>□</button><button onClick={()=>close(w.id)}>×</button></div></header>
    <div className="app-window-body">{w.id==="terminal"?<div className="terminal-shell"><div className="terminal-output">saeed@esmailzaee:~$ help{"\n"}help  ls  pwd  whoami  open projects{"\n"}saeed@esmailzaee:~$ <span className="cursor">▋</span></div></div>:<Content id={w.id} locale={locale}/>}</div>
   </section>)}
  </section>
  <nav className="dock"><button className="dock-home" onClick={()=>setLauncher(v=>!v)}><span className="topbar-dot"/></button>{appIds.map(id=><button className={"dock-app "+(windows.some(w=>w.id===id&&!w.minimized)?"running":"")} key={id} onClick={()=>open(id)}><span className={"app-icon "+(id==="terminal"?"ink":"coral")}><Glyph id={id}/></span></button>)}</nav>
  <div className="desktop-footer"><span>esmailzaee.ir</span><span>linux-inspired personal desktop</span></div>
 </main>
}