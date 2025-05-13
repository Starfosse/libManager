import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  pages: number;
  language: string;
  availableCopies: number;
  rating: number;
}

export interface Category {
  id: number;
  name: string;
}

export const categories: Category[] = [
  {id: 1, name: "Tous"},
  {id: 2, name: "Classique"},
  {id: 3, name: "Roman"},
  {id: 4, name: "Science-fiction"},
  {id: 5, name: "Philosophie"},
  {id: 6, name: "Aventure"},
  {id: 7, name: "Romance"},
  {id: 8, name: "Fantaisie"},
]

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = "https://libmanager.onrender.com/api/books";

  private booksSubject = new BehaviorSubject<Book[]>([]);
  public books$ = this.booksSubject.asObservable();

  constructor(private readonly http: HttpClient) {
  }

  loadBooks() {
    this.http.get<Book[]>(this.apiUrl).pipe(
      tap({
        next: data =>
          this.booksSubject.next(data),
        error: err =>
          console.error('Erreur:', err)
      })).subscribe();
  }

  getImageSrc(title: string) {
    switch (title) {
      case "Le Petit Prince":
        return "/le petit prince.jpg";
      case"Fahrenheit 451":
        return "/fahrenheit 451.jpg";
      case "1984":
        return "/1984.jpg";
      case "Harry Potter à l'école des sorciers":
        return "/harry potter a l'ecole des sorciers.jpg";
      case "L'Étranger":
        return "l'étranger.jpg";
      case "Le Seigneur des Anneaux":
        return "le seigneur des anneaux.jpg";
      case "L'Alchimiste":
        return "l'alchimiste.jpg";
      case "Les Misérables":
        return "les misérables.jpg";
      case "Don Quichotte":
        return "don quichotte.jpeg";
      case "Le Comte de Monte-Cristo":
        return "le comte de monte cristo.jpeg";
      case "Orgueil et Préjugés":
        return "orgueil et préjugés.jpeg";
      case "La Peste":
        return "la peste.jpg";
      default:
        return "";
    }
  }
}
