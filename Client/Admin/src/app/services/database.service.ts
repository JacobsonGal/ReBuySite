import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this.http.get(`${baseUrl}/products`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${baseUrl}/user`);
  }
}
