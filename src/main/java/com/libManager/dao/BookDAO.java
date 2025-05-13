package com.libManager.dao;

import com.libManager.model.Book;

import java.util.*;

public class BookDAO {

    private static final Map<Long, Book> booksDatabase = new HashMap<>();
    private static long nextId = 1;

    public List<Book> findAll() {
        return new ArrayList<>(booksDatabase.values());
    }

    public Optional<Book> findById(long id) {
        return Optional.ofNullable(booksDatabase.get(id));
    }

    public boolean existsById(long id) {
        return booksDatabase.containsKey(id);
    }

    static {
        Book book1 = new Book(nextId++, "Le Petit Prince", "Antoine de Saint-Exupéry", 2.00f, "Roman", "Un aviateur rencontre un jeune prince venu d'une autre planète, dans un conte poétique et philosophique.", 96, "Français", 5, 4.8f);
        Book book2 = new Book(nextId++, "1984", "George Orwell", 2.50f, "Science-fiction", "Un monde dystopique dominé par Big Brother, où la liberté individuelle est éradiquée.", 328, "Français", 3, 4.6f);
        Book book3 = new Book(nextId++, "Harry Potter à l'école des sorciers", "J.K. Rowling", 3.00f, "Fantaisie", "Un jeune sorcier découvre ses pouvoirs et entre à Poudlard pour vivre des aventures magiques.", 352, "Français", 7, 4.7f);
        Book book4 = new Book(nextId++, "L'Étranger", "Albert Camus", 2.00f, "Classique", "Meursault, un homme détaché, commet un meurtre et confronte l'absurdité de l'existence.", 184, "Français", 4, 4.4f);
        Book book5 = new Book(nextId++, "Le Seigneur des Anneaux", "J.R.R. Tolkien", 4.50f, "Fantaisie", "Frodon et ses compagnons entreprennent une quête pour détruire un anneau maléfique menaçant le monde.", 1200, "Français", 2, 4.9f);
        Book book6 = new Book(nextId++, "Fahrenheit 451", "Ray Bradbury", 2.50f, "Science-fiction", "Dans une société future, les livres sont interdits et brûlés pour empêcher la réflexion individuelle.", 256, "Français", 3, 4.3f);
        Book book7 = new Book(nextId++, "L'Alchimiste", "Paulo Coelho", 2.00f, "Roman", "Santiago, un jeune berger, part en quête de sa légende personnelle à travers le désert.", 190, "Français", 6, 4.2f);
        Book book8 = new Book(nextId++, "Les Misérables", "Victor Hugo", 4.00f, "Classique", "L'histoire bouleversante de Jean Valjean, ancien forçat poursuivi par la justice et en quête de rédemption.", 1248, "Français", 2, 4.7f);
        Book book9 = new Book(nextId++, "Don Quichotte", "Miguel de Cervantes", 3.50f, "Classique", "Un noble fou se prend pour un chevalier errant et part combattre des moulins à vent avec son fidèle Sancho.", 1056, "Français", 1, 4.5f);
        Book book10 = new Book(nextId++, "Le Comte de Monte-Cristo", "Alexandre Dumas", 4.00f, "Aventure", "Trahi et emprisonné, Edmond Dantès s'évade et revient pour se venger sous le nom du Comte de Monte-Cristo.", 1312, "Français", 4, 4.9f);
        Book book11 = new Book(nextId++, "Orgueil et Préjugés", "Jane Austen", 2.50f, "Romance", "Elizabeth Bennet et Mr Darcy s'affrontent entre orgueil social et préjugés amoureux dans l’Angleterre du XIXe siècle.", 432, "Français", 5, 4.6f);
        Book book12 = new Book(nextId++, "La Peste", "Albert Camus", 2.50f, "Philosophie", "Dans une ville frappée par une épidémie, des hommes font face à l'absurde et à la condition humaine.", 320, "Français", 3, 4.3f);

        booksDatabase.put(book1.getId(), book1);
        booksDatabase.put(book2.getId(), book2);
        booksDatabase.put(book3.getId(), book3);
        booksDatabase.put(book4.getId(), book4);
        booksDatabase.put(book5.getId(), book5);
        booksDatabase.put(book6.getId(), book6);
        booksDatabase.put(book7.getId(), book7);
        booksDatabase.put(book8.getId(), book8);
        booksDatabase.put(book9.getId(), book9);
        booksDatabase.put(book10.getId(), book10);
        booksDatabase.put(book11.getId(), book11);
        booksDatabase.put(book12.getId(), book12);
    }


}