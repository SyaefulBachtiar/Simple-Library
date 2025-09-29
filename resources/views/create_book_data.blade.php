<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    {{-- style bootstrap --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    {{-- icon bootstrap --}}
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

     {{-- style local --}}
     <link rel="stylesheet" href="/Styles/form.css">

    <title>Simple Library - Book Form</title>
</head>
<body>
    <div class="loading-overlay">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <div class="container">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h4 class="mb-0" id="form-title">Add New Book</h4>
                    <small id="form-subtitle">Create a new book entry</small>
                </div>
                <a href="{{ url('/') }}" class="btn btn-light btn-sm">
                    <i class="bi bi-arrow-left me-1"></i> Back
                </a>
            </div>
            
            <div class="card-body">
                <div id="status-message" class="alert d-none mb-3"></div>

                <form id="book-form">
                    <input type="hidden" id="book-id" name="book_id">
                    
                    <div class="mb-3">
                        <label for="title" class="form-label required">Title</label>
                        <input type="text" class="form-control" id="title" name="title" required maxlength="150" placeholder="Enter book title">
                        <div class="invalid-feedback" id="title-error">Please provide a valid title.</div>
                    </div>

                    <div class="mb-3">
                        <label for="author" class="form-label required">Author</label>
                        <input type="text" class="form-control" id="author" name="author" required maxlength="100" placeholder="Enter author name">
                        <div class="invalid-feedback" id="author-error">Please provide a valid author.</div>
                    </div>

                    <div class="mb-4">
                        <label for="year" class="form-label">Publication Year</label>
                        <input type="number" class="form-control" id="year" name="year" min="1000" max="2025" placeholder="e.g. 2023" oninput="if(this.value.length > 4) this.value = this.value.slice(0,4);">
                        <div class="invalid-feedback" id="year-error">Please provide a valid year between 1000 and 2025.</div>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary" id="submit-btn">
                            <span id="btn-text">Save Book</span>
                        </button>
                        <a href="{{ url('/') }}" class="btn btn-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src="{{ asset('js/config.js') }}"></script>
    <script src="{{ asset('js/utils.js') }}"></script>
    <script src="{{ asset('js/create_book.js') }}"></script>
    <script src="{{ asset('js/update_book.js') }}"></script>
</body>
</html>