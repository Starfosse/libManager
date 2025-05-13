package com.libManager.model;

import java.util.Objects;

public class Book {
    private Long id;
    private String title;
    private String author;
    private float price;
    private String category;
    private String description;
    private int pages;
    private String language;
    private int availableCopies;
    private float rating;
//    private String imageSrc;

    public Book() {
    }

    public Book(Long id, String title, String author, float price, String category, String description, int pages, String language, int availableCopies, float rating) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
        this.category = category;
        this.description = description;
        this.pages = pages;
        this.language = language;
        this.availableCopies = availableCopies;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public float getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public int getPages() {
        return pages;
    }

    public String getLanguage() {
        return language;
    }

    public int getAvailableCopies() {
        return availableCopies;
    }

    public float getRating() {
        return rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return Objects.equals(id, book.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Book{" + "id=" + id + ", title='" + title + '\'' + ", author='" + author + '\'' + '}';
    }
}