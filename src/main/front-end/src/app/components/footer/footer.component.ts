import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBookOpen, faHome} from '@fortawesome/free-solid-svg-icons';
import {faCalendar, faUser} from '@fortawesome/free-regular-svg-icons';
import {CommonModule, NgClass} from '@angular/common';
import {HomePage, tabs} from '../../app.component';

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

  @Input() homePage: HomePage = {page: "Accueil", footerState: "Tabs", selectedBookId: 0};
  @Output() homePageEmitter = new EventEmitter<HomePage>();

  handleChooseTab(event: tabs) {
    const homePage: HomePage = {page: event, footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }

  handleBooking = () => {
    const homePage: HomePage = {
      page: "OrderDetails",
      footerState: "Tabs",
      selectedBookId: this.homePage.selectedBookId,
    }
    this.homePageEmitter.emit(homePage);
  }
}
