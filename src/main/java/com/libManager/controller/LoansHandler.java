package com.libManager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.libManager.model.Loan;
import com.libManager.service.LoanService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class LoansHandler implements HttpHandler {
    private static final Logger logger = Logger.getLogger(LoansHandler.class.getName());
    private final LoanService loanService;
    private final ObjectMapper mapper;

    public LoansHandler() {
        this.loanService = new LoanService();

        this.mapper = new ObjectMapper();
        try {
            logger.info("Initialisation de JavaTimeModule...");
            mapper.registerModule(new JavaTimeModule());
            logger.info("JavaTimeModule enregistré avec succès");
        } catch (Exception e) {
            logger.severe("Erreur lors de l'enregistrement de JavaTimeModule: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void handleCreateLoan(HttpExchange exchange) throws IOException {
        String requestBody = readRequestBody(exchange);
        try {
            Loan loan = this.mapper.readValue(requestBody, Loan.class);
            Loan createdLoan = loanService.addLoan(loan);
            sendResponse(exchange, 201, this.mapper.writeValueAsString(createdLoan));
        } catch (IllegalArgumentException e) {
            sendResponse(exchange, 400, "{\"error\":\"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            logger.severe("Erreur lors de la création du prêt: " + e.getMessage());
            sendResponse(exchange, 500, "{\"erreur\":\"" + e.getMessage() + "\"}");
        }
    }

    private void handleGetLoan(HttpExchange exchange, int loanId) throws IOException {
        Optional<Loan> loanOpt = loanService.getLoanById(loanId);
        if (loanOpt.isPresent()) {
            Loan loan = loanOpt.get();
            sendResponse(exchange, 200, this.mapper.writeValueAsString(loan));
        } else {
            sendResponse(exchange, 404, "{\"error\":\"Prêt non trouvé\"}");
        }
    }

    private void handleGetAllLoans(HttpExchange exchange) throws IOException {
        List<Loan> loans = loanService.getAllLoans();
        sendResponse(exchange, 200, this.mapper.writeValueAsString(loans));
    }

    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.length());

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
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

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();
        try {
            switch (method) {
                case "POST":
                    handleCreateLoan(exchange);
                    break;
                case "GET":
                    if (path.matches("/api/loan/\\d+")) {
                        int loanId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        handleGetLoan(exchange, loanId);
                    } else {
                        handleGetAllLoans(exchange);
                    }
                    break;
                default:
                    sendResponse(exchange, 405, "{\"error\":\"Méthode non autorisée\"}");
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Erreur survenue lors du traitement de la requête", e);
            sendResponse(exchange, 500, "{\"error\": \"Erreur serveur: " + e.getMessage() + "\"}");
        }
    }
}