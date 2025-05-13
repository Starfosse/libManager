package com.libManager;

import com.libManager.controller.BooksHandler;
import com.libManager.controller.LoansHandler;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<String, String> MIME_TYPES = new HashMap<>();

    public static void main(String[] args) throws IOException {
        int port = System.getenv("PORT") != null ?
                Integer.parseInt(System.getenv("PORT")) : 8080;

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.createContext("/api/books", new CorsWrapper(new BooksHandler()));
        server.createContext("/api/loan", new CorsWrapper(new LoansHandler()));

        server.createContext("/", new CorsWrapper(new StaticFileHandler()));

        server.setExecutor(null);
        server.start();
        System.out.println("Serveur démarré sur le port " + port);
    }

    static {
        MIME_TYPES.put("html", "text/html");
        MIME_TYPES.put("css", "text/css");
        MIME_TYPES.put("js", "application/javascript");
        MIME_TYPES.put("json", "application/json");
        MIME_TYPES.put("png", "image/png");
        MIME_TYPES.put("jpg", "image/jpeg");
        MIME_TYPES.put("jpeg", "image/jpeg");
        MIME_TYPES.put("gif", "image/gif");
        MIME_TYPES.put("svg", "image/svg+xml");
        MIME_TYPES.put("ico", "image/x-icon");
        MIME_TYPES.put("ttf", "font/ttf");
        MIME_TYPES.put("woff", "font/woff");
        MIME_TYPES.put("woff2", "font/woff2");
        MIME_TYPES.put("eot", "application/vnd.ms-fontobject");
    }

    static class CorsWrapper implements HttpHandler {
        private final HttpHandler handler;

        public CorsWrapper(HttpHandler handler) {
            this.handler = handler;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
            exchange.getResponseHeaders().remove("Content-Security-Policy");

            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            handler.handle(exchange);
        }
    }

    static class StaticFileHandler implements HttpHandler {
        private String getFileExtension(String path) {
            int lastDot = path.lastIndexOf('.');
            if (lastDot == -1 || lastDot == path.length() - 1) {
                return "";
            }
            return path.substring(lastDot + 1).toLowerCase();
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String requestPath = exchange.getRequestURI().getPath();

            if ("/".equals(requestPath) || !requestPath.contains(".")) {
                requestPath = "/index.html";
            }

            try {
                InputStream resourceStream = Main.class.getResourceAsStream("/public" + requestPath);

                if (resourceStream == null) {
                    resourceStream = Main.class.getResourceAsStream("/public/index.html");

                    if (resourceStream == null) {
                        exchange.sendResponseHeaders(404, 0);
                        exchange.getResponseBody().close();
                        return;
                    }

                    exchange.getResponseHeaders().set("Content-Type", "text/html");
                } else {
                    String extension = getFileExtension(requestPath);
                    String contentType = MIME_TYPES.getOrDefault(extension, "application/octet-stream");
                    exchange.getResponseHeaders().set("Content-Type", contentType);
                }

                exchange.getResponseHeaders().set("Cache-Control", "public, max-age=86400");

                byte[] bytes = resourceStream.readAllBytes();
                exchange.sendResponseHeaders(200, bytes.length);

                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(bytes);
                }

                resourceStream.close();

            } catch (Exception e) {
                e.printStackTrace();
                exchange.sendResponseHeaders(500, 0);
                exchange.getResponseBody().close();
            }
        }
    }
}