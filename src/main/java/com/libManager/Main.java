package com.libManager;

import com.libManager.controller.BooksHandler;
import com.libManager.controller.LoansHandler;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/books", new CorsWrapper(new BooksHandler()));
        server.createContext("/api/loan", new CorsWrapper(new LoansHandler()));

        server.setExecutor(null);
        server.start();
        System.out.println("Serveur démarré sur http://localhost:8080");
    }

    static class CorsWrapper implements HttpHandler {
        private final HttpHandler handler;

        public CorsWrapper(HttpHandler handler) {
            this.handler = handler;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            System.out.println("Called");
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
            exchange.getResponseHeaders().remove("Content-Security-Policy");
            handler.handle(exchange);
        }
    }
}