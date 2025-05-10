package com.libManager.service;

import com.libManager.dao.BookDAO;
import com.libManager.model.Book;

import java.util.List;
import java.util.Optional;

public class BookService {

    public BookService() {
        this.bookDAO = new BookDAO();
    }

    private final BookDAO bookDAO;

    public List<Book> getAllBooks() {
        return bookDAO.findAll();
    }

    public Optional<Book> getBookById(long id) {
        return bookDAO.findById(id);
    }

    public List<Book> searchBooks(String title, String author, String category) {
        return bookDAO.search(title, author, category);
    }

    public Book addBook(Book book) {
        validateBook(book);
        return bookDAO.save(book);
    }

    public Book updateBook(long id, Book book) {
        validateBook(book);
        if (!bookDAO.existsById(id)) {
            throw new RuntimeException("Livre non trouvé avec l'ID: " + id);
        }
        book.setId(id);
        return bookDAO.update(book);
    }

    public void deleteBook(long id) {
        if (!bookDAO.existsById(id)) {
            throw new RuntimeException("Livre non trouvé avec l'ID: " + id);
        }
        bookDAO.deleteById(id);
    }

    public boolean isBookAvailable(long id) {
        Optional<Book> book = bookDAO.findById(id);
        return book.map(Book::isAvailable).orElse(false);
    }

    private void validateBook(Book book) {
        if (book == null) {
            throw new IllegalArgumentException("Le livre ne peut pas être null");
        }

        if (book.getTitle() == null || book.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Le titre du livre est obligatoire");
        }

        if (book.getAuthor() == null || book.getAuthor().trim().isEmpty()) {
            throw new IllegalArgumentException("L'auteur du livre est obligatoire");
        }

        if (book.getIsbn() != null && !isValidIsbn(book.getIsbn())) {
            throw new IllegalArgumentException("Le format de l'ISBN est invalide");
        }
    }

    private boolean isValidIsbn(String isbn) {
        return isbn.matches("^(?:\\d+-){3}\\d+$") ||
                isbn.matches("^(?:\\d+-){4}\\d+$") ||
                isbn.matches("^\\d{10}$") ||
                isbn.matches("^\\d{13}$");
    }
}