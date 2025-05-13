import {Component, signal} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CommonModule, NgClass} from '@angular/common';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {Loan, LoanService} from '../../service/loan/loan.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Book, BookService} from '../../service/book/book.service';
import {AppstateService, HomePage} from '../../service/app-state/appstate.service';

type Tabs = "En cours" | "Historique"

@Component({
  selector: 'app-library',
  imports: [FontAwesomeModule, NgClass, BackToComponent, CommonModule],
  standalone: true,
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  faStar = faStar;
  loans = signal<Loan[]>([]);
  currentTab: Tabs = "En cours";
  books = signal<Book[]>([]);

  constructor(private readonly loanService: LoanService, private readonly bookService: BookService, private readonly appStateService: AppstateService) {
    this.loanService.loans$.pipe(takeUntilDestroyed()).subscribe(loans => {
      this.loans.set(loans)
    })
    this.bookService.books$.pipe(takeUntilDestroyed()).subscribe(books => {
      this.books.set(books)
    })
  }

  getBookFromId(id: number) {
    const book = this.books().find(book => book.id === id);
    if (book === undefined)
      return null
    return book;
  }

  getBookImage(title: string): string {
    return this.bookService.getImageSrc(title);
  }

  getReturnDate(loan: Loan): Date {
    return this.loanService.calculateReturnDate(loan);
  }

  handleChooseTab(tab: Tabs) {
    this.currentTab = tab;
  }

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage)
  }

  handleShowBook(book: Book) {
    const homePage: HomePage = {
      page: "BookDetail",
      footerState: "Booking",
      book: book,
      from: "Bibliothèque"
    }
    this.appStateService.updateHomePage(homePage)
  }

}
