/* =====================================================================
   MARLO.RV — Futuristic Holographic Developer Portfolio
   ---------------------------------------------------------------------
   Plain JavaScript, zero dependencies. The fire core is a custom WebGL
   ray-marched volumetric shader (with a Canvas 2D fallback).

   MODULES
   01. CONFIG            ← edit ALL your content here
   02. Icons (inline SVG)
   03. Utils & environment
   04. Ticker (single requestAnimationFrame loop)
   05. Mouse tracker
   06. Content renderer
   07. Loader
   08. Custom cursor
   09. Hero parallax + HUD
   10. Background canvas
   11. Fire core (WebGL + 2D fallback)
   12. Core sparks
   13. Tilt cards
   14. Navigation
   15. Scroll reveal + timeline progress
   16. Sound (Web Audio, OFF by default)
   17. Contact form
   18. Boot
   ===================================================================== */
"use strict";

/* ---------------------------------------------------------------------
   01. CONFIG — change text, projects, links, skills & colors here.
   --------------------------------------------------------------------- */
const CONFIG = {
  name: "Marlo Rizky Valentino",
  logo: "MRV",
  role: "Software Developer | Programmer | Future Engineer",
  heroRole: "SOFTWARE DEVELOPER",
  tagline: "BUILDING THE FUTURE, ONE LINE OF CODE AT A TIME.",
  status: "AVAILABLE FOR PROJECTS",
  heroDescription:
    "I build interactive digital experiences, intelligent applications, and creative software solutions.",

  // Symbol inside the fire core. Try "</>" or "M".
  coreSymbol: "</>",

  // Profile photo. Leave "" to show the holographic monogram instead.
  // Example: "assets/images/marlo.jpg"
  photo: "",

  // About paragraphs (HTML allowed: <strong>, <em>).
  about: [
    "<strong>Marlo Rizky Valentino</strong> adalah seorang software developer yang tertarik pada programming, software development, interactive applications, dan teknologi masa depan.",
    // ✏️ Placeholder — replace with your own story (school/campus, focus, goals).
    "Saat ini fokus belajar dan membangun project — dari game klasik, aplikasi interaktif, sampai eksperimen computer vision. [Tambahkan cerita singkatmu di sini.]",
  ],

  // Futuristic stat cards. ✏️ Replace with your real numbers anytime.
  stats: [
    { value: "01+", label: "PROJECTS" },
    { value: "∞", label: "CURIOSITY" },
    { value: "24/7", label: "BUILDING" },
  ],

  // Skills. level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  // Use `mono` for a text badge or `icon` for an SVG from ICONS below.
  // ✏️ Levels are placeholders — adjust them to match you.
  skills: [
    { name: "C", mono: "C", cat: "LANGUAGE", level: "INTERMEDIATE" },
    { name: "C++", mono: "C++", cat: "LANGUAGE", level: "INTERMEDIATE" },
    { name: "Python", mono: "PY", cat: "LANGUAGE", level: "BEGINNER" },
    { name: "JavaScript", mono: "JS", cat: "LANGUAGE", level: "BEGINNER" },
    { name: "HTML", mono: "</>", cat: "MARKUP", level: "INTERMEDIATE" },
    { name: "CSS", mono: "{ }", cat: "STYLE", level: "INTERMEDIATE" },
    { name: "Git", icon: "git", cat: "TOOLING", level: "BEGINNER" },
    { name: "GitHub", icon: "github", cat: "TOOLING", level: "BEGINNER" },
    { name: "Web Development", icon: "globe", cat: "DOMAIN", level: "BEGINNER" },
    { name: "Problem Solving", icon: "bulb", cat: "MINDSET", level: "INTERMEDIATE" },
    { name: "Algorithms", icon: "flow", cat: "CS", level: "INTERMEDIATE" },
    { name: "Data Structures", icon: "layers", cat: "CS", level: "BEGINNER" },
  ],

  // Projects. Leave `demo` empty ("") to hide the Live Demo button, or
  // `github` empty to hide the GitHub button.
  // ✏️ The "your-username" links are placeholders — replace them with real repos.
  // `image` (optional): e.g. "assets/images/kalkulator.png" — otherwise a
  // generated holographic visual is used. `accent`: any CSS color.
  projects: [
    {
      code: "PRJ-01",
      title: "KALKULATOR MARLO",
      description: "Interactive calculator application.",
      tags: ["JavaScript", "HTML", "CSS"],
      icon: "calculator",
      accent: "#22e8ff",
      status: "ONLINE",
      image: "",
      github: "https://github.com/your-username/kalkulator-marlo",
      demo: "",
    },
    {
      code: "PRJ-02",
      title: "SNAKE GAME",
      description: "Classic Snake game built with C.",
      tags: ["C", "Game Logic", "Terminal"],
      icon: "snake",
      accent: "#3dff9e",
      status: "PLAYABLE",
      image: "",
      github: "https://github.com/your-username/snake-game",
      demo: "",
    },
    {
      code: "PRJ-03",
      title: "FPB & KPK EDUCATIONAL GAME",
      description:
        "Interactive educational game using the GASING learning approach for elementary students.",
      tags: ["Education", "Game", "GASING"],
      icon: "sigma",
      accent: "#9b5cff",
      status: "LEARNING",
      image: "",
      github: "https://github.com/Marlon666-coder/kpkfpb",
      demo: "https://marlon666-coder.github.io/kpkfpb/",
    },
    {
      code: "PRJ-04",
      title: "KICAU MANIA DETECTOR",
      description: "Experimental computer vision / interactive project.",
      tags: ["Python", "Computer Vision", "Experimental"],
      icon: "eye",
      accent: "#ff7a3d",
      status: "EXPERIMENT",
      image: "",
      github: "https://github.com/your-username/kicau-mania-detector",
      demo: "",
    },
  ],

  // Journey timeline. ✏️ Edit freely — add, remove or reorder entries.
  timeline: [
    { year: "2026", title: "Started programming journey", description: "Wrote the first lines of code and fell in love with building things." },
    { year: "2026", title: "Built first applications", description: "Turned ideas into working apps and games." },
    { year: "2026", title: "Exploring algorithms & competitive programming", description: "Sharpening problem-solving with algorithms and data structures." },
  ],

  // Social links. ✏️ Replace the placeholder URLs/handles (GitHub is already real).
  socials: [
    { name: "GitHub", handle: "@Marlon666-coder", url: "https://github.com/Marlon666-coder", icon: "github" },
    { name: "LinkedIn", handle: "in/your-profile", url: "https://www.linkedin.com/in/your-profile", icon: "linkedin" },
    { name: "Instagram", handle: "@your.instagram", url: "https://www.instagram.com/your.instagram", icon: "instagram" },
    { name: "Email", handle: "your.email@example.com", url: "mailto:your.email@example.com", icon: "mail" },
  ],

  contact: {
    email: "your.email@example.com",
    // Form backend. Leave "" until you have one. Works with any endpoint that
    // accepts JSON POST, e.g. Formspree: "https://formspree.io/f/xxxxxxx"
    endpoint: "",
  },

  // Fire-core palette (hex). Page UI colors live in style.css :root.
  theme: {
    fireCore: "#eaffff",
    fireCyan: "#22e8ff",
    fireBlue: "#2f6bff",
    firePurple: "#8a4dff",
    fireEmber: "#ff7a3d",
  },

  loader: {
    steps: ["LOADING SYSTEM...", "LOADING PROJECTS...", "LOADING CORE...", "SYSTEM ONLINE"],
    durationMs: 1900,
  },
};

