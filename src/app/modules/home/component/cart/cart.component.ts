import { Component, OnInit } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { ApisURI } from 'src/app/shared/apis-uri';
import { Cart } from '../../_model/Cart';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carrito: any;
  subtotal: number;
  total: number;

  constructor(
    private cart_service: CartService
  ) {
    this.subtotal = 0;
    this.total = 0;
   }

  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.cart_service.getCart(ApisURI.rfc).subscribe(
      res => {
        this.carrito = <Cart[]>res;
        console.log(this.carrito[0].id_product)
        this.calculaPrecio();
      },
      err => console.log(err)
    )
  }

  calculaPrecio(){
    this.subtotal = 0;
    for (let cart of this.carrito) {
      this.subtotal += cart.quantity * cart.product.price;
    }
    this.total = this.subtotal;
  }

  deleteProductFromCart(id_cart: number){
    Swal.fire({
      title: 'Deseas eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cart_service.deleteProductFromCart(id_cart).subscribe(
          res => {
            this.getCart();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Eliminación exitosa!',
              showConfirmButton: false,
              timer: 1500
            })
            this.calculaPrecio();
          },
          err => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'El producto no puede ser eliminado',
            })
          }
        )
      }
    })
  }

}
