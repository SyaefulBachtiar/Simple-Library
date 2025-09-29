<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Ramsey\Uuid\Type\Integer;

class BookController extends Controller
{
    // Manampilkan semua buku
    public function index () {
        try{
        // Ambil semua data buku dari database
        $books = Book::all();

        // Kembalikan response JSON
        return response()->json([
            'message' => 'Data buku berhasil diambil',
            'data' => $books
        ], 200);
        } catch (\Exception $e) {
             // Tangani error jika gagal mengambil data (misal: koneksi database terputus)
            return response()->json([
                'message' => 'Gagal mengambil data buku.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Menyimpan data buku baru (input: title, author, year)
    public function store (Request $request) {
        try {

            // Tahun saat ini
            $currentYear = date('Y');
            
            // Validasi input
            $validatedData = $request->validate([
                'title' => 'required|string|max:150',
                'author' => 'required|string|max:100',
                'year' => "nullable|integer|digits:4|max:$currentYear",
            ]);

            // Buat record baru di database
            $book = Book::create($validatedData);

            // Kembalikan response JSON
            return response()->json([
                'message' => 'Buku berhasil ditambahkan!',
                'data' => $book
            ], 201); // Kode 201 untuk "Created"

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        }
    }

    // Menampilkan detail 1 buku berdasarkan id
    public function show (string $id) {
        
        // Cari buku berdasarkan ID, jika tidak ditemukan akan throw 404
        $book = Book::find($id);

        // Jika data buku tidak ada di table books
        if (!$book) {
            return response()->json([
                'message' => 'Buku tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'message' => 'Detail buku berhasil diambil',
            'data' => $book
        ], 200);
    }

    // Mengubah data buku
    public function update (Request $request, string $id) {
        try {
            // Cari buku berdasarkan ID
            $book = Book::find($id);

            // Jika data buku tidak ada di table books
            if (!$book) {
                return response()->json([
                    'message' => 'Buku tidak ditemukan.'
                ], 404);
            }

            // Tahun saat ini
            $currentYear = date('Y');

            // Validasi input
            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:150',
                'author' => 'sometimes|required|string|max:100',
                'year' => "nullable|integer|digits:4|max:$currentYear",
            ]);

            // Update record
            $book->update($validatedData);

            // Kembalikan response JSON
            return response()->json([
                'message' => 'Buku berhasil diperbarui!',
                'data' => $book
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        }
    }

    // Menghapus data buku
    public function destroy (string $id) {
         // Cari buku
        $book = Book::find($id);

        // Jika data buku tidak ada di table books
        if (!$book) {
            return response()->json([
                'message' => 'Buku tidak ditemukan.'
            ], 404);
        }

        // Hapus record
        $book->delete();

        // Kembalikan response JSON
        return response()->json([
            'message' => 'Buku berhasil dihapus!'
        ], 200);
    }
}
