import {Component, signal} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {CardComponent} from '../../shared/components/card/card.component';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {Book, BookService} from '../../service/book/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AppstateService, Booking, HomePage} from '../../service/app-state/appstate.service';

@Component({
  selector: 'app-confirmation',
  imports: [FontAwesomeModule, BackToComponent, CardComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  faCheck = faCheck;
  books = signal<Book[]>([]);
  homePage = signal<HomePage>({
    page: "Accueil",
    footerState: "Tabs",
    book: null,
    from: ""
  })
  booking = signal<Booking>({
    dayWithdraw: new Date(),
    hourWithdraw: "",
    weekLocation: 0,
    amountPerWeek: 0,
  })

  constructor(private readonly bookService: BookService, private readonly appStateService: AppstateService) {
    this.bookService.books$.pipe(takeUntilDestroyed()).subscribe(books => this.books.set(books))
    this.appStateService.homePage$.pipe(takeUntilDestroyed()).subscribe((homePage) => this.homePage.set(homePage))
    this.appStateService.booking$.pipe(takeUntilDestroyed()).subscribe((booking) => this.booking.set(booking))
  }

  getBookImage(title: string): string {
    return this.bookService.getImageSrc(title);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  calculateReturnDate(): Date {
    const returnDate = new Date(this.booking().dayWithdraw);
    returnDate.setDate(returnDate.getDate() + (this.booking().weekLocation * 7));
    return returnDate;
  }

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage)
  }

  handleGoToReservations() {
    const homePage: HomePage = {page: "Réservations", footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage);
  }
}
