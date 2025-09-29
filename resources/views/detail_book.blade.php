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
     <link rel="stylesheet" href="/Styles/detail.css">
    <title>Simple Library - Book Detail</title>
    
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
                    <h4 class="mb-0">Book Details</h4>
                    <small>View book information</small>
                </div>
                <a href="{{ url('/') }}" class="btn btn-light btn-sm">
                    <i class="bi bi-arrow-left me-1"></i> Back to List
                </a>
            </div>
            
            <div class="card-body">
                <div id="status-message" class="alert alert-info d-none mb-3"></div>

                <div id="book-detail" class="d-none">
                    <div class="detail-item">
                        <div class="detail-label">Title</div>
                        <div id="detail-title" class="detail-value fs-5"></div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Author</div>
                        <div id="detail-author" class="detail-value"></div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Publication Year</div>
                        <div id="detail-year" class="detail-value"></div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Added Date</div>
                        <div id="detail-created" class="detail-value text-muted small"></div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Last Updated</div>
                        <div id="detail-updated" class="detail-value text-muted small"></div>
                    </div>
                    
                    <div class="mt-2 pt-3">
                        <a href="#" id="edit-btn" class="btn btn-warning btn-action btn-sm">
                            <i class="bi bi-pencil me-1"></i> Edit Book
                        </a>
                        <button id="delete-btn" class="btn btn-danger btn-action btn-sm">
                            <i class="bi bi-trash me-1"></i> Delete Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src="{{ asset('js/config.js') }}"></script>
    <script src="{{ asset('js/utils.js') }}"></script>
    <script src="{{ asset('js/show_book.js') }}"></script>
    <script src="{{ asset('js/delete_book.js') }}"></script>
</body>
</html>