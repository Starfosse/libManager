package com.libManager.dao;

import com.libManager.model.Loan;
import java.util.*;

public class LoanDAO {
    private static final Map<Long, Loan> loansDataBase= new HashMap<>();
    private static long nextId = 0;

    public List<Loan> findAll() {
        return new ArrayList<>(loansDataBase.values());
    }

    public Optional<Loan> findById(long id){
        return Optional.ofNullable(loansDataBase.get(id));
    }

    public Loan save(Loan loan) {
        if(loan.getId() == null){
            loan.setId(nextId++);
        }
        loansDataBase.put(loan.getId(), loan);
        return loan;
    }

    public Loan update(Loan loan) {
        if(loan.getId() == null || !loansDataBase.containsKey(loan.getId())){
            throw new IllegalArgumentException("Loan not found");
        }
        loansDataBase.put(loan.getId(), loan);
        return loan;
    }

    public void deleteById(long id) {
        loansDataBase.remove(id);
    }

    public boolean existsById(long id) {
        return loansDataBase.containsKey(id);
    }
}
