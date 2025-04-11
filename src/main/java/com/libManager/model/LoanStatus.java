package com.libManager.model;

import java.time.LocalDate;

public enum LoanStatus {
    BORROWED("Emprunté"),
    RETURNED("Retourné"),
    OVERDUE("En retard");

    private final String displayName;

    LoanStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public boolean getReturnedStatus() {
        return this == RETURNED;
    }

    public boolean isBookOut(){
        return this == BORROWED || this == RETURNED;
    }

    public static LoanStatus determineLoanStatus(LocalDate returnDeadLine) {
        if(LocalDate.now().isAfter(returnDeadLine)) {
            return OVERDUE;
        }
        return BORROWED;
    }
}
