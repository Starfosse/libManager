package com.libManager.model;

import java.time.LocalDate;

public class Loan {
    private Long id;
    private Long bookId;
    private Long userId;
    private LocalDate loanDate;
    private LocalDate returnDate;
    private LocalDate effectiveReturnDate;
    private LoanStatus loanStatus;

    public Loan() {
    }

    public Loan(Long bookId, Long userId, LocalDate loanDate) {
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.returnDate = loanDate.plusWeeks(1);
        this.loanStatus = LoanStatus.BORROWED;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public LoanStatus getLoanStatus() {
        return loanStatus;
    }

    public void setLoanStatus(LoanStatus loanStatus) {
        this.loanStatus = loanStatus;
    }

    @Override
    public String toString() {
        return "Loan{" + "id=" + id + ", bookId=" + bookId + ", userId=" + userId + ", loanDate=" + loanDate + ", " + "returnDate=" + returnDate + ", loanStatus=" + loanStatus + '}';
    }
}
