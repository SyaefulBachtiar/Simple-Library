// Elemen DOM
const booksTbody = document.getElementById("books-tbody");
const emptyMessage = document.getElementById("empty-message");
const noResultsMessage = document.getElementById("no-results");
const statusMessage = document.getElementById("status-message");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");
const bookCount = document.getElementById("count-text");
const loadingOverlay = document.querySelector(".loading-overlay");

let allBooks = [];

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

// Fungsi untuk mengambil dan menampilkan buku
async function fetchBooks() {
    booksTbody.innerHTML = "";
    emptyMessage.classList.add("d-none");
    noResultsMessage.classList.add("d-none");
    statusMessage.classList.add("d-none");
    showLoading();

    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (response.ok) {
            allBooks = result.data;
            renderBooks(allBooks);
            updateBookCount(allBooks.length);
        } else {
            displayStatus(
                `Failed to load data: ${result.message || "Server error."}`,
                "danger"
            );
        }
    } catch (error) {
        displayStatus(
            `API connection failed. Make sure server is running.`,
            "danger"
        );
    } finally {
        hideLoading();
    }
}

function renderBooks(books) {
    booksTbody.innerHTML = "";

    if (books.length === 0) {
        if (allBooks.length === 0) {
            emptyMessage.classList.remove("d-none");
        } else {
            noResultsMessage.classList.remove("d-none");
        }
        return;
    }

    let counter = 1;
    books.forEach((book) => {
        const row = booksTbody.insertRow();

        row.innerHTML = `
                    <th scope="row">${counter++}</th>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.year || "-"}</td>
                    <td>
                        <a href="/detail/${book.id}" class="btn btn-outline-primary btn-action">
                            <i class="bi bi-eye"></i>
                        </a>
                        <a href="/update/${book.id}" class="btn btn-outline-warning btn-action">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <button onclick="deleteBook(${
                            book.id
                        })" class="btn btn-outline-danger btn-action">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
    });
}

function updateBookCount(count) {
    bookCount.textContent = `${count} Book${count !== 1 ? "s" : ""}`;
}

// Fungsi pencarian
function filterBooks(searchTerm) {
    if (!searchTerm) {
        renderBooks(allBooks);
        updateBookCount(allBooks.length);
        return;
    }

    const filteredBooks = allBooks.filter(
        (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderBooks(filteredBooks);
    updateBookCount(filteredBooks.length);
}

// Event listeners
searchInput.addEventListener("input", (e) => {
    filterBooks(e.target.value);
});

clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterBooks("");
});

// Fungsi untuk menghapus buku
function deleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        showLoading();
        // Implementasi penghapusan buku di sini
        setTimeout(() => {
            hideLoading();
            displayStatus("Book deleted successfully!", "success");
            fetchBooks(); // Refresh data
        }, 1000);
    }
}

// Jalankan saat halaman dimuat
window.onload = fetchBooks;
