import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {LibraryComponent} from './components/library/library.component';
import {ProfilComponent} from './components/profil/profil.component';
import {FooterComponent} from './components/footer/footer.component';
import {ReservationsComponent} from './components/reservations/reservations.component';
import {BookGalleryComponent} from './components/book-gallery/book-gallery.component';
import {BookDetailComponent} from './components/book-detail/book-detail.component';
import {PaiementComponent} from './components/paiement/paiement.component';
import {OrderDetailsComponent} from './components/order-details/order-details.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';

export type tabs = "Accueil" | "Bibliothèque" | "Réservations" | "Profil" | ""
export type gallery = "Popularity" | "New" | "BookDetail" | ""
export type paiementStep = "OrderDetails" | "Paiement" | "Confirmation" | ""
export type footerState = "Tabs" | "Booking"

export interface HomePage {
  page: tabs | gallery | paiementStep
  footerState: footerState;
  selectedBookId: number;
  from?: tabs | gallery | paiementStep
}

export interface Booking {
  dayWithdraw: Date;
  hourWithdraw: string;
  weekLocation: number;
  amountPerWeek: number;
  bookId: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, CommonModule, HomeComponent, LibraryComponent, ProfilComponent, FooterComponent, ReservationsComponent, BookGalleryComponent, BookDetailComponent, PaiementComponent, OrderDetailsComponent, ConfirmationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  homePage: HomePage = {
    page: "Accueil",
    footerState: "Tabs",
    selectedBookId: 0,
    from: "Accueil"
  }
  booking: Booking = {
    dayWithdraw: new Date(),
    hourWithdraw: "",
    weekLocation: 0,
    amountPerWeek: 0,
    bookId: 0,
  }

  handleBooking(event: Booking) {
    this.booking = event;
  }

  handleHomePage(event: HomePage) {
    this.homePage = event;
  }
}
