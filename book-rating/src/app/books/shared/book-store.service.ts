import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private api = 'https://api.angular.schule';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.api + '/books');
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(this.api + '/books/' + isbn)
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.api + '/books', book);
  }

  search(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.api + '/books/search/' + term);
  }
}
