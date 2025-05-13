import {Component, signal} from '@angular/core';
import {CardComponent} from '../../shared/components/card/card.component';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {BtnComponent} from '../../shared/components/btn/btn.component';
import {CommonModule} from '@angular/common';
import {Book, BookService} from '../../service/book/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AppstateService, Booking, HomePage} from '../../service/app-state/appstate.service';

@Component({
  selector: 'app-order-details',
  imports: [CardComponent, BackToComponent, BtnComponent, CommonModule],
  standalone: true,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  books = signal<Book[]>([]);
  days = this.getNextFiveDays();
  booking = signal<Booking>({
    dayWithdraw: new Date(),
    hourWithdraw: "",
    weekLocation: 1,
    amountPerWeek: 0,
  });
  homePage = signal<HomePage>({
    page: "Accueil",
    footerState: "Tabs",
    book: null,
    from: "Accueil"
  })

  constructor(private readonly bookService: BookService, private readonly appStateService: AppstateService) {
    this.bookService.books$.pipe(takeUntilDestroyed()).subscribe(books => this.books.set(books))
    this.appStateService.homePage$.pipe(takeUntilDestroyed()).subscribe((homePage) => this.homePage.set(homePage))
    this.appStateService.booking$.pipe(takeUntilDestroyed()).subscribe((booking) => this.booking.set(booking))
  }

  getBookImage(title: string): string {
    return this.bookService.getImageSrc(title);
  }

  getNextFiveDays() {
    const now = new Date();
    const nextFiveDays = [];
    for (let i = 1; i < 6; i++) {
      const nextDay = new Date;
      nextDay.setDate(now.getDate() + i);
      const formattedDate = {
        display: nextDay.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        value: nextDay.toISOString().split('T')[0]
      }
      nextFiveDays.push(formattedDate);
    }
    return nextFiveDays;
  }

  getBookFromId(id: number) {
    return this.books()[id];
  }

  handleWeekLocationChange(event: number) {
    const booking = this.appStateService.getCurrentBooking();
    booking.weekLocation = event
    this.appStateService.updateBooking(booking);
  }

  handleTimeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const booking = this.appStateService.getCurrentBooking();
    booking.hourWithdraw = select.value;
    this.appStateService.updateBooking(booking);
  }

  handlePaiement = () => {
    const homePage: HomePage = {
      page: 'Paiement',
      footerState: "Tabs",
      book: this.homePage().book,
      from: this.homePage().from,
    };
    const booking = this.appStateService.getCurrentBooking();
    booking.amountPerWeek = this.homePage().book!.price
    this.appStateService.updateBooking(booking);
    this.appStateService.updateHomePage(homePage);
  }

  handleDayChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const booking = this.appStateService.getCurrentBooking();
    booking.dayWithdraw = new Date(select.value);
    this.appStateService.updateBooking(booking);
  }

  handleBackToHome = () => {
    const homePage: HomePage = {
      page: "BookDetail",
      footerState: "Tabs",
      book: this.homePage().book,
      from: this.homePage().from,
    }
    this.appStateService.updateHomePage(homePage);
  }
}
