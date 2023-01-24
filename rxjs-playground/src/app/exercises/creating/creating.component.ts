import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // of('A', 'B', 'C')
    // from([1,2,3,4,5])
    // interval(1000) // ---0---1---2---3---4---5---...
    // timer(2000)    // ------0|
    // timer(4000, 1000) // ------------0---1---2---3---4---5---...
    // timer(0, 1000) // 0---1---2---3---4---5---...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    })




    /******************************/


    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);

      sub.next(2);
      sub.next(3);

      setTimeout(() => sub.next(4), 2000)
      setTimeout(() => sub.next(5), 4000)
      setTimeout(() => sub.complete(), 6000)
    }

    const obs: Partial<Observer<number>> = {
      next: (value: number) => console.log(value),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    }

    // producer(obs);

    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);



    /*function rangeObservable(min: number, max: number): Observable<number> {
      return new Observable(sub => {
        for (let i = min; i < max; i++) {
          sub.next(i)
        }
        sub.complete();
      })
    }*/


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
