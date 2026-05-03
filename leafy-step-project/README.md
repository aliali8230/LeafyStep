# LeafyStep - Personal Carbon Tracker

LeafyStep adalah aplikasi web sederhana untuk melacak emisi karbon harian secara instan. Pengguna dapat menginput aktivitas sehari-hari seperti berkendara, penggunaan AC, dan pemakaian laptop, lalu mendapatkan estimasi emisi CO₂ yang dihasilkan.

## Struktur Project

```
leafy-step-project/
  |
  +-- public/
  |     +-- index.html       # Halaman landing page utama
  |     +-- calculator.html  # Halaman kalkulator emisi
  |     +-- style.css        # Seluruh styling aplikasi
  |     +-- main.js          # Logika frontend (Vanilla JS)
  |
  +-- app.js                 # Server Node.js (HTTP statis)
  +-- package.json           # Konfigurasi project Node.js
  +-- README.md              # Dokumentasi project
  +-- .gitignore             # Exclude node_modules
```

## Cara Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org/) versi 14 atau lebih baru

### Langkah-langkah

1. **Clone atau ekstrak project ini**

2. **Masuk ke folder project**
   ```bash
   cd leafy-step-project
   ```

3. **Jalankan server**
   ```bash
   node app.js
   ```
   atau
   ```bash
   npm start
   ```

4. **Buka browser** dan akses:
   ```
   http://localhost:3000
   ```

## Fitur

- **Landing Page** — Penjelasan mengapa emisi karbon penting, cara kerja kalkulator, dan dashboard dampak (dashboard ini masih diinput dan diedit manual (statis)).
- **Kalkulator Emisi** — Input jarak tempuh kendaraan (motor/mobil), jam penggunaan AC, dan jam penggunaan laptop untuk mendapatkan estimasi emisi CO₂.
- **Status Visual** — Warna latar berubah secara real-time sesuai tingkat emisi (hijau/kuning/merah).
- **Bar Chart SVG** — Visualisasi sebaran emisi per kategori dengan animasi smooth.
- **Rencana Aksi** — Daftar langkah kecil yang bisa dilakukan pengguna untuk mengurangi jejak karbon.

## Koefisien Emisi yang Digunakan

| Aktivitas | Satuan  | Koefisien Emisi |
|-----------|---------|-----------------|
| Motor     | per km  | 0.1 kg CO₂e     |
| Mobil     | per km  | 0.2 kg CO₂e     |
| AC        | per jam | 0.5 kg CO₂e     |
| Laptop    | per jam | 0.05 kg CO₂e    |


## Teknologi

- **Frontend**: HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Backend**: Node.js (built-in `http` module, tanpa framework) fokus fe
- **Font**: Plus Jakarta Sans (Google Fonts)

## Catatan
- Tidak ada dependensi npm yang perlu diinstall — server menggunakan modul bawaan Node.js.
- Folder `node_modules` tidak disertakan (tidak ada karena tidak menggunakan npm packages eksternal).
