import {Component, EventEmitter, Output} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBook, faStar} from '@fortawesome/free-solid-svg-icons';
import {faBell, faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {CommonModule} from '@angular/common';
import {gallery, HomePage} from '../../app.component';

export interface Category {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  category: Category;
  reviewsRate: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Output() homePageEmitter = new EventEmitter<HomePage>();
  faBook = faBook;
  faBell = faBell;
  faStar = faStar;
  farStar = farStar;
  searchValue: string = "";
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
  filteredBooks: Book[] = this.books;
  protected readonly Math = Math;
  protected readonly Array = Array;

  showGallery(event: gallery) {
    const homePage: HomePage = {page: event, footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }

  OnUserSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.filterBooksBySearch();
  }

  trackByFn(index: number, item: Category | Book): number {
    return item.id;
  }

  handleShowBook(event: number) {
    const homePage: HomePage = {page: "BookDetail", footerState: "Booking", selectedBookId: event, from: "Accueil"}
    this.homePageEmitter.emit(homePage);
  }

  filterBooksByCategory(categoryId: number) {
    if (categoryId === 1)
      this.filteredBooks = this.books;
    else
      this.filteredBooks = this.books.filter((book) => book.category.id === categoryId);
  }

  filterBooksBySearch() {
    this.filteredBooks = this.books.filter((book) => book.title.toLowerCase().includes(this.searchValue.toLowerCase()) || book.author.toLowerCase().includes(this.searchValue.toLowerCase()));
  }
}
