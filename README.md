<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

#### Pastikan versi php di atas 8.2.0
### 1. Clone Repository
```bash
git clone https://github.com/SyaefulBachtiar/Simple-Library.git
```
### 2. Setelah proses cloning selesai, masuk ke direktori proyek
```bash
cd Simple-Library
```
### 3. Install Dependency Laravel
```bash
composer install
```
### 4. Copy dan Setup Environment File
```bash
cp .env.example .env
```

### 5. Buat Database di phpmyadmin, lalu atur konfigurasi database di file .env:
```bash
DB_DATABASE=simple_library
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=<username database kamu>
DB_PASSWORD=<password database kamu>
```

### 6. Generate App Key
```bash
php artisan key:generate
```
### 7. Migrasi Database
```bash
php artisan migrate
```
### 8. Jalankan Seeder
```bash
php artisan db:seed
```
### 9. Jalankan Laravel
```bash
php artisan serve
```


