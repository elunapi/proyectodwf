import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/modules/product/_model/category';
import { Product } from 'src/app/modules/product/_model/product';
import { ProductImage } from 'src/app/modules/product/_model/productImage';
import { CategoryService } from 'src/app/modules/product/_service/category.service';
import { ProductRandom } from '../../_model/ProductRandom';
import { CategoryProductsService } from '../../_service/category-products.service';
import { RandomProductsService } from '../../_service/random-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Datos del producto
  rproducts: ProductRandom[] = [];
  //products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private product_service: RandomProductsService,
    private category_service: CategoryService,
    private category_product_service: CategoryProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.product_service.getProducts().subscribe(
      res => {
        this.rproducts = res;
        //console.log(res)
      },
      err => console.log(err)
    )
  }

  getCategories(){
    this.category_service.getCategories().subscribe(
      res => {
        this.categories = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  muestraCategoria(id: number){
    if(id==0){
      this.getProducts();
    }
    this.category_product_service.getProducts(id).subscribe(
      res => {
        this.rproducts = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  muestraCategorias(){
    console.log("hola");
  }

}
