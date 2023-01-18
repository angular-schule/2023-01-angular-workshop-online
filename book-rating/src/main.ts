import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


////////////////////////////////


class Customer {

  constructor(public id: number) {}

  /*id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  fooBar(foo: string): number {

    setTimeout(() => {
      console.log('ID', this.id);
    }, 2000);

    return 4;
  }
}

const myCustomer = new Customer(4);
console.log(myCustomer);

const foo = function (arg: number): number {
  return arg + 1;
}

const foo2 = arg => arg + 1;

