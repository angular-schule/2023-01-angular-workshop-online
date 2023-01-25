import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, delay, tap } from 'rxjs/operators';
import { Observable, EMPTY, of, timer } from 'rxjs';
import * as BookActions from './book.actions';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';


@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() => this.bs.getAll().pipe(
        // delay(5000),
        map(data => BookActions.loadBooksSuccess({ data })),
        catchError(err => of(BookActions.loadBooksFailure({ error: err.message }))),
      ))
    )
  });

  navigateToDetailsAfterCreate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.createBookSuccess),
      tap(action => this.router.navigate(['/books', action.data.isbn]))
    )
  }, { dispatch: false });




  constructor(private actions$: Actions, private bs: BookStoreService, private router: Router) {}
}
