// Fungsi untuk membuat buku baru
const bookForm = document.getElementById("book-form");

// Cek apakah ini mode create / bukan update
const pathParts = window.location.pathname.split("/").filter(Boolean);
const lastPart = pathParts[pathParts.length - 1];

// Kalau URL `/create` maka create mode
const isCreate = lastPart === "create";

// Kalau bukan create, berarti itu ID buku
const bookId = isCreate ? null : lastPart;

if (isCreate && bookForm) {
    bookForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Reset pesan error
        clearErrors();

        const formData = {
            title: document.getElementById("title").value.trim(),
            author: document.getElementById("author").value.trim(),
            year: document.getElementById("year").value || null,
        };

        // Validasi dari sisi client
        if (!validateForm(formData)) {
            return;
        }

        // Loading
        showLoading();

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                displayStatus("Book created successfully!", "success");
                bookForm.reset();

                // Redirect ke halaman list setelah 1.5 detik
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                // Handle validation errors dari server
                handleServerErrors(result);
                displayStatus(
                    result.message || "Failed to create book.",
                    "danger"
                );
            }
        } catch (error) {
            displayStatus(
                "API connection failed. Make sure server is running.",
                "danger"
            );
        } finally {
            hideLoading();
        }
    });
}

// Fungsi validasi form
function validateForm(formData) {
    let isValid = true;

    if (!formData.title) {
        showError("title", "Please enter book title");
        isValid = false;
    }

    if (!formData.author) {
        showError("author", "Please enter author name");
        isValid = false;
    }

    if (
        formData.year &&
        (formData.year < 1000 || formData.year > new Date().getFullYear())
    ) {
        showError(
            "year",
            `Please enter a valid year between 1000 and ${new Date().getFullYear()}`
        );
        isValid = false;
    }

    return isValid;
}

// Fungsi untuk menampilkan error
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement && inputElement) {
        errorElement.textContent = message;
        inputElement.classList.add("is-invalid");
    }
}

// Fungsi untuk clear errors
function clearErrors() {
    document.querySelectorAll(".invalid-feedback").forEach((el) => {
        el.textContent = "";
    });
    document.querySelectorAll(".is-invalid").forEach((el) => {
        el.classList.remove("is-invalid");
    });
}

// Event listeners untuk real-time validation
document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const yearInput = document.getElementById("year");

    if (titleInput) {
        titleInput.addEventListener("input", function () {
            if (this.value.trim()) {
                this.classList.remove("is-invalid");
            }
        });
    }

    if (authorInput) {
        authorInput.addEventListener("input", function () {
            if (this.value.trim()) {
                this.classList.remove("is-invalid");
            }
        });
    }

    if (yearInput) {
        yearInput.addEventListener("input", function () {
            const year = parseInt(this.value);
            if (
                !this.value ||
                (year >= 1000 && year <= new Date().getFullYear())
            ) {
                this.classList.remove("is-invalid");
            }
        });
    }
});
