import {Component, signal} from '@angular/core';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {CardComponent} from '../../shared/components/card/card.component';
import {BtnComponent} from '../../shared/components/btn/btn.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons';
import {Book, BookService} from '../../service/book/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LoanService} from '../../service/loan/loan.service';
import {AppstateService, Booking, HomePage} from '../../service/app-state/appstate.service';

@Component({
  selector: 'app-paiement',
  imports: [
    BackToComponent, CardComponent, BtnComponent, FontAwesomeModule
  ],
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.css'
})
export class PaiementComponent {
  faCreditCard = faCreditCard;
  booking = signal<Booking>({
    dayWithdraw: new Date(),
    hourWithdraw: "",
    weekLocation: 0,
    amountPerWeek: 0,
  })
  books = signal<Book[]>([]);
  homePage = signal<HomePage>({
    page: "Accueil",
    footerState: "Tabs",
    book: null,
    from: ""
  })

  constructor(private readonly bookService: BookService, private readonly loanService: LoanService, private readonly appStateService: AppstateService) {
    this.bookService.books$.pipe(takeUntilDestroyed()).subscribe(books => this.books.set(books))
    this.appStateService.homePage$.pipe(takeUntilDestroyed()).subscribe((homePage) => this.homePage.set(homePage))
    this.appStateService.booking$.pipe(takeUntilDestroyed()).subscribe((booking) => this.booking.set(booking))
  }

  getBookFromId(id: number) {
    return this.books()[id];
  }


  handlePaiement = () => {
    const homePage: HomePage = {
      page: 'Confirmation',
      footerState: "Tabs",
      book: this.homePage().book,
    };
    this.appStateService.updateHomePage(homePage);
    this.loanService.addLoan(this.booking);
  }

  handleBackToHome = () => {
    const homePage: HomePage = {
      page: "OrderDetails",
      footerState: "Tabs",
      book: this.appStateService.getCurrentHomePage().book,
      from: this.appStateService.getCurrentHomePage().from
    }
    this.appStateService.updateHomePage(homePage);
  }
}
