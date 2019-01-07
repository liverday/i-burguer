import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { IonicModule } from '@ionic/angular';
import { CartService, CartResolver } from './cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [CommonModule, CartRoutingModule, IonicModule],
  providers: [CartService, CartResolver]
})
export class CartModule { }
