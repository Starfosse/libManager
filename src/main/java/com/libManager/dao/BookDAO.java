package com.libManager.dao;

import com.libManager.model.Book;
import java.util.*;
import java.util.stream.Collectors;

public class BookDAO {

    private static final Map<Long, Book> booksDatabase = new HashMap<>();
    private static long nextId = 1;

    static {
        Book book1 = new Book(nextId++, "Le Petit Prince", "Antoine de Saint-Exupéry", "978-2-07-040850-4");
        Book book2 = new Book(nextId++, "1984", "George Orwell", "978-2-07-036822-8");
        Book book3 = new Book(nextId++, "Harry Potter à l'école des sorciers", "J.K. Rowling", "978-2-07-054302-1");

        booksDatabase.put(book1.getId(), book1);
        booksDatabase.put(book2.getId(), book2);
        booksDatabase.put(book3.getId(), book3);
    }

    public List<Book> findAll() {
        return new ArrayList<>(booksDatabase.values());
    }

    public Optional<Book> findById(long id) {
        return Optional.ofNullable(booksDatabase.get(id));
    }

    public boolean existsById(long id) {
        return booksDatabase.containsKey(id);
    }

    public Book save(Book book) {
        if (book.getId() == null) {
            book.setId(nextId++);
        }
        booksDatabase.put(book.getId(), book);
        return book;
    }

    public Book update(Book book) {
        if (book.getId() == null || !booksDatabase.containsKey(book.getId())) {
            throw new RuntimeException("Impossible de mettre à jour un livre qui n'existe pas");
        }
        booksDatabase.put(book.getId(), book);
        return book;
    }

    public void deleteById(long id) {
        booksDatabase.remove(id);
    }

    public List<Book> search(String title, String author, String category) {
        return booksDatabase.values().stream()
                .filter(book -> title == null || book.getTitle().toLowerCase().contains(title.toLowerCase()))
                .filter(book -> author == null || book.getAuthor().toLowerCase().contains(author.toLowerCase()))
                .filter(book -> category == null || (book.getCategory() != null && book.getCategory().equalsIgnoreCase(category)))
                .collect(Collectors.toList());
    }
}