/* ---------------------------------------------------------------------
   02. ICONS — inline SVG (no external assets needed)
   --------------------------------------------------------------------- */
const ICONS = {
  github:
    '<path fill="currentColor" stroke="none" d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>',
  linkedin: '<rect x="2.5" y="2.5" width="19" height="19" rx="4"/><path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  arrow: '<path d="M7 17 17 7M9 7h8v8"/>',
  git: '<circle cx="6" cy="5.5" r="2.3"/><circle cx="6" cy="18.5" r="2.3"/><circle cx="18" cy="9" r="2.3"/><path d="M6 7.8v8.4M18 11.3c0 3.5-4 4.2-10.2 5.6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
  flow: '<rect x="3" y="3" width="6" height="6" rx="1.2"/><rect x="15" y="15" width="6" height="6" rx="1.2"/><path d="M6 9v6a3 3 0 0 0 3 3h6M15 6h-3"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 12.5 9 5 9-5"/><path d="m3 16.5 9 5 9-5" opacity=".5"/>',
  calculator: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8.5 6.5h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01" stroke-width="2.2"/>',
  snake: '<path d="M4 18h9a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h9"/><circle cx="19.5" cy="6" r="1.2" fill="currentColor"/>',
  sigma: '<path d="M17 5H7l6 7-6 7h10"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2" opacity=".6"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
};

