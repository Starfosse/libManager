import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {CardComponent} from '../../shared/components/card/card.component';
import {BtnComponent} from '../../shared/components/btn/btn.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons';
import {Booking, gallery, HomePage, paiementStep, tabs} from '../../app.component';

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
  @Input() bookId: number = 0;
  @Output() homePageEmitter = new EventEmitter<HomePage>();
  @Input() from: tabs | gallery | paiementStep = "Accueil";
  @Input() booking: Booking = {
    dayWithdraw: new Date(),
    hourWithdraw: "",
    weekLocation: 0,
    amountPerWeek: 0,
    bookId: 0,
  }

  handlePaiement = () => {
    const homePage: HomePage = {
      page: 'Confirmation',
      footerState: "Tabs",
      selectedBookId: this.bookId,
    };
    this.homePageEmitter.emit(homePage);
    //add location
  }

  handleBackToHome = () => {
    const homePage: HomePage = {page: "OrderDetails", footerState: "Tabs", selectedBookId: this.bookId, from: this.from}
    this.homePageEmitter.emit(homePage);
  }
}
