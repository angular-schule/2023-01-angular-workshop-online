import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  beforeEach(async () => {
    const ratingMock: BookRatingService = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA], // Shallow Component Test
      providers: [
        // BRS ersetzen: Immer wenn jemand den Service anfordert,
        // wird stattdessen der RatingMock ausgeliefert.
        { provide: BookRatingService, useValue: ratingMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // Klassen-Instanz
    component = fixture.componentInstance;

    // DOM-Element der Komponente
    // fixture.nativeElement.querySelector()


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp on doRateUp', () => {
    const book = { isbn: '123' } as Book; // Type Assertion (Vorsicht!)

    const service = TestBed.inject(BookRatingService);
    // spyOn(service, 'rateUp').and.returnValue(book);
    // spyOn(service, 'rateUp').and.callFake(b => b);
    spyOn(service, 'rateUp').and.callThrough(); // the spy will still track all calls to it but in addition it will delegate to the actual implementation.

    component.doRateUp(book);

    expect(service.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
