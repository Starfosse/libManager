import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule, NgSwitch} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {HomePage} from '../../app.component';

type tabs = "Actives" | "Historique" | "Annulées"

@Component({
  selector: 'app-reservations',
  imports: [
    NgSwitch, CommonModule, FaIconComponent, BackToComponent
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  @Output() homePageEmitter = new EventEmitter<HomePage>();

  currentTab: tabs = "Actives";
  faCalendar = faCalendar;

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }

  handleChooseTab(tab: tabs) {
    this.currentTab = tab;
  }

  handleShowBook(event: number) {
    const homePage: HomePage = {page: "BookDetail", footerState: "Booking", selectedBookId: event, from: "Réservations"}
    this.homePageEmitter.emit(homePage)
  }
}
