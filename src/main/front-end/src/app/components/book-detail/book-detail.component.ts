import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {CommonModule} from '@angular/common';
import {Book, Category} from '../home/home.component';
import {gallery, HomePage, paiementStep, tabs} from '../../app.component';

@Component({
  selector: 'app-book-detail',
  imports: [
    BackToComponent, FontAwesomeModule, CommonModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  @Input() bookId: number = 0;
  @Input() from: tabs | gallery | paiementStep = "Accueil";
  @Output() homePageEmitter = new EventEmitter<HomePage>();

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
  faStar = faStar;
  farStar = farStar;

  getStarsArray(rate: number) {
    return Array(Math.round(rate)).fill(0);
  }

  getEmptyStarsArray(rate: number) {
    return Array(5 - Math.round(rate)).fill(0);
  }

  handleBackToHome = () => {
    const fromPage = this.from || "Accueil";
    const homePage: HomePage = {page: fromPage, footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }
}