const svg = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.code}</svg>`;

/* ---------------------------------------------------------------------
   03. UTILS & ENVIRONMENT
   --------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
/** frame-rate independent smoothing factor */
const damp = (k, dt) => 1 - Math.pow(1 - k, dt * 60);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const ENV = {
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  finePointer: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  get small() { return window.innerWidth < 768; },
};
/** low-power mode: touch devices or small screens get lighter effects */
ENV.lowPower = !ENV.finePointer || window.innerWidth < 768;

/* ---------------------------------------------------------------------
   04. TICKER — one shared requestAnimationFrame loop for everything
   --------------------------------------------------------------------- */
const Ticker = {
  fns: new Set(),
  add(fn) { this.fns.add(fn); },
  start() {
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const t = now / 1000;
      this.fns.forEach((fn) => fn(t, dt));
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  },
};

/* ---------------------------------------------------------------------
   05. MOUSE — raw + smoothed normalized position, velocity
   --------------------------------------------------------------------- */
const Mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  nx: 0, ny: 0,   // target, -1..1
  sx: 0, sy: 0,   // smoothed
  vx: 0, speed: 0, // px/s
  lastT: 0,
  init() {
    window.addEventListener("pointermove", (e) => {
      const now = performance.now();
      const dt = Math.max((now - this.lastT) / 1000, 0.008);
      const dx = e.clientX - this.x;
      const dy = e.clientY - this.y;
      this.vx = lerp(this.vx, dx / dt, 0.35);
      this.speed = lerp(this.speed, Math.hypot(dx, dy) / dt, 0.35);
      this.lastT = now;
      this.x = e.clientX;
      this.y = e.clientY;
      this.nx = (e.clientX / window.innerWidth) * 2 - 1;
      this.ny = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    Ticker.add((t, dt) => {
      const k = damp(0.06, dt);
      this.sx = lerp(this.sx, this.nx, k);
      this.sy = lerp(this.sy, this.ny, k);
      // velocity decays when the mouse stops
      const decay = Math.pow(0.9, dt * 60);
      this.vx *= decay;
      this.speed *= decay;
    });
  },
};

/* ---------------------------------------------------------------------
   06. CONTENT RENDERER — builds sections from CONFIG
   --------------------------------------------------------------------- */
const LEVELS = { BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3 };

const Content = {
  render() {
    this.bindings();
    this.about();
    this.stats();
    this.skills();
    this.projects();
    this.timeline();
    this.socials();
    this.contact();
    document.title = `${CONFIG.name} — ${CONFIG.heroRole.charAt(0)}${CONFIG.heroRole.slice(1).toLowerCase()}`;
    $("#year").textContent = new Date().getFullYear();
  },

  bindings() {
    const map = {
      name: CONFIG.name,
      logo: CONFIG.logo,
      role: CONFIG.role,
      heroRole: CONFIG.heroRole,
      tagline: CONFIG.tagline,
      status: CONFIG.status,
      heroDesc: CONFIG.heroDescription,
    };
    $$("[data-bind]").forEach((el) => {
      const val = map[el.dataset.bind];
      if (val == null) return;
      el.textContent = val;
      if (el.hasAttribute("data-text")) el.setAttribute("data-text", val);
    });
    const sym = $("#coreSymbol");
    sym.textContent = CONFIG.coreSymbol;
    sym.setAttribute("data-text", CONFIG.coreSymbol);
  },

  about() {
    $("#aboutText").innerHTML = CONFIG.about.map((p) => `<p>${p}</p>`).join("");

    const box = $("#aboutAvatar");
    const caption = `<div class="about__avatar-caption"><span>ID // ${esc(CONFIG.logo)}</span><b>● VERIFIED</b></div>`;
    const monogram = `
      <div class="avatar-holo">
        <div class="avatar-holo__rings"><i></i><i></i><i></i></div>
        <span class="avatar-holo__mono">${esc(CONFIG.logo.charAt(0))}</span>
      </div>`;

    if (CONFIG.photo) {
      box.innerHTML = `<img src="${esc(CONFIG.photo)}" alt="${esc(CONFIG.name)}" loading="lazy" />${caption}`;
      // graceful fallback if the photo path is wrong
      $("img", box).addEventListener("error", () => { box.innerHTML = monogram + caption; }, { once: true });
    } else {
      box.innerHTML = monogram + caption;
    }
  },

  stats() {
    $("#stats").innerHTML = CONFIG.stats
      .map((s, i) => `
        <div class="stat tilt holo-border reveal" style="--d:${0.1 * i}s">
          <span class="stat__value">${esc(s.value)}</span>
          <span class="stat__label">${esc(s.label)}</span>
        </div>`)
      .join("");
  },

  skills() {
    $("#skillsGrid").innerHTML = CONFIG.skills
      .map((s, i) => {
        const lvl = LEVELS[String(s.level).toUpperCase()] || 1;
        const bars = [1, 2, 3].map((n) => `<i class="${n <= lvl ? "on" : ""}"></i>`).join("");
        const icon = s.icon ? svg(s.icon) : esc(s.mono || s.name.slice(0, 2));
        return `
          <article class="skill tilt holo-border reveal" style="--d:${(i % 4) * 0.07}s">
            <div class="skill__top">
              <span class="skill__icon">${icon}</span>
              <span class="skill__cat">${esc(s.cat || "")}</span>
            </div>
            <h3 class="skill__name">${esc(s.name)}</h3>
            <div class="skill__level">
              <span>${esc(String(s.level).toUpperCase())}</span>
              <span class="skill__bars" aria-label="Level ${lvl} of 3">${bars}</span>
            </div>
          </article>`;
      })
      .join("");
  },

  projects() {
    $("#projectsGrid").innerHTML = CONFIG.projects
      .map((p, i) => {
        const sparks = Array.from({ length: 10 }, () => {
          const left = (Math.random() * 100).toFixed(1);
          const dx = (Math.random() * 60 - 30).toFixed(0);
          const delay = (Math.random() * 2.4).toFixed(2);
          return `<i style="left:${left}%;--dx:${dx}px;animation-delay:${delay}s"></i>`;
        }).join("");
        const visual = p.image
          ? `<img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy" />`
          : `<div class="project__visual">${svg(p.icon)}</div>`;
        const demo = p.demo
          ? `<a class="btn btn--primary btn--sm" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer"><span>LIVE DEMO</span>${svg("arrow")}</a>`
          : "";
        const gh = p.github
          ? `<a class="btn btn--ghost btn--sm" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">${svg("github")}<span>GITHUB</span></a>`
          : "";
        return `
          <article class="project tilt holo-border reveal" style="--accent:${esc(p.accent || "#22e8ff")};--d:${(i % 2) * 0.12}s">
            <div class="project__thumb">
              ${visual}
              <div class="project__scan"></div>
              <span class="project__code">${esc(p.code || `PRJ-0${i + 1}`)}</span>
              ${p.status ? `<span class="project__status">● ${esc(p.status)}</span>` : ""}
            </div>
            <div class="project__body">
              <h3 class="project__title">${esc(p.title)}</h3>
              <p class="project__desc">${esc(p.description)}</p>
              <div class="tags">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
              <div class="project__actions">${gh}${demo}</div>
            </div>
            <div class="project__sparks" aria-hidden="true">${sparks}</div>
            <div class="project__shine" aria-hidden="true"></div>
          </article>`;
      })
      .join("");

    // broken image → fall back to the generated visual
    $$(".project__thumb img").forEach((img, i) => {
      img.addEventListener("error", () => {
        const p = CONFIG.projects.filter((x) => x.image)[i];
        const div = document.createElement("div");
        div.className = "project__visual";
        div.innerHTML = svg(p ? p.icon : "code");
        img.replaceWith(div);
      }, { once: true });
    });
  },

  timeline() {
    $("#timeline").innerHTML = CONFIG.timeline
      .map((item) => `
        <li class="timeline__item reveal">
          <span class="timeline__node"></span>
          <div class="timeline__card glass holo-border">
            <span class="timeline__year">${esc(item.year)}</span>
            <h3 class="timeline__title">${esc(item.title)}</h3>
            ${item.description ? `<p class="timeline__desc">${esc(item.description)}</p>` : ""}
          </div>
        </li>`)
      .join("");
  },

  socials() {
    $("#socialGrid").innerHTML = CONFIG.socials
      .map((s, i) => {
        const external = !s.url.startsWith("mailto:");
        return `
          <a class="social-card tilt holo-border reveal" style="--d:${i * 0.08}s" href="${esc(s.url)}"
             ${external ? 'target="_blank" rel="noopener noreferrer"' : ""} aria-label="${esc(s.name)}">
            <span class="social-card__icon">${svg(s.icon)}</span>
            <span class="social-card__arrow">${svg("arrow")}</span>
            <span class="social-card__name">${esc(s.name)}</span>
            <span class="social-card__handle">${esc(s.handle)}</span>
          </a>`;
      })
      .join("");
  },

  contact() {
    const mail = $("#contactMail");
    mail.href = `mailto:${CONFIG.contact.email}`;
    mail.textContent = CONFIG.contact.email;
  },
};

/* ---------------------------------------------------------------------
   07. LOADER
   --------------------------------------------------------------------- */
