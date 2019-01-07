import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Burguer } from '../../../interfaces/burguer';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AlertController } from '@ionic/angular';
import { BurguerEmitterService } from '../../../burguers.service';
import { CartService } from '../../../../cart/cart.service';

@Component({
  selector: 'burguer-item',
  templateUrl: './burguer-item.component.html',
  styleUrls: ['./burguer-item.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '100px',
        opacity: 1
      })),
      state('closed', style({
        height: '0px',
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('0.25s ease-out')
      ])
    ])
  ]
})
export class BurguerItemComponent implements OnInit {
  @Input() burguer: Burguer
  @Output() toggleChange: EventEmitter<Burguer> = new EventEmitter<Burguer>();

  constructor(public alertController: AlertController, private burguerEmitter: BurguerEmitterService, private cartService: CartService) { }

  ngOnInit() {
  }

  toggleExpanded = (): void => {
    this.burguer.isExpanded = !this.burguer.isExpanded;
    this.toggleChange.emit(this.burguer);
  }

  sendToCart = async (): Promise<void> => {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'Burguer added to cart',
      buttons: ['OK']
    });

    const action = await this.cartService.addToCart({ ...this.burguer })
    await alert.present();
    if (action === 'added')
      this.burguerEmitter.onCartAddedCount()
  }
}
