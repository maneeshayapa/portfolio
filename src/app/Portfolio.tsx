"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Menu, X, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin,
  Trophy, GraduationCap, Cpu, Smartphone, HeartPulse, Brain, Database,
  Cloud, Palette, Wrench, Camera, Boxes, ChevronDown, Circle, CheckCircle2,
  Sparkles, Activity, Radio, Facebook
} from "lucide-react";

/* ============================================================================
   DESIGN TOKENS — "Blue Digital Health-Tech"
   bg-deepest #030712 · bg-main #060E1F · bg-panel #0B1730
   royal #1E40AF · electric #2F6FED · cyan #22D3EE · fog #93A5C4 · white #F5F9FF
   Display: Space Grotesk · Body: Inter · Utility/data: JetBrains Mono
   ========================================================================== */

const FONTS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  --bg-deepest:#030712;
  --bg-main:#060E1F;
  --bg-panel:#0B1730;
  --bg-panel-2:#0E1D3D;
  --royal:#1E40AF;
  --electric:#2F6FED;
  --cyan:#22D3EE;
  --fog:#93A5C4;
  --fog-dim:#5C6E8C;
  --white:#F5F9FF;
  --line:rgba(148,180,222,0.14);
}

.mv-root{
  background:var(--bg-main);
  color:var(--white);
  font-family:'Inter',sans-serif;
  position:relative;
  overflow-x:hidden;
}
.mv-root *{box-sizing:border-box;}
.mv-display{font-family:'Space Grotesk',sans-serif;}
.mv-mono{font-family:'JetBrains Mono',monospace; letter-spacing:0.08em;}

.mv-root ::selection{background:var(--electric); color:#fff;}

/* scrollbar */
.mv-root ::-webkit-scrollbar{width:8px;}
.mv-root ::-webkit-scrollbar-track{background:var(--bg-deepest);}
.mv-root ::-webkit-scrollbar-thumb{background:var(--royal); border-radius:8px;}

/* grid backdrop */
.mv-grid-bg{
  position:absolute; inset:0;
  background-image:
    linear-gradient(to right, rgba(47,111,237,0.055) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(47,111,237,0.055) 1px, transparent 1px);
  background-size:64px 64px;
  mask-image:radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 100%);
  animation:mv-grid-drift 40s linear infinite;
}
@keyframes mv-grid-drift{ from{background-position:0 0;} to{background-position:64px 64px;} }

.mv-glow{
  position:absolute; border-radius:999px; filter:blur(90px); pointer-events:none;
}

/* reveal-on-scroll */
.mv-reveal{opacity:0; transform:translateY(28px); transition:opacity .8s cubic-bezier(.16,.8,.24,1), transform .8s cubic-bezier(.16,.8,.24,1);}
.mv-reveal.in{opacity:1; transform:translateY(0);}
.mv-reveal-l{opacity:0; transform:translateX(-24px); transition:opacity .8s cubic-bezier(.16,.8,.24,1), transform .8s cubic-bezier(.16,.8,.24,1);}
.mv-reveal-l.in{opacity:1; transform:translateX(0);}
.mv-reveal-r{opacity:0; transform:translateX(24px); transition:opacity .8s cubic-bezier(.16,.8,.24,1), transform .8s cubic-bezier(.16,.8,.24,1);}
.mv-reveal-r.in{opacity:1; transform:translateX(0);}

