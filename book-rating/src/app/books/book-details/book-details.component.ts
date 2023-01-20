import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  constructor(private route: ActivatedRoute) {
    // PULL / synchroner Weg
    // const isbn = this.route.snapshot.paramMap.get('isbn') // path: 'books/:isbn'
    // console.log(isbn);

    // PUSH / asynchroner Weg
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      console.log(isbn);
    })


  }

}
