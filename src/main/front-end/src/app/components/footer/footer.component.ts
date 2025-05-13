import {Component, signal} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBookOpen, faHome} from '@fortawesome/free-solid-svg-icons';
import {faCalendar, faUser} from '@fortawesome/free-regular-svg-icons';
import {CommonModule, NgClass} from '@angular/common';
import {Book, BookService} from '../../service/book/book.service';
import {AppstateService, Booking, HomePage, tabs} from '../../service/app-state/appstate.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgClass,
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faHome = faHome;
  faBookOpen = faBookOpen;
  faCalendar = faCalendar;
  faUser = faUser;

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

  handleChooseTab(event: tabs) {
    const homePage: HomePage = {page: event, footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage);
  }

  getPriceFromHomePageBook() {
    if (this.homePage().book !== null)
      return this.homePage().book?.price
    return 0;
  }

  handleBooking = () => {
    const homePage: HomePage = {
      page: "OrderDetails",
      footerState: "Tabs",
      book: this.homePage().book,
    }
    this.appStateService.updateHomePage(homePage);
  }
}
