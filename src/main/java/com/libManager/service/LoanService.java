package com.libManager.service;

import com.libManager.dao.LoanDAO;
import com.libManager.model.Loan;

import java.util.List;
import java.util.Optional;

public class LoanService {

    private final LoanDAO loanDAO;

    public LoanService() {
        this.loanDAO = new LoanDAO();
    }

    public List<Loan> getAllLoans() {
        return loanDAO.findAll();
    }

    public Optional<Loan> getLoanById(long id) {
        return loanDAO.findById(id);
    }

    public Loan addLoan(Loan loan) {
        validateLoan(loan);
        return loanDAO.save(loan);
    }

    private void validateLoan(Loan loan) {
        if (loan == null) {
            throw new IllegalArgumentException("Le prêt ne peut pas être null");
        }
    }
}
