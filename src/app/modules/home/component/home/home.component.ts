import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/product/_model/product';
import { ProductImage } from 'src/app/modules/product/_model/productImage';
import { ProductRandom } from '../../_model/ProductRandom';
import { RandomProductsService } from '../../_service/random-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Datos del producto
  products: ProductRandom[] = [];

  constructor(
    private product_service: RandomProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.product_service.getProducts().subscribe(
      res => {
        this.products = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
