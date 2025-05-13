package com.libManager.model;

import java.time.LocalDate;

public class Loan {
    private Long id;
    private Long bookId;
    private LocalDate loanDate;
    private int weeks;
    private LoanStatus loanStatus;

    public Loan() {
    }

    public Loan(Long bookId, LocalDate loanDate, int weeks) {
        this.bookId = bookId;
        this.loanDate = loanDate;
        this.weeks = weeks;
        this.loanStatus = LoanStatus.BORROWED;
    }

    public Loan(Long id, Long bookId, LocalDate loanDate, int weeks, LoanStatus loanStatus) {
        this.id = id;
        this.bookId = bookId;
        this.loanDate = loanDate;
        this.weeks = weeks;
        this.loanStatus = loanStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public LocalDate getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }

    public int getWeeks() {
        return weeks;
    }

    public void setWeeks(int weeks) {
        this.weeks = weeks;
    }

    public LoanStatus getLoanStatus() {
        return loanStatus;
    }

    public void setLoanStatus(LoanStatus loanStatus) {
        this.loanStatus = loanStatus;
    }

    public LocalDate getReturnDeadline() {
        return loanDate.plusWeeks(weeks);
    }

    @Override
    public String toString() {
        return "Loan{" + "id=" + id + ", bookId=" + bookId + ", loanDate=" + loanDate + ", " +
                "weeks=" + weeks + ", returnDeadline=" + getReturnDeadline() + ", loanStatus=" + loanStatus + '}';
    }
}