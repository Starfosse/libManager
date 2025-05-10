import {Component, EventEmitter, Output} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgClass} from '@angular/common';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {Book, Category} from '../home/home.component';
import {HomePage} from '../../app.component';

type Tabs = "En cours" | "Historique"

@Component({
  selector: 'app-library',
  imports: [FontAwesomeModule, NgClass, BackToComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  @Output() homePageEmitter = new EventEmitter<HomePage>();
  faStar = faStar;
  currentTab: Tabs = "En cours";
  categories: Category[] = [
    {id: 1, name: "Tous"},
    {id: 2, name: "Classique"},
    {id: 3, name: "Roman"},
    {id: 4, name: "Science-fiction"},
    {id: 5, name: "Philosophie"},
    {id: 6, name: "Contes"},
    {id: 7, name: "Stratégie"},
  ]
  books: Book[] = [
    {id: 3, title: "Les misérables", author: "Victor Hugo", category: this.categories[1], reviewsRate: 4.8},
    {id: 2, title: "L'étranger", author: "Albert Camus", category: this.categories[4], reviewsRate: 3.8},
    {
      id: 4,
      title: "Le petit prince",
      author: "Antoine de Saint-Exupéry",
      category: this.categories[5],
      reviewsRate: 4.8
    },
    {id: 1, title: "L'art de la guerre", author: "Sun Tzu", category: this.categories[6], reviewsRate: 4.8},
  ]

  handleChooseTab(tab: Tabs) {
    this.currentTab = tab;
  }

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }

  handleShowBook(event: number) {
    const homePage: HomePage = {page: "BookDetail", footerState: "Booking", selectedBookId: event, from: "Bibliothèque"}
    this.homePageEmitter.emit(homePage);
  }

}
