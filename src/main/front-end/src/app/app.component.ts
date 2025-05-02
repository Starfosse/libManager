import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBook, faStar} from '@fortawesome/free-solid-svg-icons';
import {faBell, faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {CommonModule} from '@angular/common';

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  reviewsRate: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showBook: boolean = false;
  faBook = faBook;
  faBell = faBell;
  faStar = faStar;
  farStar = farStar;
  categories: Category[] = [
    {id: 1, name: "test1"},
    {id: 2, name: "test2"},
    {id: 3, name: "test3"},
    {id: 4, name: "test4"},
    {id: 5, name: "test5"},
    {id: 6, name: "test6"},
    {id: 7, name: "test7"},
  ]
  books: Book[] = [
    {id: 1, title: "Les misérables", author: "Victor Hugo", reviewsRate: 4.8},
    {id: 2, title: "L'étranger", author: "Albert Camus", reviewsRate: 3.8},
    {id: 3, title: "Le petit prince", author: "Antoine de Saint-Exupéry", reviewsRate: 4.8},
    {id: 4, title: "L'art de la guerre", author: "Sun Tzu", reviewsRate: 4.8},
  ]
  bookDisplayed: Book | null = this.books[1];
  protected readonly Math = Math;
  protected readonly Array = Array;

  trackByFn(index: number, item: Category | Book): number {
    return item.id;
  }

  handleShowBook(id: number) {
    this.showBook = !this.showBook;
    this.bookDisplayed = this.books[id];
  }

  handleShowHome() {
    this.showBook = false;
  }

  getStarsArray(rate: number) {
    return Array(Math.round(rate)).fill(0);
  }

  getEmptyStarsArray(rate: number) {
    return Array(5 - Math.round(rate)).fill(0);
  }
}
