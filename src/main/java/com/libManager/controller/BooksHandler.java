package com.libManager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.libManager.model.Book;
import com.libManager.service.BookService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class BooksHandler implements HttpHandler {
    private static final Logger logger = Logger.getLogger(BooksHandler.class.getName());
    private final BookService bookService;

    public BooksHandler() {
        this.bookService = new BookService();
    }

    private void handleGetAllBooks(HttpExchange exchange) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<Book> books = bookService.getAllBooks();
        System.out.println(books);
        sendResponse(exchange, 200, mapper.writeValueAsString(books));
    }

    private void handleGetBook(HttpExchange exchange, int bookId) throws IOException {
        Optional<Book> bookOpt = bookService.getBookById(bookId);
        ObjectMapper mapper = new ObjectMapper();
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            sendResponse(exchange, 200, mapper.writeValueAsString(book));
        } else {
            sendResponse(exchange, 404, "{\"error\":\"Livre non trouvé\"}");
        }
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        byte[] responseBytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, responseBytes.length);

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();
        try {
            switch (method) {
                case "GET":
                    if (path.matches("/api/books/\\d+")) {
                        int bookId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        handleGetBook(exchange, bookId);
                    } else {
                        handleGetAllBooks(exchange);
                    }
                    break;
                default:
                    sendResponse(exchange, 405, "{\"error\":\"Méthode non autorisée\"}");
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Une erreur est survenue lors du traitement de la requête", e);
            sendResponse(exchange, 500, "{\"error\":\"Erreur serveur: " + e.getMessage() + "\"}");
        }
    }
}