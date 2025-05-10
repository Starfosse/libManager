import {Component, EventEmitter, Output} from '@angular/core';
import {faCalendar, faCheckCircle, faCreditCard, faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {HomePage} from '../../app.component';

@Component({
  selector: 'app-profil',
  imports: [FontAwesomeModule, BackToComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  faCalendar = faCalendar;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faCreditCard = faCreditCard;
  faCheck = faCheckCircle;
  @Output() homePageEmitter = new EventEmitter<HomePage>();
  protected readonly faCheckCircle = faCheckCircle;

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }
}
