import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BurguersPage } from './burguers.page';
import { HttpClientModule } from '@angular/common/http';
import { BurguersResolver, BurguersService, BurguerEmitterService } from './burguers.service';
import { BurguerListComponent } from './burguers-components/burguer-list/burguer-list.component';
import { BurguerItemComponent } from './burguers-components/burguer-list/burguer-item/burguer-item.component';
import { BurguersRoutingModule } from './burguer-routing.module';
import { CartService } from '../cart/cart.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BurguersRoutingModule,
    HttpClientModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [BurguersPage, BurguerListComponent, BurguerItemComponent],
  providers: [BurguersService, BurguersResolver, BurguerEmitterService, CartService]
})
export class BurguersModule {}
