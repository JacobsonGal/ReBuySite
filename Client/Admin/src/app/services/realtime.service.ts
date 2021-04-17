import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  currentCounter = this.socket.fromEvent<Number>('count');

  constructor(private socket: Socket) {}
  public getcounter = () => {
    return Observable.create((observer) => {
      this.socket.on('connection', (count) => {
        observer.next(count);
      });
    });
  };
}
