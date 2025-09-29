// Fungsi utilitas yang digunakan di seluruh aplikasi

function showLoading() {
    const loadingOverlay = document.getElementById("loading-overlay");
    if (loadingOverlay) {
        loadingOverlay.style.display = "flex";
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById("loading-overlay");
    if (loadingOverlay) {
        loadingOverlay.style.display = "none";
    }
}

function displayStatus(message, type = "danger") {
    const statusMessage = document.getElementById("status-message");
    if (statusMessage) {
        statusMessage.textContent = message;
        statusMessage.className = `alert alert-${type}`;
        statusMessage.classList.remove("d-none");

        // Auto hide setelah 5 detik untuk success message
        if (type === "success") {
            setTimeout(() => {
                statusMessage.classList.add("d-none");
            }, 5000);
        }
    }
}

function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