const Loader = {
  run() {
    return new Promise((resolve) => {
      const loader = $("#loader");
      const log = $("#loaderLog");
      const fill = $("#loaderFill");
      const pct = $("#loaderPct");
      const steps = CONFIG.loader.steps;
      const duration = ENV.reducedMotion ? 500 : CONFIG.loader.durationMs;
      const start = performance.now();
      let shown = 0;

      const tick = (now) => {
        const p = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - p, 2);
        fill.style.transform = `scaleX(${eased})`;
        pct.textContent = Math.round(eased * 100);

        // reveal a log line at each threshold
        while (shown < steps.length && p >= (shown + 1) / (steps.length + 0.4)) {
          const li = document.createElement("li");
          li.textContent = steps[shown];
          if (shown === steps.length - 1) li.className = "is-final";
          log.appendChild(li);
          shown++;
        }

        if (p < 1) return requestAnimationFrame(tick);

        setTimeout(() => {
          loader.classList.add("is-done");
          document.body.classList.remove("is-loading");
          document.body.classList.add("is-ready");
          setTimeout(() => loader.remove(), 900);
          resolve();
        }, 280);
      };
      requestAnimationFrame(tick);
    });
  },
};

/* ---------------------------------------------------------------------
   08. CUSTOM CURSOR — neon dot + delayed hologram ring
   --------------------------------------------------------------------- */
const Cursor = {
  init() {
    if (!ENV.finePointer) return;
    const dot = $("#cursorDot");
    const ring = $("#cursorRing");
    const glow = $("#mouseGlow");
    document.body.classList.add("has-cursor");

    let rx = Mouse.x, ry = Mouse.y, gx = Mouse.x, gy = Mouse.y;
    const interactive = "a, button, input, textarea, label, .tilt";

    window.addEventListener("pointermove", (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }, { passive: true });

    document.addEventListener("pointerover", (e) => {
      ring.classList.toggle("is-hover", !!e.target.closest(interactive));
    });
    window.addEventListener("pointerdown", () => ring.classList.add("is-down"));
    window.addEventListener("pointerup", () => ring.classList.remove("is-down"));
    document.addEventListener("pointerleave", () => { dot.style.opacity = ring.style.opacity = "0"; });
    document.addEventListener("pointerenter", () => { dot.style.opacity = ring.style.opacity = ""; });

    Ticker.add((t, dt) => {
      const k = ENV.reducedMotion ? 1 : damp(0.18, dt);
      rx = lerp(rx, Mouse.x, k);
      ry = lerp(ry, Mouse.y, k);
      gx = lerp(gx, Mouse.x, damp(0.08, dt));
      gy = lerp(gy, Mouse.y, damp(0.08, dt));
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
      glow.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0)`;
    });
  },
};

/* ---------------------------------------------------------------------
   09. HERO PARALLAX + HUD readouts
   --------------------------------------------------------------------- */
const Hero = {
  visible: true,
  init() {
    const hero = $("#home");
    const grid = $(".fx-grid");
    const coords = $("#hudCoords");
    const temp = $("#coreTemp");

    $$(".holo-tag", hero).forEach((el) => el.style.setProperty("--depth", el.dataset.depth || 1));

    new IntersectionObserver(([entry]) => { this.visible = entry.isIntersecting; }).observe(hero);
    if (!ENV.reducedMotion) this.glitchName($(".hero__name", hero));

    if (ENV.reducedMotion || !ENV.finePointer) return;

    let lastX = 0, lastY = 0, hudT = 0;
    Ticker.add((t) => {
      const px = Mouse.sx, py = Mouse.sy;
      if (Math.abs(px - lastX) < 0.0008 && Math.abs(py - lastY) < 0.0008) return;
      lastX = px; lastY = py;
      grid.style.setProperty("--px", px.toFixed(4));
      grid.style.setProperty("--py", py.toFixed(4));
      if (!this.visible) return;
      hero.style.setProperty("--px", px.toFixed(4));
      hero.style.setProperty("--py", py.toFixed(4));
      if (t - hudT > 0.12) {
        hudT = t;
        coords.textContent = `X: ${String(Math.round(Mouse.x)).padStart(3, "0")} / Y: ${String(Math.round(Mouse.y)).padStart(3, "0")}`;
        temp.textContent = `${(6200 + Math.round(Math.random() * 60)).toLocaleString("en-US")} K`;
      }
    });
  },
};

/* ---------------------------------------------------------------------
   Hero.glitchName: short random RGB-split bursts on the name
   --------------------------------------------------------------------- */
Hero.glitchName = function (el) {
  const burst = (n) => {
    el.classList.add("is-glitch");
    setTimeout(() => {
      el.classList.remove("is-glitch");
      if (n > 0) setTimeout(() => burst(n - 1), 60 + Math.random() * 80);
    }, 70 + Math.random() * 90);
  };
  const loop = () => {
    if (this.visible && !document.hidden) burst((Math.random() * 3) | 0);
    setTimeout(loop, 4000 + Math.random() * 4000);
  };
  setTimeout(loop, 3500);
};

/* ---------------------------------------------------------------------
   10. BACKGROUND CANVAS — stars, floating dots, holographic links
   --------------------------------------------------------------------- */
const Background = {
  init() {
    this.canvas = $("#bgCanvas");
    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) return;
    this.sprite = this.makeSprite();
    this.resize();

    let timer;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(() => { this.resize(); if (ENV.reducedMotion) this.draw(0, 0); }, 150);
    });

    if (ENV.reducedMotion) this.draw(0, 0);
    else Ticker.add((t, dt) => this.draw(t, dt));
  },

  makeSprite() {
    const c = document.createElement("canvas");
    c.width = c.height = 32;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.25, "rgba(255,255,255,0.5)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 32, 32);
    return c;
  },

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // particle budget scales with screen area & device power
    const area = (this.w * this.h) / (1440 * 900);
    const starCount = Math.round((ENV.lowPower ? 70 : 150) * clamp(area, 0.4, 1.4));
    const dotCount = Math.round((ENV.lowPower ? 18 : 42) * clamp(area, 0.4, 1.3));
    const colors = ["34,232,255", "155,92,255", "61,123,255"];

    this.stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      z: 0.2 + Math.random() * 0.8,
      r: Math.random() < 0.9 ? 1 : 1.6,
      ph: Math.random() * Math.PI * 2,
      sp: 0.5 + Math.random() * 1.5,
    }));
    this.dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      z: 0.3 + Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 6,
      vy: -(3 + Math.random() * 10),
      s: 6 + Math.random() * 12,
      c: colors[(Math.random() * colors.length) | 0],
    }));
  },

  draw(t, dt) {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    const mx = Mouse.sx * 24;
    const my = Mouse.sy * 18;
    const scroll = window.scrollY;

    // stars (tiny rects are much cheaper than arcs)
    for (const s of this.stars) {
      const a = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
      let y = (s.y - scroll * s.z * 0.08 - my * s.z) % h;
      if (y < 0) y += h;
      ctx.fillStyle = `rgba(200,230,255,${(a * s.z).toFixed(3)})`;
      ctx.fillRect(s.x - mx * s.z, y, s.r, s.r);
    }

    // floating glowing dots + faint holographic links
    const pts = [];
    ctx.globalCompositeOperation = "lighter";
    for (const d of this.dots) {
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      if (d.y < -20) { d.y = h + 20; d.x = Math.random() * w; }
      if (d.x < -20) d.x = w + 20;
      if (d.x > w + 20) d.x = -20;
      const x = d.x - mx * d.z * 1.6;
      const y = d.y - my * d.z * 1.6;
      pts.push(x, y);
      ctx.globalAlpha = 0.35 * d.z;
      ctx.drawImage(this.sprite, x - d.s / 2, y - d.s / 2, d.s, d.s);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    if (!ENV.lowPower) {
      ctx.lineWidth = 0.6;
      const max = 140 * 140;
      for (let i = 0; i < pts.length; i += 2) {
        for (let j = i + 2; j < pts.length; j += 2) {
          const dx = pts[i] - pts[j], dy = pts[i + 1] - pts[j + 1];
          const d2 = dx * dx + dy * dy;
          if (d2 < max) {
            ctx.strokeStyle = `rgba(34,232,255,${(0.12 * (1 - d2 / max)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i], pts[i + 1]);
            ctx.lineTo(pts[j], pts[j + 1]);
            ctx.stroke();
          }
        }
      }
    }
  },
};

