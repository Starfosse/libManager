import {Component} from '@angular/core';
import {faCalendar, faCheckCircle, faCreditCard, faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {AppstateService, HomePage} from '../../service/app-state/appstate.service';

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
  protected readonly faCheckCircle = faCheckCircle;

  constructor(private readonly appStateService: AppstateService) {
  }

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage)
  }
}
