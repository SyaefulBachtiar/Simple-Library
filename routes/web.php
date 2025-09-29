<?php

use Illuminate\Support\Facades\Route;

// Halaman utama menampilkan buku
Route::get('/', function () {
    return view('home');
});

// Halaman untuk membuat buku baru
Route::get('/create', function () {
    return view('create_book_data');
});

// Halaman untuk update
Route::get('/update/{id}', function () {
    return view('/create_book_data');
});

// Halaman untuk melihat detail buku
Route::get('/detail/{id}', function () {
    return view('detail_book');
});

// Untuk edit data
// Route::get('/books/{id}/edit', function ($id) {
//     return view('create_book_data');
// });

