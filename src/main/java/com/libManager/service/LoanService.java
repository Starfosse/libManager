package com.libManager.service;

import com.libManager.dao.LoanDAO;
import com.libManager.model.Loan;

import java.util.*;

public class LoanService {

    private final LoanDAO loanDAO;

    public LoanService(){
        this.loanDAO = new LoanDAO();
    }

    public List<Loan> getAllLoans(){
        return loanDAO.findAll();
    }

    public Optional<Loan> getLoanById(long id){
        return loanDAO.findById(id);
    }

    public Loan addLoan(Loan loan){
        validateLoan(loan);
        return loanDAO.save(loan);
    }

    public Loan updateLoan(long id, Loan loan){
        validateLoan(loan);
        if(!loanDAO.existsById(id)){
            throw new RuntimeException("Prêt non trouvé avec l'id: " + id);
        }
        loan.setId(id);
        return loanDAO.update(loan);
    }

    public void deleteLoan(long id){
        if(!loanDAO.existsById(id))
        {throw new RuntimeException("Prêt non trouvé avec l'id: " + id);}
        loanDAO.deleteById(id);
    }

    private void validateLoan(Loan loan){
            if (loan == null) {
                throw new IllegalArgumentException("Le prêt ne peut pas être null");
            }
    }
}
