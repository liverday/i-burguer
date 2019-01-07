import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { AlertController } from '@ionic/angular';
import { CartService } from '../cart.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  animations: [
    trigger('onClose', [
      transition(':leave', [
        style({
          transform: 'translateX(0)', opacity: 1
        }),
        animate('0.5s ease-in', style({
          transform: 'translateX(10px)'
        })),
        animate('0.5s ease-out', style({
          transform: 'translateX(-300px)',
          opacity: 0
        })),
      ]
      )
    ])
  ]
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() onRemove: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() onQttyChange: EventEmitter<void> = new EventEmitter();
  public isShown = true;

  constructor(private alertController: AlertController, private cartService: CartService) { }

  ngOnInit() {
  }

  presentDeleteModal = async (): Promise<void> => {
    let alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Delete product from cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (_): void => { return }
        },
        {
          text: 'Confirm',
          handler: this.handleRemove
        }
      ]
    });

    await alert.present();
  }

  handleRemove = (): void => {
    setTimeout(() => {
      this.onRemove.emit(this.cartItem);
    }, 1000)
    this.isShown = false;
  }

  add = async (): Promise<void> => {
    await this.cartService.addQttyById(this.cartItem.id);
    this.cartItem.qtty++;
    this.onQttyChange.emit();
  }

  decrease = async (): Promise<void> => {
    this.cartService.decQttyById(this.cartItem.id);
    this.cartItem.qtty--;
    this.onQttyChange.emit();
  }
}
