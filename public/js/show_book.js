// Elemen DOM
const statusMessage = document.getElementById("status-message");
const bookDetail = document.getElementById("book-detail");
const loadingOverlay = document.querySelector(".loading-overlay");

// Fungsi utilitas
function showLoading() {
    loadingOverlay.style.display = "flex";
}

function hideLoading() {
    loadingOverlay.style.display = "none";
}

function displayStatus(message, type = "info") {
    statusMessage.textContent = message;
    statusMessage.className = `alert alert-${type}`;
    statusMessage.classList.remove("d-none");

    setTimeout(() => {
        statusMessage.classList.add("d-none");
    }, 5000);
}

function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Fungsi untuk mengambil dan menampilkan detail buku
const bookId = window.location.pathname.split("/").pop();

async function fetchBookDetail(id) {
    showLoading();

    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();

        if (response.ok) {
            displayBookDetail(result.data);
        } else {
            displayStatus(result.message || "Book not found.", "danger");
        }
    } catch (error) {
        displayStatus(
            "API connection failed. Make sure server is running.",
            "danger"
        );
    } finally {
        hideLoading();
    }
}

function displayBookDetail(book) {
    document.getElementById("detail-title").textContent = book.title;
    document.getElementById("detail-author").textContent = book.author;
    document.getElementById("detail-year").textContent = book.year || "-";
    document.getElementById("detail-created").textContent = formatDate(
        book.created_at
    );
    document.getElementById("detail-updated").textContent = formatDate(
        book.updated_at
    );

    // Update edit button link
    document.getElementById("edit-btn").href = `/update/${book.id}`;

    // Setup delete button
    document.getElementById("delete-btn").onclick = () =>
        deleteBookFromDetail(book.id);

    // Show detail section
    bookDetail.classList.remove("d-none");
}

function deleteBookFromDetail(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        showLoading();

        // Simulasi penghapusan buku
        setTimeout(() => {
            hideLoading();
            displayStatus("Book deleted successfully!", "success");

            // Redirect ke halaman list setelah 1 detik
            setTimeout(() => {
                window.location.href = "/";
            }, 800);
        }, 800);
    }
}

// Load detail saat halaman dimuat
if (bookId) {
    window.onload = () => fetchBookDetail(bookId);
} else {
    window.onload = () => {
        displayStatus("Book ID not found.", "danger");
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };
}
