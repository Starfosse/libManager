import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';

export type LoanStatus = 'ACCEPTED' | 'BORROWED' | 'RETURNED' | 'OVERDUE';

export interface Loan {
  id: number,
  bookId: number,
  loanDate: Date,
  weeks: number,
  loanStatus: LoanStatus,
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private readonly apiUrl = 'https://libmanager.onrender.com/api/loan';
  private loansSubject = new BehaviorSubject<Loan[]>([]);
  public loans$ = this.loansSubject.asObservable();

  constructor(private readonly http: HttpClient) {
  }

  public addLoan(loan: any) {
    return this.http.post(this.apiUrl, loan);
  }

  public loadLoans() {
    this.http.get<Loan[]>(this.apiUrl).pipe(
      tap({
        next: data => this.loansSubject.next(data),
        error: err => console.error('Erreur:', err)
      })).subscribe();
  }

  public calculateReturnDate(loan: Loan): Date {
    const returnDate = new Date(loan.loanDate);
    returnDate.setDate(returnDate.getDate() + (loan.weeks * 7));
    return returnDate;
  }
}
