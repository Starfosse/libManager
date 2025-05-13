import {Component, signal} from '@angular/core';
import {CommonModule, NgSwitch} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {Loan, LoanService, LoanStatus} from '../../service/loan/loan.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Book, BookService} from '../../service/book/book.service';
import {AppstateService, HomePage} from '../../service/app-state/appstate.service';

type tabs = "Actives" | "Historique" | "Annulées"

@Component({
  selector: 'app-reservations',
  imports: [
    NgSwitch, CommonModule, FaIconComponent, BackToComponent
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  loans = signal<Loan[]>([]);
  currentTab: tabs = "Actives";
  faCalendar = faCalendar;
  books = signal<Book[]>([]);

  constructor(private readonly loanService: LoanService, private readonly bookService: BookService, private readonly appStateService: AppstateService) {
    this.loanService.loans$.pipe(takeUntilDestroyed()).subscribe(loans => {
      this.loans.set(loans)
    })
    this.bookService.books$.pipe(takeUntilDestroyed()).subscribe(books => {
      this.books.set(books)
    })
  }

  getStateLoan(state: LoanStatus) {
    switch (state) {
      case "ACCEPTED":
        return "Accepté";
      case "BORROWED":
        return "Emprunté";
      case "OVERDUE":
        return "En retard"
      case "RETURNED":
        return "Retourné";
    }
  }

  getBookImage(title: string): string {
    return this.bookService.getImageSrc(title);
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getReturnDate(loan: Loan): Date {
    return this.loanService.calculateReturnDate(loan);
  }


  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage)
  }

  handleChooseTab(tab: tabs) {
    this.currentTab = tab;
  }

  getBookFromId(id: number) {
    return this.books()[id];
  }

  handleShowBook(book: Book) {
    const homePage: HomePage = {
      page: "BookDetail",
      footerState: "Booking",
      book: book,
      from: "Réservations"
    }
    this.appStateService.updateHomePage(homePage)
  }
}