@keyframes mv-float{ 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
@keyframes mv-float-slow{ 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-6px) rotate(1.5deg);} }
@keyframes mv-orbit{ from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
@keyframes mv-orbit-rev{ from{transform:rotate(360deg);} to{transform:rotate(0deg);} }
@keyframes mv-pulse-dot{ 0%,100%{opacity:1; box-shadow:0 0 0 0 rgba(34,211,238,0.55);} 50%{opacity:.7; box-shadow:0 0 0 6px rgba(34,211,238,0);} }
@keyframes mv-sweep{ 0%{ transform:translateX(-120%) skewX(-12deg);} 100%{ transform:translateX(220%) skewX(-12deg);} }
@keyframes mv-shimmer{ 0%{background-position:0% 50%;} 100%{background-position:200% 50%;} }
@keyframes mv-blink{ 0%,100%{opacity:1;} 50%{opacity:.25;} }

.mv-float{animation:mv-float 5s ease-in-out infinite;}
.mv-float-slow{animation:mv-float-slow 8s ease-in-out infinite;}

.mv-gradient-text{
  background:linear-gradient(90deg, var(--cyan), var(--electric) 45%, var(--cyan));
  background-size:200% 100%;
  -webkit-background-clip:text; background-clip:text; color:transparent;
  animation:mv-shimmer 6s linear infinite;
}

.mv-btn-primary{
  position:relative; overflow:hidden; isolation:isolate;
  background:linear-gradient(135deg, var(--electric), var(--royal));
  color:#fff; border:1px solid rgba(148,180,222,0.25);
  transition:transform .35s cubic-bezier(.2,.9,.3,1), box-shadow .35s ease;
}
.mv-btn-primary:hover{ transform:translateY(-3px); box-shadow:0 14px 40px -12px rgba(47,111,237,0.65); }
.mv-btn-primary::after{
  content:''; position:absolute; inset:0; z-index:-1;
  background:linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
  transform:translateX(-120%) skewX(-12deg);
}
.mv-btn-primary:hover::after{ animation:mv-sweep 1s ease; }

.mv-btn-outline{
  border:1px solid var(--line); color:var(--white); background:rgba(255,255,255,0.02);
  transition:all .3s ease;
}
.mv-btn-outline:hover{ border-color:var(--cyan); background:rgba(34,211,238,0.06); transform:translateY(-3px); }

.mv-card{
  background:linear-gradient(180deg, rgba(14,29,61,0.6), rgba(6,14,31,0.6));
  border:1px solid var(--line);
  backdrop-filter:blur(6px);
  transition:transform .4s cubic-bezier(.2,.9,.3,1), border-color .4s ease, box-shadow .4s ease;
}
.mv-card:hover{ transform:translateY(-6px); border-color:rgba(47,111,237,0.55); box-shadow:0 20px 50px -20px rgba(47,111,237,0.45); }

.mv-nav-link{ position:relative; }
.mv-nav-link::after{
  content:''; position:absolute; left:0; bottom:-6px; height:2px; width:0%;
  background:linear-gradient(90deg, var(--cyan), var(--electric));
  transition:width .3s ease;
}
.mv-nav-link:hover::after{ width:100%; }
.mv-nav-link.active::after{ width:100%; }

.mv-magnetic{ transition:transform .25s ease; }

@media (prefers-reduced-motion: reduce){
  .mv-root *{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; }
}
`;

/* ---------------------------------------------------------------------- */
/* Scroll-reveal hook                                                      */
/* ---------------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ as: Tag = "div", variant = "mv-reveal", delay = 0, className = "", children }) {
  const [ref, inView] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`${variant} ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------- */
/* Animated counter                                                        */
/* ---------------------------------------------------------------------- */
function Counter({ value, suffix = "", duration = 1400 }) {
  const [ref, inView] = useReveal();
  const [display, setDisplay] = useState(typeof value === "number" ? 0 : value);

  useEffect(() => {
    if (!inView || typeof value !== "number") return;
    let start = null;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setDisplay(Math.floor(p * value));
      if (p < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="mv-display text-4xl md:text-5xl font-bold text-white">
      {display}{suffix}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* NAV                                                                      */
/* ---------------------------------------------------------------------- */
const SECTIONS = ["home", "about", "skills", "projects", "experience", "education", "contact"];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-500"
        style={{
          background: scrolled ? "rgba(6,14,31,0.72)" : "rgba(6,14,31,0.35)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--line)",
          borderRadius: "999px",
          boxShadow: scrolled ? "0 12px 40px -18px rgba(0,0,0,0.6)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-7 py-3">
          <button onClick={() => go("home")} className="flex items-center gap-2.5 group">
            <span
              className="mv-display w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, var(--electric), var(--royal))" }}
            >
              MY
            </span>
            <span className="mv-display text-sm md:text-base font-semibold tracking-tight text-white hidden sm:block">
              Maneesha Yapa
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`mv-nav-link text-[13px] capitalize tracking-wide text-fog hover:text-white transition-colors ${active === id ? "active text-white" : ""}`}
                style={{ color: active === id ? "var(--white)" : "var(--fog)" }}
              >
                {id}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            onClick={() => go("contact")}
            className="mv-btn-primary hidden md:block px-5 py-2 rounded-full text-[13px] font-medium"
          >
            Let's talk
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          background: "rgba(3,7,18,0.92)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-7">
          {SECTIONS.map((id, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="mv-display text-2xl font-semibold capitalize text-white transition-all"
              style={{
                transitionDelay: `${i * 60}ms`,
                transform: open ? "translateY(0)" : "translateY(14px)",
                opacity: open ? 1 : 0,
              }}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* HERO                                                                     */
/* ---------------------------------------------------------------------- */
function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const wrapRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: px * 10, y: py * -10 });
  }, []);

  const tags = [
    { label: "HEALTH TECH", pos: "top-[6%] -left-6 md:-left-14" },
    { label: "FULL STACK", pos: "top-[28%] -right-6 md:-right-16" },
    { label: "AI", pos: "bottom-[24%] -left-8 md:-left-20" },
    { label: "MOBILE", pos: "bottom-[4%] -right-4 md:-right-12" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-12"
      onMouseMove={onMove}
    >
      <div className="mv-glow w-[520px] h-[520px] -top-40 -left-40" style={{ background: "radial-gradient(circle, rgba(30,64,175,0.35), transparent 70%)" }} />
      <div className="mv-glow w-[420px] h-[420px] bottom-0 right-0" style={{ background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)" }} />
      <div className="mv-grid-bg" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          <Reveal delay={0}>
            <p className="mv-mono text-xs text-cyan-300 uppercase mb-5" style={{ color: "var(--cyan)" }}>
              Hello, I'm
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mv-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight text-white mb-6">
              MANEESHA<br />
              <span className="mv-gradient-text">YAPA</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-fog text-base md:text-lg mb-6 max-w-md" style={{ color: "var(--fog)" }}>
              Health Information &amp; Communication Technology Undergraduate
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="flex flex-wrap gap-2 mb-7">
              {["Health-Tech Engineer", "Full-Stack Developer", "Mobile App Developer"].map((r) => (
                <span
                  key={r}
                  className="mv-mono text-[11px] px-3 py-1.5 rounded-full border text-white/90"
                  style={{ borderColor: "var(--line)", background: "rgba(47,111,237,0.08)" }}
                >
                  {r}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="text-lg md:text-xl text-white/90 italic mb-10 max-w-md leading-relaxed">
              "Transforming real-world problems into intelligent digital experiences."
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="mv-btn-primary mv-magnetic px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2">
                Explore My Work <ArrowUpRight size={16} />
              </a>
              <a href="/cv.pdf" download className="mv-btn-outline mv-magnetic px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2">
                Download CV <Download size={16} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — Digital Identity Frame */}
        <Reveal variant="mv-reveal-r" delay={200} className="relative flex justify-center md:justify-end">
          <div
            ref={wrapRef}
            className="relative mv-float-slow"
            style={{
              transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transition: "transform .15s ease-out",
            }}
          >
            {/* orbit ring */}
            <div
              className="absolute -inset-8 rounded-[2rem] border pointer-events-none"
              style={{ borderColor: "rgba(34,211,238,0.18)", animation: "mv-orbit 26s linear infinite" }}
            >
              <span className="absolute -top-1.5 left-1/2 w-2.5 h-2.5 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }} />
            </div>
            <div
              className="absolute -inset-14 rounded-[2.6rem] border pointer-events-none hidden sm:block"
              style={{ borderColor: "rgba(47,111,237,0.14)", animation: "mv-orbit-rev 36s linear infinite" }}
            >
              <span className="absolute top-1/2 -right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--electric)", boxShadow: "0 0 10px var(--electric)" }} />
            </div>

            {/* frame */}
            <div
              className="relative w-[270px] h-[340px] sm:w-[320px] sm:h-[400px] rounded-2xl overflow-hidden"
              style={{ border: "1.5px solid rgba(47,111,237,0.55)", boxShadow: "0 0 60px -10px rgba(47,111,237,0.45), 0 30px 60px -20px rgba(0,0,0,0.6)" }}
            >
              <img
                src="/Images/profile.png"
                alt="Maneesha Yapa"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-full hidden items-center justify-center mv-mono text-xs text-center px-6"
                style={{ background: "linear-gradient(155deg, var(--bg-panel-2), var(--bg-deepest))", color: "var(--fog)" }}
              >
                Expected image at /Images/profile.jpg
              </div>
              {/* scanline sweep */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute top-0 bottom-0 w-1/3"
                  style={{
                    background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.16), transparent)",
                    animation: "mv-sweep 5s ease-in-out infinite",
                  }}
                />
              </div>
              {/* bottom gradient + grid overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(3,7,18,0.55), transparent 40%)" }} />
            </div>

            {/* floating tags */}
            {tags.map((t, i) => (
              <span
                key={t.label}
                className={`mv-mono absolute ${t.pos} mv-float text-[10px] px-3 py-1.5 rounded-full border text-white/90 whitespace-nowrap`}
                style={{
                  borderColor: "var(--line)",
                  background: "rgba(6,14,31,0.85)",
                  backdropFilter: "blur(6px)",
                  animationDelay: `${i * 0.6}s`,
                }}
              >
                {t.label}
              </span>
            ))}

            {/* availability badge */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full mv-mono text-[10px] whitespace-nowrap"
              style={{ background: "var(--bg-panel)", border: "1px solid var(--line)", boxShadow: "0 10px 30px -12px rgba(0,0,0,0.6)" }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--cyan)", animation: "mv-pulse-dot 1.8s ease-in-out infinite" }} />
              AVAILABLE FOR INTERNSHIP
            </div>
          </div>
        </Reveal>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-fog hidden md:flex flex-col items-center gap-1 mv-float"
        style={{ color: "var(--fog-dim)" }}
      >
        <span className="mv-mono text-[10px]">SCROLL</span>
        <ChevronDown size={16} />
      </button>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* ABOUT                                                                    */
/* ---------------------------------------------------------------------- */
function SectionEyebrow({ n, label }) {
  return (
    <p className="mv-mono text-xs mb-4" style={{ color: "var(--cyan)" }}>
      {n} / {label}
    </p>
  );
}

function About() {
  const stats = [
    { v: 2023, s: "", l: "Started HICT Journey" },
    { v: 2025, s: "", l: "Web Development Experience" },
    { v: 2026, s: "", l: "MINISCOPE Project Showcase" },
    { v: "1st", s: "", l: "Robotics Competition Achievement" },
  ];
  return (
    <section id="about" className="relative py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionEyebrow n="01" label="ABOUT ME" /></Reveal>

        <div className="grid md:grid-cols-2 gap-14 mb-20">
          <Reveal variant="mv-reveal-l">
            <p className="mv-display text-3xl md:text-4xl font-semibold leading-tight text-white">
              Technology should not only work.
              <br />
              <span style={{ color: "var(--fog)" }}>It should solve something meaningful.</span>
            </p>
          </Reveal>
          <Reveal variant="mv-reveal-r" delay={120}>
            <p className="text-fog leading-relaxed mb-5" style={{ color: "var(--fog)" }}>
              Maneesha Yapa is an undergraduate in Honors Health Information and Communication
              Technology with a strong interest in software engineering, healthcare technology,
              full-stack development, mobile applications, AI integration and digital innovation.
            </p>
            <p className="text-fog leading-relaxed" style={{ color: "var(--fog)" }}>
              She enjoys creating practical digital solutions that connect technology with
              real-world problems.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 90}>
              <div className="mv-card rounded-2xl p-6">
                {typeof s.v === "number" ? <Counter value={s.v} /> : (
                  <span className="mv-display text-4xl md:text-5xl font-bold text-white">{s.v}</span>
                )}
                <p className="mv-mono text-[11px] mt-3 text-fog" style={{ color: "var(--fog)" }}>{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* SKILLS — Technology Universe                                            */
/* ---------------------------------------------------------------------- */
const SKILL_CATEGORIES = [
  { key: "fullstack", label: "FULL-STACK", icon: Cpu, angle: -90, items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Node.js", "Express.js", "REST APIs"] },
  { key: "mobile", label: "MOBILE", icon: Smartphone, angle: -38, items: ["Flutter", "Dart", "SQFlite"] },
  { key: "healthtech", label: "HEALTH-TECH", icon: HeartPulse, angle: 12, items: ["Clinical Workflows", "EMR Systems", "Health Data Standards"] },
  { key: "ai", label: "AI", icon: Brain, angle: 55, items: ["Google Gemini API", "AI Integration", "AI Assistants"] },
  { key: "database", label: "DATABASE", icon: Database, angle: 98, items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase"] },
  { key: "cloud", label: "CLOUD", icon: Cloud, angle: 145, items: ["Supabase", "Firebase", "Vercel", "Netlify"] },
  { key: "design", label: "DESIGN", icon: Palette, angle: 188, items: ["Figma", "UI/UX Design", "2D Graphic Design", "3D Modeling"] },
  { key: "tools", label: "TOOLS", icon: Wrench, angle: 235, items: ["Git", "GitHub", "Postman", "Docker", "VS Code"] },
];

function Skills() {
  const [active, setActive] = useState("fullstack");
  return (
    <section id="skills" className="relative py-28 px-6 md:px-12" style={{ background: "var(--bg-deepest)" }}>
      <div className="mv-glow w-[500px] h-[500px] top-0 right-0" style={{ background: "radial-gradient(circle, rgba(30,64,175,0.28), transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative">
        <Reveal><SectionEyebrow n="02" label="TECHNOLOGY" /></Reveal>
        <Reveal delay={60}>
          <h2 className="mv-display text-3xl md:text-5xl font-semibold text-white mb-3">My Technology Universe</h2>
          <p className="text-fog mb-14 max-w-lg" style={{ color: "var(--fog)" }}>Hover a node to explore the tools and languages behind each discipline.</p>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_320px] gap-14 items-center">
          <Reveal delay={100} className="flex justify-center">
            <TechUniverseControlled active={active} setActive={setActive} />
          </Reveal>

          <Reveal variant="mv-reveal-r" delay={160}>
            <div className="mv-card rounded-2xl p-7 min-h-[220px]">
              <p className="mv-mono text-[11px] mb-4" style={{ color: "var(--cyan)" }}>
                {SKILL_CATEGORIES.find((c) => c.key === active)?.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILL_CATEGORIES.find((c) => c.key === active)?.items.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full border text-white/90"
                    style={{ borderColor: "var(--line)", background: "rgba(47,111,237,0.07)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* language row */}
        <Reveal delay={200} className="mt-16">
          <p className="mv-mono text-[11px] mb-4" style={{ color: "var(--fog-dim)" }}>CORE LANGUAGES</p>
          <div className="flex flex-wrap gap-3">
            {["C", "Java", "JavaScript", "TypeScript", "Dart"].map((l) => (
              <span key={l} className="mv-display text-sm px-4 py-2 rounded-lg border text-white"
                style={{ borderColor: "var(--line)", background: "var(--bg-panel)" }}>
                {l}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TechUniverseControlled({ active, setActive }) {
  const radius = 190;
  return (
    <div className="relative" style={{ width: "min(92vw, 560px)", height: "min(92vw, 560px)" }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-280 -280 560 560">
        {SKILL_CATEGORIES.map((c) => {
          const rad = (c.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isActive = active === c.key;
          return (
            <line key={c.key} x1="0" y1="0" x2={x} y2={y}
              stroke={isActive ? "var(--cyan)" : "rgba(148,180,222,0.16)"}
              strokeWidth={isActive ? 1.6 : 1} style={{ transition: "stroke .4s ease" }} />
          );
        })}
        <circle r={radius} fill="none" stroke="rgba(47,111,237,0.14)" strokeDasharray="2 6" />
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-28 h-28 rounded-full mv-mono text-xs font-medium text-center px-2"
        style={{ background: "linear-gradient(145deg, var(--royal), var(--bg-deepest))", border: "1px solid rgba(34,211,238,0.4)", boxShadow: "0 0 50px -10px rgba(47,111,237,0.6)" }}>
        MANEESHA
      </div>

      {SKILL_CATEGORIES.map((c) => {
        const rad = (c.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const Icon = c.icon;
        const isActive = active === c.key;
        return (
          <button
            key={c.key}
            onMouseEnter={() => setActive(c.key)}
            onFocus={() => setActive(c.key)}
            className="absolute top-1/2 left-1/2 flex flex-col items-center gap-1.5 transition-transform duration-300"
            style={{ transform: `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${isActive ? 1.12 : 1})` }}
          >
            <span className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
              style={{
                background: isActive ? "linear-gradient(135deg, var(--electric), var(--royal))" : "var(--bg-panel)",
                border: `1px solid ${isActive ? "var(--cyan)" : "var(--line)"}`,
                boxShadow: isActive ? "0 0 30px -6px rgba(34,211,238,0.6)" : "none",
              }}>
              <Icon size={20} color={isActive ? "#fff" : "var(--fog)"} />
            </span>
            <span className="mv-mono text-[9px] whitespace-nowrap" style={{ color: isActive ? "var(--white)" : "var(--fog-dim)" }}>
              {c.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PROJECTS                                                                 */
/* ---------------------------------------------------------------------- */
function WorkflowDiagram() {
  const steps = ["PATIENT", "RECEPTION", "DOCTOR", "NURSE", "LABORATORY", "PHARMACY", "ADMINISTRATION"];
  return (
    <div className="flex flex-col gap-0">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)" }} />
            {i < steps.length - 1 && (
              <span className="w-px h-7" style={{ background: "linear-gradient(var(--electric), transparent)" }} />
            )}
          </div>
          <span className="mv-mono text-[11px] py-1" style={{ color: "var(--fog)" }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function RobotPath() {
  return (
    <svg viewBox="0 0 260 140" className="w-full h-40">
      <path d="M10,120 C60,20 100,140 150,40 S220,10 250,60" fill="none" stroke="var(--line)" strokeWidth="2" />
      <path d="M10,120 C60,20 100,140 150,40 S220,10 250,60" fill="none" stroke="var(--cyan)" strokeWidth="2.5"
        strokeDasharray="500" strokeDashoffset="500" style={{ animation: "mv-dash 3.5s ease forwards infinite" }} />
      <circle cx="10" cy="120" r="4" fill="var(--electric)" />
      <circle cx="250" cy="60" r="4" fill="var(--cyan)" />
      <style>{`@keyframes mv-dash{ to{ stroke-dashoffset:0; } }`}</style>
    </svg>
  );
}

const PROJECTS = [
  {
    n: "01", title: "RideBuddy", tagline: "Your Smart Fuel & Vehicle Assistant",
    category: "Mobile Application / AI / Smart Mobility",
    featured: "MINISCOPE 2026 · Project Showcase",
    desc: "An offline-first mobile companion that gives drivers AI-powered vehicle insights — from fuel efficiency to emergency alerts — wherever they are.",
    features: ["AI-powered vehicle assistant", "Fuel insights", "Nearby fuel stations", "Service centers", "GPS navigation", "Smart reminders", "Mileage tracking", "Multiple vehicle management", "Offline-first architecture", "Automatic synchronization", "Emergency GSM SMS alerts"],
    tech: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Google Gemini API", "SQFlite", "Google Maps API"],
    visual: "phone",
  },
  {
    n: "02", title: "N-GEMS", tagline: "National Government Electronic Medical System",
    category: "Healthcare Information System",
    desc: "A full-scale hospital workflow platform that carries a patient's journey from reception to pharmacy through one connected digital record.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    modules: ["Patient Management", "Appointments", "Queue Management", "Doctor Dashboard", "Nurse Dashboard", "Laboratory", "Pharmacy", "Admissions", "Reports"],
    visual: "workflow",
  },
  {
    n: "03", title: "CRAFTZEN.LK", tagline: "Web Design & Development", category: "Web Design & Development",
    year: "2025", desc: "A polished commercial website built end-to-end — from information architecture to responsive front-end implementation.",
    tech: ["Web Design", "Development"], visual: "browser",
  },
  {
    n: "04", title: "FOODFLEET", tagline: "Food Delivery System UI/UX", category: "Food Delivery System UI/UX",
    year: "2024", desc: "A complete UI/UX case study for a food delivery experience, designed end-to-end in Figma with ordering, tracking and checkout flows.",
    tech: ["Figma", "UI/UX Design"], visual: "figma",
  },
  {
    n: "05", title: "Smart Line Follower Robot", tagline: "Robotics / Electronics", category: "Robotics / Electronics",
    year: "2023", desc: "A path-following robot with memory, built to compete — and win — against a field of student-engineered robots.",
    achievement: "1st Place — Robotics Competition", tech: ["Embedded C", "Sensors", "Circuit Design"], visual: "robot",
  },
];

function ProjectVisual({ visual }) {
  if (visual === "workflow") return <WorkflowDiagram />;
  if (visual === "robot") return <RobotPath />;
  if (visual === "phone") {
    return (
      <div className="relative mx-auto w-44 h-80 rounded-[1.8rem] p-2" style={{ border: "1px solid var(--line)", background: "var(--bg-panel)" }}>
        <div className="w-full h-full rounded-[1.4rem] flex flex-col p-4 gap-3" style={{ background: "linear-gradient(160deg, var(--bg-panel-2), var(--bg-deepest))" }}>
          <div className="flex items-center justify-between">
            <Activity size={16} color="var(--cyan)" />
            <Radio size={14} color="var(--fog-dim)" />
          </div>
          <div className="h-16 rounded-lg" style={{ background: "linear-gradient(120deg, var(--electric), var(--royal))" }} />
          <div className="h-3 w-3/4 rounded" style={{ background: "var(--line)" }} />
          <div className="h-3 w-1/2 rounded" style={{ background: "var(--line)" }} />
          <div className="flex-1 rounded-lg" style={{ background: "rgba(47,111,237,0.08)", border: "1px solid var(--line)" }} />
        </div>
      </div>
    );
  }
  if (visual === "browser") {
    return (
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--line)" }}>
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: "var(--bg-panel)" }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22C55E" }} />
        </div>
        <div className="h-44 p-4 space-y-2" style={{ background: "linear-gradient(160deg, var(--bg-panel-2), var(--bg-deepest))" }}>
          <div className="h-6 w-2/3 rounded" style={{ background: "linear-gradient(90deg, var(--electric), var(--royal))" }} />
          <div className="h-3 w-full rounded" style={{ background: "var(--line)" }} />
          <div className="h-3 w-5/6 rounded" style={{ background: "var(--line)" }} />
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[0, 1, 2].map((i) => <div key={i} className="h-12 rounded" style={{ background: "rgba(47,111,237,0.1)" }} />)}
          </div>
        </div>
      </div>
    );
  }
  // figma
  return (
    <div className="grid grid-cols-2 gap-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-24 rounded-lg" style={{ background: i % 2 ? "rgba(47,111,237,0.12)" : "rgba(34,211,238,0.1)", border: "1px solid var(--line)" }} />
      ))}
    </div>
  );
}

function ProjectRow({ p, index }) {
  const flip = index % 2 === 1;
  return (
    <Reveal delay={60}>
      <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 border-t`} style={{ borderColor: "var(--line)" }}>
        <div className={flip ? "md:order-2" : ""}>
          <div className="mv-card rounded-2xl p-8 flex items-center justify-center min-h-[260px] relative overflow-hidden">
            {p.featured && (
              <span className="absolute top-4 left-4 mv-mono text-[9px] px-3 py-1 rounded-full flex items-center gap-1"
                style={{ background: "linear-gradient(90deg, var(--electric), var(--cyan))", color: "#031024" }}>
                <Sparkles size={10} /> FEATURED
              </span>
            )}
            <ProjectVisual visual={p.visual} />
          </div>
        </div>

        <div className={flip ? "md:order-1" : ""}>
          <p className="mv-mono text-xs mb-3" style={{ color: "var(--cyan)" }}>{p.n} · {p.category}</p>
          <h3 className="mv-display text-3xl md:text-4xl font-semibold text-white mb-2">{p.title}</h3>
          <p className="text-sm mb-4" style={{ color: "var(--fog)" }}>{p.tagline}{p.year ? ` · ${p.year}` : ""}</p>
          <p className="leading-relaxed mb-5 text-sm" style={{ color: "var(--fog)" }}>{p.desc}</p>

          {p.featured && (
            <p className="mv-mono text-[11px] mb-5 flex items-center gap-2" style={{ color: "var(--cyan)" }}>
              <Trophy size={13} /> {p.featured}
            </p>
          )}
          {p.achievement && (
            <p className="mv-mono text-[11px] mb-5 flex items-center gap-2" style={{ color: "var(--cyan)" }}>
              <Trophy size={13} /> {p.achievement}
            </p>
          )}

          {p.features && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.features.slice(0, 6).map((f) => (
                <span key={f} className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: "rgba(47,111,237,0.08)", border: "1px solid var(--line)", color: "var(--fog)" }}>{f}</span>
              ))}
            </div>
          )}
          {p.modules && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.modules.map((m) => (
                <span key={m} className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: "rgba(34,211,238,0.06)", border: "1px solid var(--line)", color: "var(--fog)" }}>{m}</span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {p.tech.map((t) => (
              <span key={t} className="mv-mono text-[10px] px-2.5 py-1 rounded border" style={{ borderColor: "var(--line)", color: "var(--white)" }}>{t}</span>
            ))}
          </div>

          <button className="mv-btn-outline mv-magnetic px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2">
            View Project <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionEyebrow n="03" label="SELECTED WORK" /></Reveal>
        <Reveal delay={60}>
          <h2 className="mv-display text-3xl md:text-5xl font-semibold text-white mb-14">Projects &amp; Case Studies</h2>
        </Reveal>
        {PROJECTS.map((p, i) => <ProjectRow key={p.title} p={p} index={i} />)}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* EXPERIENCE                                                               */
/* ---------------------------------------------------------------------- */
const TIMELINE = [
  { title: "IT Assistant Intern", org: "SITEC — Southern Information Technology Education Center", tags: ["Technical support", "IT assistance", "Troubleshooting", "System support"], year: "" },
  { title: "Web Design & Development", org: "CRAFTZEN.LK", year: "2025", tags: [] },
  { title: "Food Delivery System Design", org: "FOODFLEET", year: "2024", tags: [] },
  { title: "Smart Line Follower Robot", org: "1st Place — Robotics Competition", year: "2023", tags: [] },
];

function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 md:px-12" style={{ background: "var(--bg-deepest)" }}>
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionEyebrow n="04" label="EXPERIENCE" /></Reveal>
        <Reveal delay={60}>
          <h2 className="mv-display text-3xl md:text-5xl font-semibold text-white mb-16">Where I've Grown</h2>
        </Reveal>

        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(var(--electric), transparent)" }} />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.title} delay={i * 100} className="relative mb-12 last:mb-0">
              <span className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full" style={{ background: "var(--bg-deepest)", border: "2px solid var(--cyan)", boxShadow: "0 0 12px rgba(34,211,238,0.6)" }} />
              <div className="mv-card rounded-xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="mv-display text-lg font-semibold text-white">{t.title}</h3>
                  {t.year && <span className="mv-mono text-[11px]" style={{ color: "var(--cyan)" }}>{t.year}</span>}
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--fog)" }}>{t.org}</p>
                {t.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: "rgba(47,111,237,0.08)", border: "1px solid var(--line)", color: "var(--fog)" }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* EDUCATION                                                                */
/* ---------------------------------------------------------------------- */
function Education() {
  return (
    <section id="education" className="relative py-28 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionEyebrow n="05" label="EDUCATION" /></Reveal>
        <Reveal delay={60}>
          <h2 className="mv-display text-3xl md:text-5xl font-semibold text-white mb-16">Academic Path</h2>
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <div className="mv-card rounded-2xl p-8 flex gap-5">
              <GraduationCap size={26} color="var(--cyan)" className="shrink-0 mt-1" />
              <div>
                <p className="mv-mono text-[11px] mb-2" style={{ color: "var(--cyan)" }}>2023 — 2027</p>
                <h3 className="mv-display text-xl font-semibold text-white mb-1">Bachelor of Health Information and Communication Technology (Honours)</h3>
                <p className="text-sm mb-1" style={{ color: "var(--fog)" }}>Gampaha Wickramarachchi University of Indigenous Medicine</p>
                <p className="text-sm" style={{ color: "var(--fog-dim)" }}>Faculty of Health Science and Technology</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mv-card rounded-2xl p-8 flex gap-5">
              <GraduationCap size={26} color="var(--electric)" className="shrink-0 mt-1" />
              <div>
                <p className="mv-mono text-[11px] mb-2" style={{ color: "var(--cyan)" }}>2020</p>
                <h3 className="mv-display text-xl font-semibold text-white mb-1">GCE Advanced Level</h3>
                <p className="text-sm mb-4" style={{ color: "var(--fog)" }}>MR / Deiyandara National School</p>
                <div className="flex flex-wrap gap-2">
                  {["ET — B", "ICT — B", "SFT — C", "Z-Score — 1.2777"].map((r) => (
                    <span key={r} className="mv-mono text-[10px] px-2.5 py-1 rounded border" style={{ borderColor: "var(--line)", color: "var(--white)" }}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* CERTIFICATIONS                                                           */
/* ---------------------------------------------------------------------- */
const CERTS = [
  { title: "Full-Stack Web Development (MERN)", org: "SKYREK" },
  { title: "3D Modeling and Manufacturing", org: "American Corner — 2024" },
  { title: "Electronic Engineering", org: "American Corner — 2024" },
  { title: "Human Resource Management", org: "Certificate Course" },
  { title: "Business Management & Marketing", org: "Certificate Course" },
  { title: "Skills Development Training Program", org: "GWUIM" },
];

function Certifications() {
  return (
    <section className="relative py-28 px-6 md:px-12" style={{ background: "var(--bg-deepest)" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionEyebrow n="06" label="CERTIFICATIONS" /></Reveal>
        <Reveal delay={60}>
          <h2 className="mv-display text-3xl md:text-5xl font-semibold text-white mb-14">Credentials</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <div className="mv-card rounded-2xl p-6 group cursor-default">
                <CheckCircle2 size={20} color="var(--cyan)" className="mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mv-display text-base font-semibold text-white mb-1.5">{c.title}</h3>
                <p className="text-xs" style={{ color: "var(--fog)" }}>{c.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* ACHIEVEMENTS                                                             */
/* ---------------------------------------------------------------------- */
function Achievements() {
  const items = [
    { icon: Trophy, title: "1st Place", sub: "Robotics Competition" },
    { icon: GraduationCap, title: "MINISCOPE 2026", sub: "RideBuddy Project Showcase" },
    { icon: Boxes, title: "Full-Stack Web Development", sub: "MERN Certification" },
  ];
  return (
    <section className="relative py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionEyebrow n="07" label="ACHIEVEMENTS" /></Reveal>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={i * 90}>
                <div className="mv-card rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--electric), var(--royal))" }}>
                    <Icon size={22} color="#fff" />
                  </div>
                  <h3 className="mv-display text-lg font-semibold text-white mb-1">{it.title}</h3>
                  <p className="text-xs" style={{ color: "var(--fog)" }}>{it.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* BEYOND THE CODE                                                          */
/* ---------------------------------------------------------------------- */
function BeyondCode() {
  const interests = [
    { icon: Camera, label: "Photography" },
    { icon: Palette, label: "Graphic Design" },
    { icon: Boxes, label: "3D Modeling" },
    { icon: Cpu, label: "Electronics" },
    { icon: Activity, label: "Robotics" },
    { icon: Sparkles, label: "Creative Technology" },
  ];
  return (
    <section className="relative py-24 px-6 md:px-12" style={{ background: "var(--bg-deepest)" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionEyebrow n="08" label="BEYOND THE CODE" /></Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 mt-8">
          {interests.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.label} delay={i * 60}>
                <div className="mv-card rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
                  <Icon size={22} color="var(--cyan)" />
                  <span className="text-xs" style={{ color: "var(--fog)" }}>{it.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* CONTACT + FOOTER                                                         */
/* ---------------------------------------------------------------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="mv-glow w-[560px] h-[560px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, rgba(47,111,237,0.28), transparent 70%)" }} />
      <div className="mv-grid-bg" />
      <div className="max-w-4xl mx-auto relative text-center">
        <Reveal><SectionEyebrow n="09" label="CONTACT" /></Reveal>
        <Reveal delay={60}>
          <h2 className="mv-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            LET'S BUILD SOMETHING <span className="mv-gradient-text">MEANINGFUL.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-lg mx-auto mb-12 leading-relaxed" style={{ color: "var(--fog)" }}>
            Whether it's a healthcare platform, intelligent mobile application, or a digital
            solution to a real-world problem, I'm always interested in creating technology with purpose.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <a href="mailto:hello@maneeshayapa.dev" className="mv-btn-primary mv-magnetic inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold mb-12">
            <Mail size={16} /> Say Hello
          </a>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex items-center justify-center gap-4">
            {[
              { icon: Mail, label: "Email", href: "mailto:hello@maneeshayapa.dev" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/maneesha-yapa-01a235329/" },
              { icon: Github, label: "GitHub", href: "https://github.com/maneeshayapa" },
              { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
              { icon: Download, label: "CV", href: "/cv.pdf", download: true },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  download={s.download ? true : undefined}
                  className="mv-btn-outline mv-magnetic w-12 h-12 rounded-full flex items-center justify-center"
                  title={s.label}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-6 md:px-12 py-12 border-t" style={{ borderColor: "var(--line)", background: "var(--bg-deepest)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="mv-display text-lg font-semibold text-white">Maneesha Yapa</p>
          <p className="text-xs mt-1" style={{ color: "var(--fog)" }}>Health Information &amp; Communication Technology Undergraduate</p>
          <p className="mv-mono text-[10px] mt-1" style={{ color: "var(--fog-dim)" }}>Health-Tech Engineer · Full-Stack Developer · Mobile Developer</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--fog)" }}>
          <MapPin size={13} /> "Building technology with purpose."
        </div>
        <p className="mv-mono text-[10px]" style={{ color: "var(--fog-dim)" }}>© 2026 Maneesha Yapa</p>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/* ROOT                                                                     */
/* ---------------------------------------------------------------------- */
export default function Portfolio() {
  return (
    <div className="mv-root">
      <style dangerouslySetInnerHTML={{ __html: FONTS_CSS }} />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <BeyondCode />
      <Contact />
      <Footer />
    </div>
  );
}
