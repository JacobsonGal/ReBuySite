import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  currentCounter = this.socket.fromEvent<Number>('count');

  constructor(private socket: Socket) {}
}
