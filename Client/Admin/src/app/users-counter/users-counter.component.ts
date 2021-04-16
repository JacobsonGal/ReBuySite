import { Component } from '@angular/core';
import { RealtimeService } from '../services/realtime.service';

@Component({
  selector: 'app-users-counter',
  templateUrl: './users-counter.component.html',
  styleUrls: ['./users-counter.component.scss'],
})
export class UsersCounterComponent {
  counter: Number;
  constructor(private service: RealtimeService) {
    service.currentCounter.subscribe((counter) => (this.counter = counter));
    console.log(this.counter, 'counter');
  }

  ngOnInit(): any {
    //   const myObserver = {
    //     next: (x) => {
    //       console.log(x.data, 'data');
    //       this.counter = x.data;
    //     },
    //     error: (err) => console.error('Observer got an error: ', err),
    //     complete: () => console.log('Observer got a complete notification'),
    //   };
    //   console.log(this.service.currentCounter, 'service counter');
    //   this.service.currentCounter.subscribe(myObserver);
    //   console.log(this.counter, 'counter');
  }
}
