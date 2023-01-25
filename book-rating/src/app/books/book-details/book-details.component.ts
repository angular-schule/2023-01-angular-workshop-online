import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, map, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // PULL / synchroner Weg
    // const isbn = this.route.snapshot.paramMap.get('isbn') // path: 'books/:isbn'
    // console.log(isbn);

    // PUSH / asynchroner Weg

    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn') as string),
      switchMap(isbn => this.bs.getSingle(isbn)), // .pipe(delay(3000), tap(e => console.log(e))
    );







  }

}
