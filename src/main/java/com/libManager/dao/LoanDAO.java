package com.libManager.dao;

import com.libManager.model.Loan;
import com.libManager.model.LoanStatus;

import java.time.LocalDate;
import java.util.*;

public class LoanDAO {
    private static final Map<Long, Loan> loansDataBase = new HashMap<>();
    private static long nextId = 0;

    public List<Loan> findAll() {
        return new ArrayList<>(loansDataBase.values());
    }

    public Optional<Loan> findById(long id) {
        return Optional.ofNullable(loansDataBase.get(id));
    }

    public Loan save(Loan loan) {
        if (loan.getId() == null) {
            loan.setId(nextId++);
        }
        loansDataBase.put(loan.getId(), loan);
        return loan;
    }

    static {
        loansDataBase.put(nextId, new Loan(nextId++, 1L, LocalDate.now().minusWeeks(1), 1, LoanStatus.BORROWED));
        loansDataBase.put(nextId, new Loan(nextId++, 2L, LocalDate.now().minusWeeks(3), 2, LoanStatus.OVERDUE));
        loansDataBase.put(nextId, new Loan(nextId++, 3L, LocalDate.now().minusWeeks(4), 3, LoanStatus.RETURNED));
        loansDataBase.put(nextId, new Loan(nextId++, 4L, LocalDate.now().plusDays(3), 2, LoanStatus.ACCEPTED));
        loansDataBase.put(nextId, new Loan(nextId++, 5L, LocalDate.now().minusWeeks(2), 4, LoanStatus.RETURNED));
        loansDataBase.put(nextId, new Loan(nextId++, 6L, LocalDate.now().minusDays(2), 1, LoanStatus.BORROWED));
        loansDataBase.put(nextId, new Loan(nextId++, 7L, LocalDate.now().minusWeeks(1), 3, LoanStatus.OVERDUE));
        loansDataBase.put(nextId, new Loan(nextId++, 8L, LocalDate.now().plusDays(5), 1, LoanStatus.ACCEPTED));
        loansDataBase.put(nextId, new Loan(nextId++, 9L, LocalDate.now().minusWeeks(6), 2, LoanStatus.RETURNED));
        loansDataBase.put(nextId, new Loan(nextId++, 10L, LocalDate.now().minusWeeks(1), 2, LoanStatus.BORROWED));
        loansDataBase.put(nextId, new Loan(nextId++, 11L, LocalDate.now().minusWeeks(5), 3, LoanStatus.RETURNED));
        loansDataBase.put(nextId, new Loan(nextId++, 12L, LocalDate.now().plusDays(1), 4, LoanStatus.ACCEPTED));
    }
}
