import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {Book, Category} from '../home/home.component';
import {HomePage} from '../../app.component';


@Component({
  selector: 'app-book-gallery',
  imports: [
    NgForOf,
    FaIconComponent,
    CommonModule,
    BackToComponent,
  ],
  templateUrl: './book-gallery.component.html',
  styleUrl: './book-gallery.component.css'
})
export class BookGalleryComponent {
  @Output() homePageEmitter = new EventEmitter<HomePage>();
  @Input() galleryType: string = "";
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
  filteredBooks: Book[] = this.galleryType === "Popularity" ? this.books.sort((a, b) => a.reviewsRate - b.reviewsRate) : this.books.sort(
    (a, b) => a.id - b.id)
  searchValue: string = "";
  protected readonly faStar = faStar;

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", selectedBookId: 0}
    this.homePageEmitter.emit(homePage);
  }

  handleShowBook(event: number) {
    const type = this.galleryType === "Popularity" ? "Popularity" : "New";
    const homePage: HomePage = {page: "BookDetail", footerState: "Booking", selectedBookId: event, from: type}
    this.homePageEmitter.emit(homePage);
  }

  trackByFn(index: number, item: Category | Book): number {
    return item.id;
  }

  OnUserSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.filterBooksBySearch();
  }

  filterBooksBySearch() {
    this.filteredBooks = this.books.filter((book) => book.title.toLowerCase().includes(this.searchValue.toLowerCase()) || book.author.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  filterBooksByCategory(categoryId: number) {
    if (categoryId === 1)
      this.filteredBooks = this.books;
    else
      this.filteredBooks = this.books.filter((book) => book.category.id === categoryId);
  }
}
