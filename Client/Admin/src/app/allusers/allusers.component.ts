import { Component, OnInit } from '@angular/core';
import  { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss'],
})
export class AllusersComponent implements OnInit {
  allUsers: Number;

  constructor(private service: DatabaseService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers(): void {
    this.service.getAllUsers().subscribe((users) => {
      this.allUsers = users.data.length;
    });
  }
}
