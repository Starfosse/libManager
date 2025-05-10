import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from '../../shared/components/card/card.component';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {BtnComponent} from '../../shared/components/btn/btn.component';
import {Booking, gallery, HomePage, paiementStep, tabs} from '../../app.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CardComponent, BackToComponent, BtnComponent, CommonModule],
  standalone: true,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  @Input() bookId: number = 0;
  @Output() homePageEmitter = new EventEmitter<HomePage>();
  @Output() bookingEmitter = new EventEmitter<Booking>();
  @Input() from: tabs | gallery | paiementStep = "Accueil";
  days: string[] = this.getNextFiveDays();
  booking: Booking = {
    dayWithdraw: new Date(),
    hourWithdraw: "",
    weekLocation: 0,
    amountPerWeek: 0,
    bookId: 0,
  }

  getNextFiveDays() {
    const now = new Date();
    const nextFiveDays = [];
    for (let i = 0; i < 4; i++) {
      const nextDay = new Date;
      nextDay.setDate(now.getDate() + i);
      const formattedDate = nextDay.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      nextFiveDays.push(formattedDate);
    }
    return nextFiveDays;
  }

  handleWeekLocationChange(event: number) {
    this.booking.weekLocation = event;
  }

  handleTimeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.booking.hourWithdraw = select.value;
  }

  handlePaiement = () => {
    const homePage: HomePage = {
      page: 'Paiement',
      footerState: "Tabs",
      selectedBookId: this.bookId,
      from: this.from,
    };
    this.booking.bookId = this.bookId;
    this.booking.amountPerWeek = 2.5;
    this.bookingEmitter.emit(this.booking);
    this.homePageEmitter.emit(homePage);
  }

  handleDayChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.booking.dayWithdraw = new Date(select.value);
  }

  handleBackToHome = () => {
    const homePage: HomePage = {page: "BookDetail", footerState: "Tabs", selectedBookId: this.bookId, from: this.from}
    this.homePageEmitter.emit(homePage);
  }
}
