import { Component, OnInit } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { ApisURI } from 'src/app/shared/apis-uri';
import { Cart } from '../../_model/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carrito: any;

  constructor(
    private cart_service: CartService
  ) { }

  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.cart_service.getCart(ApisURI.rfc).subscribe(
      res => {
        this.carrito = <Cart[]>res;
        console.log(this.carrito[0].id_product)
      },
      err => console.log(err)
    )
  }

}
