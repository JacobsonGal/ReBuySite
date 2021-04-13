import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UsersCounterComponent } from './users-counter/users-counter.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ProductNumberComponent } from './product-number/product-number.component';
import { AllusersComponent } from './allusers/allusers.component';
import { PieComponent } from './pie/pie.component';

import { BarComponent } from './bar/bar.component';
const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UsersCounterComponent,
    ProductNumberComponent,
    AllusersComponent,
    PieComponent,

    BarComponent,
  ],
  imports: [BrowserModule, HttpClientModule, SocketIoModule.forRoot(config)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
