# Product Requirement Document (PRD)
## Project: Birthday Gift Web Application ("To The Prettiest Girl I Know")

---

## 1. Project Overview
### 1.1 Background
Proyek ini bertujuan untuk membuat sebuah website interaktif sebagai kado ulang tahun spesial untuk seseorang yang berharga (HTS). Website ini berfungsi sebagai ruang digital privat yang merangkum ucapan selamat, galeri foto bersama, pemutar musik/playlist favorit, serta pesan-pesan personal yang interaktif dan berkesan.

### 1.2 Objectives
*   Memberikan kejutan ulang tahun yang unik, personal, dan estetik.
*   Menyediakan platform digital untuk menyimpan memori foto dan playlist lagu favorit.
*   Menghadirkan pengalaman pengguna (UX) yang menyentuh, romantis, dan interaktif menggunakan animasi modern.

---

## 2. User Experience (UX) & Flow
1.  **Landing Page (The Gate):** Halaman awal yang misterius/estetik dengan tombol interaktif (misalnya: "Click to Open Layout" atau "Buka Kado").
2.  **Main Page:** Setelah tombol diklik, musik latar otomatis berputar (jika diizinkan browser) atau muncul *custom player*, diikuti dengan transisi animasi menuju konten utama.
3.  **Content Scrolling:** Pengguna dapat menjelajahi bagian demi bagian dengan efek *smooth-scroll* atau transisi per halaman (fade-in).

---

## 3. Feature Requirements

### 3.1 Core Features (MVP)
*   **Hero Section:** Ucapan selamat ulang tahun utama dengan tipografi yang elegan dan estetik, dilengkapi dengan animasi teks (typing effect).
*   **Interactive Photography Gallery:** Galeri foto interaktif yang dioptimalkan untuk menampilkan foto-foto pemandangan, momen bersama, atau foto estetik lainnya dengan tata letak grid yang rapi.
*   **Embedded Music Playlist:** Integrasi pemutar musik (menggunakan Spotify Embed Player atau YouTube API) yang memutar lagu-lagu berkesan atau lagu favoritnya.
*   **Digital Love Notes / Praise Paragraphs:** Bagian khusus yang menampilkan paragraf ucapan, pujian, dan harapan yang ditulis secara mendalam dan personal.
*   **Custom Footer:** Penutup halaman yang manis, misalnya teks dedikasi kecil dengan ikon hati (e.g., *"Made with love for [Name] x 2026"*).

### 3.2 Nice-to-Have Features (Future Enhancements)
*   **Countdown Timer:** Penghitung mundur menuju hari ulang tahunnya (jika website diberikan sebelum hari-H).
*   **Virtual Scratch Card:** Fitur interaktif di mana dia bisa "menggosok" layar digital untuk memunculkan pesan tersembunyi.
*   **Floating Animations:** Animasi kelopak bunga, gelembung, atau bintang-bintang kecil yang melayang lembut di latar belakang.

---

## 4. Technical Stack Recommendations
*   **Frontend:** HTML5, CSS3 (menggunakan Flexbox/Grid untuk kerapian layout), dan JavaScript murni (Vanilla JS) untuk interaksi animasi.
*   **Libraries (Optional):** 
    *   `Tailwind CSS` (untuk *styling* cepat dan responsif).
    *   `AOS (Animate On Scroll)` atau `Framer Motion` (untuk efek animasi masuk yang halus saat di-scroll).
*   **Deployment:** GitHub Pages, Vercel, atau Netlify (gratis, cepat, dan mudah dihubungkan dari repositori kode).

---

## 5. Design & Aesthetics Guidelines
*   **Theme/Vibe:** Estetik, hangat, minimalis, dan modern (Streetwear/Vintage-inspired soft look atau Clean-minimalist).
*   **Color Palette:** Warna-warna lembut yang nyaman di mata (seperti kombinasi *earth tones*, pastel, atau tema gelap yang elegan).
*   **Typography:** Kombinasi font Serif yang elegan untuk judul (e.g., *Playfair Display*) dan font Sans-Serif yang bersih untuk teks narasi (e.g., *Inter* atau *Poppins*).
*   **Navigation:** Menggunakan interaksi berbasis scroll halus (*smooth-scroll*) agar terasa mengalir seperti membaca sebuah cerita.