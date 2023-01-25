import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { loadBooks } from '../store/book.actions';
import { selectBooks, selectLoading } from '../store/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];
  loading$ = this.store.select(selectLoading);
  books$ = this.store.select(selectBooks);

  constructor(private rs: BookRatingService, private store: Store) {
    this.store.dispatch(loadBooks())
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    /*this.books = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      }

      return b;
    });*/

    // Alternativ:
    // this.books = this.books.map(b => b.isbn === ratedBook.isbn ? ratedBook : b);

    // [1,2,3,4].map(e => e * 10) // [10, 20, 30, 40]
    // [1,2,3,4,5,6,7,8,9].filter(e => e > 5) // [6,7,8,9]
  }
}
