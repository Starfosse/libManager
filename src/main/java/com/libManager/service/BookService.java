package com.libManager.service;

import com.libManager.dao.BookDAO;
import com.libManager.model.Book;

import java.util.List;
import java.util.Optional;

public class BookService {

    private final BookDAO bookDAO;

    public BookService() {
        this.bookDAO = new BookDAO();
    }

    public List<Book> getAllBooks() {
        return bookDAO.findAll();
    }

    public Optional<Book> getBookById(long id) {
        return bookDAO.findById(id);
    }
}