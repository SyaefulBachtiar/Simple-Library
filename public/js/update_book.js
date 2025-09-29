// Fungsi untuk update buku
(function () {
    const bookForm = document.getElementById("book-form");
    const formTitle = document.getElementById("form-title");
    const btnText = document.getElementById("btn-text");
    const formSubtitle = document.getElementById("form-subtitle");

    // Cek apakah ada ID di URL (mode update)
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];

    if (lastPart !== 'create') {
        // Ubah judul form dan xtombol
         if (formTitle) formTitle.textContent = "Edit Book";
         if (btnText) btnText.textContent = "Update Book";
         if (formSubtitle) formSubtitle.textContent = "Update book information";

        // Load data buku untuk diedit
        loadBookData(bookId);

        // Setup form submission untuk update
        setupUpdateForm(bookId);
    }

    async function loadBookData(id) {
        showLoading();

        try {
            const response = await fetch(`${API_URL}/${id}`);
            const result = await response.json();

            if (response.ok) {
                const book = result.data;
                document.getElementById("book-id").value = book.id;
                document.getElementById("title").value = book.title;
                document.getElementById("author").value = book.author;
                document.getElementById("year").value = book.year || "";
            } else {
                displayStatus("Failed to load book data.", "danger");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            }
        } catch (error) {
            displayStatus("API connection failed.", "danger");
        } finally {
            hideLoading();
        }
    }

    function setupUpdateForm(id) {
        if (bookForm) {
            bookForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                // Reset error messages
                clearErrors();

                const formData = {
                    title: document.getElementById("title").value.trim(),
                    author: document.getElementById("author").value.trim(),
                    year: document.getElementById("year").value || null,
                };

                // Validasi client-side
                if (!validateForm(formData)) {
                    return;
                }

                showLoading();

                try {
                    const response = await fetch(`${API_URL}/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify(formData),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        displayStatus("Book updated successfully!", "success");

                        // Redirect ke halaman list setelah 1.5 detik
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 1500);
                    } else {
                        // Handle validation errors
                        handleServerErrors(result);
                        displayStatus(
                            result.message || "Failed to update book.",
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
    }

    // Fungsi untuk handle server validation errors
    function handleServerErrors(result) {
        if (result.errors) {
            Object.keys(result.errors).forEach((key) => {
                const errorElement = document.getElementById(`${key}-error`);
                const inputElement = document.getElementById(key);
                if (errorElement && inputElement) {
                    errorElement.textContent = result.errors[key][0];
                    inputElement.classList.add("is-invalid");
                }
            });
        }
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
})();
