# MARLO.RV — Futuristic Holographic Developer Portfolio

Portfolio personal **Marlo Rizky Valentino** dengan tema *holographic sci-fi*: fire core 3D (WebGL), partikel, glassmorphism, kartu 3D tilt, custom cursor, dan loading screen.

**Tanpa dependency.** Hanya HTML + CSS + JavaScript murni. Tidak perlu npm, build step, CDN, atau internet.

---

## Cara menjalankan

**Online:** https://marlon666-coder.github.io/porto/ (GitHub Pages dari branch `main`)

**Lokal:**

```bash
git clone https://github.com/Marlon666-coder/porto.git
cd porto
```

- **Opsi 1: langsung buka.** Double-click `index.html`. Semua fitur jalan dari `file://`.
- **Opsi 2: local server (disarankan).** `python3 -m http.server 8000` lalu buka http://localhost:8000 (atau `npx serve .`).

**Deploy ke GitHub Pages:** *Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)` → Save.* Setiap push ke `main` akan otomatis ter-deploy ulang. File `.nojekyll` membuat GitHub Pages menyajikan file apa adanya, tanpa diproses Jekyll. Folder ini juga bisa di-upload apa adanya ke Netlify, Vercel, atau hosting statis lain.

---

## Struktur project

```
portfolio-marlo/
├── index.html          # Struktur halaman & semua section
├── style.css           # Seluruh styling, efek, responsive, reduced-motion
├── script.js           # CONFIG + semua modul interaktif (fire core, partikel, dll.)
├── assets/
│   ├── images/         # Foto profil & screenshot project (opsional)
│   ├── icons/          # favicon.svg
│   └── sounds/         # Opsional. Ambience dibuat lewat Web Audio API
└── README.md
```

### Modul di `script.js`

| Modul | Fungsi |
|---|---|
| `CONFIG` | **Semua konten yang bisa diedit** |
| `ICONS` | Ikon SVG inline, jadi tidak ada file ikon yang bisa rusak/hilang |
| `Ticker` | Satu loop `requestAnimationFrame` untuk semua animasi |
| `Mouse` | Posisi mouse (versi mentah & yang sudah dihaluskan) serta kecepatannya |
| `Content` | Me-render About, Stats, Skills, Projects, Timeline, Social dari `CONFIG` |
| `Loader` | Loading screen ±2 detik |
| `Cursor` | Titik neon + ring hologram yang mengikuti dengan delay |
| `Hero` | Parallax hero, floating hologram tags, HUD |
| `Background` | Canvas bintang, titik melayang, dan garis hologram |
| `FireCore` | **Api hologram 3D.** Shader WebGL *ray-marched volumetric*, fallback Canvas 2D |
| `Sparks` | Partikel yang naik dari api dan menjauh dari cursor |
| `Tilt` | 3D tilt, glow, dan refleksi yang mengikuti cursor pada kartu |
| `Nav` | Navbar sticky glass, link aktif, menu hamburger |
| `Reveal` | Animasi scroll (IntersectionObserver) + progress garis timeline |
| `Sound` | Ambience lembut via Web Audio. Default **OFF**, tidak autoplay |
| `Contact` | Validasi form + efek transmisi. Tidak pura-pura mengirim |

### Kenapa bukan Three.js?

Fire core dibuat dengan **WebGL shader langsung** (±150 baris GLSL). Hasilnya api volumetrik 3D yang benar-benar punya kedalaman, berputar pelan, miring mengikuti gerakan mouse, dan kamera ikut orbit mengikuti cursor. Cara ini lebih ringan daripada memuat Three.js (~600 KB) dan tidak butuh CDN. Kalau WebGL tidak tersedia, otomatis pindah ke **fallback Canvas 2D** (api dari partikel).

Kalau nanti mau pakai Three.js/GSAP, tambahkan `<script src="...">` sebelum `script.js` di `index.html`.

---

## Yang perlu kamu edit

Hampir semuanya ada di **objek `CONFIG` di bagian paling atas `script.js`**.

| Yang mau diganti | Lokasi |
|---|---|
| **Nama**, role, tagline, status, deskripsi hero | `CONFIG.name`, `role`, `heroRole`, `tagline`, `status`, `heroDescription` |
| Logo navbar (`MRV`) | `CONFIG.logo` |
| Simbol di dalam api (`</>` / `M`) | `CONFIG.coreSymbol` |
| **Foto** | Taruh file di `assets/images/`, lalu isi `CONFIG.photo: "assets/images/marlo.jpg"`. Kalau dikosongkan, yang tampil monogram hologram. Kalau path-nya salah, otomatis kembali ke monogram |
| Teks About | `CONFIG.about` (array paragraf, boleh pakai `<strong>`) |
| Kartu statistik | `CONFIG.stats` |
| **Skill** | `CONFIG.skills`. `level`: `BEGINNER` / `INTERMEDIATE` / `ADVANCED`. Isi `mono: "C++"` untuk badge teks, atau `icon: "git"` untuk ikon dari `ICONS` |
| **Project** | `CONFIG.projects`: `title`, `description`, `tags`, `icon`, `accent` (warna), `status`, `image` (opsional), `github`, `demo` (kosongkan `""` untuk menyembunyikan tombol Live Demo) |
| Timeline | `CONFIG.timeline` (tambah/hapus entri bebas) |
| **GitHub / social media** | `CONFIG.socials` (`url` & `handle`) |
| **Email** | `CONFIG.contact.email`, juga ganti entri Email di `CONFIG.socials` |
| Backend form | `CONFIG.contact.endpoint`, mis. `"https://formspree.io/f/xxxx"`. Data dikirim sebagai JSON POST `{ name, email, message }` |
| **Warna UI** | `style.css`, bagian `:root` (`--cyan`, `--blue`, `--purple`, `--ember`, `--bg`, …) |
| **Warna api** | `CONFIG.theme` (`fireCore`, `fireCyan`, `fireBlue`, `firePurple`, `fireEmber`) |
| Teks loading & durasinya | `CONFIG.loader` |
| **Efek hologram** | Label melayang: `index.html` (`.holo-tag`, `data-depth` = kekuatan parallax). Flicker/RGB split/scanline: `style.css` (`@keyframes flicker`, `rgbShift`, `.fx-scanlines`, `.fx-noise`). Bentuk & gerak api: `FIRE_FRAG` di `script.js` (lihat komentar `body()`, `fireColor()`, `uTime * 1.6` = kecepatan naik api, `spin` = rotasi) |
| Kualitas/performa api | `FireCore.init()` → `quality` (`steps`, `oct`, `scale`) |
| Jumlah partikel | `Background.resize()` (`starCount`, `dotCount`) dan `Sparks.init()` |

> ⚠️ Level skill, statistik, timeline, dan semua URL di `CONFIG` masih **placeholder**. Sesuaikan dengan data aslimu.

---

## Performa & aksesibilitas

- Satu loop `requestAnimationFrame`. Animasi otomatis berhenti saat tab tidak aktif, dan api/partikel hero berhenti di-render saat hero keluar dari layar.
- **Kualitas adaptif:** kalau FPS api turun di bawah ±45, resolusi render diturunkan otomatis.
- **Mobile / touch:** step shader, oktaf noise, resolusi, dan jumlah partikel dikurangi. Tilt dan custom cursor dimatikan. Tidak ada horizontal scroll.
- **`prefers-reduced-motion`:** animasi CSS dimatikan, background statis, api diperlambat ke ±15 fps, dan sparks, tilt, serta distorsi dimatikan.
- Menu bisa ditutup dengan tombol `Esc`, ada fokus terlihat saat navigasi keyboard, dan `aria-live` untuk status form.

## Catatan form kontak

Tanpa `endpoint`, form **tidak mengirim apa pun**. Setelah efek transmisi, form menampilkan pesan jujur *"TRANSMISSION NOT SENT"* beserta link `mailto:` yang sudah terisi, dan isi form tidak dihapus. Setelah `endpoint` diisi, form mengirim sungguhan dan menampilkan sukses/gagal sesuai respons server.
