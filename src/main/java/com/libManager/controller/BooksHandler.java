package com.libManager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.libManager.model.Book;
import com.libManager.service.BookService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.OutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.util.Optional;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

public class BooksHandler implements HttpHandler {
    private static final Logger logger = Logger.getLogger(BooksHandler.class.getName());
    private final BookService bookService;

    public BooksHandler() {
        this.bookService = new BookService();
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
                case "POST":
                    handleCreateBook(exchange);
                    break;
                case "PATCH":
                    if (path.matches("/api/books/\\d+")) {
                        int bookId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        handleUpdateBook(exchange, bookId);
                    } else {
                        sendResponse(exchange, 400, "{\"error\":\"ID de livre manquant\"}");
                    }
                    break;
                case "DELETE":
                    if (path.matches("/api/books/\\d+")) {
                        int bookId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        handleDeleteBook(exchange, bookId);
                    } else {
                        sendResponse(exchange, 400, "{\"error\":\"ID de livre manquant\"}");
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

    private void handleGetAllBooks(HttpExchange exchange) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<Book> books = bookService.getAllBooks();
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

    private void handleCreateBook(HttpExchange exchange) throws IOException {
        String requestBody = readRequestBody(exchange);
        ObjectMapper mapper = new ObjectMapper();
        try {
            Book book = mapper.readValue(requestBody, Book.class);
            Book createdBook = bookService.addBook(book);
            sendResponse(exchange, 201, mapper.writeValueAsString(createdBook));
        } catch (IllegalArgumentException e) {
            sendResponse(exchange, 400, "{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    private void handleUpdateBook(HttpExchange exchange, int bookId) throws IOException {
        String requestBody = readRequestBody(exchange);
        ObjectMapper mapper = new ObjectMapper();
        try {
            Book book = mapper.readValue(requestBody, Book.class);
            Book updatedBook = bookService.updateBook(bookId, book);
            sendResponse(exchange, 200, mapper.writeValueAsString(updatedBook));
        } catch (RuntimeException e) {
            int statusCode = e instanceof IllegalArgumentException ? 400 : 404;
            sendResponse(exchange, statusCode, "{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    private void handleDeleteBook(HttpExchange exchange, int bookId) throws IOException {
        try {
            bookService.deleteBook(bookId);
            sendResponse(exchange, 200, "{\"statut\":\"supprimé\"}");
        } catch (RuntimeException e) {
            sendResponse(exchange, 404, "{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    private String readRequestBody(HttpExchange exchange) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(exchange.getRequestBody()))) {
            StringBuilder requestBody = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                requestBody.append(line);
            }
            return requestBody.toString();
        }
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.length());

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}