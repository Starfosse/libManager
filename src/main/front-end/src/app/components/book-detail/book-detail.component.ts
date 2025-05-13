import {Component, signal} from '@angular/core';
import {BackToComponent} from '../../shared/components/back-to/back-to.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {CommonModule} from '@angular/common';
import {Book, BookService} from '../../service/book/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AppstateService, HomePage} from '../../service/app-state/appstate.service';

@Component({
  selector: 'app-book-detail',
  imports: [
    BackToComponent, FontAwesomeModule, CommonModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  books = signal<Book[]>([]);
  faStar = faStar;
  farStar = farStar;
  homePage = signal<HomePage>({
    page: "Accueil",
    footerState: "Tabs",
    book: null,
    from: "Accueil"
  });

  constructor(private bookService: BookService, private readonly appStateService: AppstateService) {
    this.bookService.books$.pipe(takeUntilDestroyed()).subscribe(books => this.books.set(books))
    this.appStateService.homePage$.pipe(takeUntilDestroyed()).subscribe(homepage => this.homePage.set(homepage))
  }

  getBookImage(title: string): string {
    return this.bookService.getImageSrc(title);
  }

  getStarsArray(rate: number) {
    return Array(Math.round(rate)).fill(0);
  }

  getEmptyStarsArray(rate: number) {
    return Array(5 - Math.round(rate)).fill(0);
  }

  handleBackToHome = () => {
    const fromPage = this.homePage().from ?? "Accueil";
    const homePage: HomePage = {page: fromPage, footerState: "Tabs", book: null}
    this.appStateService.updateHomePage(homePage)
  }
}
