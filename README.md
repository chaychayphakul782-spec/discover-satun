# Discover Satun Wildlife (Vite + React + SCSS)

สารานุกรมและฐานข้อมูลความหลากหลายทางชีวภาพ สัตว์ป่า และระบบนิเวศแห่งอุทยานธรณีโลกสตูล (Satun UNESCO Global Geopark) พัฒนาด้วย **Vite.js + React 19 + TypeScript + SCSS + Tailwind CSS**

---

## 🚀 คำสั่งเริ่มต้นใช้งาน (Local Development)

```bash
# 1. ติดตั้ง Dependencies (รวมถึง sass/scss)
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

## 🎨 สถาปัตยกรรม SCSS (SCSS Architecture)

โปรเจกต์รองรับ **Sass / SCSS** ร่วมกับ Vite โดยมีการจัดหมวดหมู่ไฟล์สไตล์อย่างเป็นระบบในโฟลเดอร์ `src/styles/`:

```text
src/styles/
├── _variables.scss      # ตัวแปรสีหลักสตูล (Emerald, Teal, Sand), IUCN Status, Typography, Shadows
├── _mixins.scss         # Responsive breakpoints, Card lift hover, Glassmorphism, Custom scrollbar
├── _components.scss     # คลาสคอมโพเนนต์เฉพาะ (.satun-card, .satun-badge, shimmer animation)
└── main.scss            # จุดรวม SCSS หลักที่ถูก import ใน main.tsx
```

---

## 🐙 วิธีนำขึ้นรันบน GitHub Pages (Automated via GitHub Actions)

โปรเจกต์นี้มีไฟล์ GitHub Actions Workflow อยู่ที่ `.github/workflows/deploy.yml` แล้ว เมื่อคุณ Push โค้ดขึ้น GitHub สามารถเปิดใช้งาน GitHub Pages ได้ทันทีตามขั้นตอนนี้:

### ขั้นตอนการตั้งค่า:
1. สร้าง Repository บน GitHub และ Push โค้ดขึ้นไป:
   ```bash
   git init
   git add .
   git commit -m "feat: Satun Wildlife with Vite and SCSS"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git
   git push -u origin main
   ```
2. ไปที่หน้า GitHub Repository ของคุณ:
   - คลิกแท็บ **Settings**
   - ในเมนูด้านซ้าย เลือก **Pages**
   - ภายใต้หัวข้อ **Build and deployment**:
     - ที่ช่อง **Source** ให้เปลี่ยนจาก `Deploy from a branch` เป็น **`GitHub Actions`**
3. GitHub Actions จะเริ่มทำงานและทำการ Build ด้วย Vite + SCSS พร้อม Deploy เว็บไซต์ให้โดยอัตโนมัติ!
4. เมื่อสำเร็จ ลิงก์เว็บไซต์จะปรากฏในแท็บ Pages เช่น:
   `https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY>/`

*(หมายเหตุ: ใน `vite.config.ts` ได้กำหนด `base: './'` ไว้เรียบร้อยแล้ว ทำให้ Path ของไฟล์รูปภาพ JS และ CSS ทำงานได้อย่างสมบูรณ์แบบบน GitHub Pages ทุก Subpath)*

---

## ☁️ ตัวเลือกการนำขึ้นคลาวด์อื่น ๆ (Alternative Cloud Hosting)

### 1. Vercel
- มีไฟล์ `vercel.json` รวมอยู่ในโปรเจกต์แล้ว
- เพียงเชื่อมต่อ GitHub Repository กับ Vercel:
  - **Framework Preset**: `Vite`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

### 2. Netlify
- มีไฟล์ `netlify.toml` และ `public/_redirects` รองรับ SPA routing
- ลากโฟลเดอร์ `dist` วางใน Netlify Drop หรือเชื่อมต่อ Git Repository

### 3. Google Cloud Run / Docker
- มี `Dockerfile` และ `nginx.conf` พร้อมใช้งาน:
  ```bash
  docker build -t satun-wildlife .
  docker run -p 8080:80 satun-wildlife
  ```

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow สำหรับ Deploy ขึ้น GitHub Pages
├── index.html            # HTML Entry point
├── package.json          # Vite + React + SCSS dependencies
├── vite.config.ts        # การตั้งค่า Vite (base: './', SCSS, Tailwind)
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
    ├── index.css         # Tailwind base styles
    ├── types.ts          # Type Definitions (Wildlife, Taxa, Logs)
    ├── styles/           # โครงสร้าง SCSS แบบโมดูล
    │   ├── _variables.scss
    │   ├── _mixins.scss
    │   ├── _components.scss
    │   └── main.scss
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
