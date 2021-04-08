import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DatabaseService } from './../database.service';
@Component({
  selector: 'app-product-number',
  templateUrl: './product-number.component.html',
  styleUrls: ['./product-number.component.scss'],
})
export class ProductNumberComponent implements OnInit {
  numberOfProducts: Number;
  numberOfusers: Number;
  constructor(private dataBaseService: DatabaseService) {
    this.numberOfProducts = 1312;
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchusers();
  }

  fetchProducts(): void {
    this.dataBaseService.getAllProducts().subscribe((products) => {
      console.log(products.lenght);
    });
  }
  fetchusers(): void {
    //kaki pipi
  }
}
