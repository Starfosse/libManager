import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBook, faStar} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import {CommonModule} from '@angular/common';
import {Book, BookService, categories, Category} from '../../service/book/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LoanService} from '../../service/loan/loan.service';
import {AppstateService, gallery, HomePage} from '../../service/app-state/appstate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  faBook = faBook;
  faBell = faBell;
  faStar = faStar;
  searchValue: string = "";
  books = signal<Book[]>([]);
  activeCategory: number = 1;
  filteredBooks: Book[] = [];
  protected readonly Math = Math;
  protected readonly Array = Array;
  protected readonly categories = categories;

  constructor(private readonly bookService: BookService, private readonly loanService: LoanService, private readonly appStateService: AppstateService) {
    this.bookService.books$.pipe(takeUntilDestroyed()).subscribe(books => {
      this.books.set(books);
      this.filteredBooks = books;
    })
  }

  ngOnInit() {
    this.bookService.loadBooks();
    this.loanService.loadLoans();
  }

  getBookImage(title: string): string {
    return this.bookService.getImageSrc(title);
  }

  showGallery(event: gallery) {
    const homePage: HomePage = {page: event, footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage)
  }

  OnUserSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.filterBooksBySearch();
  }

  trackByFn(index: number, item: Category | Book): number {
    return item.id;
  }

  handleShowBook(book: Book) {
    const homePage: HomePage = {
      page: "BookDetail",
      footerState: "Booking",
      book: book,
      from: "Accueil"
    }
    this.appStateService.updateHomePage(homePage)
  }

  filterBooksByCategory(categoryId: number) {
    this.activeCategory = categoryId;
    if (categoryId === 1)
      this.filteredBooks = this.books();
    else
      this.filteredBooks = this.books().filter((book) => book.category === categories[categoryId].name);
  }

  filterBooksBySearch() {
    this.filteredBooks = this.books().filter((book) => book.title.toLowerCase().includes(this.searchValue.toLowerCase()) || book.author.toLowerCase().includes(this.searchValue.toLowerCase()));
  }
}
