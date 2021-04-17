import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { RealtimeService } from '../services/realtime.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-counter',
  templateUrl: './users-counter.component.html',
  styleUrls: ['./users-counter.component.scss'],
})
export class UsersCounterComponent {
  @Input() counter: Number;
  constructor(
    private service: RealtimeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): any {
    this.service.currentCounter.subscribe(
      (counter) => (this.counter = counter)
    );
  this.cd.markForCheck();
  }
 
}
