package com.libManager;

import com.libManager.controller.BooksHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/books", new BooksHandler());
        server.setExecutor(null); // Utilise l'exécuteur par défaut
        server.start();
        System.out.println("Serveur démarré sur http://localhost:8080");
    }
}