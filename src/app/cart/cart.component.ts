import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartResolver, CartEmitterService, CartService } from './cart.service';
import { ActivatedRoute } from '@angular/router';
import { Cart } from './interfaces/cart';
import { CartItem } from './interfaces/cart-item';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('onClose', [
      transition(':leave', [
        style({
          transform: 'translateX(0)', opacity: 1
        }),
        animate('0.5s ease-in', style({
          transform: 'translateX(10px)'
        })),
        animate('1.5s ease-out', style({
          transform: 'translateX(-300px)',
          opacity: 0
        })),
      ]
      )
    ])
  ]
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart;
  constructor(private route: ActivatedRoute, private cartEmitter: CartEmitterService, private cartService: CartService) {
    this.cart = {
      items: this.route.snapshot.data.cartItems
    }
  }

  ngOnInit(): void {
    this.calculateTotal()
  }


  ngOnDestroy(): void {
  }

  calculateTotal = (): void => {
    this.cart.total = this.cart.items.reduce((acc, curr) => {
      acc += curr.qtty * curr.price
      return acc
    }, 0)
  }

  handleCartCount = (): void => {
    const len = this.cart.items.length
    this.cartEmitter.onHandleCartCount(len)
  }

  handleItemRemove = async (cartItem: CartItem) => {
    await this.cartService.remove(cartItem);
    this.cart.items = await this.cartService.getCartItems();
    this.handleCartCount();
    this.calculateTotal();
  }
}
