import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {CardComponent} from '../../shared/components/card/card.component';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {HomePage} from '../../app.component';

@Component({
  selector: 'app-confirmation',
  imports: [FontAwesomeModule, BackToComponent, CardComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  faCheck = faCheck;
  @Output() homePageEmitter = new EventEmitter<HomePage>();
  @Input() bookId: number = 0;

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }

  handleGoToReservations() {
    const homePage: HomePage = {page: "Réservations", footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }
}
