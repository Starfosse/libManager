package com.libManager.controller;

import com.libManager.model.Loan;
import com.libManager.service.LoanService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.fasterxml.jackson.databind.ObjectMapper;

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

    public LoansHandler(){
        this.loanService = new LoanService();
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();
        try{
            switch(method){
                case "POST":
                    handleCreateLoan(exchange);
                    break;
                case "GET":
                    if(path.matches("/api/loans/\\d+")){
                        int loanId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        handleGetLoan(exchange, loanId);
                    }
                    else
                        handleGetAllLoans(exchange);
                    break;
                case "PATCH":
                    if(path.matches("/api/loans/\\d+")){
                        int loanId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        handleUpdateLoan(exchange, loanId);
                    }
                    else
                        sendResponse(exchange, 400, "{\"error\": \"id de prêt manquant\"}");
                    break;
                case "DELETE":
                    if(path.matches("/api/loans/\\d+")){
                        int loanId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        handleDeleteLoan(exchange, loanId);
                    }
                    else
                        sendResponse(exchange, 400, "{\"errorr\": \"id de prêt manquant\"}");
                    break;
                    default:
                        sendResponse(exchange, 400, "{\"error\":\"Méthode non autorisée\"}");
            }
        } catch(Exception e){
            logger.log(Level.SEVERE, "Erreur survenue lorsque du traitement de la requête", e);
            sendResponse(exchange, 500, "{\"error\": \"erreur serveur" + e.getMessage() + "\"}");
        }
    }

    private void handleCreateLoan(HttpExchange exchange) throws IOException {
        String requestBody = readRequestBody(exchange);
        ObjectMapper mapper = new ObjectMapper();
        try{
            Loan loan = mapper.readValue(requestBody, Loan.class);
            Loan createdLoan = loanService.addLoan(loan);
            sendResponse(exchange, 201, mapper.writeValueAsString(createdLoan));
        } catch(IllegalArgumentException e){
            sendResponse(exchange, 400, "{\"error\":\"" + e.getMessage() + "\"}");
        } catch(Exception e){
            logger.severe("erreur lors de la creation du prêt" + e.getMessage());
            sendResponse(exchange, 500, "{\"erreur\":\"" + e.getMessage() + "\"}");
        }
    }

    private void handleGetLoan(HttpExchange exchange, int loanId) throws IOException {
        Optional<Loan> loanOpt = loanService.getLoanById(loanId);
        if(loanOpt.isPresent()){
            Loan loan = loanOpt.get();
            ObjectMapper mapper = new ObjectMapper();
            sendResponse(exchange, 200, mapper.writeValueAsString(loan));
        }else{
            sendResponse(exchange, 404, "{\"error\":\"Prêt non trouvé\"}");
        }
    }

    private void handleGetAllLoans(HttpExchange exchange) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<Loan> loans = loanService.getAllLoans();
        sendResponse(exchange, 200, mapper.writeValueAsString(loans));
    }

    private void handleUpdateLoan(HttpExchange exchange, int loanId) throws IOException {
        String requestBody = readRequestBody(exchange);
        ObjectMapper mapper = new ObjectMapper();

        try{
        Loan loan = mapper.readValue(requestBody, Loan.class);
        Loan updatedLoan = loanService.updateLoan(loanId, loan);
        sendResponse(exchange, 200, mapper.writeValueAsString(updatedLoan));
        } catch(RuntimeException e){
            logger.log(Level.SEVERE, "{\"erreur\" : \"" + e.getMessage() + "\"}");
            sendResponse(exchange, 400, "{\"error\" : \"" + e.getMessage() + "\"}");
        }
    }

    private void handleDeleteLoan(HttpExchange exchange, int loanId) throws IOException {
        try{
            loanService.deleteLoan(loanId);
            sendResponse(exchange, 200, "{\"status\":\"supprimé\"}");
        } catch(RuntimeException e)
        {
           sendResponse(exchange, 404, "{\"error\":\"" + e.getMessage() + "\"");
        }
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
}