/* ---------------------------------------------------------------------
   11. FIRE CORE — WebGL volumetric ray-marched holographic flame
   --------------------------------------------------------------------- */
const FIRE_VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// STEPS / OCT / PRECISION are injected at compile time based on device power.
const FIRE_FRAG = `
precision __PRECISION__ float;
#define STEPS __STEPS__
#define OCT __OCT__

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;    // smoothed -1..1
uniform float uLean;     // flame lean from mouse velocity
uniform float uDistort;  // hologram distortion 0..1
uniform vec3  uCore, uCyan, uBlue, uPurple, uEmber;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i),                    hash(i + vec3(1.0, 0.0, 0.0)), f.x),
                 mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
             mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
                 mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < OCT; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec3(0.0, 0.0, 1.7);
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// Cheap distance to a teardrop-shaped flame body.
float body(vec3 p, float h) {
  float y = p.y + 0.35;
  float sy = y > 0.0 ? y * 0.45 : y;
  vec2 xz = p.xz * (1.0 + 1.25 * h * h);   // taper towards the tip
  return length(vec3(xz.x, sy, xz.y)) - 0.6;
}

vec3 fireColor(float temp, float h) {
  vec3 c = mix(uPurple, uBlue, smoothstep(0.02, 0.22, temp));
  c = mix(c, uCyan, smoothstep(0.22, 0.5, temp));
  c = mix(c, uCore, smoothstep(0.7, 1.05, temp));
  // a touch of ember on the outer, upper tongues
  c = mix(c, uEmber, smoothstep(0.55, 1.0, h) * (1.0 - smoothstep(0.0, 0.3, temp)) * 0.7);
  return c;
}

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - uRes) / min(uRes.x, uRes.y);

  // --- holographic distortion: wave + glitch rows ---
  float row = floor(uv.y * 26.0);
  float glitch = step(0.9, fract(sin(row * 91.3 + floor(uTime * 14.0)) * 43758.5453));
  uv.x += sin(uv.y * 60.0 + uTime * 28.0) * 0.006 * uDistort;
  uv.x += glitch * uDistort * 0.05 * (fract(sin(row * 12.9898) * 999.0) - 0.5);

  // --- camera orbits with the mouse ---
  vec3 ro = vec3(0.0, 0.1, 3.2);
  vec3 rd = normalize(vec3(uv, -2.0));
  float yaw = uMouse.x * 0.55;
  float pitch = -uMouse.y * 0.22;
  ro.yz = rot(pitch) * ro.yz; rd.yz = rot(pitch) * rd.yz;
  ro.xz = rot(yaw) * ro.xz;   rd.xz = rot(yaw) * rd.xz;

  // --- bounding sphere ---
  vec3 C = vec3(0.0, 0.15, 0.0);
  float R = 1.45;
  vec3 oc = ro - C;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - R * R;
  float disc = b * b - c;

  vec3 col = vec3(0.0);
  float minD = 10.0;

  if (disc > 0.0) {
    float sq = sqrt(disc);
    float t0 = -b - sq;
    float t1 = -b + sq;
    float stepLen = (t1 - t0) / float(STEPS);
    float t = t0 + stepLen * hash(vec3(gl_FragCoord.xy, uTime)); // jitter vs banding
    float trans = 1.0;
    float spin = uTime * 0.35;

    for (int i = 0; i < STEPS; i++) {
      vec3 p = ro + rd * t;
      float h = clamp((p.y + 0.95) / 2.3, 0.0, 1.0);
      p.x -= uLean * h * h * 0.7 + sin(p.y * 3.0 - uTime * 2.2) * 0.045 * h;
      float d = body(p, h);
      minD = min(minD, d);

      if (d < 0.45) {
        vec3 q = p;
        q.xz = rot(spin) * q.xz;  // slow rotation of the energy field
        float n = fbm(q * vec3(2.4, 1.7, 2.4) - vec3(0.0, uTime * 1.6, 0.0));
        float e = d - (n - 0.45) * (0.5 + 0.8 * h) + h * h * 0.18;
        float dens = clamp(-e * 3.0, 0.0, 1.0);
        if (dens > 0.001) {
          float temp = dens * (1.0 - 0.5 * h) + n * 0.15;
          float a = dens * stepLen * 5.5;
          col += fireColor(temp, h) * a * trans * (0.5 + 1.0 * dens);
          trans *= 1.0 - clamp(a * 0.6, 0.0, 1.0);
          if (trans < 0.02) break;
        }
      }
      t += stepLen;
    }
  }

  // --- aura glow following the flame silhouette ---
  float g = max(minD, 0.0);
  col += uCyan * exp(-g * 5.0) * 0.16 + uPurple * exp(-g * 2.2) * 0.07;

  // --- hologram scan band + fine scanlines ---
  float scanY = fract(uTime * 0.22) * 2.6 - 1.3;
  float band = exp(-pow((uv.y - scanY) * 16.0, 2.0));
  col *= 1.0 + band * 1.1;
  col *= 0.9 + 0.1 * sin(uv.y * 240.0 + uTime * 6.0);

  // soft circular vignette so the canvas edge is never visible
  col *= smoothstep(1.05, 0.6, length(uv));

  col = 1.0 - exp(-col * 1.35); // tone map
  float alpha = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha); // premultiplied (col <= alpha)
}
`;

