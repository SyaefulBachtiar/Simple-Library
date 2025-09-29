// Fungsi untuk menghapus buku

async function deleteBook(id, fromDetailPage = false) {
    if (!confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
        return;
    }

    // Loading
    showLoading();

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            },
        });

        const result = await response.json();

        if (response.ok) {
            displayStatus("Buku berhasil dihapus!", "success");

            if (fromDetailPage) {
                // Redirect ke index jika hapus dari halaman detail
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                // Reload data jika hapus dari halaman index
                setTimeout(() => {
                    fetchBooks();
                }, 1000);
            }
        } else {
            displayStatus(result.message || "Gagal menghapus buku.", "danger");
        }
    } catch (error) {
        displayStatus("Koneksi API gagal. Pastikan server berjalan.", "danger");
    } finally {
        hideLoading();
    }
}
