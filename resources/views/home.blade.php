<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {{-- style bootstrap --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    {{-- bootstrap icon --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

    {{-- style local --}}
    <link rel="stylesheet" href="/Styles/home.css">

    <title>Simple Library - Books List</title>
    
</head>
<body>
    <div class="container">
        <div class="loading-overlay">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h4 class="mb-0">Simple Library</h4>
                    <small>library books</small>
                </div>
                <a href="{{ url('/create') }}" class="btn btn-light btn-sm">
                    <i class="bi bi-plus-circle me-1"></i> Add Book
                </a>
            </div>
            
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="w-50">
                        <div class="input-group">
                            <span class="input-group-text bg-light border-end-0">
                                <i class="bi bi-search text-muted"></i>
                            </span>
                            <input type="text" id="search-input" class="form-control search-box border-start-0" placeholder="Search books...">
                        </div>
                    </div>
                    <div class="book-count">
                        <i class="bi bi-book me-1"></i>
                        <span id="count-text">Loading...</span>
                    </div>
                </div>
                
                <div id="status-message" class="alert alert-info d-none mb-3"></div>
                
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="bg-light">
                            <tr>
                                <th width="5%">#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th width="10%">Year</th>
                                <th width="20%">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="books-tbody">
                            <!-- Data akan ditampilkan di sini -->
                        </tbody>
                    </table>
                </div>
                
                <div id="empty-message" class="empty-state d-none">
                    <i class="bi bi-journal-x"></i>
                    <h5>No books found</h5>
                    <p class="mb-3">There are no books in your library yet.</p>
                    <a href="{{ url('/create') }}" class="btn btn-primary btn-sm">
                        <i class="bi bi-plus-circle me-1"></i> Add Your First Book
                    </a>
                </div>
                
                <div id="no-results" class="empty-state d-none">
                    <i class="bi bi-search"></i>
                    <h5>No matching books</h5>
                    <p class="mb-3">We couldn't find any books matching your search.</p>
                    <button id="clear-search" class="btn btn-outline-secondary btn-sm">
                        <i class="bi bi-arrow-counterclockwise me-1"></i> Clear Search
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src="/js/config.js"></script>
    <script src="/js/utils.js"></script>
    <script src="/js/read_books.js"></script>
    <script src="/js/delete_book.js"></script>
</body>
</html>