const FireCore = {
  mode: "none",
  lean: 0,
  distort: 0,
  fps: 60,

  init() {
    this.canvas = $("#fireCanvas");
    this.symbol = $("#coreSymbol");
    this.fpsEl = $("#hudFps");
    this.quality = ENV.lowPower
      ? { steps: 18, oct: 3, scale: 0.55 }
      : { steps: 30, oct: 4, scale: 0.8 };

    if (!this.initGL()) this.init2D();

    let timer;
    window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(() => this.resize(), 150); });
    Ticker.add((t, dt) => this.frame(t, dt));
  },

  /* ---------- WebGL path ---------- */
  initGL() {
    let gl;
    try {
      gl = this.canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: "high-performance" })
        || this.canvas.getContext("experimental-webgl");
    } catch (e) { gl = null; }
    if (!gl) return false;
    this.gl = gl;

    const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
    const frag = FIRE_FRAG
      .replace("__PRECISION__", hp && hp.precision > 0 ? "highp" : "mediump")
      .replace("__STEPS__", String(this.quality.steps))
      .replace("__OCT__", String(this.quality.oct));

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("[FireCore] shader compile failed, using 2D fallback:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, FIRE_VERT);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return false;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[FireCore] program link failed, using 2D fallback");
      return false;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // one big triangle
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n) => gl.getUniformLocation(prog, n);
    this.u = {
      res: u("uRes"), time: u("uTime"), mouse: u("uMouse"), lean: u("uLean"), distort: u("uDistort"),
    };
    const th = CONFIG.theme;
    gl.uniform3fv(u("uCore"), hexToRgb(th.fireCore));
    gl.uniform3fv(u("uCyan"), hexToRgb(th.fireCyan));
    gl.uniform3fv(u("uBlue"), hexToRgb(th.fireBlue));
    gl.uniform3fv(u("uPurple"), hexToRgb(th.firePurple));
    gl.uniform3fv(u("uEmber"), hexToRgb(th.fireEmber));
    gl.clearColor(0, 0, 0, 0);

    // context loss → rebuild when restored
    this.canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); this.mode = "lost"; }, { once: true });
    this.canvas.addEventListener("webglcontextrestored", () => { if (this.initGL()) this.resize(); }, { once: true });

    this.mode = "gl";
    this.resize();
    return true;
  },

  /* ---------- Canvas 2D fallback (particle flame) ---------- */
  init2D() {
    // a canvas that failed WebGL may still be bound; use a fresh one
    const fresh = this.canvas.cloneNode(false);
    this.canvas.replaceWith(fresh);
    this.canvas = fresh;
    this.ctx = fresh.getContext("2d");
    if (!this.ctx) return;
    const th = CONFIG.theme;
    this.sprites = [th.fireCore, th.fireCyan, th.fireBlue, th.firePurple, th.fireEmber].map((hex) => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d");
      const [r, gg, b] = hexToRgb(hex).map((v) => Math.round(v * 255));
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, `rgba(${r},${gg},${b},0.9)`);
      grad.addColorStop(0.4, `rgba(${r},${gg},${b},0.3)`);
      grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      return c;
    });
    this.flames = Array.from({ length: ENV.lowPower ? 60 : 110 }, () => this.spawnFlame({}, true));
    this.mode = "2d";
    this.resize();
  },

  spawnFlame(p, randomAge) {
    p.a = Math.random() * Math.PI * 2;
    p.r = Math.random() * 0.2;
    p.life = randomAge ? Math.random() : 0;
    p.speed = 0.45 + Math.random() * 0.5;
    p.size = 0.16 + Math.random() * 0.14;
    p.seed = Math.random() * 100;
    return p;
  },

  resize() {
    if (this.mode !== "gl" && this.mode !== "2d") return;
    const rect = this.canvas.getBoundingClientRect();
    const size = Math.max(64, Math.round(rect.width * Math.min(window.devicePixelRatio || 1, 1.5) * this.quality.scale));
    this.canvas.width = this.canvas.height = size;
    if (this.mode === "gl") {
      this.gl.viewport(0, 0, size, size);
      this.gl.uniform2f(this.u.res, size, size);
    }
  },

  frame(t, dt) {
    if (!Hero.visible || this.mode === "lost" || this.mode === "none") return;

    // reduced motion: slow & throttled (~15fps), no distortion
    if (ENV.reducedMotion) {
      this.acc = (this.acc || 0) + dt;
      if (this.acc < 1 / 15) return;
      this.acc = 0;
    }
    const time = ENV.reducedMotion ? t * 0.35 : t;

    // mouse reaction: lean from horizontal velocity, glitch from speed
    const leanTarget = ENV.reducedMotion ? 0 : clamp(-Mouse.vx / 2600, -0.7, 0.7);
    this.lean = lerp(this.lean, leanTarget, damp(0.06, dt));
    const distTarget = ENV.reducedMotion ? 0 : clamp((Mouse.speed - 400) / 2600, 0, 1);
    this.distort = lerp(this.distort, distTarget, damp(distTarget > this.distort ? 0.3 : 0.05, dt));

    if (this.mode === "gl") {
      const gl = this.gl;
      gl.uniform1f(this.u.time, time % 1000);
      gl.uniform2f(this.u.mouse, Mouse.sx, Mouse.sy);
      gl.uniform1f(this.u.lean, this.lean);
      gl.uniform1f(this.u.distort, this.distort);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      this.draw2D(time, dt);
    }

    // symbol RGB split reacts to distortion
    const g = this.distort.toFixed(2);
    if (g !== this.lastGlitch) { this.symbol.style.setProperty("--glitch", g); this.lastGlitch = g; }

    this.adapt(dt);
  },

  draw2D(t, dt) {
    const ctx = this.ctx;
    const S = this.canvas.width;
    ctx.clearRect(0, 0, S, S);
    ctx.globalCompositeOperation = "lighter";
    const cx = S / 2 + Mouse.sx * S * 0.02;
    const base = S * 0.74;
    const height = S * 0.56;
    for (const p of this.flames) {
      p.life += dt * p.speed;
      if (p.life >= 1) this.spawnFlame(p, false);
      const L = p.life;
      const spread = (1 - L) * 0.22 + 0.02;
      const sway = Math.sin(t * 3 + p.seed + L * 5) * 0.03 * L;
      const x = cx + (Math.cos(p.a + t * 0.6) * p.r * spread * 4 + sway - this.lean * L * L * 0.25) * S;
      const y = base - L * height;
      const size = p.size * S * (1 - L * 0.8);
      const idx = L < 0.18 ? 0 : L < 0.45 ? 1 : L < 0.7 ? 2 : (p.seed > 85 ? 4 : 3);
      ctx.globalAlpha = Math.sin(L * Math.PI) * 0.8;
      ctx.drawImage(this.sprites[idx], x - size / 2, y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  },

  /* adaptive quality: lower resolution if the GPU struggles */
  adapt(dt) {
    this.frames = (this.frames || 0) + 1;
    this.sum = (this.sum || 0) + dt;
    if (this.frames < 60) return;
    const avg = this.sum / this.frames;
    this.fps = Math.round(1 / avg);
    if (this.fpsEl) this.fpsEl.textContent = `CORE: ${this.fps} FPS`;
    if (!ENV.reducedMotion && avg > 1 / 45 && this.quality.scale > 0.35) {
      this.quality.scale *= 0.85;
      this.resize();
    }
    this.frames = 0;
    this.sum = 0;
  },
};

/* ---------------------------------------------------------------------
   12. CORE SPARKS — particles rising from the fire core
   --------------------------------------------------------------------- */
const Sparks = {
  init() {
    if (ENV.reducedMotion) return;
    this.canvas = $("#sparkCanvas");
    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) return;
    this.colors = ["#bff8ff", "#22e8ff", "#6f9bff", "#b18aff", "#ff9a5c"];
    this.list = Array.from({ length: ENV.lowPower ? 16 : 38 }, () => this.spawn({}, true));
    this.resize();
    window.addEventListener("resize", () => this.resize());
    Ticker.add((t, dt) => this.draw(t, dt));
  },

  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.size = r.width;
    this.rect = r;
    this.canvas.width = this.canvas.height = Math.round(r.width * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  },

  spawn(p, randomY) {
    p.x = 0.5 + (Math.random() - 0.5) * 0.36;
    p.y = randomY ? 0.25 + Math.random() * 0.5 : 0.68 + Math.random() * 0.08;
    p.vx = (Math.random() - 0.5) * 0.04;
    p.vy = -(0.06 + Math.random() * 0.12);
    p.life = 1;
    p.decay = 0.25 + Math.random() * 0.35;
    p.r = 0.6 + Math.random() * 1.6;
    p.c = this.colors[Math.random() < 0.08 ? 4 : (Math.random() * 4) | 0];
    return p;
  },

  draw(t, dt) {
    if (!Hero.visible) return;
    const { ctx, size } = this;
    ctx.clearRect(0, 0, size, size);

    // cursor position in core space (for gentle repulsion)
    const r = this.canvas.getBoundingClientRect();
    const mx = (Mouse.x - r.left) / r.width;
    const my = (Mouse.y - r.top) / r.height;

    for (const p of this.list) {
      const dx = p.x - mx, dy = p.y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < 0.02) { p.vx += (dx / Math.sqrt(d2 + 1e-4)) * 0.25 * dt; }
      p.vx += Math.sin(t * 2 + p.y * 10) * 0.01 * dt - FireCore.lean * 0.02 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= p.decay * dt;
      if (p.life <= 0 || p.y < 0.05) this.spawn(p, false);

      ctx.globalAlpha = clamp(p.life, 0, 1) * 0.9;
      ctx.fillStyle = p.c;
      // core dot + soft halo (cheaper than canvas shadowBlur)
      ctx.beginPath();
      ctx.arc(p.x * size, p.y * size, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha *= 0.25;
      ctx.beginPath();
      ctx.arc(p.x * size, p.y * size, p.r * 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  },
};

/* ---------------------------------------------------------------------
   13. TILT CARDS — CSS 3D tilt + cursor-following glow/reflection
   --------------------------------------------------------------------- */
const Tilt = {
  init() {
    if (!ENV.finePointer || ENV.reducedMotion) return;
    $$(".tilt").forEach((el) => {
      const max = el.classList.contains("project") ? 8 : el.classList.contains("about__avatar") ? 6 : 12;
      let raf = 0, cx = 0, cy = 0;

      const apply = () => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const x = clamp((cx - r.left) / r.width, 0, 1);
        const y = clamp((cy - r.top) / r.height, 0, 1);
        el.style.setProperty("--rx", `${((0.5 - y) * max).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((x - 0.5) * max).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        el.style.setProperty("--angle", `${Math.round(90 + (x - 0.5) * 180)}deg`);
      };

      el.addEventListener("pointerenter", () => el.classList.add("is-tilting"));
      el.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        cx = e.clientX; cy = e.clientY;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      el.addEventListener("pointerleave", () => {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        el.classList.remove("is-tilting");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  },
};

/* ---------------------------------------------------------------------
   14. NAVIGATION — sticky glass, active link, hamburger
   --------------------------------------------------------------------- */
const Nav = {
  init() {
    const nav = $("#nav");
    const menu = $("#navMenu");
    const burger = $("#navBurger");
    const links = $$(".nav__link", menu);

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    links.forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 860) setOpen(false); });

    // highlight the link of the section currently in view
    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = byId.get(entry.target.id);
        if (!link) return;
        links.forEach((l) => l.classList.toggle("is-active", l === link));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => io.observe(s));
  },
};

/* ---------------------------------------------------------------------
   15. SCROLL REVEAL + TIMELINE PROGRESS
   --------------------------------------------------------------------- */
const Reveal = {
  init() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));

    // timeline glowing line fills as you scroll
    const tl = $("#timeline");
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = tl.getBoundingClientRect();
      const p = clamp((window.innerHeight * 0.65 - r.top) / r.height, 0, 1);
      tl.style.setProperty("--progress", p.toFixed(3));
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  },
};

/* ---------------------------------------------------------------------
   16. SOUND — generated ambience via Web Audio (no asset files needed)
   OFF by default, never autoplays, only starts after a user click.
   --------------------------------------------------------------------- */
const Sound = {
  on: false,
  init() {
    this.btn = $("#soundToggle");
    this.label = $(".sound-toggle__label", this.btn);
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { this.btn.hidden = true; return; } // feature unavailable → hide, never break
    this.AC = AC;
    this.btn.addEventListener("click", () => (this.on ? this.stop() : this.start()));
  },

  build() {
    const ctx = (this.ctx = new this.AC());
    const master = (this.master = ctx.createGain());
    master.gain.value = 0;
    master.connect(ctx.destination);

    // warm low drone
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 520;
    filter.Q.value = 4;
    filter.connect(master);

    [[55, "sine", 0.5], [82.4, "sine", 0.32], [110.3, "triangle", 0.12], [164.8, "sine", 0.06]].forEach(([f, type, g]) => {
      const o = ctx.createOscillator();
      const gain = ctx.createGain();
      o.type = type;
      o.frequency.value = f;
      gain.gain.value = g;
      o.connect(gain).connect(filter);
      o.start();
    });

    // slow filter sweep
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    // airy filtered noise ("energy hum")
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 1400;
    band.Q.value = 0.8;
    const nGain = ctx.createGain();
    nGain.gain.value = 0.05;
    noise.connect(band).connect(nGain).connect(master);
    noise.start();
  },

  start() {
    if (!this.ctx) this.build();
    this.ctx.resume();
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0.06, now, 0.8);
    this.on = true;
    this.render();
  },

  stop() {
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0, now, 0.25);
    this.on = false;
    this.render();
    setTimeout(() => { if (!this.on) this.ctx.suspend(); }, 1200);
  },

  render() {
    this.btn.classList.toggle("is-on", this.on);
    this.btn.setAttribute("aria-pressed", String(this.on));
    this.label.textContent = `SOUND: ${this.on ? "ON" : "OFF"}`;
  },
};

/* ---------------------------------------------------------------------
   17. CONTACT FORM
   Honest by design: without CONFIG.contact.endpoint nothing is sent and
   the user is told so (with a mailto fallback). Set an endpoint to go live.
   --------------------------------------------------------------------- */
const Contact = {
  init() {
    this.form = $("#contactForm");
    this.status = $("#formStatus");
    this.transmit = $("#transmit");
    this.btn = $("#sendBtn");
    this.form.addEventListener("submit", (e) => this.submit(e));
    $$("input, textarea", this.form).forEach((el) =>
      el.addEventListener("input", () => el.closest(".field").classList.remove("is-invalid")));
  },

  setStatus(type, html) {
    this.status.className = `form-status ${type ? `is-${type}` : ""}`;
    this.status.innerHTML = html;
  },

  validate(data) {
    const errors = [];
    const mark = (name, bad) => $(`[name="${name}"]`, this.form).closest(".field").classList.toggle("is-invalid", bad);
    const badName = !data.name;
    const badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const badMsg = data.message.length < 5;
    mark("name", badName); mark("email", badEmail); mark("message", badMsg);
    if (badName) errors.push("name");
    if (badEmail) errors.push("valid email");
    if (badMsg) errors.push("message");
    return errors;
  },

  async submit(e) {
    e.preventDefault();
    const fd = new FormData(this.form);
    const data = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };
    const errors = this.validate(data);
    if (errors.length) {
      this.setStatus("error", `[!] SIGNAL INCOMPLETE — please enter your ${errors.join(", ")}.`);
      return;
    }

    // holographic transmission effect
    this.setStatus("", "");
    this.btn.disabled = true;
    this.form.classList.add("is-sending");
    this.transmit.classList.add("is-active");
    const minDelay = wait(ENV.reducedMotion ? 300 : 1500);

    const { endpoint, email } = CONFIG.contact;
    const mailto = `mailto:${email}?subject=${encodeURIComponent(`Portfolio contact from ${data.name}`)}&body=${encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)}`;

    try {
      if (!endpoint) {
        await minDelay;
        this.setStatus("warn",
          `[!] TRANSMISSION NOT SENT — no backend is connected yet, so your message was <strong>not</strong> delivered. ` +
          `Your text is still in the form. <a href="${esc(mailto)}">Send it via your email app &raquo;</a>`);
        return;
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      await minDelay;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.form.reset();
      this.setStatus("ok", "[OK] TRANSMISSION COMPLETE — thanks! I'll get back to you soon.");
    } catch (err) {
      await minDelay;
      this.setStatus("error", `[X] TRANSMISSION FAILED (${esc(err.message)}). <a href="${esc(mailto)}">Try email instead &raquo;</a>`);
    } finally {
      this.btn.disabled = false;
      this.form.classList.remove("is-sending");
      this.transmit.classList.remove("is-active");
    }
  },
};

/* ---------------------------------------------------------------------
   18. BOOT
   --------------------------------------------------------------------- */
(function boot() {
  Content.render();   // build DOM from CONFIG first
  Mouse.init();
  Nav.init();
  Reveal.init();
  Tilt.init();
  Cursor.init();
  Hero.init();
  Background.init();
  FireCore.init();    // compiles the shader while the loader is showing
  Sparks.init();
  Sound.init();
  Contact.init();
  Ticker.start();
  Loader.run();
})();
