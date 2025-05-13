import {Component, Input, signal} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {Book, BookService, categories, Category} from '../../service/book/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AppstateService, HomePage} from '../../service/app-state/appstate.service';


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
  @Input() galleryType: string = "";
  books = signal<Book[]>([]);
  filteredBooks: Book[] = this.galleryType === "Popularity" ? this.books().sort((a, b) => a.rating - b.rating) : this.books().sort(
    (a, b) => a.id - b.id)
  searchValue: string = "";
  protected readonly faStar = faStar;
  protected readonly categories = categories;


  constructor(private readonly bookService: BookService, private readonly appStateService: AppstateService) {
    this.bookService.books$.pipe(takeUntilDestroyed()).subscribe(books => {
      this.books.set(books);
      this.filteredBooks = books;
    })
  }

  getBookImage(title: string): string {
    return this.bookService.getImageSrc(title);
  }

  handleBackToHome = () => {
    const homePage: HomePage = {page: "Accueil", footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage)
  }

  handleShowBook(book: Book) {
    const type = this.galleryType === "Popularity" ? "Popularity" : "New";
    const homePage: HomePage = {page: "BookDetail", footerState: "Booking", book: book, from: type}
    this.appStateService.updateHomePage(homePage)
  }

  trackByFn(index: number, item: Category | Book): number {
    return item.id;
  }

  OnUserSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.filterBooksBySearch();
  }

  filterBooksBySearch() {
    this.filteredBooks = this.books().filter((book) => book.title.toLowerCase().includes(this.searchValue.toLowerCase()) || book.author.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  filterBooksByCategory(categoryId: number) {
    if (categoryId === 1)
      this.filteredBooks = this.books();
    else
      this.filteredBooks = this.books().filter((book) => book.category === categories[categoryId].name);
  }
}
