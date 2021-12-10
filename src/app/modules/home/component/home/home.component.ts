import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/modules/product/_model/category';
import { Product } from 'src/app/modules/product/_model/product';
import { ProductImage } from 'src/app/modules/product/_model/productImage';
import { CategoryService } from 'src/app/modules/product/_service/category.service';
import { ProductService } from 'src/app/modules/product/_service/product.service';
import { ProductRandom } from '../../_model/ProductRandom';
import { CategoryProductsService } from '../../_service/category-products.service';
import { RandomProductsService } from '../../_service/random-products.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Datos del producto
  rproducts: ProductRandom[] = [];
  categories: Category[] = [];
  nombreProducto: string = "";
  precioProducto: number = 0;
  imagenes: ProductImage[] = [];
  gtin: string = "";
  rutaImg: string = "no-photo.png";
  descripcion: string = "";
  producto: Product = new Product();
  categoria: string = "";

  constructor(
    private product_service: RandomProductsService,
    private category_service: CategoryService,
    private category_product_service: CategoryProductsService,
    private prod_serv: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    $(".btn-back").hide();
    $(".product-detail").hide();
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.product_service.getProducts().subscribe(
      res => {
        this.rproducts = res;
      },
      err => console.log(err)
    )
  }

  getCategories(){
    this.category_service.getCategories().subscribe(
      res => {
        this.categories = res;
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

  productDetail(product: string, images: ProductImage[], precio: number, gtin: string){
    this.nombreProducto = product;
    this.imagenes = images;
    this.precioProducto = precio;
    this.gtin = gtin;
    this.rutaImg = images[0].image;
    this.prod_serv.getProduct(gtin).subscribe(
      res => {
        this.producto = res;
        this.descripcion = res.description;
        this.categoria = this.categories[this.producto.id_category-1].category;
      },
      err => console.log(err)
    )
    console.log(this.producto.id_category)
    $(".py-5").hide();
    $(".cat").hide();
    $(".btn-back").show();
    $(".product-detail").show();
  }

  muestra(){
    $(".py-5").show();
    $(".cat").show();
    $(".btn-back").hide();
    $(".product-detail").hide();
  }


}
