import { Component } from '@angular/core';
import { fromEvent, map, startWith, debounceTime } from 'rxjs';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './fromevent.component.html',
})
export class FromeventComponent {

  currentWidth?: number;

  constructor() {
    /**
     * Schreibe die jeweils aktuelle Fensterbreite in das Property `this.currentWidth`
     *
     * Nutze fromEvent, um das resize-Event auf window zu abonnieren.
     * Initialisiere das Observable mit der aktuellen Fensterbreite (`window.innerWidth`)
     * Entprelle den Eventstrom, damit nicht zu viele Events gefeuert werden.
     */

    /******************************/

    const width$ = fromEvent(window, 'resize').pipe(
      debounceTime(1000),
      map(() => window.innerWidth),
      startWith(window.innerWidth),
    );

    // map(e => (e.target as Window).innerWidth),

    width$.subscribe(e => {
      this.currentWidth = e;
    })


    /*const myMDO = map(() => window.innerWidth)(debounceTime(1000)(fromEvent(window, 'resize')))
    startWith(window.innerWidth)(myMDO)*/

    /******************************/
  }

}
