import {Injectable} from '@angular/core';
import {Book} from '../book/book.service';
import {BehaviorSubject} from 'rxjs';

export type tabs = "Accueil" | "Bibliothèque" | "Réservations" | "Profil" | ""
export type gallery = "Popularity" | "New" | "BookDetail" | ""
export type paiementStep = "OrderDetails" | "Paiement" | "Confirmation" | ""
export type footerState = "Tabs" | "Booking"

export interface HomePage {
  page: tabs | gallery | paiementStep
  footerState: footerState;
  book: Book | null
  from?: tabs | gallery | paiementStep
}

export interface Booking {
  dayWithdraw: Date;
  hourWithdraw: string;
  weekLocation: number;
  amountPerWeek: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppstateService {
  private initialHomePage: HomePage = {
    page: "Accueil",
    footerState: "Tabs",
    book: null,
    from: ""
  };

  private initialBooking: Booking = {
    dayWithdraw: new Date(),
    hourWithdraw: "",
    weekLocation: 1,
    amountPerWeek: 0,
  };

  private homePageSubject = new BehaviorSubject<HomePage>(this.initialHomePage);
  public homePage$ = this.homePageSubject.asObservable();

  private bookingSubject = new BehaviorSubject<Booking>(this.initialBooking)
  public booking$ = this.bookingSubject.asObservable();

  constructor() {
  }

  updateHomePage(homePage: HomePage) {
    this.homePageSubject.next(homePage);
  }

  updateBooking(booking: Booking) {
    this.bookingSubject.next(booking);
  }

  getCurrentBooking(): Booking {
    return this.bookingSubject.getValue();
  }

  getCurrentHomePage(): HomePage {
    return this.homePageSubject.getValue();
  }

}
