# Discover Satun Wildlife (Vite + React + SCSS)

สารานุกรมและฐานข้อมูลความหลากหลายทางชีวภาพ สัตว์ป่า และระบบนิเวศแห่งอุทยานธรณีโลกสตูล (Satun UNESCO Global Geopark) พัฒนาด้วย **Vite.js + React 19 + TypeScript + SCSS + Tailwind CSS**

---

## 🚨 สาเหตุที่ GitHub Pages "ขึ้นหน้าขาว" (Blank Page) และวิธีแก้ไข

หากเปิดลิงก์ GitHub Pages แล้วพบเป็นหน้าขาว มักเกิดจาก **2 สาเหตุหลัก** ดังนี้:

### สาเหตุที่ 1: GitHub Pages ตั้งค่า Source เป็น `Deploy from a branch` (main / root)
- **ปัญหา**: เมื่อ GitHub Pages ถูกตั้งให้ดึงไฟล์จากกิ่ง `main` โฟลเดอร์ `/` (Root) โดยตรง GitHub จะเปิดไฟล์ `index.html` ของ Source Code ซึ่งมีคำสั่งเรียก `/src/main.tsx` โดยที่เบราว์เซอร์ไม่สามารถรันโค้ด TypeScript JSX ได้ ส่งผลให้หน้าจอขาวสนิท
- **วิธีแก้ที่ 1 (แนะนำ - อัตโนมัติ)**:
  1. เข้าไปที่หน้า Repository บน GitHub
  2. ไปที่ **Settings** > **Pages**
  3. ในหัวข้อ **Build and deployment** > ช่อง **Source**: เปลี่ยนจาก `Deploy from a branch` เป็น **`GitHub Actions`**
  4. ไฟล์ `.github/workflows/deploy.yml` จะทำการ `npm run build` แปลงโค้ดเป็น Production Bundle ในโฟลเดอร์ `dist/` แล้ว Deploy ขึ้นอัตโนมัติ 100%
- **วิธีแก้ที่ 2 (ใช้คำสั่ง deploy สู่กิ่ง `gh-pages`)**:
  - โปรเจกต์ได้ติดตั้ง `gh-pages` ไว้ให้แล้ว คุณสามารถรันคำสั่ง:
    ```bash
    npm run deploy
    ```
  - คำสั่งนี้จะ build และ push เฉพาะโฟลเดอร์ `dist` ไปยังกิ่ง `gh-pages` จากนั้นในหน้า Settings > Pages ให้เลือก Source เป็น `Deploy from a branch` และเลือกกิ่ง **`gh-pages`** / `(root)`

---

### สาเหตุที่ 2: Base Path URL ของ Assets ผิดเพี้ยน
- **ปัญหา**: GitHub Pages จะมี URL ประจำโปรเจกต์เป็น `https://<username>.github.io/<repository-name>/` หากไม่ได้ตั้งค่า Base Path เบราว์เซอร์จะไปตามหาไฟล์ JavaScript/CSS ที่ root `https://<username>.github.io/assets/...` ทำให้เกิด 404 Not Found และหน้าขาว
- **การแก้ไขในโค้ด**:
  - ได้อัปเดต `vite.config.ts` ให้ตรวจจับชื่อ Repository จาก GitHub Actions อัตโนมัติ (`process.env.GITHUB_REPOSITORY` หรือ `VITE_BASE_PATH`) และ fallback เป็น `./` ให้เรียบร้อยแล้ว
  - ปรับปรุง `.github/workflows/deploy.yml` ให้ส่ง Path ของ Repository ให้ Vite คอมไพล์ได้ถูกต้องแม่นยำ

---

## 🚀 คำสั่งเริ่มต้นใช้งาน (Local Development)

```bash
# 1. ติดตั้ง Dependencies (รวมถึง sass/scss และ gh-pages)
npm install

# 2. เริ่มต้นเซิร์ฟเวอร์จำลองการทำงาน
npm run dev

# 3. ตรวจสอบโค้ดและ Type-checking
npm run lint

# 4. คอมไพล์โปรเจกต์สำหรับ Production (สร้างโฟลเดอร์ dist/)
npm run build

# 5. ทดสอบพรีวิวผลงานที่ Build แล้ว
npm run preview

# 6. (ทางเลือก) สั่ง Deploy ตรงสู่กิ่ง gh-pages
npm run deploy
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

---

## ☁️ ตัวเลือกการนำขึ้นคลาวด์อื่น ๆ (Alternative Cloud Hosting)

### 1. Vercel
- มีไฟล์ `vercel.json` รวมอยู่ในโปรเจกต์แล้ว
- เชื่อมต่อ GitHub Repository กับ Vercel:
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
├── package-lock.json     # Lockfile สำหรับ GitHub Actions CI
├── vite.config.ts        # การตั้งค่า Vite (Dynamic base URL, SCSS, Tailwind)
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
