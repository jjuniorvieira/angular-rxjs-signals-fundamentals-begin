import {Component, inject} from '@angular/core';
import { NgIf, CurrencyPipe } from '@angular/common';
import {CartService} from "../cart.service";

@Component({
  selector: 'sw-cart-total',
  templateUrl: './cart-total.component.html',
  standalone: true,
  imports: [NgIf, CurrencyPipe]
})
export class CartTotalComponent {

  constructor(private cartService: CartService) {
    console.log('cart', CartTotalComponent);
  }


  cartItems = this.cartService.cartItems;
  subTotal = this.cartService.subTotals;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;
}
