# Discover Satun Wildlife (Vite + React)

สารานุกรมและฐานข้อมูลความหลากหลายทางชีวภาพ สัตว์ป่า และระบบนิเวศแห่งอุทยานธรณีโลกสตูล (Satun UNESCO Global Geopark) พัฒนาด้วย **Vite.js + React 19 + TypeScript + Tailwind CSS**

---

## 🚀 คำสั่งเริ่มต้นใช้งาน (Local Development)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. เริ่มต้นเซิร์ฟเวอร์จำลองการทำงาน
npm run dev

# 3. ตรวจสอบโค้ดและ Type-checking
npm run lint

# 4. คอมไพล์โปรเจกต์สำหรับ Production (สร้างโฟลเดอร์ dist/)
npm run build

# 5. ทดสอบพรีวิวผลงานที่ Build แล้ว
npm run preview
```

---

## ☁️ คู่มือการนำขึ้นคลาวด์ (Cloud Hosting Guide)

โปรเจกต์นี้ได้รับการปรับแต่งให้เป็น **Pure Vite SPA (Single Page Application)** แบบมาตรฐาน สามารถนำไปโฮสต์บนแพลตฟอร์มคลาวด์ต่าง ๆ ได้ทันที:

### 1. Vercel (แนะนำ - เร็วและง่ายที่สุด)
- มีไฟล์ `vercel.json` รวมอยู่ในโปรเจกต์แล้ว
- เพียงเชื่อมต่อ GitHub Repository กับ Vercel หรือใช้คำสั่ง:
  ```bash
  npm i -g vercel
  vercel
  ```
- การตั้งค่า Build Settings:
  - **Framework Preset**: `Vite`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

---

### 2. Netlify
- มีไฟล์ `netlify.toml` และ `public/_redirects` พร้อมใช้งาน
- ลากโฟลเดอร์ `dist` วางใน Netlify Drop หรือเชื่อมต่อ Git Repository:
  - **Build command**: `npm run build`
  - **Publish directory**: `dist`

---

### 3. Cloudflare Pages
- เชื่อมต่อ GitHub Repository บน Cloudflare Dashboard
- เลือก Framework preset: **Vite**
- **Build command**: `npm run build`
- **Build output directory**: `dist`

---

### 4. Google Cloud Run / Docker Container
- โปรเจกต์มี `Dockerfile` (Multi-stage Node.js build + Nginx Alpine) และ `nginx.conf` พร้อมใช้งาน
- คำสั่ง Build & Run ด้วย Docker:
  ```bash
  # Build Docker Image
  docker build -t satun-wildlife .

  # รัน Container บนพอร์ต 8080 (หรือ 3000)
  docker run -p 8080:80 satun-wildlife
  ```
- Deploy ตรงสู่ **Google Cloud Run**:
  ```bash
  gcloud run deploy satun-wildlife --source . --platform managed --allow-unauthenticated
  ```

---

### 5. GitHub Pages
- ติดตั้ง `gh-pages` หรือใช้ GitHub Actions
- หากใช้ Subpath บน GitHub Pages สามารถกำหนด `base: '/repository-name/'` ใน `vite.config.ts`

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
├── index.html            # HTML Entry point
├── package.json          # Vite + React scripts & dependencies
├── vite.config.ts        # การตั้งค่า Vite & Tailwind plugin
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel SPA routing
├── netlify.toml          # Netlify build & rewrite configuration
├── Dockerfile            # Container build for Cloud Run / Docker
├── nginx.conf            # Nginx SPA config
├── public/
│   ├── _redirects        # Netlify / Cloudflare SPA fallback
│   └── assets/           # ภาพและสัญลักษณ์
└── src/
    ├── main.tsx          # React Root DOM Mount
    ├── App.tsx           # หน้าจอหลักและ State Filtering
    ├── index.css         # Global Styles & Typography
    ├── types.ts          # Type Definitions (Wildlife, Taxa, Logs)
    ├── data/
    │   └── wildlifeData.ts # ข้อมูลสัตว์ป่า 12 สายพันธุ์และสมุดปูม
    └── components/       # UI Components ย่อย
        ├── Navbar.tsx
        ├── HeroSection.tsx
        ├── FilterControlDeck.tsx
        ├── WildlifeCard.tsx
        ├── WildlifeDetailModal.tsx
        ├── CitizenScienceSection.tsx
        ├── InfoModal.tsx
        └── Footer.tsx
```
