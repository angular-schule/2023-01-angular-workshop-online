import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });

  private bs = inject(BookStoreService);

  books$ = this.searchControl.valueChanges.pipe(
    filter(term => term.length >= 3),
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(term => this.bs.search(term))
  );

}
