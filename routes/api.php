<?php 

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

// Perintah ini secara otomatis menghasilkan endpoint API CRUD (GET, POST, PUT, DELETE)
Route::apiResource('books', BookController::class); 